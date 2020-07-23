import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { IGuess } from '@/store/types';
import Touchable from '@/components/Touchable';
import Iconfont from '@/assets/iconfont';

interface IProps {
  guessList: IGuess[];
  getGuessList: () => any;
  goAlbum: (item: IGuess) => void;
}

class Guess extends React.Component<IProps> {
  renderItem = ({ item }: { item: IGuess }) => {
    return (
      <Touchable style={styles.item} onPress={() => this.props.goAlbum(item)}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text numberOfLines={2}>{item.title}</Text>
      </Touchable>
    );
  };

  render() {
    const { guessList, getGuessList } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Iconfont name="iconfavorites-fill" />
            <Text style={styles.headerTitle}>猜你喜欢</Text>
          </View>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>更多</Text>
            <Iconfont name="iconmore" />
          </View>
        </View>
        <FlatList
          style={styles.list}
          numColumns={3} // 每行三个元素
          data={guessList}
          renderItem={this.renderItem}
        />
        <Touchable style={styles.changeGuess} onPress={getGuessList}>
          <Iconfont name="iconexchangerate" color="red" />
          <Text style={styles.changeGuessText}>换一批</Text>
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomColor: '#efefef',
    borderBottomWidth: StyleSheet.hairlineWidth, // 一条很细的分割线，不要使用1
  },
  headerTitle: {
    color: '#111',
    margin: 5,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  list: {
    padding: 10,
  },
  changeGuess: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  changeGuessText: {
    marginLeft: 5,
  },
});

export default Guess;
