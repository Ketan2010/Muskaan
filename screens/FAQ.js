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
          <Faqtoggle question='What is muskaan?' answer='Muskann is food waste management application'></Faqtoggle>
          <Faqtoggle question='How can I upgrade my profile?' answer='Go to your profile, click on "UPGRADE TO NGO/RESTAURANT" button, fill your details along with proof and submit.'></Faqtoggle>
          <Faqtoggle question='What is muskaan?' answer='Muskann is food waste management application'></Faqtoggle>
          <Faqtoggle question='How can I upgrade my profile?' answer='Go to your profile, click on "UPGRADE TO NGO/RESTAURANT" button, fill your details along with proof and submit.'></Faqtoggle>
          <Faqtoggle question='What is muskaan?' answer='Muskann is food waste management application'></Faqtoggle>
          <Faqtoggle question='How can I upgrade my profile?' answer='Go to your profile, click on "UPGRADE TO NGO/RESTAURANT" button, fill your details along with proof and submit.'></Faqtoggle>
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