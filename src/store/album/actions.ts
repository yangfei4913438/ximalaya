import albumRequest from '@/models/albumRequest';

import actionTypes from './actionTypes';
import { IAlbumState } from './types';

class albumActions {
  /**
   * 更新专辑信息
   * */
  updateAlbum(id: string) {
    return async (dispatch: any) => {
      const res = await albumRequest.getAlbum(id);
      if (res.status === 100) {
        const result: IAlbumState = res.data;
        console.log('result: ', result);
        dispatch({
          type: actionTypes.album,
          id: result.id,
          title: result.title,
          summary: result.summary,
          thumbnailUrl: result.thumbnailUrl,
          introduction: result.introduction,
          author: result.author,
          list: result.list,
        });
      } else {
        console.log('err:', res.msg);
      }
    };
  }
}
export default new albumActions();
