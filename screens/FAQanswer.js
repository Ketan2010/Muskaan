import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,ScrollView, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import Faqtoggle from '../components/Faqtoggle';
import Icons from 'react-native-vector-icons/Ionicons';

const FAQanswer = (props) => {

    const answerfunction= () => {
      switch (props.route.params.answeid) {
        case '11':
          return (
            <View>
              <Text style={styles.answer}>Here is answer of question id 11</Text>
            </View>
            );
        case '12':
          return (
            <View>
              <Text style={styles.answer}>Here is answer of question id 12</Text>
            </View>
            );
        default:
          return (
            <View>
              <Text>Null</Text>
            </View>
            );
        }
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{props.navigation.navigate('FAQScreen')}}>
                    <Icons style={{marginLeft:wp('-4')}} name='arrow-back-circle-outline' color={'#F44646'} size={hp('4%')} />
        </TouchableOpacity>
        <ScrollView style={styles.scrollView}>
            <Text style={styles.question}> {props.route.params.question}</Text>
            <View style={styles.answerview}>
                  {answerfunction()}
            </View>
        </ScrollView>
      </View>
    );
};

export default FAQanswer;

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
  },
  question: {
    alignSelf:'center',
    paddingHorizontal:5,
    fontSize: 20,
    fontFamily: 'Voces-Regular',
    color:'#000000' 
  },
  answer: {
    fontSize: 15,
    fontFamily: 'Voces-Regular',
  },
  answerview: {
    backgroundColor: '#ffffff',
        height: hp('20%'),
        width: wp('85%'),
        padding: hp('2%'),
        marginVertical: hp('1%'),
        marginHorizontal: wp('3%'),
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,

  }
});