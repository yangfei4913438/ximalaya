import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/store/reducer';

const mapStateToProps = ({ album }: RootState) => {
  return {
    introduction: album.introduction,
  };
};

// 连接映射
const connector = connect(mapStateToProps);

interface IProps extends ConnectedProps<typeof connector> {}

class Introduction extends React.Component<IProps> {
  render() {
    const { introduction } = this.props;
    return (
      <View style={styles.container}>
        <Text>{introduction}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default connector(Introduction);
