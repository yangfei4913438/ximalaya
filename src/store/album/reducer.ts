import defaultValue from './initialState';
import { IAlbumState } from './types';
import actionTypes from './actionTypes';

export interface IAction extends IAlbumState {
  type: string;
}

export default (state = defaultValue, action: IAction) => {
  switch (action.type) {
    case actionTypes.album:
      return {
        ...state,
        id: action.id,
        title: action.title,
        summary: action.summary,
        thumbnailUrl: action.thumbnailUrl,
        introduction: action.introduction,
        author: action.author,
        list: action.list,
      };
    default:
      return state;
  }
};
