import React, {useState, useEffect, useRef} from 'react';
import { View, Text, Button, StyleSheet,Modal, Pressable,TouchableOpacity, Dimensions,Image,Alert,  StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MapView from 'react-native-maps';
import Icons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SearchableDropdown from 'react-native-searchable-dropdown';
// import * as Location from 'expo-location';
import call from 'react-native-phone-call';
import firebase from '@firebase/app';
import { TextInput } from 'react-native';
require('firebase/auth');
require('firebase/database');
require('firebase/storage');
var itm =[] ;
const ReceiveScreen = ({navigation}) => {
    
    const mapRef = useRef(null)
    const [lat, setlat] = useState(20.9583367);
    const [long, setlong] = useState(74.6869917);
    const [modalVisible, setModalVisible] = useState(false);
    const [foodimg, setfoodimg] = useState('');
    const [fooditem, setfooditem] = useState('');
    const [plates, setplates] = useState('');
    const [shelf, setshelf] = useState('');
    const [timefrom, settimefrom] = useState('');
    const [timeto, settimeto] = useState('');
    const [details, setdetails] = useState('');
    const [donar, setdonar] = useState('');
    const [address, setaddress] = useState('');
    const [donarid,setdonarid]=useState('');
    const [donate,setDonate] =useState([]);
    const [book,setbook] = useState([]);
    const [donationkey,setdonationkey]=useState();
    const [donationid,setdonationid] = useState('');
    const[ukey,setukey]=useState('');
    const [bookedplate,setbookedplate]=useState(0);
    const user = firebase.auth().currentUser;
    let keys='';
    
    const [donaruser,setdonaruser] =useState([]);
    var store =[];
    var l =[];
    var temp = []
    var dataContainer = [];
    const [currentUserDonations,setcurrentUserDonations] =useState([]);
    useEffect(() => {
      // to get id of current user logged in
      firebase.database()
      .ref("users/")
      .orderByChild("uid")
      .equalTo(user.uid)
      .on('value', snapshot => {
          if (snapshot.exists()) {
            snapshot.forEach((child) => {
              keys=child.key;
              // console.log(child.key)
            }); 
          } else {
            console.log('Went wrong');
          }
      })      
    }, [])
    
    // console.log(user.uid);
    const [donations, setdonations] = useState([]);
    var dataContainer1 = [];
    var dkey=[]
    useEffect(() => {
        firebase.database()
        .ref("donations/")
        .on('value',snapshot => {

          let currentDate = new Date(); // get current date
          currentDate.setHours( currentDate.getHours(),currentDate.getMinutes(),0,0);

          console.log(currentDate)
            if (snapshot.exists()) {
                snapshot.forEach((child) => {
                  
                    let check=Date.parse(child.val().validtime)
                    if (child.val().donarid != keys &&  check>=currentDate.getTime()){
                        dataContainer1.push(child.val());
                        dkey.push(child.key)
                        setukey(keys);
                      
                    }
                });
            } else {
              console.log('Went wrong');
            }
        })
            setdonations(dataContainer1);
            setdonationkey(dkey);
    }, []);

    const markers = [
      [{latitude:20.9585367,longitude: 78.6869317}]
    ]

    const items = [
      { id: 1, name: '2 plate, Pav Bhaji, Mumbai, Maharashtra', lati:'20.9585367', long:'74.6869917' },
      { id: 2, name: '1 plate, Soya chilli, Mumbai, Maharashtra', lati:'23.9585367', long:'73.6869317' },
      { id: 3, name: '4 plate, Chapati Bhaji, Pune, maharshtra', lati:'20.9585367', long:'74.6869917' },
      { id: 4, name: '1 plate, Aloo Parathe, Nasik, Maharshtra', lati:'20.9585367', long:'74.6869917' },
      { id: 5, name: '2 plate, Pav Bhaji, Mumbai, Maharashtra', lati:'23.9585367', long:'73.6869317' },
      { id: 6, name: '1 plate, Soya chilli, Mumbai, Maharashtra', lati:'20.9585367', long:'74.6869917' },
      { id: 7, name: '4 plate, Chapati Bhaji, Pune, maharshtra', lati:'20.9585367', long:'74.6869917' },
      { id: 8, name: '1 plate, Aloo Parathe, Nasik, Maharshtra', lati:'20.9585367', long:'74.6869917' },
   
    ];

    const triggerCall = (donarid) => {
      firebase.database()
      .ref('users')
      // .equalTo(donarid)
      .on('value', snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach((child) => {
            if(child.key==donarid){
              var num= child.val().phone;
              var args = {
                number: child.val().phone,
                prompt: true,
              };
             if(isNaN(num))
             {
              Alert.alert(
                "Sorry for inconvience !",
                "We can't connect right now....",
                [
                  { text: "OK" }
                ]
              )
             }
             else{
              call(args).catch(console.error);
             }
              
              
            }
          }); 
        } else {
          console.log('Went wrong');
        }
    })  
      
      // Make a call
      
    };
    
    console.log(donationkey);
    const bookfood = (donarid,fooditem,plates,bookedplate) => {
      if( plates>=bookedplate && bookedplate!=0 ){
        var pushed_data= firebase.database()
        .ref("booking/")
        .push({
          donarid:donarid,
          receiverid:ukey,
          donationid:donationid,
          fooditem:fooditem,
          bookedplate:bookedplate,
          bookingstatus:'PENDING',
          bookingdate:Date().toLocaleString(),
          bid:0
        })
        firebase.database().ref('booking/'+pushed_data.key).update({
          bid:pushed_data.key
        })
        .then(() =>Alert.alert(
          "Success!",
          "Your order is successfuly",
          [
            { text: "OK", onPress: () => navigation.navigate('History') }
          ]
        ));
        console.log(pushed_data.key)

        
        
          
      }
      else {
        Alert.alert(
          "Sorry",
          "Please check the avilable plates and then book.....",
          [
            { text: "OK"}
          ]
        )
      }
      
      }
console.log('keyssss'+ukey);

    const items_search = donations
    let i = 0;
    let search=[];
    
    
for (;donations[i];) {
  let text = "";
  let it={};
  let lati="";
  let long="";
  console.log('llllll'+donations[i].key);
  text += donations[i].plates+","+ donations[i].fooditem+","+ donations[i].address;
  it["id"]=i;
  it["name"]=text;
  it["lati"]=donations[i].coords.latitude;
  it["long"]=donations[i].coords.longitude;
  console.log(text);
  // console.log(donations[i].fooditem);
  search.push(it)
  i++;
  
}
console.log(search);


    const focus = (lat, long) =>{
      mapRef.current.animateToRegion({
        latitude:Number(lat),
        longitude:Number(long),
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }, 2000)
    }
    

    return (
      <View> 
        
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalcenteredView}>
                      <View style={styles.modalView}>
                            <Pressable
                                style={[styles.modalbutton, styles.modalbuttonClose, {alignItems:'center'}]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Icons name='close-circle-outline' color={'white'} size={hp('4%')} /> 
                            </Pressable> 
                            <View style={styles.modaldetails}>
                                  <View style={{alignItems:'center', marginBottom:hp('3')}}>
                                      <Image source={{uri: foodimg}} style={{height: hp('25%'), width:wp('60%'), borderRadius:10 }} />
                                  </View>
                                  <View>
                                      <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Donar Name: </Text>{donar}</Text>
                                      <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Food Item: </Text>{fooditem}</Text>
                                      <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>No of plates: </Text>{plates} Plate(s)</Text>
                                      <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Pickup timing: </Text>{timefrom} to {timeto}</Text>
                                      <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Shelf life: </Text>{shelf} Hours</Text>
                                      <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Address: </Text>{address}</Text>
                                      <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Other details: </Text>{details}</Text>
                                      <View style={{flexDirection:'row'}}>
                                        <View style={{flex:4}}>
                                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>No of plates to be booked: </Text></Text>
                                        </View>
                                        <View style={{flex:3}}>
                                              <TextInput
                                                placeholder="No of plates"
                                                style={{top:hp('-0.5%'),left:wp('2%')}} 
                                                onChangeText={bookedplate => setbookedplate(bookedplate)}
                                                keyboardType="number-pad"
                                                defaultValue={bookedplate}
                                            />
                                            <View style={{borderBottomColor: '#F44646',paddingTop:hp('-0.5%'),borderBottomWidth:wp('0.3%'),}}  />
                                        </View>
                                      
                                      </View>
                                      
                                      
                                  
                                  </View>
                                  <View style={{flex:1, alignItems:'center', marginTop:hp('4'), flexDirection:'row'}}>
                                      <TouchableOpacity style={[styles.book, {marginLeft:wp('3')}]} onPress={()=>{bookfood(donarid,fooditem,plates,bookedplate,donationid)}}>
                                                <Text style={styles.buttonTextbook} >Book Now</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity style={[styles.book, {marginLeft:wp('3')}]} onPress={()=>{triggerCall(donarid)}}>
                                              <Text style={styles.buttonTextbook}>Call</Text>
                                      </TouchableOpacity>
                                  </View>
                            </View>
                      </View>
                </View>
          </Modal> 
          { donations.length!=0 ?
          <View style={{marginTop:hp('16%')}}>
          {/* <View ><Image  source={require('../assets/images/backarrow.png')} style={{width:30,height:30, borderRadius:50/2,backgroundColor:'white'}}/> */}
          {/* <Feather onPress={() => navigation.goBack()} name='arrow-left' size={hp('10%')} color='red'></Feather> */}
          {/* </View> */}
              <SearchableDropdown
                  onTextChange={(text) => console.log(text)}
                  onItemSelect={(item) =>focus(item.lati, item.long)}
                  containerStyle={{ padding: 5 }}
                  textInputStyle={{
                    padding: 8,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#ccc',
                  }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    borderColor: '#bbb',
                    borderRadius: 10,
                    borderWidth: 1,
                  }}
                  itemTextStyle={{
                    color: '#222',
                  }}
                  itemsContainerStyle={{
                    maxHeight: hp('90%'),
                  }}
                  items={search}
                  placeholder="Search by place"
                  resetValue={false}
                  underlineColorAndroid="transparent"
              />
              {/* {console.log(donations)} */}
          </View> :null}
          { donations.length!=0 ? 
          <MapView  provider= 'google' showsMyLocationButton={true} showsUserLocation={true}  loadingEnabled={true} style={styles.map}
              initialRegion={{
                latitude: lat,
                longitude: long,
                latitudeDelta: 25.0000,
                longitudeDelta: 25.0000,
              }}
              ref={mapRef}               
            > 
            { 
            donations.map((val,key)=> {
              return(
                  <MapView.Marker
                      id= {key}
                      coordinate={{
                        latitude: val.coords.latitude,
                      longitude: val.coords.longitude,
                      }}
                      title={val.fooditem}
                      description={val.donarname}
                      onPress = {()=>{
                        setfoodimg('../assets/images/food.jpg')
                        setdonar(val.donarname)
                        setaddress(val.address)
                        setfooditem(val.fooditem)
                        setplates(val.plates)
                        setshelf(val.shelf)
                        settimefrom(val.starttime)
                        settimeto(val.endtime)
                        setdetails(val.detail)
                        setfoodimg(val.imguri)
                        setdonationid(donationkey[key])
                        setdonarid(val.donarid)
                        setModalVisible(true)}}
                  >
                    {console.log(key)}
                      <Image source={require('../assets/images/pin.png')} style={{height: 35, width:25 }} />
                  </MapView.Marker>
                  
              )
              
            }
              
              )}
                  
          </MapView> :
          
          <View style={{alignItems:'center', marginTop:hp('40')}}>
                            <Image 
                                style={{height:hp('22'), width:wp('30')}}
                                source={require('../assets/images/pin.png')}
                                />
                            <Text style={{color:"#F44646",fontWeight:'bold',fontSize:hp('2'),alignContent:'center'}}>Sorry !</Text>
                            <Text style={{color:"#F44646",fontWeight:'bold',fontSize:hp('2')}}>Donations will appear here...</Text>
                    </View>
                    }

          
      </View>
    );
};

export default ReceiveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('30%')
  },
  map: {
    width: wp('100%'),
    height: hp('100%'),
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
book: {
  borderRadius: hp('2'),
  paddingTop: 10,
  paddingBottom:10,
  alignSelf:'center',
  width:wp('30'),
  height:hp('4'),
  borderWidth: 2,
  borderColor: '#F44646',
  marginLeft: wp('5')
},
buttonTextbook: {
  color: '#F44646',
  fontFamily: 'Voces-Regular',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: 15,
  textAlign: 'center',
  marginTop: hp('-1')
},
});