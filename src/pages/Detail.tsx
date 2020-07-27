import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigator';

interface IProps {
  route: RouteProp<RootStackParamList, 'Detail'>; // 获取参数
}

class Detail extends React.PureComponent<IProps> {
  render() {
    // const { route } = this.props;
    return (
      <View>
        <Text>Detail</Text>
        {/* <Text>{route.params.id}</Text> */}
      </View>
    );
  }
}

export default Detail;
