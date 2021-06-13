import React from 'react'
import { View, Text, Button } from 'react-native'

export default function login({ navigation }) {
    const PressHandler = () => {
        navigation.navigate('Signup')
    }
    return (
        <View>
            <Text>Login</Text>
<<<<<<< HEAD
            <Button
                title="Press"
                onPress={PressHandler}
            >
            Press
            </Button>        
=======
            <Button onPress={PressHandler}>Login</Button>
>>>>>>> e81c6edc3cc16fce29685463cc5036f541631d87
        </View>
    )
}
