import React from 'react';
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home';
import TopTabBarWrapper from '@/pages/views/TopTabBarWrapper';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/store/reducer';
import { ICategory } from '@/store/types';

const mapStateToProps = ({ home, category }: RootState) => {
  return {
    myCategorys: category.myCategorys,
    gradientVisible: home.gradientVisible,
    linearColors: home.carouselList.length > 1 ? home.carouselList[home.carouselIndex].colors : undefined,
  };
};

// 连接映射
const connector = connect(mapStateToProps);

interface IProps extends ConnectedProps<typeof connector> {}

type HomeParamList = {
  [key: string]: undefined;
};

const Tab = createMaterialTopTabNavigator();

class HomeTabs extends React.PureComponent<IProps> {
  tabBar = (props: MaterialTopTabBarProps) => {
    // linearColors 就是渐变色的颜色
    return <TopTabBarWrapper {...props} linearColors={this.props.linearColors} gradientVisible={this.props.gradientVisible} />;
  };

  renderScreen = (item: ICategory) => {
    return <Tab.Screen key={item.id} name={item.id} component={Home} options={{ tabBarLabel: item.name }} />;
  };

  render() {
    const { myCategorys } = this.props;
    return (
      <Tab.Navigator
        lazy // 懒加载开启，只有使用的标签才会被加载
        sceneContainerStyle={styles.sceneContainerStyle} // 设置背景色为透明的，这样就可以有渐变色了。
        tabBar={this.tabBar} // 顶部标签导航器
        tabBarOptions={{
          scrollEnabled: true, // 开启标签栏滚动，支持更多标签
          tabStyle: {
            width: 80, // 每个标签的宽度
          },
          indicatorStyle: styles.indicatorStyle,
          activeTintColor: '#f86442', // 选中的字体颜色
          inactiveTintColor: '#333', // 未选中字体颜色
        }}>
        {myCategorys.map(this.renderScreen)}
        {/* <Tab.Screen name="Home1" component={Home} options={{ tabBarLabel: '标签2' }} /> */}
      </Tab.Navigator>
    );
  }
}

const styles = {
  sceneContainerStyle: {
    backgroundColor: 'transparent',
  },
  indicatorStyle: {
    // 居中显示底部选中横条
    height: 4,
    width: 20,
    marginLeft: 30,
    borderRadius: 2,
    backgroundColor: '#f86442', // 橘黄色
  },
};

export default connector(HomeTabs);
