import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {Card} from 'react-native-shadow-cards';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const SettingsScreen = ({navigation}) => {
    let [fontsLoaded] = useFonts({
      'Volkhov-Bold': require('../assets/fonts/Volkhov-Bold.ttf'),
    });

    if (!fontsLoaded) {    
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <Card elevation={20}  cornerRadius={wp('2%')} >
              <View style={styles.feature}>
                <View style={{flex:5,left:wp('2%')}}>
                    <Text style={{fontSize:hp('2%'),fontFamily:'Volkhov-Bold',fontWeight:'normal'}}>Ram Ahuja</Text>
                    <Text></Text>
                    <Text>Plates : 2</Text>
                    <Text>30, Navinagar , Wadala</Text>
                    <Text>Mumbai-400002</Text>
                </View>
                <View style={{flex:2,left:wp('8%')}}>
                  <Text style={{fontStyle:'italic',fontFamily:'Volkhov-Bold'}}>17 June, 10:40</Text>
                </View>
              </View>
          </Card>   
        </View>
      )};
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    
    alignItems: 'center', 
    justifyContent: 'center',
    top:hp('22%')
  },
  feature:{
    // alignItems: 'center', 
    flexDirection: 'row',
    padding:wp('2%'),
    // paddingTop:hp('0.5%')
    width:wp('80%')
  },
});