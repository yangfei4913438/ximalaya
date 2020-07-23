import { IHomeState } from './types';

// 默认值
const defaultValue: IHomeState = {
  // 顶部下拉刷新状态
  refreshing: false,

  // 请求更多的加载状态
  loading: false,

  // 渐变色是否显示, 默认显示
  gradientVisible: true,

  // 轮播图列表
  carouselList: [],
  // 当前轮播图的下标
  carouselIndex: 0,

  // 猜你喜欢列表
  guessList: [],

  // 首页列表
  channelList: [],

  // 分页情况
  pagination: { current: 1, limit: 5, total: 1, hasMore: true },
};

// 导出默认值
export default defaultValue;
