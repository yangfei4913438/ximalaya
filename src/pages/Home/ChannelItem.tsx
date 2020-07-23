import React from 'react';
import { IChannel } from '@/store/types';
import { View, Text, StyleSheet, Image } from 'react-native';
import Iconfont from '@/assets/iconfont';
import Touchable from '@/components/Touchable';

interface IProps {
  channel: IChannel;
  onPress: (data: IChannel) => void;
}

class ChannelItem extends React.Component<IProps> {
  onPress = () => {
    const { onPress, channel } = this.props;
    if (typeof onPress === 'function') {
      onPress(channel);
    }
  };

  render() {
    const { channel } = this.props;
    return (
      <Touchable onPress={this.onPress}>
        <View style={stayles.container}>
          <Image source={{ uri: channel.image }} style={stayles.image} />
          <View style={stayles.rightCainer}>
            <Text style={stayles.title} numberOfLines={1}>
              {channel.title}
            </Text>
            <Text style={stayles.remark} numberOfLines={2}>
              {channel.remark}
            </Text>
            <View style={stayles.bottom}>
              <View style={stayles.played}>
                <Iconfont name="iconhuabankaobei-" size={14} />
                <Text style={stayles.number}>{channel.played}</Text>
              </View>
              <View style={stayles.playing}>
                <Iconfont name="iconshengyin" size={14} />
                <Text style={stayles.number}>{channel.playing}</Text>
              </View>
            </View>
          </View>
        </View>
      </Touchable>
    );
  }
}

const stayles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 1, // 安卓只支持投影，不支持阴影
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#dedede',
  },
  rightCainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  remark: {
    backgroundColor: '#f8f8f8',
    padding: 5,
    marginBottom: 5,
  },
  bottom: {
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  played: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  playing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    marginLeft: 5,
  },
});

export default ChannelItem;
