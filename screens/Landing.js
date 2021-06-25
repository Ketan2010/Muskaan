import React from 'react';
import { Text, View,StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function LandingPage(){
  let [fontsLoaded] = useFonts({
    'Yellowtail-Regular': require('../assets/fonts/Yellowtail-Regular.ttf'),
  });

  if (!fontsLoaded) {    
    return <AppLoading />;
  } else {
    return (
        <View style={styles.container}>
          <Image style={styles.logo}
              resizeMode={'stretch'}
              source={require('../assets/images/muskaan.png')}
          />
          
            <Text style={{...styles.tagline1,fontSize:hp('3%')}}>Today’s waste is</Text>
            <Text style={{...styles.tagline2,fontSize:hp('3%')}}>Tomorrow's shortage</Text>
          <Text style={styles.copyright}>
            Copyright  {""}
            <Icon name="copyright" size={hp('2%')} color={'#FFFEFE'} />
            {""} 2021 by Muskaan.Ltd
          </Text>
          
            
      </View>
    );
  }
};

const styles=StyleSheet.create({
    container:{
        position: 'relative',
        flex:1,
        width:wp('100%'),
        backgroundColor: '#F44646',
    },
    logo:{
        position: 'absolute',
        width:wp('70%'),
        height:hp('15%'),
        left:wp('15%'),
        top:hp('35%')
    },
    tagline1:{
        left:wp('20%'),
        top:hp('52%'),
        fontFamily: 'Yellowtail-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        lineHeight: 27,
        color: '#FFFEFE',
    },
    tagline2:{
      left: wp('45%'),
      top:hp('53%'),
      borderRadius: null,
      fontFamily: 'Yellowtail-Regular',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: 27,
      color: '#FFFEFE',
      textAlign: 'left',
    },
    copyright:{  
      top:hp('92%'),
      fontSize:hp('2%'),
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: 21,
      textAlign: 'center',
      color: '#FFFEFE',
    }
});


// comment

// changing for exeriment 
