import React, {useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity, Alert  } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');
require('firebase/storage');
import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';


const Upgradeprofile = ({navigation}) => {

    const [id, setId] = useState('');
    const [Usertype, setUsertype] = useState('');
    const [upgradeto, setupgradeto] = useState('NGO');
    const [Orgname, setOrgname] = useState('');
    const [Address, setAddress] = useState('');
    const [State, setState] = useState('');
    const [City, setCity] = useState('');
    const [Postalcode, setPostalcode] = useState('');
    const [imgstatus, setimgstatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = firebase.auth().currentUser;

    useEffect(() => {
        firebase.database()
        .ref("users/")
        .orderByChild("uid")
        .equalTo(user.uid)
        .on('value', snapshot => {
            if (snapshot.exists()) {
              
              snapshot.forEach((child) => {
                setId(child.key)
                child.val().usertype? setUsertype(child.val().usertype):setUsertype('')
              });
            } else {
              console.log('Went wrong');
            }
        })
    }, [])

    const upgrade = () => {

      if(upgradeto != '' && Orgname!='' && imgstatus && Address!='' && Address!='' && State!='' && City!='' && Postalcode!=''){
        firebase.database()
        .ref("users/"+id+"/upgrade")
        .update({
          upgradeto: upgradeto,
          orgname: Orgname,
          address: Address,
          state: State,
          status:'pending',
          city: City,
          postalcode: Postalcode,
        })

        firebase.database().ref('UpgradeRequests/')
        .push({
          id:id,
          status:'pending',
        })
        .then(() =>Alert.alert(
                  "Success!",
                  "Upgrade request sent successfuly. your profile will be upgraded automatically after verification",
                  [
                    { text: "OK", onPress: () => navigation.navigate('ProfileScreen') }
                  ]
                ));
      }
      else {
        Alert.alert(
          "Why hurry?",
          "Please provide all details before submit",
          [
            { text: "OK"}
          ]
        )
      }
      
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


  const pickImage = async () => {
    
    const uploadImage = async (uri, imageName) => {
      const response = await fetch(uri);
      const blob = await response.blob()
      return firebase
      .storage()
      .ref(user.uid+'/Upgradeproof/'+imageName)
      .put(blob)
      .then((snapshot) => {
        setimgstatus(true)
        setLoading(false)
      })
      .then(()=>{
        firebase.storage()
                          .ref(user.uid+'/Upgradeproof/'+'Upgradeproof')
                          .getDownloadURL()
                          .then((url) => {
                                  firebase.database()
                                  .ref("users/"+id+"/upgrade/")
                                  .update({
                                    imguri: url,
                                  })
      })})
     
    }
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 5],
      base64: true,
      quality: 1,
    });
    if(result.cancelled){
      setLoading(false)
    }
    if (!result.cancelled) {
              uploadImage(result.uri, 'Upgradeproof')
              .then(() => Alert.alert(
                "Success!",
                "uploaded successfuly",
                [
                  { text: "OK", onPress: () => setLoading(false) }
                  // { text: "OK", onPress: () => {
                  //         firebase.storage()
                  //         .ref(user.uid+'/Upgradeproof/'+result.uri)
                  //         .getDownloadURL()
                  //         .then((url) => {
                  //                 firebase.database()
                  //                 .ref("users/"+id+"/upgrade/")
                  //                 .update({
                  //                   imguri: url,
                  //                 })
                  //         }).catch(e=>{console.log(e)})
                  // } }
                ]
              ))
              .catch(error => Alert.alert(
                "Sorry!",
                "Something went wrong, Please try again.",
                [
                  { text: "OK", onPress: () => setLoading(false)  }
                ]
              ))
    }
  };
    
    return (
      <View>
         <Spinner
          visible={loading}
          textContent={'Uploading...'}
          textStyle={{color: '#FFF'}}
          animation= 'fade'
        />
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.usericon}>
                    <Image style={styles.logo} 
                        source={require('../assets/images/dummyphoto.png')}
                    />
                </View>
                <View style={styles.usertype}>
                {Usertype=='U'?
                    <Image style={styles.usertypelogo} 
                    source={require('../assets/images/u.png')}/>  
                    :
                    Usertype=='N'?
                        <Image style={styles.usertypelogo} 
                        source={require('../assets/images/n.png')}/>
                        :
                        <Image style={{width:wp('6%'), height:hp('3%'), alignSelf:'center', marginTop: hp('-1.5')}} 
                        source={require('../assets/images/h.png')}/>
                }
                </View>
                <View style={{alignItems: 'center', marginTop:hp('4')}}>
                        <View style={{...styles.input}}>
                            <Picker
                            selectedValue={upgradeto}
                            style={{ height: hp('5%'), width:wp('60%')}}
                            onValueChange={(itemValue, itemIndex) => setupgradeto(itemValue)}
                            >
                                <Picker.Item label="Upgrade to NGO" value="NGO" />
                                <Picker.Item label="Upgrade to Restaurant" value="Restaurant" />
                            </Picker>
                        </View>
                </View>
                <View style={{...styles.input}}>
                    <Icons name='business-outline' style={styles.icon}  color={'#5a5858'} size={hp('4%')} /> 
                    <TextInput
                        style={styles.inputContainer}
                        placeholder = {"Name of "+upgradeto}
                        value= {Orgname} 
                        onChangeText={e=>{setOrgname(e)}}
                    />
                </View>
                <View style={{...styles.input}}>
                    <Icons name='location-outline' style={styles.icon}  color={'#5a5858'} size={hp('4%')} /> 
                    <TextInput
                        style={styles.inputContainer}
                        placeholder = {"Address of "+upgradeto}
                        value= {Address} 
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

            </View>
            <View style={{alignItems:'center', marginTop:hp('-4')}}>
                <Text style={styles.labletext}>Upload Identity proof of working in {upgradeto}</Text>
                <TouchableOpacity onPress={pickImage}>
                          {loading?
                            (<View style={styles.imgbtn}>
                              <Icons name='cloud-upload-outline' style={{marginTop:hp('-0.5')}}  color={'#080808'} size={hp('4%')} /> 
                            </View>)
                            :
                            (imgstatus?
                              <View style={styles.imgbtn}>
                                  <Icons name='cloud-done-outline' style={{marginTop:hp('-0.5')}}  color={'#080808'} size={hp('4%')} /> 
                              </View>
                            :
                            <View style={styles.imgbtn}>
                                <Icons name='camera' style={{marginTop:hp('-0.5')}}  color={'#080808'} size={hp('4%')} /> 
                            </View>
                            )
                          }
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={upgrade}>
                    <Text style={styles.buttonText}>Upgrade Profile to {upgradeto}</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
      
      
    );
};

export default Upgradeprofile;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    marginTop: hp('14%'),
  },
  card: {
    backgroundColor: '#ffffff',
    height: hp('43%'),
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
    alignItems: 'center',
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
  inputContainer: {
    marginLeft:wp('3'),
    width: wp(60),
  },
  labletext: {
    color: 'black',
    fontFamily: 'Voces-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: hp('2.3'),
    marginTop:hp('0'),
    textAlign: 'center',
    position:'relative'
  },
  uplimg: {
      flex: 1,
      flexDirection: 'row'
  },
  imgbtn: {
    width: wp('14'),
    height: hp('7'),
    borderRadius: 30,
    padding: 9,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'black'
  },
  button: {
    borderRadius: wp('9%'),
    paddingTop: wp('2%'),
    paddingBottom:wp('2%'),
    backgroundColor: '#F44646',
    alignSelf:'center',
    width:wp('80%'),
    height: hp('5'),
    top:hp('8'),
    // marginBottom: hp('13%'),
  },
  buttonText: {
    color: '#FFFEFE',
    fontFamily: 'Voces-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: hp('3%'),
    textAlign: 'center',
    position:'relative'
  },
});