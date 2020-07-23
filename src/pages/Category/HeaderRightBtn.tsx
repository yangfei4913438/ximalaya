import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/store/reducer';

// 映射state
const mapStateToProps = ({ category }: RootState) => {
  return {
    isEdit: category.isEdit,
  };
};
// 连接映射
const connector = connect(mapStateToProps);

// 继承连接的参数类型，里面是自己接收外部传入进来的函数
interface IProps extends ConnectedProps<typeof connector> {
  onSubmit: () => void;
}

class HeaderRightBtn extends React.PureComponent<IProps> {
  render() {
    const { isEdit, onSubmit } = this.props;
    return (
      <HeaderButtons>
        <Item title={isEdit ? '完成' : '编辑'} onPress={onSubmit} />
      </HeaderButtons>
    );
  }
}

// 使用连接映射返回的函数包裹组件
export default connector(HeaderRightBtn);
