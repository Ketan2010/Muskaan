import React, {useState} from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native'

import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');

export default function Home({navigation}){
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
                    usertype: 'U',
                    name: '',
                    phone: '',
                    gender:'',
                    address: '',
                    state: '',
                    city: '',
                    postalcode: '',       
                })
                navigation.navigate('Profile', { screen: 'Editprofile' })

            }
    });

    return (
        <View style={styles.container}>
            <Text> Hello {user.email}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
  });