import React, {useState} from 'react'
import { View, Text, Button } from 'react-native'
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');

const Home = ({navigation}) => {
    const user = firebase.auth().currentUser;


    firebase.database()
        .ref("users/")
        .orderByChild("uid")
        .equalTo(user.uid)
        .once('value')
        .then(snapshot => {
            if (snapshot.exists()) {
                //user already exist no need to add in db

            } else {
                firebase.database().ref('users/').push({
                    uid: user.uid,
                    email: user.email,              
                })
            }
    });

    return (
            <View>
                <Text> Homepage {user.email}</Text>
            </View>
    )
}

export default Home
