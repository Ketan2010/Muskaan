import React, {useState, useEffect}from 'react'
import { StyleSheet, Text, Modal,Pressable, View, Image, TouchableOpacity} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/Ionicons';
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');
// color condition
// modal for requested
const Imgcard = (props) => {
    return (
        <View>
            <View style={styles.card}>
                <Text style={styles.datetime}>{props.date}, {props.time}</Text>
                <View style={{flexDirection:'row', marginTop:hp('2')}}>
                    <View>
                                <Image 
                                style={{height:hp('10'), width:wp('25'), borderRadius: 4}}
                                source={require('../assets/images/food.jpg')}
                                />                    
                    </View>
                    <View style={{marginLeft:wp('3'),width:wp('50')}}>
                        <Text style={styles.text}><Text style={{fontWeight: "bold"}}>Food Item</Text> : {props.item}</Text>
                        <Text style={styles.text}><Text style={{fontWeight: "bold"}}>No of plates</Text> : {props.quantity}</Text>
                        <Text style={styles.text}><Text style={{fontWeight: "bold"}}>Pickup Timing</Text> : {props.pickuptimefrom} to {props.pickuptimeto}</Text>
                        <Text style={styles.text}><Text style={{fontWeight: "bold"}}>Shelf Life</Text> : {props.shelflife}</Text>
                        <Text style={styles.text}><Text style={{fontWeight: "bold"}}>Address</Text> : {props.address}</Text>
                    </View>
                </View>
                {props.fromrequests?
                    // if component is calld from requests page no need to show buttons
                    null
                :
                    [
                        props.donationstatus=='PENDING'?
                            <View style={styles.buttons}>
                                    <TouchableOpacity disabled={true}>
                                        <View style={[styles.accept, { borderColor: '#53a0ed'}]}>
                                            <Text style={[styles.buttonTextaccept, {color: '#53a0ed'}]}>Pending Donation</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{props.navigation.navigate('Requests')}}>
                                        <View style={styles.accept}>
                                            <Text style={styles.buttonTextaccept}>View Requests</Text>
                                        </View>
                                    </TouchableOpacity>
                            </View>
                        :
                            <View style={styles.buttons}>
                                    <TouchableOpacity disabled={true}>
                                        <View style={[styles.accept, { borderColor: '#43AB33'}]}>
                                            <Text style={[styles.buttonTextaccept, {color: '#43AB33'}]}>Donated to {props.donatedto}</Text>
                                        </View>
                                    </TouchableOpacity>
                            </View>
                        
                    ]
                }
                
                
            </View>
        </View>
        
    )
}

export default Imgcard

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        height: hp('25%'),
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
    datetime : {
        fontSize: 12,
        fontStyle: 'italic',
    },
    text: {
        fontSize: 12,
        fontFamily: 'Voces-Regular',
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        marginTop: hp('1'),
        
    },
    accept: {
        borderRadius: hp('2'),
        paddingTop: 10,
        paddingBottom:10,
        alignSelf:'center',
        width:wp('35'),
        height:hp('4'),
        borderWidth: 2,
        borderColor: '#F44646',
        marginLeft: wp('3')
    },
    buttonTextaccept: {
        color: '#F44646',
        fontFamily: 'Voces-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15,
        textAlign: 'center',
        marginTop: hp('-1')
      },
})
