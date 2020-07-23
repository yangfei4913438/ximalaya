import { IAlbumState } from './types';

// 专辑默认值
const defaultValue: IAlbumState = {
  id: '',
  title: '',
  summary: '',
  thumbnailUrl: '',
  author: {
    name: '',
    avatar: '',
  },
  introduction: '',
  list: [],
};

export default defaultValue;
