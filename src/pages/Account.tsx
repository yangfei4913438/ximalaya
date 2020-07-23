import React from 'react';
import { View, Text, Button } from 'react-native';
import { RootStackNavigation } from '@/navigator';

interface IProps {
  navigation: RootStackNavigation;
}

class Account extends React.PureComponent<IProps> {
  onPress = () => {
    //
    const { navigation } = this.props;
    // 跳转页面, 传递参数
    navigation.navigate('Detail', { id: '111' });
  };

  render() {
    return (
      <View>
        <Text>Account</Text>
        <Button title="跳转详情页" onPress={this.onPress} />
      </View>
    );
  }
}

export default Account;
