import React,  {useState} from 'react';
import SwitchSelector from 'react-native-switch-selector';
import { Text, View,StyleSheet, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, SafeAreaView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import SignIn from '../components/signin';
import SignUp from '../components/signup';


export default function Login_Signup({navigation}){
    const toogler=[
        {label:'Login',value:'login'},
        {label:'Sign up',value:'sign up'}
    ];
    const [authstate, setAuthstate] = useState('login')

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
                                <SwitchSelector
                                    style={styles.toogle}
                                    selectedColor={'#FFFEFE'}
                                    textColor={'#F44646'} 
                                    buttonColor={'#F44646'}
                                    options={toogler}
                                    initial={0}
                                    onPress={value => setAuthstate(value)}
                                />
                                <View>{authstate=='login' ? <SignIn navigation= {navigation}/> : <SignUp/>}</View>
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
    toogle:{
        marginTop:hp('4%'),
        alignSelf:'center',
        width:wp('70%'),
        borderWidth:wp('0.4%'),
        borderRadius:wp('6%'),
        padding:wp('0.2%'),
        borderColor:'#F44646',
        fontFamily: 'Voces-Regular',
        fontStyle: 'normal',
        fontSize:hp('6%'),
    },
    input:{
        width: '70%',
        height: 50,
        left: '15%',
        top: 288,
        borderBottomWidth:1,
        borderBottomColor:'#C4C4C4',
        fontFamily:'Voces-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 19,
        lineHeight: 26,
    },
    text:{
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
        borderRadius: 15,
        paddingTop: 10,
        paddingBottom:10,
        
        backgroundColor: '#F44646',
        position:'absolute',
        alignSelf:'center',
        width:180,
        height:42,
        top:429,
      },
      buttonText: {
        color: '#FFFEFE',
       
        fontFamily: 'Voces-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 19,
        textAlign: 'center',
      },
    footer:{
        flexDirection:'row',
    },
   
})