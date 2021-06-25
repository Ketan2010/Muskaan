import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,ScrollView, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import Faqtoggle from '../components/Faqtoggle';

const FAQScreen = ({navigation}) => {

    return (
      <View style={styles.container}>
         <View style={{alignSelf: 'center',width:wp('60%')}}>
            <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 24,color:'#C4C4C4' }}>FAQ's</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <Faqtoggle navigation={navigation} categoryTitile='Registration' categoryQuestions={[['How to donate food?', '11'], ['How karma points will be allocated?','12']]}></Faqtoggle>
          <Faqtoggle navigation={navigation} categoryTitile='Profile' categoryQuestions={[['How to donate food?', '11'], ['How karma points will be allocated?','12']]}></Faqtoggle>
          <Faqtoggle navigation={navigation} categoryTitile='Donation' categoryQuestions={[['How to donate food?', '11'], ['How karma points will be allocated?','12']]}></Faqtoggle>
          <Faqtoggle navigation={navigation} categoryTitile='Recieve' categoryQuestions={[['How to donate food?', '11'], ['How karma points will be allocated?','12']]}></Faqtoggle>
          <Faqtoggle navigation={navigation} categoryTitile='Dine' categoryQuestions={[['How to donate food?', '11'], ['How karma points will be allocated?','12']]}></Faqtoggle>
          <Faqtoggle navigation={navigation} categoryTitile='Upgrade' categoryQuestions={[['How to donate food?', '11'], ['How karma points will be allocated?','12']]}></Faqtoggle>
        </ScrollView>
      </View>
    );
};

export default FAQScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: hp('20%'),
  },
  scrollView: {
    width: wp('90%'),
    marginTop: hp('2'),
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    // elevation: 7, 

  },
});