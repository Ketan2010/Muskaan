import React, {useState} from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Authstack from './Authstack'
import Appstack from './Appstack'
import firebase from '@firebase/app';
require('firebase/auth');
import ApiKeys from '../constants/ApiKeys'
import loading from '../components/loading'

 
const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white'
    },
  };

const Routes = () =>{
  const [isAuthenticationready, setIsAuthenticationready] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const onAuthStateChanged = (user) =>{
    setIsAuthenticationready(true)
    setIsAuthenticated(!!user)
  }

    if(!firebase.apps.length){
        firebase.initializeApp(ApiKeys.firebaseConfig)
    }


    firebase.auth().onAuthStateChanged(onAuthStateChanged)

    if(!isAuthenticationready){
      <NavigationContainer theme={MyTheme}>
      <loading></loading>
      </NavigationContainer>
    }

    
      return( 
        <NavigationContainer theme={MyTheme}>
            {isAuthenticated?<Appstack/>:<Authstack/>}
        </NavigationContainer>
      )
    
    
}
export default Routes;