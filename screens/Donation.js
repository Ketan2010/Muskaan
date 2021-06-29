import React, { Component, useState, useRef, useEffect} from 'react';
import { View, Text,StyleSheet,TextInput,Button, Image, Alert, TouchableOpacity, KeyboardAvoidingView, Keyboard, ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import HomeHeader from '../components/home_header';
import {Card} from 'react-native-shadow-cards';
import { Rating } from 'react-native-ratings';
import InputSpinner from "react-native-input-spinner";
import DatePicker from 'react-native-modern-datepicker';
import Overlay from 'react-native-modal-overlay';
import Modal from 'react-native-modal';
import MapView from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import Icons from 'react-native-vector-icons/Ionicons';
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');

const buttonTextStyle ={
  color:'#F44646', 
  borderWidth:wp('0.4%'),
  paddingHorizontal:wp('4%'),
  // alignItems:'center',
  borderColor:'#F44646',
  borderRadius:wp('3%'),
  paddingVertical:hp('0.5%'),
  top:hp('1%'),
  left:wp('4%'),
  fontSize:hp('1.9%')
}
const buttonTextStyle1={
  color:'#F44646', 
  right:wp('4%'),
  borderWidth:wp('0.4%'),
  fontSize:hp('1.9%'),
  paddingHorizontal:wp('6%'),
  // alignItems:'center',
  borderColor:'#F44646',
  borderRadius:wp('3%'),
  paddingVertical:hp('0.5%'),
  top:hp('1%')
}




export default function Donation({props}) {
  const mapRef = useRef(null)
  const [start,setStart] =useState(false);
  const [end,setEnd]= useState(false);
  const startFunction = () =>  {setStart(prevState =>! prevState); console.log(start);}
  const endFunction =() => setEnd(prevState=>!prevState)
  const [starttime, setstartTime] = useState('');
  const [endtime, setendTime] = useState('');
  const [address, setaddress] = useState('');
  const [food, setFood] = useState('');
  const [shelf,setShelf]=useState('1');
  const [plates, setPlates] = useState('1');
  const [cost,setCost] = useState('0');
  const [detail,setDetail] =useState('');
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [rating,setRating] =useState();
  const [enableshift,setEnableshift]=useState(false);
  const [error1,setError1] = useState(true);
  const [error2,setError2] = useState(true);
  const [claim, setClaim] =useState(false);
  const [marker, setMarker] = useState(null)
  const [id, setId] = useState('');
  const [Name, setName] = useState('');
  const [Phone, setPhone] = useState('');
  const [Usertype, setUsertype] = useState('');
  const [loadingf, setLoadingf] = useState(false);
  const user = firebase.auth().currentUser;

  // get current logged in user id
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
            child.val().phone? setPhone(child.val().phone):setPhone('')
            child.val().usertype? setUsertype(child.val().usertype):setUsertype('')
          });
        } else {
          console.log('Went wrong');
        }
    })
}, [])


  // patch to avoid footer comming up event with keyboard
  const [buttonsVisible, setButtonsVisible] = useState(false)
      useEffect(() => {
          const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setButtonsVisible(true);
          })
          const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setButtonsVisible(false)
          })
          return () => {
            showSubscription.remove();
            hideSubscription.remove();
          }
  }, [])
  
  


  function ratingCompleted (rating) {
    console.log("Rating is: " + rating);
  }

  const defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,      
    }
  };


  const onFoodDetailComplete = () => {
    if (food!='' && shelf!='' && plates!='' && starttime!='' && endtime!='' && cost!='' && address!='' ){
      setError1(prevState=>!prevState)
    } 
    else{
    if (food==''){ alert('Please fill the Food item... ')}
    else if (starttime==''){ alert('Please select the pick up start timimg... ')}
    else if (endtime==''){ alert('Please select the pick up end timing... ')}
    else if (address==''){ alert('Please select the pick up address... ')}
    else if (cost==''){ alert('Please mention the cost of food per plate... ')}
    }
  };

  function getCurrentDate(){
    const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var date = new Date().getDate();
    var month =  monthNames[new Date().getMonth()]
    return date + ' ' + month;
  }

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  


  // when user click on donate button
  const onFoodQualityComplete =() => {
    if (pickedImagePath!=''){
      setError2(prevState=>!prevState)
    }
    else{
      if (pickedImagePath==''){ alert('Please take and upload the image of food to generate karma points... ')}
      }
  }

  // when user click on confirm and donate  button 
  const onSubmitSteps = () => {
    // function to upload image in firebase storage
    const uploadImage = async (uri, key) => {
      const response = await fetch(uri);
      const blob = await response.blob()
      return firebase
      .storage()
      .ref('FoodImgs/'+key+'/foodimg')
      .put(blob)
      .then((snapshot) => {
        setLoadingf(false)
      })
     
    }
    setLoadingf(true);
    if(cost=='0'){
      // food item fonated for free
      var pushed_data = firebase.database().ref('donations/').push({
        donarid: id,
        donarname: Name,  
        donarcontact: Phone,
        fooditem: food,
        shelf: shelf,
        plates:plates,
        starttime: starttime,
        endtime: endtime,
        address: address,
        detail: detail,
        coords: marker,
        donationstatus: 'Pending',
        donationdate: getCurrentDate(),
        donationtime:  formatAMPM(new Date()) 
      })
      firebase.database().ref('users/'+id+'/donationsmade').push({
        donationid: pushed_data.key
      })
      uploadImage(pickedImagePath, pushed_data.key)
      .then(() =>Alert.alert(
        "Thanks!",
        "Your donation has been added successfully. wait for requests",
        [
          { text:"View Requests", onPress: () => console.log('navigate to reuests page')  }
        ]
      ));

    }else{
          // function to upload image in firebase storage
    const uploadImage = async (uri, key) => {
      const response = await fetch(uri);
      const blob = await response.blob()
      return firebase
      .storage()
      .ref('FoodImgs/'+key+'/foodimg')
      .put(blob)
      .then((snapshot) => {
        setLoadingf(false)
      })
     
    }
    setLoadingf(true);
    if(cost=='0'){
      // food items with cost
      var pushed_data = firebase.database().ref('donations/').push({
        donarid: id,
        donarname: Name,  
        donarcontact: Phone,
        fooditem: food,
        shelf: shelf,
        plates:plates,
        starttime: starttime,
        endtime: endtime,
        address: address,
        detail: detail,
        coords: marker,
        cost : cost,
        donationstatus: 'Pending',
        donationdate: getCurrentDate(),
        donationtime:  formatAMPM(new Date()) 
      })
      firebase.database().ref('users/'+id+'/donationsmade').push({
        donationid: pushed_data.key
      })
      uploadImage(pickedImagePath, pushed_data.key)
      .then(() =>Alert.alert(
        "Thanks!",
        "Your donation has been added successfully. wait for requests",
        [
          { text:"View Requests", onPress: () => console.log('navigate to reuests page')  }
        ]
      ));

    }  
    
  };


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
  

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [5, 5],
      base64: true,
    });
    if(result.cancelled){
      console.log('cancelled')
    }
    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      // console.log(result.uri);
    }
  }


  // method to get coordinates and zoom into map
  const searchaddress = (coord) =>{
      fetch('https://us1.locationiq.com/v1/reverse.php?key=pk.d27567067f647aefc7289b09c8fae25f&lat='+(coord.latitude)+'&lon='+(coord.longitude)+'&format=json')
      .then((response) => response.json())
          .then((responseJson) => {
              // console.log(responseJson)
              setaddress(responseJson.display_name)
              setMarker(coord)
      })
      // .catch(
      //   Alert.alert(
      //     "Oops!",
      //     "We are not able to fetch your location you can type it manually",
      //     [
      //       { text: "OK"}
      //     ]
      //   )
      // )
     
    
    
  }

    return (
      <View style={{ flex: 1 }} >
         <Spinner
          visible={loadingf}
          textContent={'Processing...'}
          textStyle={{color: '#FFF'}}
          animation= 'fade'
        />
        <HomeHeader />
        <ProgressSteps labelFontSize={hp('1.4%')} topOffset={hp('1%')} marginBottom={hp('2%')} activeLabelColor={'#F44646'}  completedProgressBarColor={'#F44646'}  activeStepIconBorderColor={'#F44646'} completedStepIconColor={'#F44646'}>
            <ProgressStep  removeBtnRow={buttonsVisible} errors={error1} ScrollView={true} nextBtnTextStyle={buttonTextStyle} label="Food Details" onNext={onFoodDetailComplete} scrollViewProps={defaultScrollViewProps} >
              <View style={{ alignItems: 'center' }}>
                  <View style={styles.container}>
                      <Card elevation={20}  cornerRadius={wp('2%')} >
                          <View style={styles.card}>
                              <View style={{alignItems: 'center', flexDirection: 'row',marginTop:hp('2%')}}>
                                  <View style={{flex:1.5}}>
                                      <Text>Food Item :</Text>
                                  </View>
                                  <View style={{flex:2.5}}>
                                      <TextInput
                                          placeholder="Food item "
                                          style={{fontSize:hp('2.2%'),left:wp('2%')}} 
                                          onChangeText={food => setFood(food)}
                                          defaultValue={food}
                                      />
                                      <View style={{borderBottomColor: '#F44646',paddingTop:hp('0.5%'),borderBottomWidth:wp('0.3%'),}}  />   
                                  </View>
                              </View>
                              <View style={{alignItems: 'center', flexDirection: 'row',marginTop:hp('2%')}}>
                                  <View style={{flex:1.5}}>
                                      <Text>Shelf Life :</Text>
                                  </View>
                                  <View style={{flex:1.5}}>
                                  <InputSpinner
                                              showBorder={true}
                                              rounded={false}
                                              buttonFontSize={16}
                                              width={wp('22%')}
                                              height={hp('3%')}
                                              max={24}
                                              min={1}
                                              step={1}
                                              colorMax={"#F44646"}
                                              colorMin={'#F44646'}
                                              color={"#F44646"}
                                              onChange={shelf => setShelf(shelf)}
                                              
                                          />
                                          
                                  </View>
                                  <View style={{flex:1}}>
                                      <Text>hours</Text>
                                  </View>
                              </View>
                              <View style={{alignItems: 'center', flexDirection: 'row',marginTop:hp('2%')}}>
                                  <View style={{flex:1.5}}>
                                      <Text>No of plates :</Text>
                                  </View>
                                  <View style={{flex:2.5}}>
                                      <InputSpinner
                                          showBorder={true}
                                          rounded={false}
                                          buttonFontSize={16}
                                          width={wp('22%')}
                                          height={hp('3%')}
                                          max={10}
                                          min={1}
                                          step={1}
                                          colorMax={"#F44646"}
                                          colorMin={'#F44646'}
                                          color={"#F44646"}
                                          onChange={plates => setPlates(plates)}
                                      />
                                  </View>
                              </View>
                              <View style={{alignItems: 'center', flexDirection: 'row',marginTop:hp('2%'),}}>
                                  <View style={{flex:1.5}}>
                                      <Text>Pickup timings :</Text>
                                  </View>
                                  <View style={{flex:1.25}}>
                                    <View style={{ width:wp('25%')}}>
                                        <Text style={{width:'90%'}}><Button title="start time" onPress={ startFunction } color="#F44646"/></Text>
                                        <Text style={{left:wp('7%')}}>{starttime}</Text>
                                    </View>
                                  </View>
                                  <View style={{flex:1.25}}>
                                        <Text style={{left:wp('8%')}} ><Button title="end  time"  onPress={ endFunction } color="#F44646"/></Text>
                                        <Text style={{left:wp('13%')}}>{endtime}</Text>
                                  </View>
                                        { start===true ? 
                                        <Overlay visible={start} >
                                            <DatePicker
                                            options={{mainColor:'red'}}
                                            // style={{height:hp('40%'),width:300}}
                                            mode="time"
                                            minuteInterval={1}
                                            onTimeChange={selectedTime => (setstartTime(selectedTime),startFunction()) }
                                          />
                                        </Overlay>: null}
                                        { end===true ? 
                                          <Overlay visible={end} >
                                          <DatePicker
                                          options={{mainColor:'red'}}
                                          mode="time"
                                          minuteInterval={1}
                                          onTimeChange={selectedTime => (setendTime(selectedTime),endFunction()) }
                                        /></Overlay> : null}
                              </View>
                              {Usertype=='H'?
                              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                  <View style={{flex:1.5}}>
                                      <Text>Cost per plate :</Text>
                                  </View>
                                  <View style={{flex:2.5}}>
                                      <TextInput
                                          keyboardType={'number-pad'}
                                          style={{fontSize:hp('2%'),left:wp('2%')}} 
                                          onChangeText={cost => setCost(cost)}
                                          defaultValue={cost}
                                          // onFocus={()=>setEnableshift(true)}
                                      />
                                      <View style={{borderBottomColor: '#F44646',borderBottomWidth:wp('0.3%'),width:wp('10%')}}  />   
                                  </View>
                              </View>
                              :null}
                              
                              <View style={{alignItems: 'center',marginTop:hp('1%')}}>
                                  
                                  <View style={{marginLeft: wp('7%'), flexDirection:'row'}}>
                                      <TextInput
                                          style={{fontSize:hp('2%')}} 
                                          onChangeText={add => setaddress(add)}
                                          value = {address}
                                          placeholder = 'Pickup Address using below map'
                                          editable = {false}
                                          multiline={true}
                                      />
                                      {/* <TouchableOpacity  onPress={()=>{searchaddress(address)}}>
                                          <Icons name='search-circle-outline' color={'#F44646'} size={hp('4.5%')} style={{left:wp('5%')}}/>
                                      </TouchableOpacity> */}

                                  </View>
                                  <View style={{marginLeft:wp('8'), borderBottomColor: '#F44646',borderBottomWidth:wp('0.3%'),width:wp('75%')}}  />   

                              </View>
                              <View style={{marginTop:hp('1%'), marginLeft:wp('2')}}>
                                    <MapView  provider= 'google' showsMyLocationButton={true} showsUserLocation={true}  loadingEnabled={true} style={styles.map}
                                      initialRegion={{
                                        latitude: 23.9585367,
                                        longitude: 73.6869317,
                                        latitudeDelta: 25.0000,
                                        longitudeDelta: 25.0000,
                                      }}
                                      ref={mapRef} 
                                      onPress = {(e)=>{searchaddress(e.nativeEvent.coordinate)}}
                                     
                                    > 
                                        {marker==null?null:
                                          <MapView.Marker
                                            id= '1'
                                            coordinate={marker}
                                            title={address}
                                            description={""}
                                          >
                                          </MapView.Marker>}
                                    </MapView>
                              </View>
                              
                             
                          </View>          
                      </Card>   
                  </View>
              </View>
             
          </ProgressStep>
          <ProgressStep  removeBtnRow={buttonsVisible} errors={error2} nextBtnTextStyle={buttonTextStyle}  previousBtnTextStyle={buttonTextStyle1} nextBtnText="Next" previousBtnText="Back" label="Food Quality" onNext={onFoodQualityComplete} scrollViewProps={defaultScrollViewProps} >
           
              <View style={{ alignItems: 'center',top:hp('2%') }}>
                  <Card elevation={20}  cornerRadius={wp('2%')} >
                      <View style={styles.card}>
                            <Text style={{color:'#8c8c8c',top:hp('3%')}}>Upload Picture</Text>
                            <View style={styles.screen}>
                                <View style={styles.imageContainer}>
                                      {
                                        pickedImagePath !== '' ?  <Image
                                          source={{ uri: pickedImagePath }}
                                          style={styles.image}
                                          
                                        /> : <Image  style={{width:wp('45%'),height:hp('15%'),left:wp('5%'),borderColor:'#8c8c8c',borderWidth:2,}} source={require('../assets/images/greycamera.png')} />
                                      }
                                </View>
                                <View style={styles.buttonContainer}>
                                  {/* <Button  onPress={openCamera} title="Open camera" ></Button> */}
                                      <Icons name='camera' onPress={openCamera} color={'#F44646'} size={hp('4.5%')} style={{left:wp('5%')}}/>
                                </View>
                                
                                
                            </View>
                            
                            <View style={{alignItems: 'center', flexDirection: 'row',marginTop:hp('3%')}}>
                                  <View style={{flex:2}}>
                                      <Text>Food Analysed Quality :</Text>
                                  </View>
                                  <View style={{flex:2.5}}>
                                      <Rating imageSize={hp('3%')}
                                      showRating={false}
                                      onFinishRating={rating => setRating(rating)}
                                      style={{ paddingVertical: 10 }}
                                      />
                                      
                                  </View>
                            </View>
                            <View style={{top:hp('5%')}}>
                                <Text style={{color:'#8c8c8c'}}>Any other details</Text>
                                <TextInput
                                            onChangeText={detail => setDetail(detail)}
                                            onFocus={()=>setEnableshift(true)}
                                            style={{fontSize:hp('3%'),left:wp('2%')}} 
                                            multiline={true}
                                            style={{borderWidth:2,borderColor:'#8c8c8c',height:'40%',width:wp('80%'),top:hp('1%'),paddingHorizontal:wp('2%')}}
                                        />
                            </View>       
                      </View>          
                  </Card>  
            </View>
          </ProgressStep>
          <ProgressStep  removeBtnRow={buttonsVisible} onSubmit={onSubmitSteps} nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle1} finishBtnText="Confirm and donate" previousBtnText="Back" label="Confirm"  scrollViewProps={defaultScrollViewProps} >
            <View style={{ alignItems: 'center' }}>
                <View style={styles.container}>
                    <Card elevation={20}  cornerRadius={wp('2%')} >
                        <View style={styles.card}>

                            <View style={{alignItems: 'center', flexDirection: 'row',marginTop:hp('5%')}}>
                                <View style={{flex:2}}>
                                    <Text>Food item: </Text>
                                </View>
                                <View style={{flex:2.5}}>
                                    <Text>{food}</Text>
                                </View>
                            </View>

                            <View style={{alignItems: 'center', flexDirection: 'row',marginTop:hp('1%')}}>
                                <View style={{flex:2}}>
                                    <Text>No of plates: </Text>
                                </View>
                                <View style={{flex:2.5}}>
                                    <Text>{plates}</Text>
                                </View>
                            </View>

                            <View style={{alignItems: 'center', flexDirection: 'row',marginTop:hp('1%')}}>
                                <View style={{flex:2}}>
                                    <Text>Shelf Life: </Text>
                                </View>
                                <View style={{flex:2.5}}>
                                    <Text>{shelf}</Text>
                                </View>
                            </View>

                            <View style={{alignItems: 'center', flexDirection: 'row',marginTop:hp('1%')}}>
                                <View style={{flex:2}}>
                                    <Text>Pickup timing: </Text>
                                </View>
                                <View style={{flex:2.5}}>
                                    <Text>{starttime} - {endtime}</Text>
                                </View>
                            </View>
                            {Usertype=='H'?
                            <View style={{alignItems: 'center', flexDirection: 'row',marginTop:hp('1%')}}>
                            <View style={{flex:2}}>
                                <Text>Cost per plate: </Text>
                            </View>
                            <View style={{flex:2.5}}>
                                <Text>Rs {cost} /-</Text>
                            </View>
                            </View>

                            :null}
                            
                            <View style={{alignItems: 'center', flexDirection: 'row',marginTop:hp('1%')}}>
                                <View style={{flex:2}}>
                                    <Text>Address: </Text>
                                </View>
                                <View style={{flex:2.5}}>
                                    <Text>{address}</Text>
                                </View>
                            </View>

                            <View style={{alignItems: 'center', flexDirection: 'row',marginTop:hp('1%')}}>
                                <View style={{flex:2}}>
                                    <Text>Details </Text>
                                </View>
                                <View style={{flex:2.5}}>
                                    <Text>{detail}</Text>
                                </View>
                            </View>

                            <View style={{alignItems: 'center', flexDirection: 'row',marginTop:hp('1%')}}>
                                <View style={{flex:1.5}}>
                                    <Text>Photo: </Text>
                                </View>
                                <View style={{flex:2}} >
                                    <Image
                                      source={{ uri: pickedImagePath }}
                                      style={styles.imagecircle}
                                      onPress={() =>console.log(pickedImagePath)}
                                    />
                                </View>
                                <View style={{flex:1}}>
                                    <Rating imageSize={hp('2%')}
                                    showRating={false}
                                    startingValue={rating}
                                    readonly={true}
                                    style={{ paddingVertical: 10 }}
                                    />
                                </View>
                            </View>
                            
                            {Usertype?
                            <View style={{alignItems: 'center', flexDirection: 'row',marginTop:hp('1%')}}>
                                <View style={{flex:1}}>
                                    <Image source={require('../assets/images/karma.png')} style={{width:wp('15%'),height:hp('15%')}} resizeMode={'contain'} />
                                </View>
                                <View style={{flex:2.5}}>
                                    <Text style={{fontSize:hp('2.5%')}}>740 Karma points</Text>
                                    <Text style={{color:'green',fontSize:hp('2%'), fontWeight:'bold'}}>Possible earning</Text>
                                </View>
                            </View>
                            :null}
                            
                            
                            
                            
                        </View>          
                  </Card>   
                </View>
            </View>
            { claim==true ? 
              <Modal>
                  <View >
                    <Text>I am the modal content!</Text>
                  </View>
              </Modal> :null}
          </ProgressStep>
          
        </ProgressSteps>
        
      </View>
      
    );
  }


  const styles = StyleSheet.create({
    container: {
      marginTop:hp('2%'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    box1:{
      width:wp('70%'),
    } ,
    input:{
        flexDirection:'row',
    },
    card:{
        paddingHorizontal:wp('5%'),
        width:wp('80%'),
        height:hp('60%')
    },
    screen: {
      alignItems: 'center',
    },
    buttonContainer: {
      width: 400,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    imageContainer: {
      marginTop:hp('4%')
    },
    image: {
      width: wp('45%'),
      height: hp('15%'),
      resizeMode: 'cover',
      left:wp('5%'),
      borderColor:'red',
      borderWidth:2,
    },
    imagecircle:{
      width: wp('22%'),
      height: hp('10%'),
      left:wp('5%'),
      borderWidth:2,
      borderRadius:180/2
    
    },
    map: {
      width: wp('75%'),
      height: hp('22%'),
    },
    
  });
