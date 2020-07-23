import actionTypes from './actionTypes';
import categoryRequest from '@/models/categoryRequest';
import { ICategory } from './types';

class categoryActions {
  // 更新分类列表
  updateCategoryList() {
    return async (dispatch: any) => {
      const res = await categoryRequest.getCategorylList();
      if (res.status === 100) {
        dispatch({
          type: actionTypes.categoryList,
          categoryList: res.data,
        });
      }
    };
  }

  // 更新用户选中的分类
  updateMyCategorys(myCategorys: ICategory[]) {
    return {
      type: actionTypes.myCategorys,
      myCategorys,
    };
  }

  // 更新编辑状态
  updateIsEdit(isEdit: boolean) {
    return {
      type: actionTypes.isEdit,
      isEdit,
    };
  }

  // 切换编辑状态
  toggleIsEdit() {
    return {
      type: actionTypes.toggleIsEdit,
    };
  }
}

export default new categoryActions();
