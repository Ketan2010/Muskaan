import {createStackNavigator} from "@react-navigation/stack"
import Login_Signup from '../screens/Login_Signup'
import Forgot_pass from "../screens/Forgot_pass"
import Phoneauth from '../screens/Phoneauth'
import React from 'react'


const Stack = createStackNavigator()

const AuthStack = () => {
    return(
      <Stack.Navigator headerMode='none' >
          <Stack.Screen name='Login_Signup' component={Login_Signup} options={{header:()=>null} , {animationEnabled: false}}/>
          <Stack.Screen name='Forgot_pass' component={Forgot_pass} options={{header:()=>null} , {animationEnabled: false}}/>
          <Stack.Screen name='Phoneauth' component={Phoneauth} options={{header:()=>null} , {animationEnabled: false}}/>
      </Stack.Navigator>
    )
  }
  
export default AuthStack;
