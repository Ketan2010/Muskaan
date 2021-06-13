import React from 'react'
import { View, Text, Button } from 'react-native'

export default function Signup({ navigation }) {

    const PressHandler = () => {
        navigation.navigate('Login')
    }
    return (
        <View>
            <Text>Signup</Text>
<<<<<<< HEAD
            <Button
                title="Press Me"
                onPress={PressHandler}
            >
            Press Me
            </Button>
=======
            <Button onPress={PressHandler}>Login</Button>
>>>>>>> e81c6edc3cc16fce29685463cc5036f541631d87
        </View>
    )
}
