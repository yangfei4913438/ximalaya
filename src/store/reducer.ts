import { combineReducers } from 'redux';

import homeReducer from './home/reducer';
import categoryReducer from './category/reducer';
import albumReducer from './album/reducer';

import { IHomeState } from './home/types';
import { ICategoryState } from './category/types';
import { IAlbumState } from './album/types';

export interface RootState {
  home: IHomeState;
  category: ICategoryState;
  album: IAlbumState;
}

// 合并多个reducer, 直接导出
export default combineReducers({
  home: homeReducer,
  category: categoryReducer,
  album: albumReducer,
});
