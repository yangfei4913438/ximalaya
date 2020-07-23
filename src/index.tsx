import React from 'react';
import Navigator from '@/navigator';
import { Provider } from 'react-redux';
import store from '@/store';
import { StatusBar } from 'react-native';

export default class extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
        <StatusBar // 顶部状态栏，也就是有信号，手机电量的那行
          backgroundColor="transparent" // 背景色透明
          barStyle="dark-content" // 深色模式，否则字体也是白的。
          translucent // 半透明属性，应用程序将在状态栏下绘制。
        />
      </Provider>
    );
  }
}
