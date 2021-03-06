import React from 'react';
import { Text, View,StyleSheet, Image, TextInput, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Google from 'expo-google-app-auth';
import firebase from '@firebase/app';
require('firebase/auth');
import * as Facebook from 'expo-facebook';
import ApiKeys from '../constants/ApiKeys';

if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.firebaseConfig)

}

isUserEqual = (googleUser, firebaseUser) =>{
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }
  
  
  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
        );
  
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(function(result){
          console.log('user signed in')
          
        })
        
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: '720824379704-ssvtbfmvsqgslvs4oh5jba17m19d7but.apps.googleusercontent.com',
      //   iosClientId: YOUR_CLIENT_ID_HERE,
        behavior: 'web',
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        onSignIn(result)
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }


  // facebook login
  async function loginWithFacebook() {
    const permissions = ['public_profile', 'email']; 
    await Facebook.initializeAsync(
      {
        autoLogAppEvents: true,
        appId: '1151103821981333',
      }
    )
    const {
      type,
      token,
    } = await Facebook.logInWithReadPermissionsAsync(
   
      {permissions}
      
    )
    if(type=='success'){
      if (!firebase.apps.length) {
        firebase.initializeApp(ApiKeys.firebaseConfig)
      
      }
      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error)
      })
    }
    else {
      console.log('error')
    }
  }


export default  function LoginWith ({navigation}) {
        return(
            <View>
                <View style={{flexDirection: 'row',marginTop:hp('15%'),alignSelf: 'center',width:wp('60%')}}>
                        <View style={{backgroundColor: '#C4C4C4', height: 2, flex: 1, alignSelf: 'center'}} />
                        <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 24,color:'#C4C4C4' }}>OR</Text>
                        <View style={{backgroundColor: '#C4C4C4', height: 2, flex: 1, alignSelf: 'center'}} />
                </View>
            
                <View style={{marginTop:hp('2%'),left:wp('27%')}}>
                    <TouchableOpacity onPress={signInWithGoogleAsync} style={styles.border}>
                          <Image style={styles.logo} resizeMode={'stretch'} 
                          source={require('../assets/images/google1.png')}
                          />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={loginWithFacebook} style={{marginLeft:wp('18%'),...styles.border}}>
                      <Image style={{...styles.logo,left:wp('-0.6%'),top:hp('-0.2%')}} resizeMode={'stretch'}
                      source={require('../assets/images/facebook.png')}
                    />
                    </TouchableOpacity>


                    <TouchableOpacity onPress={()=>navigation.navigate('Phoneauth')}  style={{marginLeft:wp('36%'),...styles.border}}>
                    <Image style={styles.logo} resizeMode={'stretch'}
                    source={require('../assets/images/phone.png')}
                    />
                    </TouchableOpacity>
                </View>
            </View>
        )
}


const styles=StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFEFE',
    },
    
    logo:{
        width:wp('6%'),
        height:hp('3%'),
        alignSelf:'center',
        
        },
    border:{
    position:'absolute',
    borderRadius: wp('5%'),
    borderColor:'#F44646',
    borderWidth:2,
    padding:wp('1.5%'),
    
    },
})

