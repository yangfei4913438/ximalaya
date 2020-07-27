import React from 'react';
import { TabView, TabBar, SceneRendererProps } from 'react-native-tab-view';
import Introduction from './Introduction';
import List from './List';
import { StyleSheet, Platform, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { PanGestureHandler, TapGestureHandler, NativeViewGestureHandler } from 'react-native-gesture-handler';
import { IProgram } from '@/store/types';

interface IRoute {
  key: string;
  title: string;
}

interface IState {
  routes: IRoute[];
  index: number;
}

export interface ITabProps {
  panRef: React.RefObject<PanGestureHandler>;
  tapRef: React.RefObject<TapGestureHandler>;
  nativeRef: React.RefObject<NativeViewGestureHandler>;
  onScrollDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onItemPress: (data: IProgram, index: number) => void;
}

class Tab extends React.Component<ITabProps, IState> {
  state = {
    routes: [
      // 选项配置
      { key: 'introduction', title: '简介' },
      { key: 'albums', title: '节目' },
    ],
    index: 1, // 当前的数组下标, 默认第二个
  };

  onIndexChange = (index: number) => {
    this.setState({
      index,
    });
  };

  renderScene = ({ route }: { route: IRoute }) => {
    const { panRef, tapRef, nativeRef, onScrollDrag, onItemPress } = this.props;
    switch (route.key) {
      case 'introduction':
        return <Introduction />;
      case 'albums':
        return <List panRef={panRef} tapRef={tapRef} nativeRef={nativeRef} onScrollDrag={onScrollDrag} onItemPress={onItemPress} />;
    }
  };

  renderTabBar = (props: SceneRendererProps & { navigationState: IState }) => {
    // scrollEnabled 可以取消标签的平分宽度
    return <TabBar {...props} scrollEnabled style={styles.tabbar} labelStyle={styles.label} tabStyle={styles.tabStyle} indicatorStyle={styles.indicator} />;
  };

  render() {
    return (
      <TabView
        navigationState={this.state} // 标签配置
        onIndexChange={this.onIndexChange} // 索引改变
        renderScene={this.renderScene} // 标签内容的渲染
        renderTabBar={this.renderTabBar} // 标签渲染
      />
    );
  }
}

const styles = StyleSheet.create({
  tabStyle: {
    width: 80,
  },
  label: {
    color: '#333',
  },
  tabbar: {
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        elevation: 0,
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
    }),
  },
  indicator: {
    backgroundColor: '#eb6d48',
    borderLeftWidth: 20, // 左侧空白20
    borderRightWidth: 20, // 右侧空白20
    borderColor: '#fff', // 边框颜色为白色
  },
});

export default Tab;
