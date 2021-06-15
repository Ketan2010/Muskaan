import React, {useState} from 'react';
import { Text, View,StyleSheet, Image, TextInput, TouchableOpacity, Alert, TouchableHighlight, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LoginWith from './login_with';
import firebase from '@firebase/app';
require('firebase/auth');


export default  function SignUp () {
    const [invisible_pass, SetVisible_pass] = useState(true)
    const [invisible_conf_pass, SetVisible_conf_pass] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPass, setConfirmPassword] = useState('')

    const togglevisibility_pass = () => {
        invisible_pass == true ? SetVisible_pass(false) : SetVisible_pass(true)
    }
    const togglevisibility_conf_pass = () => {
        invisible_conf_pass == true ? SetVisible_conf_pass(false) : SetVisible_conf_pass(true)

    }
    const onSignupPress = () =>{
        if(password != ConfirmPass){
            Alert.alert('Password and confirm password are not matched!')
            return
        }
        firebase.auth().createUserWithEmailAndPassword(username, password)
        .then(()=>{
            
        }, (error)=>{
            Alert.alert(error.message)
        }
        )
    }
    return(
        <View>
                <TextInput
                    style={styles.input}
                    placeholder="Email Id or Phone number"
                    value={username}
                    onChangeText={e=>{setUsername(e)}}
                />
                <View style={{marginTop:wp('7%'),...styles.input}}>
                    <TextInput
                        style={styles.inputContainer}
                        placeholder="Password"
                        secureTextEntry={invisible_pass}
                        value={password}
                        onChangeText={e=>{setPassword(e)}}
                    />
                    <TouchableOpacity onPress={togglevisibility_pass}>
                        {invisible_pass == true?
                        <Image  style={styles.icon} source={require('../assets/images/eye.png')} /> :
                        <Image  style={styles.icon} source={require('../assets/images/eye_close.png')} />
                        }
                    </TouchableOpacity>
                </View>

                <View style={{marginTop:wp('7%'),...styles.input}}>
                    <TextInput
                        style={styles.inputContainer}
                        placeholder="Confirm Password"
                        secureTextEntry={invisible_conf_pass}
                        value={ConfirmPass}
                        onChangeText={e=>{setConfirmPassword(e)}}
                    />
                    <TouchableOpacity onPress={togglevisibility_conf_pass}>
                        {invisible_conf_pass == true?
                        <Image  style={styles.icon} source={require('../assets/images/eye.png')} /> :
                        <Image  style={styles.icon} source={require('../assets/images/eye_close.png')} />
                        }
                    </TouchableOpacity>
                </View>
                
           
                <View >   
                
                    <View style={styles.button}>
                        <TouchableOpacity onPress={onSignupPress} >
                            <Text style={styles.buttonText}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                <LoginWith></LoginWith>
                </View>
                <View style={{marginTop:hp('8%')}}>
                <Text style={{...styles.text}}>Already have an account?</Text>
                <Text style={{marginTop:hp('0%'),...styles.text,fontSize:26}}>Login</Text>
                </View>
        </View>
    )
}


const styles=StyleSheet.create({
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
    icon: {
        height: 30,
        width: 30,
        marginLeft:wp(5),
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
    // position:'relative'
  },
    
})
