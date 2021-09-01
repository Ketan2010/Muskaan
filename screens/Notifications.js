import React, { useState, useEffect }  from 'react';
import { View, Text,Image, Button, SafeAreaView, ScrollView, StyleSheet, StatusBar } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Notifycard from '../components/Notifycard';
import firebase from '@firebase/app'; 
require('firebase/auth');
require('firebase/database');

const NotificationsScreen = ({navigation}) => {
    
  
    const [data,setdata] = useState(['empty'])
    const [loading,setloading] = useState(true)
    const [userid,setuserid] = useState(true)
    const [karma,setkarma] = useState(true)
  
    useEffect(() => {
      getData();
    }, [])


    const getData = () => {
      var user = firebase.auth().currentUser;
      firebase.database()
      .ref("users/")
      .orderByChild("uid")
      .equalTo(user.uid)
      .on('value', snapshot => {
          if (snapshot.exists()) {
            snapshot.forEach((child) => {
              setuserid(child.key)
              setkarma(child.val().karma)
              // to get notifications of current user logged in
              firebase.database()
              .ref("users/"+child.key+"/karmanotify/")
              .on('value', snap => {
                  if (snap.exists()) {
                      var dataContainer = []
                      snap.forEach((child1) => {
                            dataContainer.push(child1.key) 
                      });
                      setdata(dataContainer.reverse())
                      console.log('Notifications array:', data)                  
                      setloading(false)
                  } else {
                      console.log('There is no Notifications associated with this user');
                      console.log('Notifications array:', data)
                      setloading(false)
                  }
              })
            }); 
          } else {
            console.log('Went wrong');
            setloading(false);
          }
      }) 
    }
  
  
    return (
    <SafeAreaView style={styles.container}>
      <View style={{alignSelf: 'center',width:wp('60%')}}>
            <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 24,color:'#C4C4C4' }}>Notifications</Text>
      </View>
      <ScrollView style={styles.scrollView}>
          {data[0]!=['empty']?
            loading?
                <View style={{alignItems:'center'}}>
                  <Image 
                      style={{height:hp('40'), width:wp('55'), borderRadius: 4}}
                      source={require('../assets/images/load.gif')}
                      /> 
                </View>
            :
                  
            <View>
              {data.map((v)=>{
                  return(<Notifycard key={v} itemid={v} userid={userid} karma={karma} navigation={navigation}></Notifycard>)
              })}
            </View>
        
          :
          <View style={{alignItems:'center', marginTop:hp('20')}}>
                  <Image 
                      style={{height:hp('20'), width:wp('25'), borderRadius: 4}}
                      source={require('../assets/images/pin.png')}
                      />
                  <Text>Your Notifications will appear here</Text>
                  
          </View>
          }
                    
      </ScrollView>
    </SafeAreaView>
    );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: hp('20%'),
    
  },
  scrollView: {
    width: wp('90%'),
    marginTop: hp('2')

  },
});