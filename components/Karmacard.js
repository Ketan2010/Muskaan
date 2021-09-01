import React, {useState, useEffect}from 'react'
import { StyleSheet, Text, Modal,Pressable, View, Image, TouchableOpacity} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/Ionicons';
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');


const Imgcardshort = (props) => {
    return (
        <View>
            <View style={styles.card}>
                <View style={{flexDirection:'row'}}>
                    <View>
                                <Image 
                                style={{height:hp('10'), width:wp('20'), borderRadius: 4}}
                                source={require('../assets/images/karma.png')}
                                />                    
                    </View>
                    <View style={{marginLeft:wp('8'),width:wp('50')}}>
                        {props.karma==''?
                        <Text style={styles.text}><Text style={{fontWeight: "bold", fontSize:30}}>0</Text></Text>:
                        <Text style={styles.text}><Text style={{fontWeight: "bold", fontSize:30}}> {props.karma}</Text></Text>}
                        <Text style={styles.text}><Text style={{fontWeight: "bold", color:'#F44646'}}>Karma Points</Text></Text>
                    </View>
                </View>
            </View>
        </View>
        
    )
}

export default Imgcardshort

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        height: hp('13%'),
        width: wp('85%'),
        padding: hp('2%'),
        marginVertical: hp('1%'),
        marginHorizontal: wp('3%'),
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7, 
    },
    text: {
        fontSize: 25,
        // fontFamily: 'Voces-Regular',
    },
})
