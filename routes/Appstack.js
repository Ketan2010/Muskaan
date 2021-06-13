import {createStackNavigator} from "@react-navigation/stack"
import Home from '../screens/Home'
import React from 'react'


const Stack = createStackNavigator()
const AppStack = () => {
 
  return(
    <Stack.Navigator screenOptions={{
      headerShown: true,
    //   headerStyle: { backgroundColor: '#F44647', height: 150, borderBottomLeftRadius:20, borderBottomRightRadius:20 },
    }}>
        <Stack.Screen
            name='Home'
            component={Home} 
        />
    </Stack.Navigator>
  )

}

export default AppStack;