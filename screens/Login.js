import React from 'react'
import { View, Text, Button } from 'react-native'

export default function login({ navigation }) {
    const PressHandler = () => {
        navigation.navigate('Signup')
    }
    return (
        <View>
            <Text>Login</Text>
            <Button
                title="Press"
                onPress={PressHandler}
            >
            Press
            </Button>        
        </View>
    )
}
