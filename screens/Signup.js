import React from 'react'
import { View, Text, Button } from 'react-native'

export default function Signup({ navigation }) {

    const PressHandler = () => {
        navigation.navigate('Login')
    }
    return (
        <View>
            <Text>Signup</Text>
            <Button onPress={PressHandler}>Login</Button>
        </View>
    )
}
