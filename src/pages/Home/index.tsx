import React from 'react';
import { FlatList, View, Text, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { RootStackNavigation } from '@/navigator';
import { connect } from 'react-redux';
import { RootState } from '@/store/reducer';
import { homeActions } from '@/store/home';
import Carousel, { sloderHeight } from './Carousel';
import { ICarousel, IGuess, IChannel, IPagination } from '@/store/types';
import Guess from './Guess';
import ChannelItem from './ChannelItem';

interface IProps {
  navigation: RootStackNavigation;
  refreshing: boolean;
  loading: boolean;
  gradientVisible: boolean;
  carouselList: ICarousel[];
  guessList: IGuess[];
  channelList: IChannel[];
  pagination: IPagination;
  getCarouselList: () => any;
  getGuessList: () => any;
  getChannelList: () => any;
  loadMoreChannelList: (page: number) => any;
  getHomeAll: () => any;
  updateGradientVisible: (visible: boolean) => any;
}

class Home extends React.Component<IProps> {
  onPress = (channel: IChannel) => {
    console.log(channel);
    const { navigation } = this.props;
    // 跳转专辑页面
    navigation.navigate('Album', { item: { id: channel.id, title: channel.title, image: channel.image } });
  };

  // // 点击跳转列表
  goAlbum = (item: IGuess) => {
    const { navigation } = this.props;
    // 跳转专辑页面
    navigation.navigate('Album', { item: { id: item.id, title: item.title, image: item.image } });
  };

  componentDidMount() {
    const { carouselList, getCarouselList, guessList, getGuessList, channelList, getChannelList } = this.props;
    if (carouselList.length === 0) {
      getCarouselList();
    }
    if (guessList.length === 0) {
      getGuessList();
    }
    if (channelList.length === 0) {
      getChannelList();
    }
  }

  // 帮循环生成不重复的key
  keyExtractor = (item: IChannel) => {
    return item.id;
  };

  // 底部上拉请求数据
  onEndReached = () => {
    const { loading, pagination, loadMoreChannelList } = this.props;
    if (loading) {
      console.log('上次的请求还没结束，请稍后再试。。。');
      return;
    }
    // 判断是否还有更多
    if (pagination.hasMore) {
      loadMoreChannelList(pagination.current + 1);
    }
  };

  // 下拉刷新
  onRefresh = () => {
    const { getHomeAll } = this.props;
    // 获取数据
    getHomeAll();
  };

  // 渲染子组件
  renderItem = ({ item }: { item: IChannel }) => {
    return <ChannelItem channel={item} onPress={this.onPress} />;
  };

  // 获取原生事件
  onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    // 距离顶部的距离
    const offsetY = nativeEvent.contentOffset.y;

    // 如果滚动的距离 小于 轮播图的高度，那么就显示渐变色
    let visible = offsetY < sloderHeight;

    const { gradientVisible, updateGradientVisible } = this.props;
    // 如果不等，就执行更新
    if (gradientVisible !== visible) {
      updateGradientVisible(visible);
    }
  };

  get header() {
    const { carouselList, guessList, getGuessList } = this.props;
    return (
      <View>
        <Carousel carouselList={carouselList} />
        {/* 使用背景色，上来的时候，覆盖渐变色 */}
        <View style={styles.background}>
          <Guess guessList={guessList} getGuessList={getGuessList} goAlbum={this.goAlbum} />
        </View>
      </View>
    );
  }

  get footer() {
    const { pagination, loading, channelList } = this.props;

    if (!pagination.hasMore) {
      return (
        <View style={styles.end}>
          <Text>---我是有底线的---</Text>
        </View>
      );
    } else if (loading && pagination.hasMore && channelList.length > 0) {
      return (
        <View style={styles.loading}>
          <Text>正在加载中...</Text>
        </View>
      );
    } else {
      return null;
    }
  }

  get empty() {
    return (
      <View style={styles.empty}>
        <Text>暂无数据</Text>
      </View>
    );
  }

  render() {
    const { channelList, refreshing } = this.props;
    return (
      <FlatList
        ListHeaderComponent={this.header} // 可以接受一个组件作为头部内容
        ListFooterComponent={this.footer} // 数组底部组件
        ListEmptyComponent={this.empty} // 没有数据的时候，显示的内容
        data={channelList}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor} // 生成不重复的KEY
        onEndReached={this.onEndReached} // 底部上拉请求数据
        onEndReachedThreshold={0.2} // 距离底部20%的时候，触发底部上拉刷新
        onRefresh={this.onRefresh} // 顶部下拉刷新处理函数
        refreshing={refreshing} // 是否展示顶部下拉刷新状态
        onScroll={this.onScroll} // 监听滚动事件
      />
    );
  }
}

const styles = StyleSheet.create({
  end: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  background: {
    backgroundColor: '#fff',
  },
});

const mapStateToProps = ({ home }: RootState) => {
  return {
    loading: home.loading,
    carouselList: home.carouselList,
    guessList: home.guessList,
    channelList: home.channelList,
    pagination: home.pagination,
    refreshing: home.refreshing,
    gradientVisible: home.gradientVisible,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getCarouselList: () => dispatch(homeActions.updateCarouselList()),
    getGuessList: () => dispatch(homeActions.updateGuestList()),
    getChannelList: () => dispatch(homeActions.updateChannelList()),
    loadMoreChannelList: (page: number) => dispatch(homeActions.loadMoreChannelList(page)),
    getHomeAll: () => dispatch(homeActions.updateHomeAll()),
    updateGradientVisible: (visible: boolean) => dispatch(homeActions.updateGradientVisible(visible)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
