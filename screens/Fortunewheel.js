import React, {useState} from 'react'
import { View, Text, Button, StyleSheet} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Fortunewheel({navigation}){
   
    return(
        <View style={styles.container}>
            <Text>Heelo</Text>
        </View>
    )     
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFEFE',
    },
})