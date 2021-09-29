import React,  {useState} from 'react';
import { Text, View,StyleSheet, Image, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, SafeAreaView, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import SignIn from '../components/signin';

import firebase from '@firebase/app';
require('firebase/auth');


export default function Forgot_pass({navigation}){
    const [username, setUsername] = useState('')
    const [confirmation, setConfirmation] = useState(false)


    passwordReset = () => {
        if(username.includes('@')){ 
            // reset password using mail
            firebase.auth().sendPasswordResetEmail(username)
            .then(function (user) {
                setConfirmation(true)
            }).catch(function (e) {
                alert(e)
            })

        }else{
            // reset password for mobile phone

        }
       
    }

    let [fontsLoaded] = useFonts({
        'Voces-Regular': require('../assets/fonts/Voces-Regular.ttf'),
    });

    if (!fontsLoaded) {
      return <AppLoading />;
    } else{
        return(
            <KeyboardAvoidingView behaviour={'height'} enabled>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView>
                        <View style={styles.container}>
                            <View style={styles.rectangle1}>
                                <Image  style={styles.header}
                                source={require('../assets/images/muskaan.png')}
                                />
                            </View>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Registerd Email Id or Phone number"
                                    value={username}
                                    onChangeText = {e=>{setUsername(e)}}
                                />
                                <View style={styles.button}>
                                    <TouchableOpacity onPress={passwordReset} >
                                        <Text style={styles.buttonText}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                                {confirmation?
                                    <View>
                                        <Text style={{...styles.success}}>Password reset link is sent on your email</Text>
                                        <Text style={{...styles.success}}>Reset your password and login again</Text>
                                        {/* <TouchableOpacity onPress={()=>navigation.navigate('Login_Signup')}>
                                            <Text style={{...styles.text}}>Login Here</Text>
                                        </TouchableOpacity> */}
                                    </View>
                                
                                :null
                            }
                            </View>
                        </View>
                       
                        <Image style={{top:hp('84%'),height:hp('20%'),position:'absolute',justifyContent:'center',alignContent:'center',flexDirection:'row',width:wp('100%')}} resizeMode={'stretch'}  
                        source={require('../assets/images/login_footer.png')}
                        />
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFEFE',
    },
    rectangle1:{
        width: '100%',
        height:hp('20%'),
        backgroundColor: '#F44646',
    },
    header:{
        width:wp('50%'),
        height:hp('10%'),
        alignSelf:'center',
        top:hp('7%'),
    },
    inputContainer: {
        marginRight:wp(15),
        width: wp(40),
      },
    input:{
        flexDirection: 'row',
        width:wp('70%'),
        left:wp('15%'),
        top:hp('8%'),
        borderBottomWidth:wp('0.4%'),
        borderBottomColor:'#C4C4C4',
        fontFamily:'Voces-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize:hp('2%'),
        // lineHeight:hp('0.7%'),
    },
    text:{
        fontFamily: 'Voces-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        alignSelf:'center',
        paddingTop:'4%',
        fontSize: 20,
        lineHeight: 16,
        color: '#F44646',
    }, 
    success: {
        fontFamily: 'Voces-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        alignSelf:'center',
        paddingTop:'4%',
        fontSize: 14,
        lineHeight: 16,
        color: '#F44646',
    },
    
    polygon1:{
        position: 'absolute',
        width: wp('40%'),
        height: hp('20%'),
        right: wp('0%'),
        marginTop:wp('0%'),
        backgroundColor: '#E76262',
        borderLeftWidth: wp('40%'),
        // borderRightWidth: 0,
        borderBottomWidth: wp('40%'),
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#E76262',
        // transform: [{ rotate: "0deg" }],
    },
    polygon2:{
        position: 'absolute',
        width: wp('30%'),
        height:  hp('20%'),
        // marginTop:wp('0%'),
        // bottom:wp('0%'),
        backgroundColor: '#E76262',
        borderRightWidth: wp('80%'),
        // borderRightWidth: 0,
        borderBottomWidth: wp('35%'),
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'rgba(169, 53, 53, 0.75)', 
        // transform: [{ rotate: "0deg" }],
        

    },
    button: {
        borderRadius: wp('9%'),
        paddingTop: wp('2%'),
        paddingBottom:wp('2%'),
        backgroundColor: '#F44646',
        alignSelf:'center',
        width:wp('30%'),
        top:hp('12%'),
        marginBottom: hp('13%'),
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
    footer:{
        flexDirection:'row',
    },
   
})