export interface ICategory {
  id: string;
  name: string;
  classify?: string;
}

export interface ICategoryState {
  isEdit: boolean;
  categoryList: ICategory[];
  myCategorys: ICategory[];
}
