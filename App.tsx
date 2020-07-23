import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, Text } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Config from 'react-native-config';
declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View>
            <Text>{Config.API_URL}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});

export default App;
