import defaultState from './initialState';
import actionTypes from './actionTypes';
import { ICategory } from './types';

// action 的类型
export interface IAction {
  type: string;
  isEdit?: boolean;
  categoryList?: ICategory[];
  myCategorys?: ICategory[];
}

// 导出处理逻辑
export default (state = defaultState, action: IAction) => {
  // 匹配action类型
  switch (action.type) {
    // 分类列表
    case actionTypes.categoryList:
      return {
        ...state,
        categoryList: action.categoryList,
      };
    // 用户选中分类列表
    case actionTypes.myCategorys:
      return {
        ...state,
        myCategorys: action.myCategorys,
      };
    // 切换编辑状态
    case actionTypes.toggleIsEdit:
      return {
        ...state,
        isEdit: !state.isEdit,
      };
    // 是否编辑状态
    case actionTypes.isEdit:
      return {
        ...state,
        isEdit: action.isEdit,
      };
    default:
      return state;
  }
};
