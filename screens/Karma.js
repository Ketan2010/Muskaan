import React, {useState, useEffect} from 'react'
import { View, Text, Button, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import Karmacard from '../components/Karmacard'
import Vouchercard from '../components/Vouchercard'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');

export default function Karma({navigation}){
    const [karma, setkarma] = useState('');

    const user = firebase.auth().currentUser;

    useEffect(() => {
        firebase.database()
        .ref("users/")
        .orderByChild("uid")
        .equalTo(user.uid)
        .on('value', snapshot => {
            if (snapshot.exists()) {
              snapshot.forEach((child) => {
                child.val().karma? setkarma(child.val().karma):setkarma('')
              });
            } else {
              console.log('Went wrong');
            }
        })
  }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={{marginTop:hp('20')}}>
                <Karmacard karma={karma}></Karmacard>
            </View>
            <View style={{alignSelf: 'center',width:wp('60%'), marginTop:hp('2')}}>
                    <Text style={{alignSelf:'center', paddingHorizontal:5, fontSize: 35,color:'#C4C4C4'}}>
                        <Text style={{fontWeight: "bold", color:'#F44646'}}>F</Text>
                        <Text style={{fontWeight: "bold", color:'#22f55a'}}>U</Text>
                        <Text style={{fontWeight: "bold", color:'#1d74f5'}}>N</Text>
                        <Text style={{fontWeight: "bold", color:'#96ad00'}}>  Z</Text>
                        <Text style={{fontWeight: "bold", color:'#f51d7b'}}>O</Text>
                        <Text style={{fontWeight: "bold", color:'#06c2b5'}}>N</Text>
                        <Text style={{fontWeight: "bold", color:'#f5830a'}}>E</Text>
                    </Text>
                    <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 20,color:'#C4C4C4' }}>Redeem yourselves!!</Text>
            </View>
            <ScrollView style={styles.scrollView}>
                <Vouchercard karma={karma} navigation = {navigation} reqkarma='500' type="Normal"></Vouchercard>
                <Vouchercard karma={karma} navigation = {navigation} reqkarma='100' type="Premium"></Vouchercard>
                <Vouchercard karma={karma} navigation = {navigation} reqkarma='50' type="Normal"></Vouchercard>
                <Vouchercard karma={karma} navigation = {navigation} reqkarma='400' type="Premium"></Vouchercard>
                <Vouchercard karma={karma} navigation = {navigation} reqkarma='300' type="Normal"></Vouchercard>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
    //   justifyContent: 'center'
    },
  });