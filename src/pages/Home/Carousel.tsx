import React from 'react';
import SnapCarousel, { AdditionalParallaxProps, ParallaxImage, Pagination } from 'react-native-snap-carousel';
import { viewportWidth, wp, hp } from '@/utils';
import { StyleSheet, View } from 'react-native';
import { ICarousel } from '@/store/types';
import { connect } from 'react-redux';
import { RootState } from '@/store/reducer';
import { homeActions } from '@/store/home';

// 屏幕宽度
const sliderWidth = viewportWidth;
// 图片高度
export const sloderHeight = hp(26);
// 图片宽度: 90% + 屏幕的2%边距 * 2
const itemWidth = wp(90) + wp(2) * 2;

interface IProps {
  carouselList: ICarousel[];
  carouselIndex: number;
  updateCarouselIndex: (idx: number) => any;
}

class Carousel extends React.Component<IProps> {
  renderItem = ({ item }: { item: ICarousel }, parallaxProps?: AdditionalParallaxProps) => {
    return (
      <ParallaxImage
        source={{ uri: item.image }}
        style={styles.image}
        containerStyle={styles.imageContainer}
        parallaxFactor={0.3} // 图片滚动速度，默认0.3
        showSpinner // 加载动画效果
        spinnerColor="rgba(0,0,0,.25)"
        {...parallaxProps}
      />
    );
  };

  // 函数当成属性来使用
  get pagination() {
    const { carouselList, carouselIndex } = this.props;
    return (
      <View style={styles.paginationWrapper}>
        <Pagination
          containerStyle={styles.paginationContainer} // 外部容器样式
          dotContainerStyle={styles.dotContainer} // 小圆点容器的样式
          dotStyle={styles.dot}
          activeDotIndex={carouselIndex} // 当前活动的图片索引 => 点也要相应展示的索引
          dotsLength={carouselList.length} // 几个点的数量和图片的数量一致
          inactiveDotScale={0.7} // 不活动的小圆点缩放比例
          inactiveDotOpacity={0.4} // 不活动的小圆点透明度
        />
      </View>
    );
  }

  onSnapToItem = (index: number) => {
    const { updateCarouselIndex } = this.props;
    // 记录当前的图片索引
    updateCarouselIndex(index);
  };

  render() {
    const { carouselList } = this.props;

    return (
      <View>
        <SnapCarousel
          data={carouselList}
          onSnapToItem={this.onSnapToItem} // 获取当前图片的索引
          renderItem={this.renderItem} // 渲染方法
          sliderWidth={sliderWidth} // 容器宽度
          itemWidth={itemWidth} // 图片的宽度
          hasParallaxImages // 视差渲染
          loop // 无限滚动
          autoplay // 自动滚动
        />
        {this.pagination}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    width: itemWidth,
    height: sloderHeight,
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover', // contain 完全展示，比例不一样就缩放，cover 展示一部分，如果比例不一样
  },
  paginationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    top: -20,
    backgroundColor: 'rgba(0,0,0,.35)',
    paddingHorizontal: 3, // 横向内边距
    paddingVertical: 4, // 垂直内边距
    borderRadius: 8,
  },
  dotContainer: {
    marginHorizontal: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,.92)',
  },
});

const mapStateToProps = ({ home }: RootState) => {
  return {
    carouselIndex: home.carouselIndex,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateCarouselIndex: (idx: number) => dispatch(homeActions.updateCarouselIndex(idx)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
