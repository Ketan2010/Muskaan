import React, { Component, useState } from 'react';
import { View, Text,StyleSheet,TextInput,Button, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard, ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import HomeHeader from '../components/home_header';
import {Card} from 'react-native-shadow-cards';
import { Rating } from 'react-native-ratings';
import InputSpinner from "react-native-input-spinner";
import DatePicker from 'react-native-modern-datepicker';
import Overlay from 'react-native-modal-overlay';
import Modal from 'react-native-modal';

// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as ImagePicker from 'expo-image-picker';
import Icons from 'react-native-vector-icons/Ionicons';
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
  // console.log(props)
  
  const [start,setStart] =useState(false);
  const [end,setEnd]= useState(false);
  const startFunction = () =>  {setStart(prevState =>! prevState); console.log(start);}
  const endFunction =() => setEnd(prevState=>!prevState)
  const [starttime, setstartTime] = useState('');
  const [endtime, setendTime] = useState('');

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

  function ratingCompleted (rating) {
    console.log("Rating is: " + rating);
  }

  defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
    //   justifyContent: 'center',
      
    }
  };
  
  onNextStep = () => {
    console.log('called next step');
  };

  onFoodDetailComplete = () => {
    // alert('Food Details completed!');
    if (food!='' &&  starttime!='' && endtime!='' && cost!='' ){
      setError1(prevState=>!prevState)
    } 
    else{
    if (food==''){ alert('Please fill the Food item... ')}
    else if (starttime==''){ alert('Please select the pick up start timimg... ')}
    else if (endtime==''){ alert('Please select the pick up end timing... ')}
    else if (cost==''){ alert('Please mention the cost of food per plate... ')}
    }
  };

  onFoodQualityComplete =() => {
    // alert('Food Quality completed!');
    if (pickedImagePath!='' && rating!=''){
      setError2(prevState=>!prevState)
    }
    else{
      if (pickedImagePath==''){ alert('Please take and upload the image of food to generate karma points... ')}
      }
  }

  onPrevStep = () => {
    console.log('called previous step');
  };

  onSubmitSteps = () => {
    console.log('called on submit step.');
    // setClaim(prevState=>!prevState);
    if (food==''){ alert('Please fill the Food item... ')}
    else if (shelf==''){ alert('Please select the shelf life duration ... ')}
    else if (plates==''){ alert('Please select  the Food number of plates... ')}
    else if (starttime==''){ alert('Please select the pick up start timimg... ')}
    else if (endtime==''){ alert('Please select the pick up end timing... ')}
    
    console.log(claim);
    
  };

  

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    console.log('open camera');

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }


    return (
      // <KeyboardAwareScrollView style={{ flex: 1 }} extraHeight={120} enableOnAndroid>
      <View style={{ flex: 1 }} >
        <HomeHeader />
        <ProgressSteps labelFontSize={hp('1.4%')} topOffset={hp('1%')} marginBottom={hp('2%')} activeLabelColor={'#F44646'}  completedProgressBarColor={'#F44646'}  activeStepIconBorderColor={'#F44646'} completedStepIconColor={'#F44646'}>
            <ProgressStep errors={error1} ScrollView={true} nextBtnTextStyle={buttonTextStyle} label="Food Details" onNext={onFoodDetailComplete} onPrevious={onPrevStep} scrollViewProps={defaultScrollViewProps} >
              
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
                                          style={{fontSize:hp('1.5%'),left:wp('2%')}} 
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
                              <View style={{alignItems: 'center', flexDirection: 'row',marginTop:hp('1%')}}>
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
                              {/* <View style={{left:wp('30%'), width:wp('20%'),marginTop:hp('2%')}}>
                              <TouchableOpacity>
                                  <Button title='Next' color="#F44646" />
                              </TouchableOpacity>
                              </View> */}
                          </View>          
                      </Card>   
                  </View>
              </View>
             
          </ProgressStep>
          <ProgressStep errors={error2} nextBtnTextStyle={buttonTextStyle}  previousBtnTextStyle={buttonTextStyle1} nextBtnText="Donate Now" previousBtnText="Back" label="Food Quality" onNext={onFoodQualityComplete} onPrevious={onPrevStep} scrollViewProps={defaultScrollViewProps} >
           
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
          <ProgressStep onSubmit={onSubmitSteps} nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle1} finishBtnText="Claim Now" previousBtnText="Back" label="Confirm"  onPrevious={onPrevStep} scrollViewProps={defaultScrollViewProps} >
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
                            <View style={{alignItems: 'center', flexDirection: 'row',marginTop:hp('1%')}}>
                                <View style={{flex:2}}>
                                    <Text>Cost per plate: </Text>
                                </View>
                                <View style={{flex:2.5}}>
                                    <Text>Rs {cost} /-</Text>
                                </View>
                            </View>

                            <View style={{alignItems: 'center', flexDirection: 'row',marginTop:hp('1%')}}>
                                <View style={{flex:2}}>
                                    <Text>Address: </Text>
                                </View>
                                <View style={{flex:2.5}}>
                                    <Text>32, Naroji Nagar, near masjid , Mumbai 400032</Text>
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

                            <View style={{alignItems: 'center', flexDirection: 'row',marginTop:hp('1%')}}>
                                <View style={{flex:1}}>
                                    <Image source={require('../assets/images/karma.png')} style={{width:wp('15%'),height:hp('15%')}} resizeMode={'contain'} />
                                </View>
                                <View style={{flex:2.5}}>
                                    <Text style={{fontSize:hp('2.5%')}}>740 Karma points</Text>
                                    <Text style={{color:'green',fontSize:hp('2%'), fontWeight:'bold'}}>Earned</Text>
                                </View>
                            </View>
                            
                            
                            
                        </View>          
                  </Card>   
                </View>
            </View>
            { claim==true ? <Modal>
        <View >
          <Text>I am the modal content!</Text>
        </View>
      </Modal> :null}
          </ProgressStep>
          
        </ProgressSteps>
        
      </View>
      // </KeyboardAwareScrollView>
      
    );
  }


  const styles = StyleSheet.create({
    container: {
      marginTop:hp('2%'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    box1:{
      // marginTop:hp('20%'),
      width:wp('70%'),
      // padding:wp('2%')
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
      // flex: 1,
      // justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      width: 400,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    imageContainer: {
      // padding: 30
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
      // resizeMode: 'cover',
      left:wp('5%'),
      // borderColor:'red',
      borderWidth:2,
      borderRadius:180/2
    
    }
    
  });
// export default Donation;