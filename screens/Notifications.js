import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';

const NotificationsScreen = ({navigation}) => {
  
    return (
      <View style={styles.container}>
       
      <Text>notify</Text>
      </View>
    );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});