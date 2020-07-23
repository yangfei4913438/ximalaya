import React from 'react';
import { View, Text, StyleSheet, Image, Animated, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useHeaderHeight } from '@react-navigation/stack';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/store/reducer';
import { albumActions } from '@/store/album';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, RootStackNavigation } from '@/navigator';
import coverRight from '@/assets/cover-right.png';
import Tab from './Tab';
import { PanGestureHandler, PanGestureHandlerStateChangeEvent, State, TapGestureHandler, NativeViewGestureHandler } from 'react-native-gesture-handler';
import { viewportHeight } from '@/utils';

const mapStateToProps = ({ album }: RootState) => {
  return {
    summary: album.summary,
    author: album.author,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getAlbum: (id: string) => dispatch(albumActions.updateAlbum(id)),
  };
};

// 连接映射
const connector = connect(mapStateToProps, mapDispatchToProps);

interface IProps extends ConnectedProps<typeof connector> {
  headerHeight: number;
  route: RouteProp<RootStackParamList, 'Album'>; // 第一个是所有的参数， 第二个是页面的名字
  navigation: RootStackNavigation;
}

// 使用原生动画渲染
const USE_NATIVE_DRIVER = true;
// 头部信息的高度
const HEADER_HEIGHT = 260;

class Album extends React.Component<IProps> {
  // 向上滚动后，列表有多少距离，是串上去被遮挡住的。
  lastScrollY = new Animated.Value(0);
  // 上次每次滚动的值，保存起来。
  lastScrollYValue = 0;
  // 乘以-1，取反值 => 内部列表被隐藏的滚动距离
  reverselationYValue = Animated.multiply(new Animated.Value(-1), this.lastScrollY);

  // 初始的位置，动画值
  translatrionY = new Animated.Value(0);
  // 初始位置的数值记录，用于比较大小使用。
  translationYValue = 0;
  // 每次移动的偏移位置
  translationYOffset = new Animated.Value(0);
  // 动画一共偏移了多少，包含内部列表被隐藏的滚动距离。
  translateY = Animated.add(Animated.add(this.translatrionY, this.reverselationYValue), this.translationYOffset);

  // 拖动范围: 头部的高度 - 标题栏的高度，值取反。范围的最大值就是0. 整个数组表示可以向上拖动的距离。
  RANGE = [-(HEADER_HEIGHT - this.props.headerHeight), 0];

  // 滚动事件的REF
  panRef = React.createRef<PanGestureHandler>();
  // 滚动事件外层的触摸REF
  tapRef = React.createRef<TapGestureHandler>();
  // 原生响应组件
  nativeRef = React.createRef<NativeViewGestureHandler>();

  componentDidMount() {
    const { route, getAlbum, navigation } = this.props;
    // 直接获取专辑信息c
    console.log('id:', route.params.item.id);
    getAlbum(route.params.item.id);
    // 设置路由参数，主要是设置顶部标题的透明度。实现上拉透明渐变成不透明的效果。
    navigation.setParams({
      // 这里使用的变量是 translateY 总偏移量！
      opacity: this.translateY.interpolate({
        // 这里也是用到了插值动画的特性，因为参数都是不变的，所以写在这里是没问题的。
        inputRange: this.RANGE, // 不变的值
        outputRange: [1, 0], // 不变的值
      }),
    });
  }

  onScrollDrag = Animated.event([{ nativeEvent: { contentOffset: { y: this.lastScrollY } } }], {
    useNativeDriver: USE_NATIVE_DRIVER,
    listener: ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      // 每次滚动的值，保存起来。
      this.lastScrollYValue = nativeEvent.contentOffset.y;
    },
  });

  renderHeader = () => {
    const { headerHeight, route, summary, author } = this.props;
    const { title, image } = route.params.item;
    console.log('author:', author, image);
    return (
      <View style={[styles.header, { paddingTop: headerHeight }]}>
        <Image source={{ uri: image }} style={styles.backgorund} />
        <BlurView
          blurType="light" // 高亮模糊
          blurAmount={10} // 模糊强度 10
          style={StyleSheet.absoluteFillObject} // 绝对定位
        />
        <View style={styles.leftView}>
          <Image source={{ uri: image }} style={styles.thumbnail} />
          <Image source={coverRight} style={styles.coverRight} />
        </View>
        <View style={styles.rightView}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.summary}>
            <Text numberOfLines={1} style={styles.summaryText}>
              {summary}
            </Text>
          </View>
          <View style={styles.author}>
            <Image source={{ uri: author.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{author.name}</Text>
          </View>
        </View>
      </View>
    );
  };

  // 手指拖动的时候触发，使用动画的监听事件，是为了映射动画值。
  onGestureEvent = Animated.event([{ nativeEvent: { translationY: this.translatrionY } }], {
    useNativeDriver: USE_NATIVE_DRIVER, // 原生动画渲染。
  });

  // 状态发生变化的时候调用
  onHandlerStateChange = ({ nativeEvent }: PanGestureHandlerStateChangeEvent) => {
    // 上次活动状态是否为活动的，比如手势离开了，上一次的状态是活动的
    if (nativeEvent.oldState === State.ACTIVE) {
      // 获取到垂直方向上的移动距离
      let { translationY } = nativeEvent;
      // 累加向上移动距离，因为两个值相反，所以 -= 就可以了。
      translationY -= this.lastScrollYValue;

      // 将动画值绑定到offset属性上，并清空value值
      // 每个 Animated.Value 上都有两个属性，一个是 value 另一个是 offset
      this.translationYOffset.extractOffset();
      // 上面清空了value值，现在设置为上面获取到的 translationY, 也就是垂直方向上的移动距离
      this.translationYOffset.setValue(translationY);
      // 设置value的值 = value + offset，也就是累计拖动了多长的距离。
      this.translationYOffset.flattenOffset();
      // 通过上面的三个步骤：1、清空value, 2、获取到移动距离，3、重新设置value

      // 每次手势离开的时候，偏移值的累计高度。用于比较值大小，修正拖动的距离。
      // 上面三行的效果和这个是一样的。只不过这里是便于计算使用的。
      this.translationYValue += translationY;

      // 最重要的一步，重置高度。拖动放手会，回归原位。
      this.translatrionY.setValue(0);

      // 可以向上滑动多长的距离。 第一个值的绝对值就是可以移动的距离，第二个值就是当前的距离，第二个值为0的时候就是初始高度。
      let maxDeltaY = -this.RANGE[0] - this.translationYValue;

      // 判断位置
      if (this.translationYValue < this.RANGE[0]) {
        // 超出位置，重置为允许的最小值。
        this.translationYValue = this.RANGE[0];
        Animated.timing(this.translationYOffset, {
          toValue: this.RANGE[0],
          duration: 1000,
          useNativeDriver: USE_NATIVE_DRIVER,
        }).start();
        // 第二个值是0，表示不能移动了。
        maxDeltaY = this.RANGE[1];
      } else if (this.translationYValue > this.RANGE[1]) {
        this.translationYValue = this.RANGE[1];
        Animated.timing(this.translationYOffset, {
          toValue: this.RANGE[1],
          duration: 1000,
          useNativeDriver: USE_NATIVE_DRIVER,
        }).start();
        // 这里就是说下拉到原位了，所以可移动大小，变成正常的高度距离。
        maxDeltaY = -this.RANGE[0];
      }

      // 如果组件存在就设置组件 maxDeltaY 的新值。
      // 这种无需渲染的变量，不要使用setState
      if (this.tapRef.current) {
        const tap: any = this.tapRef.current;
        tap.setNativeProps({
          maxDeltaY,
        });
      }
    }
  };

  render() {
    return (
      <TapGestureHandler // 两个响应组件之间，不能直接嵌套，必须要用View隔离一下。
        ref={this.tapRef}
        maxDeltaY={-this.RANGE[0]} // 到达指定偏移值之前不激活手势。
      >
        <View style={styles.container}>
          <PanGestureHandler // 监听手指拖动页面事件
            ref={this.panRef}
            simultaneousHandlers={[this.tapRef, this.nativeRef]} // 多个事件，同步响应。=> 当this.nativeRef组件激活的时候，this.tapRef 也同样处于激活状态
            onGestureEvent={this.onGestureEvent} // 手指拖动触发
            onHandlerStateChange={this.onHandlerStateChange} // 状态发生变化的时候调用
          >
            <Animated.View
              style={[
                styles.container,
                {
                  transform: [
                    {
                      translateY: this.translateY.interpolate({
                        inputRange: this.RANGE, // 设置拖动范围
                        outputRange: this.RANGE, // 映射范围
                        extrapolate: 'clamp', // 超出范围不处理，也就是不能拖动 => 主要是为了这个特性。
                      }),
                    },
                  ],
                },
              ]}>
              {this.renderHeader()}
              {/* 设置动态高度，保证拖动的时候，下面不留白出来 */}
              <View style={{ height: viewportHeight - this.props.headerHeight }}>
                <Tab panRef={this.panRef} tapRef={this.tapRef} nativeRef={this.nativeRef} onScrollDrag={this.onScrollDrag} />
              </View>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </TapGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 20, // 水平内边距
    alignItems: 'center',
  },
  backgorund: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#eee',
  },
  leftView: {
    marginRight: 26,
  },
  rightView: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  thumbnail: {
    width: 98,
    height: 98,
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  coverRight: {
    height: 98,
    position: 'absolute',
    right: -23,
    resizeMode: 'contain', // contain模式是要求显示整张图片, 可以对它进行等比缩小, 图片会显示完整,可能会露出Image控件的底色。 如果图片宽高都小于控件宽高，则不会对图片进行放大。
  },
  summary: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
  },
  summaryText: {
    color: '#fff',
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: '#fff',
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 8,
  },
});

const Wrapper = (props: IProps) => {
  // 获取到顶部标题栏的高度
  const headerHeight = useHeaderHeight();
  // 传入组件
  return <Album {...props} headerHeight={headerHeight} />;
};

export default connector(Wrapper);
