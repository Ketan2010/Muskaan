import React, {useState} from 'react';
import { Text, View,StyleSheet, Image, TextInput, TouchableOpacity, Alert, TouchableHighlight, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LoginWith from './login_with';
import firebase from '@firebase/app';
require('firebase/auth');


export default  function SignIn ({navigation}) {
    const [invisible_pass, SetVisible_pass] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const togglevisibility_pass = () => {
        invisible_pass == true ? SetVisible_pass(false) : SetVisible_pass(true)
    }
    const onLoginPress = () =>{
        firebase.auth().signInWithEmailAndPassword(username, password)
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
                placeholder="Email Id"
                value = {username}
                onChangeText={e=>{setUsername(e)}}
                />
                <View style={{marginTop:wp('7%'),...styles.input}}>
                    <TextInput
                        style={styles.inputContainer}
                        placeholder="Password"
                        secureTextEntry={invisible_pass}
                        value = {password}
                        onChangeText={e=>{setPassword(e)}}
                    />
                    <TouchableOpacity onPress={togglevisibility_pass}>
                        {invisible_pass == true?
                        <Image  style={styles.icon} source={require('../assets/images/eye.png')} /> :
                        <Image  style={styles.icon} source={require('../assets/images/eye_close.png')} />
                        }
                    </TouchableOpacity>
                </View>
           
                <View>   
                    <View style={styles.button}>
                        <TouchableOpacity onPress={onLoginPress}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                        <TouchableOpacity onPress={()=>navigation.navigate('Forgot_pass')}>
                            <Text style={{...styles.text}}>Forgot Password?</Text>
                        </TouchableOpacity>
                    <View style={{marginTop:hp(-9)}}>
                        <LoginWith ></LoginWith>
                    </View>
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
    icon: {
        height: 30,
        width: 30,
        marginLeft:wp(5),
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
