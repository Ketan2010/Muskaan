import React,  {useState, useRef} from 'react';
import { Text, Button,View,StyleSheet, Image, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, SafeAreaView, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import SignIn from '../components/signin';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import ApiKeys from '../constants/ApiKeys';
import firebase from '@firebase/app';
require('firebase/auth');

if(!firebase.apps.length){
    firebase.initializeApp(ApiKeys.firebaseConfig)
}

export default function Phoneauth(){
    // const [username, setUsername] = useState('')
    // const [confirmation, setConfirmation] = useState(false)
    const recaptchaVerifier = useRef(null);
    const [phoneNumber, setPhoneNumber] = useState();
    const [verificationId, setVerificationId] = useState();
    const [verificationCode, setVerificationCode] = useState();
    const [message, showMessage] = useState((!ApiKeys.firebaseConfig)
    ? { text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device."}
    : undefined);


    passwordReset = () => {
        if(username.includes('@')){ 
            // reset password using mail
            if(firebase.auth().sendPasswordResetEmail(username)){
                setConfirmation(true)
            }

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

                                <FirebaseRecaptchaVerifierModal
                                    ref={recaptchaVerifier}
                                    firebaseConfig={ApiKeys.firebaseConfig}
                                />
                                 <View style={{flexDirection: 'row', marginTop:hp('8%'),alignSelf: 'center',width:wp('60%')}}>
                                        <View style={{backgroundColor: '#C4C4C4', height: 2, flex: 1, alignSelf: 'center'}} />
                                        <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 24,color:'#C4C4C4' }}>Login using phone</Text>
                                        <View style={{backgroundColor: '#C4C4C4', height: 2, flex: 1, alignSelf: 'center'}} />
                                </View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter phone number"
                                    autoFocus
                                    autoCompleteType="tel"
                                    keyboardType="phone-pad"
                                    textContentType="telephoneNumber"
                                    onChangeText={(phoneNumber) => setPhoneNumber(`+91${phoneNumber}`)}
                                />
                                <View style={styles.button}>
                                    <TouchableOpacity 
                                        disabled={!phoneNumber} 
                                        onPress={async () => {
                                            try {
                                                const phoneProvider = new firebase.auth.PhoneAuthProvider();
                                                const verificationId = await phoneProvider.verifyPhoneNumber(
                                                phoneNumber,
                                                recaptchaVerifier.current
                                                );
                                                setVerificationId(verificationId);
                                                showMessage({
                                                text: "Verification code has been sent to your phone.",
                                                });
                                            } catch (err) {
                                                showMessage({ text: `Error: ${err.message}`, color: "red" });
                                            }
                                            }}
                                        >
                                        <Text style={styles.buttonText}>Send Verification Code</Text>
                                    </TouchableOpacity>
                                </View>
                                    
                                <TextInput
                                    style={styles.input}
                                    editable={!!verificationId}
                                    placeholder="Enter Verification code"
                                    onChangeText={setVerificationCode}
                                />
                                <View style={styles.button}>
                                    <TouchableOpacity disabled={!verificationId} 
                                    onPress={async () => {
                                        try {
                                            const credential = firebase.auth.PhoneAuthProvider.credential(
                                            verificationId,
                                            verificationCode
                                            );
                                            await firebase.auth().signInWithCredential(credential);
                                            showMessage({ text: "Phone authentication successful 👍" });
                                        } catch (err) {
                                            showMessage({ text: `Error: ${err.message}`, color: "red" });
                                        }
                                        }}
                                    >
                                        <Text style={styles.buttonText}>Confirm Verification Code</Text>
                                    </TouchableOpacity>
                                </View>
                               
                                {message ? (
                                    <TouchableOpacity
                                    style={ {marginTop:hp('10%'), borderRadius: wp('9%'), marginHorizontal: wp('10%'), backgroundColor: '#faa49b', justifyContent: "center" }}
                                    onPress={() => showMessage(undefined)}>
                                    <Text style={{color: message.color || "black", fontSize: 17, textAlign: "center", margin: 20, }}>
                                        {message.text}
                                    </Text>
                                    </TouchableOpacity>
                                ) : undefined}
                                    </View>
                            
                                <View>
                                
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
        lineHeight:hp('0.7%'),
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
    
    button: {
        borderRadius: wp('9%'),
        paddingTop: wp('2%'),
        paddingBottom:wp('2%'),
        backgroundColor: '#F44646',
        alignSelf:'center',
        width:wp('60%'),
        top:hp('10%'),
        marginBottom: hp('8%'),
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