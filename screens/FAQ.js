import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,ScrollView, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import Faqtoggle from '../components/Faqtoggle';

const FAQScreen = ({navigation}) => {

    return (
      <View style={styles.container}>
         <View style={{alignSelf: 'center',width:wp('60%'),marginTop:hp('0')}}>
            <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 24,color:'#C4C4C4' }}>FAQ's</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <Faqtoggle navigation={navigation} categoryTitile='Account and profile' categoryQuestions={[['How to delete an account ?', 'cat11'], ['How to change password ?','cat12'],['How to edit profile ?','cat13'], ['How to upgrade an account ?','cat14'],['How to change theme / mode ?','cat15']]}></Faqtoggle>
          <Faqtoggle navigation={navigation} categoryTitile='Download and Installation' categoryQuestions={[['Update MUSKAAN', 'cat21'], ['Supported Operating Systems ','cat22']]}></Faqtoggle>
          <Faqtoggle navigation={navigation} categoryTitile='MUSKAAN MINGLE (social media platform)' categoryQuestions={[['KARMA board ', 'cat31'], ['MUSKAAN badge (resemblance of verified user) ','cat32'],['Auto deleted posts/ stories', 'cat33'],['Report or block account ', 'cat34']]}></Faqtoggle>
          <Faqtoggle navigation={navigation} categoryTitile='General FAQ’s' categoryQuestions={[['How to calculate shelf life of food ?', 'cat41'], ['How to get high food quality rating ?','cat42'],['Why can’t you receive more than two plates of food at a time ?','cat43'],['Why you need to upload photo id proof ?','cat44']]}></Faqtoggle>
          <Faqtoggle navigation={navigation} categoryTitile='Contacts' categoryQuestions={[['For more queries ', 'cat51']]}></Faqtoggle>
          
          {/* <Faqtoggle navigation={navigation} categoryTitile='Dine' categoryQuestions={[['How to calculate shelf life of food ?', 'cat41'], ['How karma points will be allocated?','12']]}></Faqtoggle>
          <Faqtoggle navigation={navigation} categoryTitile='Upgrade' categoryQuestions={[['How to donate food?', '11'], ['How karma points will be allocated?','12']]}></Faqtoggle> */}
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