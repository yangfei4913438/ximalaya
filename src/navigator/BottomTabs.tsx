import React from 'react';
// 底部标签导航器
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Listen from '@/pages/Listen';
import Found from '@/pages/Found';
import Account from '@/pages/Account';
import { RootStackNavigation, RootStackParamList } from '.';
import { RouteProp, TabNavigationState } from '@react-navigation/native';
import IconFont from '@/assets/iconfont';
import HomeTabs from './HomeTabs';

// 定义页面
export type BottomTabParamList = {
  HomeTabs: undefined;
  Listen: undefined;
  Found: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

// 联合类型
type Route = RouteProp<RootStackParamList, 'BottomTabs'> & {
  state?: TabNavigationState;
};

interface IProps {
  navigation: RootStackNavigation;
  route: Route;
}

function getHeaderTitle(routeName: string) {
  switch (routeName) {
    case 'HomeTabs':
      return '首页';
    case 'Listen':
      return '我听';
    case 'Found':
      return '发现';
    case 'Account':
      return '账户';
    default:
      return '首页';
  }
}

class BottomTabs extends React.PureComponent<IProps> {
  // 组件更新之后更新标题
  componentDidUpdate() {
    this.initName();
  }
  componentDidMount() {
    this.initName();
  }

  initName = () => {
    const { navigation, route } = this.props;

    const routeName = route.state ? route.state.routes[route.state.index].name : route.params?.screen || 'HomeTabs';

    if (routeName === 'HomeTabs') {
      navigation.setOptions({
        headerTransparent: true, // 顶部标题栏背景为透明色
        headerTitle: '', // 标题为空
      });
    } else {
      navigation.setOptions({
        headerTransparent: false, // 顶部标题栏背景为透明色
        headerTitle: getHeaderTitle(routeName),
      });
    }
  };

  render() {
    return (
      <Tab.Navigator tabBarOptions={{ activeTintColor: '#f86442' }}>
        <Tab.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            tabBarLabel: '首页',
            tabBarIcon: ({ color, size }) => <IconFont name="iconhome-fill" color={color} size={size} />,
          }} // 改变底部菜单显示内容
        />
        <Tab.Screen
          name="Listen"
          component={Listen}
          options={{
            tabBarLabel: '我听',
            tabBarIcon: ({ color, size }) => <IconFont name="iconcollection-fill" color={color} size={size} />,
          }} // 改变底部菜单显示内容
        />
        <Tab.Screen
          name="Found"
          component={Found}
          options={{
            tabBarLabel: '发现',
            tabBarIcon: ({ color, size }) => <IconFont name="iconfaxian" color={color} size={size} />,
          }} // 改变底部菜单显示内容
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: '我的',
            tabBarIcon: ({ color, size }) => <IconFont name="iconaccount-fill" color={color} size={size} />,
          }} // 改变底部菜单显示内容
        />
      </Tab.Navigator>
    );
  }
}

export default BottomTabs;
