import React, { useState,  useEffect } from 'react';
import { StyleSheet, ScrollView, Image, Text, Fragment, View } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Card from '../components/Card_book'
import firebase from '@firebase/app'; 
require('firebase/auth');
require('firebase/database');

export default function HistoryReceive(){

    const user = firebase.auth().currentUser;
    

    // const [currentuserid, setcurrentuserid] = useState();
    const [userdonations, setuserdonations] = useState([]);
    


    useEffect(() => {
         getreceive();
       
    }, []);
   

    const getreceive = () => {

        // get current user id
        firebase.database()
        .ref("users/")
        .on('value',snapshot => {
            if (snapshot.exists()) {
                snapshot.forEach((child) => { 
                    if (child.val().uid == user.uid ){
                        // setcurrentuserid(child.key);
                        // get booking ids of current user
                        firebase.database()
                        .ref("booking/")
                        .on('value',snapshot =>{
                        if(snapshot.exists()){
                            var datareceive=[];
                            snapshot.forEach((child1) =>{
                                if (child1.val().receiverid==child.key)
                                {
                                    datareceive.push(child1.val().bid)
                                }}
                            )
                            // reverse it to get letest item first
                            setuserdonations(datareceive.reverse());
                            console.log('Receives array after stateset:', userdonations);
                        }
                        else{
                            console.log('There is no receive associated with this user');
                            console.log('Receives array:', userdonations);
                        }
                        })
                    }
                });
            } else {
              console.log('Went wrong');
            }
        })

    }

    
    

    return(
        <ScrollView style={styles.scrollView}>
            {userdonations.length!=0?
                     userdonations.map((val,key) => {
                        return (<Card bid={val}></Card>) 
                   } )
                   :
                   <View style={{alignItems:'center', marginTop:hp('20')}}>
                            <Image 
                                style={{height:hp('20'), width:wp('25'), borderRadius: 4}}
                                source={require('../assets/images/pin.png')}
                                />
                            <Text>Request you sent will appear here</Text>
                    </View>
            }
           
        </ScrollView>
    )

}


const styles = StyleSheet.create({
    container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: hp('15%'),
    
  },
  scrollView: {
    width: wp('90%'),
    marginTop: hp('2')

  },
})
