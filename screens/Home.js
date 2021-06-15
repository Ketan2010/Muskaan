import React from 'react'
import { View, Text, Button } from 'react-native'
import firebase from '@firebase/app';
require('firebase/auth');

export default function Home() {
    const user = firebase.auth().currentUser;

    const onSignoutPress = () =>{
        firebase.auth().signOut()
    }
    return (
        <View>
            <Text> Hello {user.email}</Text>
            <Button title='Logout'onPress={onSignoutPress} ></Button>
        </View>
    )
}
