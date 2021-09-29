import React, {useState} from 'react'
import { View, Text, Button,Modal,Pressable, StyleSheet, TouchableOpacity} from 'react-native'
import Icons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');

export default function Home({navigation}){
    const user = firebase.auth().currentUser;
    const [firstlogin, setfirstlogin] = useState(false);

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
                    karma:20,
                    city: '',
                    postalcode: '',   
                    upgrade : {
                        upgradeto: '',
                        orgname: '',
                        address: '',
                        state: '',
                        city: '',
                        postalcode: '',
                        reqestaccepted: false,
                    }    
                })
                setfirstlogin(true);
            }
    });

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={firstlogin}
                onRequestClose={() => {
                    setModalVisiblef(!firstlogin);
                }}
            >
                <View style={styles.modalcenteredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modaldetails}>
                                <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Please Update your profile</Text></Text>
                                <View style={[styles.button]}>
                                    <TouchableOpacity onPress={() => {setfirstlogin(!firstlogin); navigation.navigate('Profile', { screen: 'Editprofile' })}}>
                                        <Text style={styles.buttonText}>Update Now</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <Text> Hello {user.email}</Text>
            <View style={[styles.button, {marginBottom:hp('2%')}]}>
                <TouchableOpacity onPress={()=>{navigation.navigate('ReceiveScreen')}}>
                    <Text style={styles.buttonText}>Receive</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.button]}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Donation')}}>
                    <Text style={styles.buttonText}>Donate</Text>
                </TouchableOpacity>
            </View>
            {/* <Button style={styles.receive_button} title='Receive' onPress={()=>{navigation.navigate('ReceiveScreen')}}></Button> */}
            {/* <Button title='Donation' onPress={()=>{navigation.navigate('Donation')}}></Button> */}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
    modalcenteredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
    
      modalText: {
        textAlign: "center",
        fontFamily: 'Voces-Regular',
        fontSize: 15,
      },
      modaldetails: {
          marginTop: hp('0'),
          width: wp('70%')
      },
    button: {
        borderRadius: wp('9%'),
        paddingTop: wp('2%'),
        paddingBottom:wp('2%'),
        backgroundColor: '#F44646',
        alignSelf:'center',
        width:wp('30%'),
        top:hp('2%'),
    },
    
    buttonText: {
        color: '#FFFEFE',
        fontFamily: 'Voces-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: hp('2%'),
        textAlign: 'center',
        position:'relative'
    },
    receive_button: {
        marginBottom: hp('5%'),


    }
      
  
  });