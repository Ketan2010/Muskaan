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
        <View style={{flex:1,top:'50%'}}>
            <Text> Hello {user.email}</Text>
            
            {/* <Button title='Logout'onPress={onSignoutPress} ></Button> */}
            {/* <Button title='Wheel'  onPress={()=>navigation.navigate('Fortunewheel')}></Button> */}
        </View>
    )
}

export default Home
