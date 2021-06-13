import {createStackNavigator} from "@react-navigation/stack"
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import React from 'react'


const Stack = createStackNavigator()

const AuthStack = () => {
    return(
      <Stack.Navigator   headerMode='none' >
          <Stack.Screen name='Login' component={Login} options={{header:()=>null} , {animationEnabled: false}}/>
          <Stack.Screen name='Signup' component={Signup} options={{header:()=>null} , {animationEnabled: false}}/>
      </Stack.Navigator>
    )
  }
  
export default AuthStack;
