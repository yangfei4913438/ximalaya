import types from './actionTypes';
import defaultState from './initialState';
import { IChannel, IPagination, ICarousel, IGuess } from './types';

// action 的类型
export interface IAction {
  type: string;
  refreshing?: boolean;
  loading?: boolean;
  gradientVisible?: boolean;
  carouselList?: ICarousel[];
  carouselIndex?: number;
  guessList?: IGuess[];
  channelList?: IChannel[];
  pagination?: IPagination;
}

// 导出处理逻辑
export default (state = defaultState, action: IAction) => {
  switch (action.type) {
    // 顶部下拉刷新状态
    case types.refreshing:
      return {
        ...state,
        refreshing: action.refreshing,
      };
    // 变更加载状态
    case types.loading:
      return {
        ...state,
        loading: action.loading,
      };
    // 渐变色是否显示
    case types.gradientVisible:
      return {
        ...state,
        gradientVisible: action.gradientVisible,
      };
    // 轮播图列表
    case types.carouselList:
      return {
        ...state,
        carouselList: action.carouselList,
      };
    // 轮播图索引
    case types.carouselIndex:
      return {
        ...state,
        carouselIndex: action.carouselIndex,
      };
    // 猜你喜欢列表
    case types.guessList:
      return {
        ...state,
        guessList: action.guessList,
      };
    // 首页列表
    case types.channelList:
      return {
        ...state,
        channelList: action.channelList,
        pagination: {
          ...state.pagination,
          current: action.pagination!.current,
          total: action.pagination!.total,
          hasMore: action.channelList!.length < action.pagination!.total, // 当前的记录数，小于总条数
        },
      };
    // 首页列表，加载更多
    case types.loadMoreChannelList:
      // 旧的值
      let oldChannels: IChannel[] = [];
      oldChannels = oldChannels.concat(state.channelList);
      // 新的值过滤
      let arr: IChannel[] = [];
      // 过滤出当前数组中不存在的数据
      arr = action.channelList!.filter((o: IChannel) => !new Set(oldChannels.map((r: IChannel) => r.id)).has(o.id));
      // 新数组
      const newChannels: IChannel[] = oldChannels.concat(arr);
      return {
        ...state,
        channelList: newChannels,
        pagination: {
          ...state.pagination,
          current: action.pagination!.current,
          total: action.pagination!.total,
          hasMore: newChannels.length < action.pagination!.total, // 当前的记录数，小于总条数
        },
        loading: false,
      };
    // 全部刷新
    case types.homeAll:
      let res: { carouselList?: any; guessList?: any; channelList?: any; pagination?: any } = {};
      if (action.carouselList) {
        res.carouselList = action.carouselList;
      }
      if (action.guessList) {
        res.guessList = action.guessList;
      }
      if (action.channelList) {
        res.channelList = action.channelList;
        res.pagination = {
          ...state.pagination,
          current: action.pagination!.current,
          total: action.pagination!.total,
          hasMore: action.channelList!.length < action.pagination!.total, // 当前的记录数，小于总条数
        };
      }
      return {
        ...state,
        ...res,
        refreshing: false,
      };
    default:
      return state;
  }
};
