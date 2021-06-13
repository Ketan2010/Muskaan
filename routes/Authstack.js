import {createStackNavigator} from "@react-navigation/stack"
import Login_Signup from '../screens/Login_Signup'
import React from 'react'


const Stack = createStackNavigator()

const AuthStack = () => {
    return(
      <Stack.Navigator   headerMode='none' >
          <Stack.Screen name='Login_Signup' component={Login_Signup} options={{header:()=>null} , {animationEnabled: false}}/>
      </Stack.Navigator>
    )
  }
  
export default AuthStack;
