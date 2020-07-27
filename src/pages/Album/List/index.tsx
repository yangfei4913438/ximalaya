import React from 'react';
import { Animated, ListRenderItemInfo, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/store/reducer';
import { IProgram } from '@/store/types';
import Item from './item';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { ITabProps } from '../Tab';

const mapStateToProps = ({ album }: RootState) => {
  return {
    list: album.list,
  };
};

// 连接映射
const connector = connect(mapStateToProps);

interface IProps extends ConnectedProps<typeof connector> {}

class List extends React.PureComponent<IProps & ITabProps> {
  keyExtractor = (item: IProgram) => {
    return item.id;
  };

  onPress = (data: IProgram, index: number) => {
    const { onItemPress } = this.props;
    console.log(data.title, index);
    onItemPress(data, index);
  };

  renderItem = ({ item, index }: ListRenderItemInfo<IProgram>) => {
    //
    return <Item data={item} index={index} onPress={this.onPress} />;
  };

  render() {
    const { list, nativeRef, tapRef, panRef, onScrollDrag } = this.props;
    return (
      // 使用原生方法，拦截滚动事件。因为安卓上没办法滚动。。。
      <NativeViewGestureHandler simultaneousHandlers={panRef} ref={nativeRef} waitFor={tapRef}>
        {/* 改成动画列表组件 */}
        <Animated.FlatList
          style={styles.container}
          data={list}
          bounces={false} // 取消弹簧效果，针对IOS，安卓没这个效果。
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          onScrollBeginDrag={onScrollDrag} // 滚动开始
          onScrollEndDrag={onScrollDrag} // 滚动结束
        />
      </NativeViewGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default connector(List);
