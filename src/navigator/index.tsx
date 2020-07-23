import React from 'react';
// NavigationContainer 管理所有的导航状态
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp, HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import Detail from '@/pages/Detail';
import { Platform, StyleSheet, StatusBar, Animated } from 'react-native';
import Category from '@/pages/Category';
import Album from '@/pages/Album';

// 约束传入的组件类型，值只能是 object 或 undefined
// 页面都放在这里
export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Category: undefined;
  Album: {
    item: {
      id: string;
      title: string;
      image: string;
    };
    opacity?: Animated.Value;
  };
  Detail: {
    id: string;
  };
};
// 堆栈式导航器
export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

/**
 * 返回一个对象，有两个属性：
 * Navigator => react 组件，导航器组件
 * Screeh => react 组件，Navigator组件的子组件，用来定义路由
 * */
const Stack = createStackNavigator<RootStackParamList>();

class Navigator extends React.Component {
  getAlbumOptions = ({ route }: { route: RouteProp<RootStackParamList, 'Album'> }) => {
    // 返回数据
    return {
      headerTitle: route.params.item.title, // 标题
      headerTransparent: true, // 头部背景透明
      headerTitleStyle: {
        opacity: route.params.opacity, // 标题的透明度为0
      },
      headerBackground: () => {
        return <Animated.View style={[styles.header, { opacity: route.params.opacity }]} />;
      },
    };
  };

  render() {
    return (
      <NavigationContainer>
        {/* NavigationContainer 堆栈式导航外部 */}
        <Stack.Navigator
          headerMode="float" // IOS的配置，共用一个标题栏
          screenOptions={{
            headerTitleAlign: 'center', // 标题居中
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit, // IOS的动画效果
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // IOS的水平动画效果
            gestureEnabled: true, // 开启手势
            gestureDirection: 'horizontal', // 水平方向
            ...Platform.select({
              android: {
                headerStatusBarHeight: StatusBar.currentHeight, // 设置安卓状态栏高度为当前的高度。因为IOS的不会有闪烁问题。先留着后面看会不会闪烁。
              },
            }),
            headerBackTitleVisible: false, // 不显示返回按钮的标题
            headerTintColor: '#333', // 返回ICON的颜色
            headerStyle: {
              // backgroundColor: 'red', // 导航器背景色
              ...Platform.select({
                android: {
                  elevation: 0, // 投影为0
                  borderBottomWidth: StyleSheet.hairlineWidth, // 下边框的阴影效果
                },
              }),
            },
          }}>
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs} // 底部导航组件 => 需要写在堆栈式导航中。
          />
          <Stack.Screen
            options={{ headerTitle: '分类' }} // 自定义标题名称
            name="Category"
            component={Category} // 分类页面的组件
          />
          <Stack.Screen
            options={{ headerTitle: '详情页' }} // 自定义标题名称
            name="Detail"
            component={Detail} // 明细页面的组件
          />
          <Stack.Screen
            options={this.getAlbumOptions} // 自定义标题名称
            name="Album"
            component={Album} // 明细页面的组件
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0,
  },
});

export default Navigator;
