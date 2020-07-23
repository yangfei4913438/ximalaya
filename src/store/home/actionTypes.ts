const ActionTypes = {
  // 错误类型，用于请求出错后的处理
  errorType: 'ErrorType',
  // 首页全部刷新请求
  homeAll: 'HomeAll',
  // 顶部下拉刷新状态
  refreshing: 'Refreshing',
  // 加载更多首页列表，加载中
  loading: 'Loading',
  // 渐变色是否显示
  gradientVisible: 'GradientVisible',
  // 轮播图列表
  carouselList: 'CarouselList',
  // 当前轮播图的下标
  carouselIndex: 'CarouselIndex',
  // 猜你喜欢列表
  guessList: 'GuessList',
  // 首页列表
  channelList: 'ChannelList',
  // 首页列表，加载更多
  loadMoreChannelList: 'LoadMoreChannelList',
};

export default ActionTypes;
