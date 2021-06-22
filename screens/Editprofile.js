import React, {useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity, Alert  } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');
require('firebase/storage');
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

const Editprofile = ({navigation}) => {

  // states to set data
  const [id, setId] = useState('');
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Gender, setGender] = useState('');
  const [Address, setAddress] = useState('');
  const [State, setState] = useState('');
  const [City, setCity] = useState('');
  const [Postalcode, setPostalcode] = useState('');
  const [Imageurifront, setImageurifront] = useState('');
  const [Imageuriback, setImageuriback] = useState('');
  const [frontstatus, setfrontstatus] = useState(false);
  const [backstatus, setbackstatus] = useState(false);
  const [loadingf, setLoadingf] = useState(false);
  const [loadingb, setLoadingb] = useState(false);
  const user = firebase.auth().currentUser;

  // retrieve data from firebase only once when screen loaded
  useEffect(() => {
    firebase.database()
    .ref("users/")
    .orderByChild("uid")
    .equalTo(user.uid)
    .once('value')
    .then(snapshot => {
        if (snapshot.exists()) {
          
          snapshot.forEach((child) => {
            setId(child.key)

            child.val().name? setName(child.val().name):setName('')
            child.val().email? setEmail(child.val().email):setEmail('')
            child.val().phone? setPhone(child.val().phone):setPhone('')
            child.val().gender? setGender(child.val().gender):setGender('')
            child.val().address? setAddress(child.val().address):setAddress('')
            child.val().state? setState(child.val().state):setState('')
            child.val().city? setCity(child.val().city):setCity('')
            child.val().postalcode? setPostalcode(child.val().postalcode):setPostalcode('')
            
          });
  
        } else {
          console.log('Went wrong');
  
        }
    });
    firebase.storage()
    .ref(user.uid+'/identity/Front-identity')
    .getDownloadURL()
    .then((url) => {
      setImageurifront(url)
      setfrontstatus(true)
    })
    firebase.storage()
    .ref(user.uid+'/identity/Back-identity')
    .getDownloadURL()
    .then((url) => {
      setImageuriback(url)
      setbackstatus(true)
    })
}, [])

 

//  update data in firebase 
 const updateprofile = () => {
  firebase.database()
  .ref("users/"+id)
  .update({
    name: Name,
    email: Email,
    phone: Phone,
    gender: Gender,
    address: Address,
    state: State,
    city: City,
    postalcode: Postalcode,
  })
  .then(() =>Alert.alert(
            "Success!",
            "Profile updated successfuly",
            [
              { text: "OK", onPress: () => navigation.navigate('ProfileScreen') }
            ]
          ));
  }
    
  // image picker 
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  // front page
  const pickImagefront = async () => {
    
    const uploadImage = async (uri, imageName) => {
      const response = await fetch(uri);
      const blob = await response.blob()
      return firebase
      .storage()
      .ref(user.uid+'/identity/'+imageName)
      .put(blob)
      .then((snapshot) => {
        setfrontstatus(true)
      })
     
    }
    setLoadingf(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 5],
      base64: true,
      quality: 1,
    });

    if (!result.cancelled) {
              uploadImage(result.uri, 'Front-identity')
              .then(() => Alert.alert(
                "Success!",
                "Front page uploaded successfuly",
                [
                  { text: "OK", onPress: () => setLoadingf(false) }
                ]
              ))
              .catch(error => Alert.alert(
                "Sorry!",
                "Something went wrong, Please try again.",
                [
                  { text: "OK", onPress: () => setLoadingf(false)  }
                ]
              ))
    }
  };

  // back page
  const pickImageback = async () => {
    const uploadImage = async (uri, imageName) => {
      const response = await fetch(uri);
      const blob = await response.blob()
      return firebase
      .storage()
      .ref(user.uid+'/identity/'+imageName)
      .put(blob)
      .then((snapshot) => {
        setbackstatus(true)
      })
     
    }
    setLoadingb(true)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 5],
      base64: true,
      quality: 1,
    });

    if (!result.cancelled) {
              uploadImage(result.uri, 'Back-identity')
              .then(() => Alert.alert(
                "Success!",
                "Back page uploaded successfuly",
                [
                  { text: "OK", onPress: () => setLoadingb(false) }
                ]
              ))
              .catch(error => Alert.alert(
                "Sorry!",
                "Something went wrong, Please try again.",
                [
                  { text: "OK", onPress: () => setLoadingb(false)}
                ]
              ))
    }
  };

 




  return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={{alignItems: 'center'}}>
            
                <View style={{flexDirection: 'row',alignSelf: 'center',width:wp('60%')}}>
                        <View style={{backgroundColor: '#C4C4C4', height: 2, flex: 1, alignSelf: 'center'}} />
                        <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 24,color:'#C4C4C4' }}>Update your profile</Text>
                        <View style={{backgroundColor: '#C4C4C4', height: 2, flex: 1, alignSelf: 'center'}} />
                </View>

          </View>
          <View style={{alignItems: 'center'}}>
              <View style={{...styles.input}}>
                    <Icons name='person-circle-outline' style={styles.icon}  color={'#5a5858'} size={hp('4%')} /> 
                    <TextInput
                        style={styles.inputContainer}
                        placeholder="Add your name"
                        value= {Name} 
                        onChangeText={e=>{setName(e)}}
                    />
              </View>
              <View style={{...styles.input}}>
                    <Icons name='mail-open-outline' style={styles.icon}  color={'#5a5858'} size={hp('4%')} /> 
                    <TextInput
                        style={styles.inputContainer}
                        placeholder="Add your mail ID"
                        value= {Email} 
                        onChangeText={e=>{setEmail(e)}}
                    />
              </View>
              <View style={{...styles.input}}>
                    <Icons name='call-outline' style={styles.icon}  color={'#5a5858'} size={hp('4%')} /> 
                    <TextInput
                        style={styles.inputContainer}
                        placeholder="Add your phone no."
                        value={Phone} 
                        onChangeText={e=>{setPhone(e)}}
                    />      
              </View>
              <View style={{...styles.input}}>
                    <Icons name='home-outline' style={styles.icon}  color={'#5a5858'} size={hp('4%')} /> 
                    <TextInput
                        style={styles.inputContainer}
                        placeholder="Address line 1"
                        value={Address}
                        onChangeText={e=>{setAddress(e)}}
                    />
              </View>
              <View style={{...styles.inputflex}}>
                    <TextInput
                        style={styles.inputContainerflex}
                        placeholder="City"
                        value={City}
                        onChangeText={e=>{setCity(e)}}
                    />
                    <TextInput
                        style={styles.inputContainerflex}
                        placeholder="State"
                        value={State}
                        onChangeText={e=>{setState(e)}}
                    />
                     <TextInput
                        style={styles.inputContainerflex}
                        placeholder="Postalcode"
                        value={Postalcode}
                        onChangeText={e=>{setPostalcode(e)}}
                    />
                     
              </View>
              
              
              <View style={{...styles.input}}>
                    <Icons name='male-female-outline' style={styles.icon}  color={'#5a5858'} size={hp('4%')} /> 
                   
                    <Picker
                    selectedValue={Gender}
                    style={{ height: hp('4%'), width:wp('33%') }}
                    onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                    >
                        <Picker.Item  style={{fontSize:9}} label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                    </Picker>
              </View>
              
              <Text>Upload Identity Proof:</Text>
              <View>
                <View style={styles.docmumentcontainer}>
                      <TouchableOpacity onPress={pickImagefront}>
                        {loadingf?
                        (<View style={styles.doc}>
                          <Text style={{marginTop:hp('-4')}} >Uploading</Text>
                          <Text style={{marginTop:hp('0')}} >(Front)</Text>
                          <Icons name='file-tray-full-outline' color={'#5a5858'} size={hp('4%')} /> 
                        </View>)
                        :
                        (frontstatus?
                          <View style={styles.doc}>
                            <Text style={{marginTop:hp('-4')}} >Uploaded</Text>
                            <Text style={{marginTop:hp('0')}} >(Front)</Text>
                            <Icons name='cloud-done-outline' color={'#5a5858'} size={hp('4%')} /> 
                          </View>
                        :
                          <View style={styles.doc}>
                            <Text style={{marginTop:hp('-4')}} >Upload</Text>
                            <Text style={{marginTop:hp('0')}} >(Front)</Text>
                            <Icons name='cloud-upload-outline' color={'#5a5858'} size={hp('4%')} /> 
                          </View>
                        )
                        }
                        
                        
                      </TouchableOpacity>
                      <TouchableOpacity onPress={pickImageback}>
                        {loadingb?
                          (<View style={styles.doc}>
                            <Text style={{marginTop:hp('-4')}} >Uploading</Text>
                            <Text style={{marginTop:hp('0')}} >(Back)</Text>
                            <Icons name='file-tray-full-outline' color={'#5a5858'} size={hp('4%')} /> 
                          </View>)
                          :
                          (backstatus?
                            <View style={styles.doc}>
                              <Text style={{marginTop:hp('-4')}} >Uploaded</Text>
                              <Text style={{marginTop:hp('0')}} >(Back)</Text>
                              <Icons name='cloud-done-outline' color={'#5a5858'} size={hp('4%')} /> 
                            </View>
                          :
                            <View style={styles.doc}>
                              <Text style={{marginTop:hp('-4')}} >Upload</Text>
                              <Text style={{marginTop:hp('0')}} >(Back)</Text>
                              <Icons name='cloud-upload-outline' color={'#5a5858'} size={hp('4%')} /> 
                            </View>
                          )
                        }
                      </TouchableOpacity>
                </View>
              </View>
              <View style={styles.button}>
                        <TouchableOpacity onPress={updateprofile}>
                            <Text style={styles.buttonText}>Update Profile</Text>
                        </TouchableOpacity>
              </View>
              
              
          </View>
        </View>
      </View>
    );
};

export default Editprofile;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    // justifyContent: 'center',
    marginTop: hp('15%'),
  },
  card: {
    backgroundColor: '#ffffff',
    height: hp('73%'),
    width: wp('80%'),
    padding: hp('5%'),
    marginVertical: hp('8%'),
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
  usericon:{
    backgroundColor: '#ffffff',
    height: hp('10%'),
    width: wp('10%'),
    padding: hp('7%'),
    borderRadius: 100,
    marginTop: hp('-9'),
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderWidth: 2,
    borderColor: '#C4C4C4'
  },
  logo:{
    width:wp('15%'),
    height:hp('10%'),
    alignSelf:'center',
    marginTop: hp('-5')
    
  },
  usertypelogo: {
    width:wp('7%'),
    height:hp('4%'),
    alignSelf:'center',
    marginTop: hp('-2')

  },
  usertype: {
    backgroundColor: '#ffffff',
    height: hp('3%'),
    width: wp('3%'),
    padding: hp('2.5%'),
    borderRadius: 100,
    marginTop: hp('-5'),
    marginLeft: wp('15%'),
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderWidth: 1,
    borderColor: '#F44646'
  },
  input:{
    flexDirection: 'row',
    width:wp('70%'),
    // left:wp('3%'),
    top:hp('1%'),
    marginBottom: hp('2%'),
    borderBottomWidth:wp('0.4%'),
    borderBottomColor:'#C4C4C4',
    fontFamily:'Voces-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize:hp('2%'),
    lineHeight:hp('0.7%'),
  },
  inputContainer: {
    marginRight:wp(15),
    width: wp(40),
  },
  inputflex:{
    flexDirection: 'row',
    width:wp('70%'),
    // left:wp('3%'),
    top:hp('1%'),
    marginBottom: hp('2%'),
    borderBottomWidth:wp('0.4%'),
    borderBottomColor:'#C4C4C4',
    fontFamily:'Voces-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize:hp('2%'),
    lineHeight:hp('0.7%'),
  },
  inputContainerflex: {
    // marginRight:wp(15),
    width: wp(25),
  },
  icon: {
    height: 30,
    width: 30,
    // marginLeft:wp(1),
    marginRight:wp(3)
  },
  parameter:{
    alignItems: 'center', 
    flexDirection: 'row',
    padding:hp('1.5%'),
    marginTop:hp('-1'),
    left:wp('1%'),
    width:wp('70%')
  },
  button: {
    borderRadius: wp('9%'),
    paddingTop: wp('2%'),
    paddingBottom:wp('2%'),
    backgroundColor: '#F44646',
    alignSelf:'center',
    width:wp('30%'),
    top:hp('-95'),
    // marginBottom: hp('13%'),
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
  docmumentcontainer: {
    flex: 1,
    flexDirection: 'row',
  },
  doc: {
    backgroundColor: '#C4C4C4',
    height: hp('10%'),
    width: wp('37%'),
    padding: hp('5%'),
    marginVertical: hp('2%'),
    marginHorizontal: hp('1%'),
    borderRadius: 10,
    shadowColor: "#000",
    alignItems: 'center',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    // elevation: 7, 
    borderWidth: 2,
    borderColor: 'black'
  },
  flatbutton: {
    borderRadius: wp('2%'),
    paddingTop: wp('2%'),
    paddingBottom:wp('2%'),
    backgroundColor: '#F44646',
    alignSelf:'center',
    width:wp('80%'),
    top:hp('-5'),
    elevation: 7,
    // marginBottom: hp('13%'),
  },
  flatbuttonText: {
    color: '#FFFEFE',
    fontFamily: 'Voces-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: hp('3%'),
    textAlign: 'center',
    position:'relative'
  },
  
});