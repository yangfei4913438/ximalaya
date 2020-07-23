import actionTypes from './actionTypes';
import homeRequest from '@/models/homeRequest';

class homeActions {
  // 更新轮播图列表
  updateCarouselList() {
    return async (dispatch: any) => {
      const res = await homeRequest.getCarouselList();
      if (res.status === 100) {
        dispatch({
          type: actionTypes.carouselList,
          carouselList: res.data,
        });
      }
    };
  }
  // 更新轮播图索引
  updateCarouselIndex(idx: number) {
    return {
      type: actionTypes.carouselIndex,
      carouselIndex: idx,
    };
  }
  // 更新渐变色是否显示
  updateGradientVisible(visible: boolean) {
    return {
      type: actionTypes.gradientVisible,
      gradientVisible: visible,
    };
  }

  // 猜你喜欢列表更新
  updateGuestList() {
    return async (dispatch: any) => {
      const res = await homeRequest.getGuestList();
      if (res.status === 100) {
        dispatch({
          type: actionTypes.guessList,
          guessList: res.data,
        });
      }
    };
  }

  // 首页列表更新
  updateChannelList() {
    return async (dispatch: any) => {
      const res = await homeRequest.getChannelList();
      if (res.status === 100) {
        dispatch({
          type: actionTypes.channelList,
          channelList: res.data.results,
          pagination: res.data.pagination,
        });
      }
    };
  }

  // 加载更多
  loadMoreChannelList(page: number = 1) {
    return async (dispatch: any) => {
      // 打开加载状态
      dispatch({
        type: actionTypes.loading,
        loading: true,
      });
      const res = await homeRequest.getChannelList(page);
      if (res.status === 100) {
        dispatch({
          type: actionTypes.loadMoreChannelList,
          channelList: res.data.results,
          pagination: res.data.pagination,
        });
      }
    };
  }

  // 首页全部的请求
  updateHomeAll() {
    return async (dispatch: any) => {
      // 打开顶部下拉刷新状态显示
      dispatch({
        type: actionTypes.refreshing,
        refreshing: true,
      });

      // 请求数据
      const res1 = await homeRequest.getCarouselList();
      const res2 = await homeRequest.getGuestList();
      const res3 = await homeRequest.getChannelList();

      const res: { carouselList?: any; guessList?: any; channelList?: any; pagination?: any } = {};

      if (res1.status === 100) {
        res.carouselList = res1.data;
      }

      if (res2.status === 100) {
        res.guessList = res2.data;
      }

      if (res3.statue === 100) {
        res.channelList = res3.data.results;
        res.pagination = res3.data.pagination;
      }

      dispatch({
        type: actionTypes.homeAll,
        ...res,
      });
    };
  }
}

export default new homeActions();
