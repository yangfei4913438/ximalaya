// 数据类型定义

// 轮播图元素
export interface ICarousel {
  id: string;
  image: string;
  colors: string[];
}

// 猜你喜欢元素
export interface IGuess {
  id: string;
  title: string;
  image: string;
}

// 首页列表元素
export interface IChannel {
  id: string;
  title: string;
  image: string;
  remark: string;
  played: number;
  playing: number;
}

// 分页对象
export interface IPagination {
  current: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// 首页全部元素
export interface IHomeState {
  refreshing: boolean;
  loading: boolean;
  gradientVisible: boolean;
  carouselList: ICarousel[];
  carouselIndex: number;
  guessList: IGuess[];
  channelList: IChannel[];
  pagination: IPagination;
}
