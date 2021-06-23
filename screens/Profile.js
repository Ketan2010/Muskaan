import React, {useState, useEffect} from 'react';
import { View, Text, Button, Modal,Pressable, StyleSheet, Image, TextInput, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/Ionicons';
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');

const ProfileScreen = ({navigation}) => {
  const [id, setId] = useState('');
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Gender, setGender] = useState('');
  const [Address, setAddress] = useState('');
  const [State, setState] = useState('');
  const [City, setCity] = useState('');
  const [Postalcode, setPostalcode] = useState('');
  const [Usertype, setUsertype] = useState('');
  const [Imageurifront, setImageurifront] = useState('');
  const [Imageuriback, setImageuriback] = useState('');
  const [prereq, setprereq] = useState(false);
  const user = firebase.auth().currentUser;
  const [modalVisiblef, setModalVisiblef] = useState(false);
  const [modalVisibleb, setModalVisibleb] = useState(false);

  useEffect(() => {
    firebase.database()
    .ref("users/")
    .orderByChild("uid")
    .equalTo(user.uid)
    .on('value', snapshot => {
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
            child.val().usertype? setUsertype(child.val().usertype):setUsertype('')
            child.val().upgrade.upgradeto!=''? setprereq(true):setprereq(false)
          });

        } else {
          console.log('Went wrong');

        }
    })
   
    
}, [])

    firebase.storage()
    .ref(user.uid+'/identity/Front-identity')
    .getDownloadURL()
    .then((url) => {
      //from url you can fetched the uploaded image easily
      setImageurifront(url)
    }).catch(e=>{})
    firebase.storage()
    .ref(user.uid+'/identity/Back-identity')
    .getDownloadURL()
    .then((url) => {
      //from url you can fetched the uploaded image easily
      setImageuriback(url)
    }).catch(e=>{})

  
  

  return (

      <View style={styles.container}>
        {/* front img modal  */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisiblef}
          onRequestClose={() => {
            setModalVisiblef(!modalVisiblef);
          }}
        >
          <View style={styles.modalcenteredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Front Page Identity</Text>
              {
                Imageurifront != ''?
                <Image style={styles.modalimg} 
                source={{uri: Imageurifront}}
                />
              :
                <Text style={styles.modalText}>Please upload proofs by editing your profile</Text>
              }
             
              <Pressable
                style={[styles.modalbutton, styles.modalbuttonClose, {alignItems:'center'}]}
                onPress={() => setModalVisiblef(!modalVisiblef)}
              >
                            <Icons name='close-circle-outline' color={'white'} size={hp('4%')} /> 
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* Back img modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleb}
          onRequestClose={() => {
            setModalVisibleb(!modalVisibleb);
          }}
        >
          <View style={styles.modalcenteredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Back Page Identity</Text>
              {
                Imageuriback != ''?
                <Image style={styles.modalimg} 
                source={{uri: Imageuriback}}
                />
              :
                <Text style={styles.modalText}>Please upload proofs by editing your profile</Text>
              }
             
              <Pressable
                style={[styles.modalbutton, styles.modalbuttonClose, {alignItems:'center'}]}
                onPress={() => setModalVisibleb(!modalVisibleb)}
              >
                            <Icons name='close-circle-outline' color={'white'} size={hp('4%')} /> 
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={styles.card}>
          <View style={{alignItems: 'center'}}>
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

          </View>
          <View style={{alignItems: 'center'}}>
              <View style={{...styles.input}}>
                    <Icons name='person-circle-outline' style={styles.icon}  color={'#5a5858'} size={hp('4%')} /> 
                    <TextInput
                        style={styles.inputContainer}
                        placeholder="Add your name"
                        value= {Name}
                        editable={false} 
                        onChangeText={e=>{setName(e)}}
                    />
 
              </View>
              <View style={{...styles.input}}>
                    <Icons name='mail-open-outline' style={styles.icon}  color={'#5a5858'} size={hp('4%')} /> 
                    <TextInput
                        style={styles.inputContainer}
                        placeholder="Add your mail ID"
                        value= {Email}
                        editable={false} 
                        onChangeText={e=>{setEmail(e)}}
                    />
              </View>
              <View style={{...styles.input}}>
                    <Icons name='call-outline' style={styles.icon}  color={'#5a5858'} size={hp('4%')} /> 
                    <TextInput
                        style={styles.inputContainer}
                        placeholder="Add your phone no."
                        value={Phone}
                        editable={false} 
                        onChangeText={e=>{setPhone(e)}}
                    />   
              </View>
              <View style={{...styles.input}}>
                    <Icons name='location-outline' style={styles.icon}  color={'#5a5858'} size={hp('4%')} /> 
                    <TextInput
                        style={styles.inputContainer}
                        placeholder="Add your address"
                        value={Address}
                        editable={false}
                        onChangeText={e=>{setAddress(e)}}
                    />
              </View>
              <View style={{...styles.inputflex}}>
                    <TextInput
                        style={styles.inputContainerflex}
                        placeholder="City"
                        value={City}
                        editable={false}
                        // onChangeText={e=>{setCity(e)}}
                    />
                    <TextInput
                        style={styles.inputContainerflex}
                        placeholder="State"
                        value={State}
                        editable={false}
                        // onChangeText={e=>{setState(e)}}
                    />
                     <TextInput
                        style={styles.inputContainerflex}
                        placeholder="Postalcode"
                        value={Postalcode}
                        editable={false}
                        // onChangeText={e=>{setPostalcode(e)}}
                    />
                     
              </View>
              
              <View style={{...styles.input}}>
                    <Icons name='male-female-outline' style={styles.icon}  color={'#5a5858'} size={hp('4%')} /> 
                    <TextInput
                        style={styles.inputContainer}
                        placeholder="Male/Female"
                        value={Gender}
                        editable={false}
                        onChangeText={e=>{setGender(e)}}
                    />
                
              </View>
            
              <Text >Identity Proof:</Text>
              <View>
                <View style={styles.docmumentcontainer}>
                    <TouchableOpacity onPress={() => setModalVisiblef(true)}>
                        {Imageurifront!=''?
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
                        }
                        
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setModalVisibleb(true)}>
                        {Imageuriback!=''?
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
                        }
                      </TouchableOpacity>
                </View>
              </View>
              <View style={styles.button}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Editprofile')}>
                            <Text style={styles.buttonText}>Edit Profile</Text>
                        </TouchableOpacity>
              </View>
              
              
            </View>
          </View>
          {Usertype=='U'?
          <View style={styles.flatbutton}>
              <TouchableOpacity onPress={()=>
                  prereq?
                  Alert.alert(
                    "Muskaan say's",
                    "You alreay sent Upgrade request. we are verifying your details.",
                    [
                      { text: "OK", onPress: () => navigation.navigate('ProfileScreen') }
                    ]
                  )
                  :
                  navigation.navigate('Upgradeprofile')

                  }>
                    <Text style={styles.flatbuttonText}>Upgrade to NGO / Restaurant</Text>
              </TouchableOpacity>
          </View>:null
          }
          
      </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    // justifyContent: 'center',
    marginTop: hp('14%'),
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
    width: wp(60),
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
    top:hp('-96'),
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
    top:hp('-6'),
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
  modalbutton: {
    borderRadius: 30,
    padding: 10,
    elevation: 2
  },
  modalbuttonOpen: {
    backgroundColor: "#F194FF",
  },
  modalbuttonClose: {
    backgroundColor: "#F44646",
    width: wp('15')
  },
  modaltextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalimg: {
    height: hp('35'),
    width: wp('65'),
    marginBottom: hp('2')
  }
  
});