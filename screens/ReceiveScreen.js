import React, {useState, useEffect, useRef} from 'react';
import { View, Text, Button, StyleSheet,Modal, Pressable,TouchableOpacity, Dimensions,Image,  StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MapView from 'react-native-maps';
import Icons from 'react-native-vector-icons/Ionicons';
import SearchableDropdown from 'react-native-searchable-dropdown';
// import * as Location from 'expo-location';

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
                                      <Image source={require('../assets/images/food.jpg')} style={{height: hp('25%'), width:wp('60%'), borderRadius:10 }} />
                                  </View>
                                  <View>
                                      <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Donar Name: </Text>{donar}</Text>
                                      <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Food Item: </Text>{fooditem}</Text>
                                      <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>No of plates: </Text>{plates} Plate(s)</Text>
                                      <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Pickup timing: </Text>{timefrom} to {timeto}</Text>
                                      <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Shelf life: </Text>{shelf} Hours</Text>
                                      <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Address: </Text>{address}</Text>
                                      <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Other details: </Text>{details}</Text>
                                  </View>
                                  <View style={{flex:1, alignItems:'center', marginTop:hp('4'), flexDirection:'row'}}>
                                      <TouchableOpacity style={[styles.book, {marginLeft:wp('3')}]}>
                                              <Text style={styles.buttonTextbook}>Book Now</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity style={[styles.book, {marginLeft:wp('3')}]}>
                                              <Text style={styles.buttonTextbook}>Make a call</Text>
                                      </TouchableOpacity>
                                  </View>
                            </View>
                      </View>
                </View>
          </Modal>   
          <View style={{marginTop:hp('18')}}>
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
                  items={items}
                  placeholder="Search by place"
                  resetValue={false}
                  underlineColorAndroid="transparent"
              />
          </View>
          <MapView  provider= 'google' showsMyLocationButton={true} showsUserLocation={true}  loadingEnabled={true} style={styles.map}
              initialRegion={{
                latitude: lat,
                longitude: long,
                latitudeDelta: 25.0000,
                longitudeDelta: 25.0000,
              }}
              ref={mapRef}               
            > 
                  <MapView.Marker
                      id= '1'
                      coordinate={{
                        latitude: lat,
                      longitude: long,
                      }}
                      title={"1 plate, Pizza"}
                      description={"Ram Patil"}
                      onPress = {()=>{
                        setfoodimg('../assets/images/food.jpg')
                        setdonar('Ram Patil')
                        setaddress('Mumbai')
                        setfooditem('Pizza')
                        setplates('1')
                        setshelf('3')
                        settimefrom('09:00 AM')
                        settimeto('11:00 AM')
                        setdetails('Please come on time')
                        setModalVisible(true)}}
                  >
                      <Image source={require('../assets/images/pin.png')} style={{height: 35, width:25 }} />
                  </MapView.Marker>
                  <MapView.Marker
                      id= '2'
                      coordinate={{
                        latitude: 20.9585367,
                      longitude: 78.6869317,
                      }}
                      
                      title={"2 plate, Pav Bhanji"}
                      description={"Micky Jain"}
                      onPress = {()=>{
                        setfoodimg('../assets/images/food.jpg')
                        setdonar('Micky Jain')
                        setaddress('Dhule')
                        setfooditem('Pav Bhanji')
                        setplates('2')
                        setshelf('3')
                        settimefrom('09:00 AM')
                        settimeto('11:00 AM')
                        setdetails('Please come on time')
                        setModalVisible(true)}}
                  >
                      <Image source={require('../assets/images/pin.png')} style={{height: 35, width:25 }} />
                  </MapView.Marker>
                  <MapView.Marker
                      id= '3'
                      coordinate={{
                        latitude: 23.9585367,
                        longitude: 73.6869317,
                      }}
                      title={"5 plate, Chapati Bhaji"}
                      description={"Darshana More"}
                      onPress = {()=>{
                        setfoodimg('../assets/images/food.jpg')
                        setdonar('Darshana More')
                        setaddress('Pune')
                        setfooditem('Chapati Bhanji')
                        setplates('5')
                        setshelf('3')
                        settimefrom('09:00 AM')
                        settimeto('11:00 AM')
                        setdetails('Please come on time')
                        setModalVisible(true)}}
                  >
                    <Image source={require('../assets/images/pin.png')} style={{height: 35, width:25 }} />
                  </MapView.Marker>
          </MapView>
          
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