import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IProgram } from '@/store/types';
import Touchable from '@/components/Touchable';
import IconFont from '@/assets/iconfont';

interface IProps {
  data: IProgram;
  index: number;
  onPress: (data: IProgram) => void;
}

class Item extends React.Component<IProps> {
  onPress = () => {
    const { data, onPress } = this.props;
    onPress(data);
  };

  render() {
    const { data, index } = this.props;
    return (
      <Touchable style={styles.container} onPress={this.onPress}>
        <Text style={styles.index}>{index + 1}</Text>
        <View style={styles.content}>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.info}>
            <View style={styles.iconView}>
              <IconFont name="iconV" color="#939393" />
              <Text style={styles.iconText}>{data.playVolume}</Text>
            </View>
            <View style={styles.iconView}>
              <IconFont name="iconclock" color="#939393" />
              <Text style={styles.iconText}>{data.duration}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.date}>{data.date}</Text>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  index: {
    fontSize: 14,
    color: '#838383',
    fontWeight: '800',
  },
  content: {
    flex: 1,
    marginHorizontal: 25, // 水平的外边距
  },
  title: {
    fontWeight: '500',
    marginBottom: 15,
  },
  info: {
    flexDirection: 'row',
  },
  iconView: {
    flexDirection: 'row',
    marginRight: 10,
  },
  iconText: {
    marginHorizontal: 5,
    color: '#939393',
  },
  date: {
    color: '#939393',
  },
});

export default Item;
