import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialTopTabBar, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
// 获取异形屏的顶部高度
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import Touchable from '@/components/Touchable';

interface IProps {
  linearColors: string[] | undefined;
  gradientVisible: boolean;
}

// 顶部标签导航器
class TopTabBarWrapper extends React.Component<MaterialTopTabBarProps & IProps> {
  get linearGradient() {
    const { linearColors = ['#eee', '#fff'], gradientVisible } = this.props;
    if (gradientVisible) {
      return <LinearGradient colors={linearColors} style={styles.gradient} />;
    }
    return null;
  }

  goCategory = () => {
    // 获取导航器对象
    const { navigation } = this.props;
    // 跳转到分类页面，就是之前在堆栈式导航器里面（src/navigator/index.tsx）写的页面名字
    navigation.navigate('Category');
  };

  render() {
    let { gradientVisible, indicatorStyle, ...resetProps } = this.props;
    // 正常情况下，显示灰色
    let textStyle = styles.text;
    let activeTintColor = '#333';
    if (gradientVisible) {
      // 渐变色的情况下，显示白色
      textStyle = styles.whiteText;
      activeTintColor = '#fff';
      if (indicatorStyle) {
        // 合并属性，这里是合并了背景色，后面的替换前面的
        indicatorStyle = StyleSheet.compose(indicatorStyle, styles.whiteBackgroundColor);
      }
    }
    return (
      <View style={styles.container}>
        {this.linearGradient}
        <View style={styles.topTabBarView}>
          <MaterialTopTabBar
            {...resetProps}
            indicatorStyle={indicatorStyle} // 自定义下划线的颜色
            activeTintColor={activeTintColor} // 自定义的颜色，要放在默认的后面
            style={styles.tabbar}
          />
          <Touchable style={styles.categoryBtn} onPress={this.goCategory}>
            <Text style={textStyle}>分类</Text>
          </Touchable>
        </View>
        <View style={styles.bottom}>
          <Touchable style={styles.searchBtn}>
            <Text style={textStyle}>搜索按钮</Text>
          </Touchable>
          <Touchable style={styles.historyBtn}>
            <Text style={textStyle}>历史记录</Text>
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: getStatusBarHeight(), // 获取到顶部的高度
  },
  gradient: {
    ...StyleSheet.absoluteFillObject, // 渐变色需要绝对定位
    height: 260, // 给一个高度
  },
  topTabBarView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabbar: {
    flex: 1,
    elevation: 0, // 安卓的顶部投影为0
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  categoryBtn: {
    paddingHorizontal: 10, // 水平内边距
    borderLeftWidth: StyleSheet.hairlineWidth, // 左侧边框
    borderLeftColor: '#ccc',
  },
  bottom: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  searchBtn: {
    flex: 1,
    paddingLeft: 12,
    height: 30,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  historyBtn: {
    marginLeft: 24,
  },
  text: {
    color: '#333',
  },
  whiteText: {
    color: '#fff',
  },
  whiteBackgroundColor: {
    backgroundColor: '#fff',
  },
});

export default TopTabBarWrapper;
