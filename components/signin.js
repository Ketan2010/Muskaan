import React from 'react';
import { Text, View,StyleSheet, Image, TextInput, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LoginWith from './login_with';


export default  function SignIn () {
    return(
        <View>
                <TextInput
                style={styles.input}
                placeholder="Email Id or Phone number"
                />
                <TextInput
                    style={{marginTop:wp('7%'),...styles.input}}
                    placeholder="Password"
                    secureTextEntry={true}
                />
           
                <View >   
                <TouchableOpacity >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </View>
                </TouchableOpacity>
                <LoginWith></LoginWith>
                </View>
                <View style={{marginTop:hp('8%')}}>
                <Text style={{...styles.text}}>Don't have an account ?</Text>
                <Text style={{marginTop:hp('0%'),...styles.text,fontSize:26}}>Create now</Text>
                </View>
        </View>
    )
}


const styles=StyleSheet.create({
    input:{
        width:wp('70%'),
        left:wp('15%'),
        top:hp('8%'),
        borderBottomWidth:wp('0.4%'),
        borderBottomColor:'#C4C4C4',
        fontFamily:'Voces-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize:hp('2%'),
        lineHeight:hp('0.7%'),
    },
    text:{
        fontFamily: 'Voces-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        alignSelf:'center',
        fontSize:hp('2%'),
        color: '#F44646',
    }, 
button: {
    borderRadius: wp('9%'),
    paddingTop: wp('2%'),
    paddingBottom:wp('2%'),
    backgroundColor: '#F44646',
    alignSelf:'center',
    width:wp('30%'),
    top:hp('12%'),
  },
  buttonText: {
    color: '#FFFEFE',
    fontFamily: 'Voces-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: hp('2%'),
    textAlign: 'center',
    position:'relative'
  },
    
})
