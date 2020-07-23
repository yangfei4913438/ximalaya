import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { DragSortableView } from 'react-native-drag-sort';
import { RootState } from '@/store/reducer';
import { categoryActions } from '@/store/category';
import { ICategory } from '@/store/types';
import _ from 'lodash';
import Item, { itemWidth, parentWidth, itemHeight, itemMargin } from '@/pages/Category/item';
import { RootStackNavigation } from '@/navigator';
import HeaderRightBtn from '@/pages/Category/HeaderRightBtn';
import Touchable from '@/components/Touchable';
import storage from '@/config/storage';

const mapStateToProps = ({ category }: RootState) => {
  return {
    categoryList: category.categoryList,
    myCategorys: category.myCategorys,
    isEdit: category.isEdit,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getCategoryList: () => dispatch(categoryActions.updateCategoryList()),
    toggleIsEdit: () => dispatch(categoryActions.toggleIsEdit()),
    updateIsEdit: (status: boolean) => dispatch(categoryActions.updateIsEdit(status)),
    updateMyCategorys: (myCategorys: ICategory[]) => dispatch(categoryActions.updateMyCategorys(myCategorys)),
  };
};

// 连接映射
const connector = connect(mapStateToProps, mapDispatchToProps);

interface IProps extends ConnectedProps<typeof connector> {
  navigation: RootStackNavigation;
}

interface IState {
  myCategorys: ICategory[];
  scrollEnabled: boolean;
}

// 禁止删除修改的项
const fixedItems = [0, 1];

class Category extends React.Component<IProps, IState> {
  state = {
    myCategorys: this.props.myCategorys,
    scrollEnabled: true,
  };

  // 响应点击操作
  onSubmit = () => {
    const { navigation, isEdit, toggleIsEdit, updateMyCategorys } = this.props;
    const { myCategorys } = this.state;
    // 切换编辑按钮状态
    toggleIsEdit();
    if (isEdit) {
      // 更新持久存储
      storage.save({
        key: 'myCategorys',
        data: myCategorys,
      });
      // 更新redux
      updateMyCategorys(myCategorys);
      // 回到首页
      navigation.goBack();
    }
  };
  // 响应长按操作
  onLongPress = () => {
    const { isEdit, updateIsEdit } = this.props;
    // 已经处于编辑状态就不管了
    if (isEdit) {
      return;
    }
    // 更新为编辑状态
    updateIsEdit(true);
  };
  // 响应点击
  onPress = (item: ICategory, index: number, selected: boolean) => {
    const { isEdit } = this.props;
    const { myCategorys } = this.state;
    const disabled = fixedItems.includes(index);
    // 如果是禁用的，且是已选中的对象列表，那么就直接返回，不处理。
    if (disabled && selected) {
      return;
    }
    // 编辑状态
    if (isEdit) {
      // 选中列表处理
      if (selected) {
        // 选中列表减值，去掉点击的对象
        this.setState({
          myCategorys: myCategorys.filter((o) => o.id !== item.id), // 不可变值！！！
        });
      } else {
        // 选中列表加值，增加点击的对象
        this.setState({
          myCategorys: myCategorys.concat([item]), // 不可变值！！！
        });
      }
    }
  };
  componentWillUnmount() {
    const { updateIsEdit } = this.props;
    // 更新为非编辑状态
    updateIsEdit(false);
  }
  componentDidMount() {
    const { navigation, categoryList, getCategoryList } = this.props;
    if (categoryList.length === 0) {
      getCategoryList();
    }
    // 添加右侧编辑按钮
    navigation.setOptions({
      headerRight: () => <HeaderRightBtn onSubmit={this.onSubmit} />,
    });
  }
  // 被选中的列表元素
  renderItem = (item: ICategory, index: number) => {
    const { isEdit } = this.props;
    const disabled = fixedItems.includes(index);
    return (
      // <Touchable key={item.id} onPress={() => this.onPress(item, index, true)}>
      <Item data={item} disabled={disabled} isEdit={isEdit} selected={true} />
      // </Touchable>
    );
  };
  // 未选中的列表元素
  renderUnSelectedItrm = (item: ICategory, index: number) => {
    const { isEdit } = this.props;
    return (
      <Touchable key={item.id} onPress={() => this.onPress(item, index, false)} onLongPress={this.onLongPress}>
        <Item data={item} disabled={false} isEdit={isEdit} selected={false} />
      </Touchable>
    );
  };
  // 拖拽后的新数组
  onDataChange = (data: ICategory[]) => {
    // 赋值
    this.setState({
      myCategorys: data,
    });
  };
  onClickItem = (data: ICategory[], item: ICategory) => {
    // 调用点击函数，第一个参数是点击的对象，第二个参数是点击对象的索引，第三个参数，表示这是一个已选中列表中的元素
    this.onPress(item, data.indexOf(item), true);
  };

  render() {
    const { categoryList, isEdit } = this.props;
    const { myCategorys, scrollEnabled } = this.state;
    // 根据分类字段给数组进行分组
    const classifyGroup = _.groupBy(categoryList, (item) => item.classify);
    return (
      <ScrollView style={stayles.conatiner} scrollEnabled={scrollEnabled}>
        <Text style={stayles.classifyName}>我的分类</Text>
        <View style={stayles.classifyView}>
          <DragSortableView
            dataSource={myCategorys} // 数据源
            fixedItems={fixedItems} // 固定元素的下标，不能被拖拽
            renderItem={this.renderItem} // 渲染函数
            sortable={isEdit} // 编辑状态才可以拖拽
            keyExtractor={(item: ICategory) => item.id} // key
            onDataChange={this.onDataChange} // 拖拽后的回调
            parentWidth={parentWidth}
            childrenWidth={itemWidth}
            childrenHeight={itemHeight}
            marginChildrenTop={itemMargin}
            onClickItem={this.onClickItem}
            onDragStart={() => {
              this.setState({
                scrollEnabled: false, // 停止页面滚动
              });
            }}
            onDragEnd={() => {
              this.setState({
                scrollEnabled: true, // 开启页面滚动
              });
            }}
          />
        </View>
        <View>
          {Object.keys(classifyGroup).map((classify) => {
            return (
              <View key={classify}>
                <Text style={stayles.classifyName}>{classify}</Text>
                <View style={stayles.classifyView}>
                  {classifyGroup[classify].map((item, index) => {
                    if (myCategorys.find((o) => o.id === item.id)) {
                      return null;
                    } else {
                      return this.renderUnSelectedItrm(item, index);
                    }
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const stayles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: '#f3f6f6',
  },
  classifyName: {
    fontSize: 16,
    marginTop: 14,
    marginBottom: 8,
    marginLeft: 10,
  },
  classifyView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
});

export default connector(Category);
