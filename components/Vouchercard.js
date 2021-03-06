import React, {useState, useEffect}from 'react'
import { StyleSheet, Text, Modal,Pressable, View, Image, Alert , TouchableOpacity} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/Ionicons';
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');



const Vouchercard = (props) => {
    const user = firebase.auth().currentUser;
    
    const clickaction = () =>{
        //update available karma points here
        console.log('ll'+props.imageuri)
        console.log(props.coupon)
        if(props.reqkarma<=props.karma){
            var updated_karma = props.karma-props.reqkarma;
            // console.log('updated karma:', updated_karma);
            firebase.database()
            .ref("users/"+props.id)
            .update({karma:updated_karma});
           
            // props.navigation.navigate('Home', { screen: 'Spinthewheel' })
            props.navigation.navigate('Spinthewheel',{'id':props.coupon_id,'reward':props.reward})
        }
        else{
            Alert.alert("Ohh no!", "You do not have suffiecient karma points to spin the wheel, Try more donations!");
        }
    }
    return (
        <View>
            <View style={styles.card}>
                <View style={{flexDirection:'row'}}>
                    <View>
                                {/* {
                                    props.type=='Normal'?
                                        <Image 
                                        style={{height:hp('13'), width:wp('40'), borderRadius: 4}}
                                        source={require('../assets/images/voucher.png')}
                                        /> 
                                    :
                                        <Image 
                                        style={{height:hp('13'), width:wp('40'), borderRadius: 4}}
                                        source={require('../assets/images/voucher2.png')}
                                        /> 
                                } */}
                                <Image 
                                        style={{resizeMode:'contain', height:hp('13'), width:wp('40'), borderRadius: 4}}
                                        source={{uri:props.imageuri}}
                                        />                     
                    </View>
                    <View style={{marginLeft:wp('4'),width:wp('50')}}>
                        <Text style={styles.text}><Text style={{fontWeight: "bold", fontSize:20}}>   Spin Using</Text></Text>
                        <Text style={styles.text}><Text style={{fontWeight: "bold", fontSize:25, color:'#F44646'}}>      {props.reqkarma}</Text></Text>
                        <Text style={styles.text}><Text style={{fontWeight: "bold", fontSize:20}}>Karma points</Text></Text>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{marginLeft:wp('4'), marginTop:hp('2'), width:wp('50')}}>
                        <Text style={styles.text}><Text style={{fontWeight: "bold", fontSize:12, color:'#f08989'}}>Spin the wheel and get exciting vouchers</Text></Text>
                    </View>
                    <TouchableOpacity onPress={() => clickaction()}>
                    <View>
                        <Image 
                        style={{height:hp('6'), width:wp('12'), borderRadius: 4}}
                        source={require('../assets/images/Spinner.gif')}
                        />
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        
    )
}

export default Vouchercard

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        height: hp('23%'),
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
        fontFamily: 'Voces-Regular',
    },
})
