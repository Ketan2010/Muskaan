import React, { Component ,useEffect, useState} from 'react';
import { View, Text, Alert, Image, Modal, Pressable, Button , StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Card} from 'react-native-shadow-cards';
import {Picker} from '@react-native-picker/picker';
import { SearchBar } from 'react-native-elements';
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');
require('firebase/storage');

// import { SearchBar } from 'react-native-elements';
const SettingsScreen = ({navigation}) => {
  
  const [selectedValue, setSelectedValue] = useState("English");
  const [modalVisiblef, setModalVisiblef] = useState(false);
  const [modalVisibleh, setModalVisibleh] = useState(false);
  const [key, setkey] = useState();
  const [bookkey, setbookkey] = useState();

  const [isEnabledApp, setIsEnabledApp] = useState(false);
  const toggleSwitchApp = () => setIsEnabledApp(previousState => !previousState);

  const [isEnabledMail, setIsEnabledMail] = useState(false);
  const toggleSwitchMail = () => setIsEnabledMail(previousState => !previousState);

  const [isNotificationsEnabled, setIsNotificationsEnabled] =useState(false);
  const NotificationSwitch =() =>setIsNotificationsEnabled (previousState=> !previousState)

  const [isEnabledHelp, setEnabledHelp] = useState(false);
  const helpSwitch = () => setEnabledHelp(previousState=>!previousState)
  var user = firebase.auth().currentUser;
  
  useEffect(() => {
    // to get id of current user logged in
    firebase.database()
    .ref("users/")
    .orderByChild("uid")
    .equalTo(user.uid)
    .on('value', snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach((child) => {
            setkey(child.key);
          }); 
        } else {
          console.log('Went wrong while setting user key');
        }
    })      
  }, [])

  
  
  const showabout = () =>{
    setModalVisiblef(true)
  }
  const showhelp = () =>{
    setModalVisibleh(true)
  }

  const deleteuser = () =>{
      var user = firebase.auth().currentUser;
      // delete from authentication
      user.delete().then(function() { 
        // delete from users
        firebase.database().ref("users/").child(key).remove()
        // delete bookings
        firebase.database()
        .ref("booking/")
        .orderByChild("receiverid")
        .equalTo(key)
        .on('value', snapshot1 => {
            if (snapshot1.exists()) {
              snapshot1.forEach((child1) => {
                firebase.database().ref("booking/").child(child1.key).remove();
              }); 
            } else {
              console.log('Went wrong while deleting booking ids');
            }
        })
        
        // delete donations
        firebase.database()
        .ref("donations/")
        .orderByChild("donarid")
        .equalTo(key)
        .on('value', snapshot1 => {
            if (snapshot1.exists()) {
              snapshot1.forEach((child1) => {
                firebase.database().ref("donations/").child(child1.key).remove();
              }); 
            } else {
              console.log('Went wrong while deleting donation ids');
            }
        })

      }, function(error) {
        // An error happened.
        alert(error);
        console.log(error);
      });
  }

  const deleteaccount = () =>{
    Alert.alert(
      "Oh no!",
      `Do you really want to delete your account?`,
      [
      { text: "Yes", onPress: () => deleteuser() },
      { text: "No" }
      ]
  )
  }

 
    return (
      <View style={styles.container}>
            {/* About Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisiblef}
                onRequestClose={() => {
                    setModalVisiblef(!modalVisiblef);
                }}
            >
                <View style={styles.modalcenteredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={[styles.modalbutton, styles.modalbuttonClose, {alignItems:'center'}]}
                            onPress={() => setModalVisiblef(!modalVisiblef)}
                        >
                            <Icons name='close-circle-outline' color={'white'} size={hp('4%')} /> 
                        </Pressable>
                        <View style={styles.modaldetails}>
                            <View style={{alignItems:'center'}}>
                              <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>About</Text></Text>
                            </View>
                            <Text></Text>
                            <Text style={styles.modalText}>Muskaan-A lending Hand</Text>
                            <Text style={styles.modalText}>Muskaan is a mobile application to solve food waste issue. Using this application you can donate or recieve good quality leftover food and earn karma points</Text>
                            <Text></Text>
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Team Muskaan: </Text></Text>
                            <Text style={styles.modalText}>Zeel Mehta</Text>
                            <Text style={styles.modalText}>Darshan Gawade</Text>
                            <Text style={styles.modalText}>Ketan Patil</Text>
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Contact:</Text> muskaan@support.com</Text>
                        </View>
                    </View>
                </View>
          </Modal>

          {/* Help Modal */}
          <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleh}
                onRequestClose={() => {
                    setModalVisibleh(!modalVisibleh);
                }}
            >
                <View style={styles.modalcenteredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={[styles.modalbutton, styles.modalbuttonClose, {alignItems:'center'}]}
                            onPress={() => setModalVisibleh(!modalVisibleh)}
                        >
                            <Icons name='close-circle-outline' color={'white'} size={hp('4%')} /> 
                        </Pressable>
                        <View style={styles.modaldetails}>
                            <View style={{alignItems:'center'}}>
                              <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Help</Text></Text>
                            </View>
                            <Text></Text>
                            <Text style={styles.modalText}>For Help checkout FAQ page.</Text>
                            <Text></Text>
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>For more help, contact:</Text> muskaan@support.com</Text>
                        </View>
                    </View>
                </View>
          </Modal>







          <View style={styles.parameter}>
             <View style={{flex:1}}>
                <Icons name='globe-outline'  color={'#5a5858'} size={hp('4.5%')} />
                {/* <Image source={require('../assets/images/languageicon.png')} style={{width:wp('3%'),height:hp('5%')}}/> */}
              </View>
              <View style={{flex:3}}>
                <Text style={styles.text}>Languages</Text>
              </View>
              <View style={{flex:3,left:wp('7%')}}>
              <Picker
                
                selectedValue={selectedValue}
                style={{ height: hp('5%'), width:wp('33%') }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
                <Picker.Item  style={{fontSize:9}} label="English" value="English" />
                {/* <Picker.Item label="Hindi" value="Hindi" /> */}
              </Picker>
                  
                
              </View>
          </View>
          {/* <View style={styles.line} /> */}
          <TouchableOpacity onPress={ () => NotificationSwitch()}>
          <View style={styles.parameternotify}>
             <View style={{flex:1}}>
                <Icon name='bell-outline' color={'#5a5858'} size={hp('4.5%')} />
              </View>
              <View style={{flex:6}}>
              <Text style={styles.text}>Notifications</Text>
              </View>
          </View>
          </TouchableOpacity>
          <Text> { isNotificationsEnabled ? 
          <Card elevation={6}  cornerRadius={wp('2%')} style={{width:wp('80%')}}>
          <View style={{backgroundColor:'#d9d9d9'}}>
          <View style={styles.feature}>
             <View style={{flex:5,left:wp('2%')}}>
                <Text>App Notofications</Text>
              </View>
              <View style={{flex:2}}>
                <Switch
                  trackColor={{ false: "#767577", true: "#f5dd4b" }}
                  thumbColor={isEnabledApp ? "#F44646" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchApp}
                  value={isEnabledApp}
                />
              </View>
          </View>
          <View style={styles.feature}>
             <View style={{flex:5,left:wp('2%')}}>
                <Text>Mail and SMS Notifications</Text>
              </View>
              <View style={{flex:2}}>
                <Switch
                  trackColor={{ false: "#767577", true: "#f5dd4b" }}
                  thumbColor={isEnabledMail ? "#F44646" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchMail}
                  value={isEnabledMail}
                />
              </View>
          </View>
          </View>
          </Card> : ''}
          </Text>
          {/* <View style={styles.line} /> */}
          <View style={styles.parameter}>
             <View style={{flex:1}}>
                <Icon name='security' color={'#5a5858'} size={hp('4.5%')} />
              </View>
              <View style={{flex:2}}>
                <Text style={styles.text}>Security</Text>
              </View>
              <View style={{flex:4}}>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassScreen')}>
                  <Text style={{textAlign:'right'}}>Change password</Text>
                </TouchableOpacity>
              </View>
          </View>
          {/* <View style={styles.line} /> */}
          <TouchableOpacity onPress={() => showhelp()}>
          <View style={styles.parameternotify}>
             <View style={{flex:1}}>
                <Icons name='help-circle-outline' color={'#5a5858'} size={hp('4.5%')} />
              </View>
              <View style={{flex:3}}>
                <Text style={styles.text}>Help</Text>
              </View>
              <View style={{flex:3}}>
              </View>
          </View>
          </TouchableOpacity>
          <Text>{ isEnabledHelp ? 
          <View>
          <Text style={{left:wp('12%'),top:hp('1%'),fontSize:hp('2%')}}>Report a problem</Text>
          <Text style={{left:wp('12%'),top:hp('1%'),fontSize:hp('2%')}}>Help Center</Text> 
          </View> : null }
          </Text>
          {/* <View style={styles.line} /> */}
          <View style={styles.parameter}>
             <View style={{flex:1}}>
                <Icon name='theme-light-dark' color={'#5a5858'} size={hp('4.5%')} />
              </View>
              <View style={{flex:3}}>
                <Text style={styles.text}>Dark Mode</Text>
              </View>
              <View style={{flex:3}}>
              </View>
          </View>
          {/* <View style={styles.line} /> */}
          <View style={styles.parameter}>
             <View style={{flex:1}}>
                <Icons name='information-circle-outline' color={'#5a5858'} size={hp('4.5%')} />
              </View>
              <View style={{flex:3}}>
                <TouchableOpacity onPress={() => showabout()}>
                  <Text style={styles.text}>About</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:3}}>
              </View>
          </View>
          {/* <View style={styles.line} /> */}
          <View style={styles.parameter}>
             <View style={{flex:1}}>
                <Icon name='delete-outline' color={'#5a5858'} size={hp('4.5%')} />
              </View>
              <View style={{flex:6}}>
                <TouchableOpacity onPress={() => deleteaccount()}>
                  <Text style={styles.text}>Delete my account</Text>
                </TouchableOpacity>
              </View>
              
          </View>
          {/* <View style={styles.line} /> */}
      </View>
    );
  
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    top:hp('20%'),
    width:wp('100%'),
    // alignItems: 'center', 
    
  },
  parameter:{
    alignItems: 'center', 
    flexDirection: 'row',
    padding:hp('1.5%'),
    marginTop:hp('1.5%'),
    left:wp('5%'),
    width:wp('90%')
  },
  parameternotify:{
    alignItems: 'center', 
    flexDirection: 'row',
    padding:hp('1.5%'),
    marginBottom:hp('-2%'),
    marginTop:hp('1.5%'),
    left:wp('5%'),
    width:wp('90%')
  },
  feature:{
    alignItems: 'center', 
    flexDirection: 'row',
    // paddingTop:hp('0.5%')
  },
  text:{
    fontSize:hp('2%')
  },
  line:{
    borderBottomColor: '#b3b2b2',
    paddingTop:hp('0.5%'),
    borderBottomWidth:wp('0.3%'),
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
    marginTop: hp('30'),
    shadowRadius: 4,
    elevation: 5
  },
  modalbutton: {
    borderRadius: 30,
    padding: wp('1'),
    elevation: 2,
    marginTop: hp('-3')
  },
  modalbuttonOpen: {
    backgroundColor: "#F194FF",
  },
  modalbuttonClose: {
    backgroundColor: "#F44646",
    width: wp('10')
  },
  modaltextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    // textAlign: "center"
    fontFamily: 'Voces-Regular',
    fontSize: 15,
  },
  modaldetails: {
      marginTop: hp('3'),
      width: wp('70%')
  },
  buttonsmodal: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('3'),
    
},
});