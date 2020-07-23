import React from 'react';
import { ICategory } from '@/store/types';
import { View, Text, StyleSheet } from 'react-native';
import { viewportWidth } from '@/utils';

interface IProps {
  isEdit: boolean;
  selected: boolean;
  disabled: boolean;
  data: ICategory;
}

export const parentWidth = viewportWidth - 10;
export const itemWidth = parentWidth / 4;
export const itemHeight = 48;
export const itemMargin = 5;

class Item extends React.Component<IProps> {
  render() {
    const { data, isEdit, selected, disabled } = this.props;
    return (
      <View key={data.id} style={styles.itemWrapper}>
        <View style={[styles.item, disabled && styles.disabled]}>
          <Text>{data.name}</Text>
          {isEdit && !disabled ? (
            <View style={styles.icon}>
              <Text style={styles.iconText}>{selected ? '-' : '+'}</Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    width: itemWidth,
    height: itemHeight,
  },
  item: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: itemMargin,
    borderRadius: 4,
  },
  icon: {
    position: 'absolute',
    top: -5,
    right: -5,
    height: 16,
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f86442',
    borderRadius: 8,
  },
  iconText: {
    color: '#fff',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
});

export default Item;
