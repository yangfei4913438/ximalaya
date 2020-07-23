import { ICategoryState } from './types';

const defaultValue: ICategoryState = {
  // 分类列表
  categoryList: [],
  // 用户选择的分类列表
  myCategorys: [
    {
      id: 'home',
      name: '推荐',
    },
    {
      id: 'vip',
      name: 'VIP',
    },
  ],
  // 是否编辑状态
  isEdit: false,
};

export default defaultValue;
