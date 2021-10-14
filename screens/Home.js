import React, {useEffect, useState} from 'react'
import { View, Text, Button,Modal,Pressable, StyleSheet, TouchableOpacity} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Container} from '../styles/FeedStyles'
import PostCard from '../components/PostCard';
import firebase from '@firebase/app';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
require('firebase/auth');
require('firebase/database');

const user = firebase.auth().currentUser;

export default function Home({navigation}){

    const user = firebase.auth().currentUser;
    const [firstlogin, setfirstlogin] = useState(false);
    const [Posts, setPosts] = useState([]);
    const [postkey, setpostkey] = useState([]);
    const [postowner, setpostowner] = useState([]);
    const [postowneruid, setpostowneruid] = useState([]);

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

    useEffect(() => {
        firebase.database()
        .ref('posts/')
        .on('value', snapshot => {
        let datareceive =[];
        let datakey=[];
        let owner=[];
        let ownerid=[];
        // let user = firebase.auth().currentUser;
        // let id=user.uid;
            if (snapshot.exists()) {
            snapshot.forEach((child) => {
                if ( child.key!=user.uid)
                {
                    console.log(child.key)
                    firebase.database()
                    .ref('posts/'+child.key)
                    .on('value', snapshot1 => { 
                        if (snapshot1.exists()){
                            var k = child.key;
                            snapshot1.forEach((child)=>{
                                datakey.push(child.key)
                                datareceive.push(child.val())
                                ownerid.push(k)
                            })
                        }
                    })
                 }
            }); 
            } else {
           
                console.log('Went wrong');
            }
            console.log(datakey)
            setPosts(datareceive.reverse());
            setpostkey(datakey.reverse());
            setpostowner(owner.reverse());
            setpostowneruid(ownerid.reverse());
        })
    }, [])

    return (
        <Container>
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
            <View style={{height:hp('65')}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* <FlatList
                    showsVerticalScrollIndicator={false}
                        data={Posts}
                        renderItem={({item})=><PostCard item={item}/>}
                        keyExtractor={(item)=>item.id}
                    /> */}
                    {Posts.length==0?null:
                    <View>
                            {Posts.map((val,key)=> {
                                return(<PostCard val={val} uids={user.uid} postkey={postkey[key]} postowner={postowner[key]} postownerid={postowneruid[key]}/>)
                            
                            })}
                    </View>
                    }
                </ScrollView>
            </View>
            
        </Container>
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