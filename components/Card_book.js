import React, {useState, useEffect}from 'react'
import { StyleSheet, Text, Modal,Pressable, View, TouchableOpacity, Alert} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/Ionicons';
import call from 'react-native-phone-call';
import firebase from '@firebase/app';
import { FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
require('firebase/auth');
require('firebase/database');


const Card = (props) => {
    const [modalVisiblet, setModalVisiblet] = useState(false);
    const [fooditem, setfooditem] = useState(false);
    const [plate, setplate] = useState(false);
    const [donar, setdonar] = useState(false);
    const [status, setstatus] = useState(false);
    const [time, settime] = useState(false);
    const [date, setdate] = useState(false);
    const [pickfrom, setpickfrom] = useState(false);
    const [pickto, setpickto] = useState(false);
    const [shelf, setshelf] = useState(false);
    const [address, setaddress] = useState(false);
    const [phone,setphone] = useState('');

    // const refresh=()=>{
    //     useEffect(() => {
    //         getbookinfo();
    //    }, []);
    // }

    useEffect(() => {
        getbookinfo();
   }, []);


  
   const gettime = (date_obj) =>{
        var date  = new Date(date_obj)
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        settime(strTime);
   }

   const getdate = (date_obj) => {
        const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var date = new Date(date_obj)
        var day = date.getDate()
        var month =  monthNames[date.getMonth()]
        setdate(day + ' ' + month)
   }

   const getbookinfo = () =>{
        firebase.database()
        .ref("booking/"+props.bid)
        .on('value',snapshot => {
            if (snapshot.exists()) {
                setfooditem(snapshot.val().fooditem)
                setplate(snapshot.val().bookedplate)
                setstatus(snapshot.val().bookingstatus)
                gettime(snapshot.val().bookingdate)
                getdate(snapshot.val().bookingdate)

                firebase.database()
                .ref("users/"+snapshot.val().donarid)
                .on('value',snapshot2 => {
                    setdonar(snapshot2.val().name)
                    setphone(snapshot2.val().phone)
                })

                firebase.database()
                .ref("donations/"+snapshot.val().donationid)
                .on('value',snapshot3 => {
                    setpickfrom(snapshot3.val().starttime)
                    setpickto(snapshot3.val().endtime)
                    setshelf(snapshot3.val().shelf)
                    setaddress(snapshot3.val().address)
                })



                
            } else {
            console.log('Went wrong');
            }
        })

   }


   const triggerCall = (phone_no) => {
        var num= phone_no;
        console.warn(num);
        var args = {
            number: phone_no,
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
        )}
        else{
            call(args).catch(console.error);
        }
    };

    const deletebooking = (id) =>{
        var del=''
        del=firebase.database().ref("booking/"+id).remove();
        if (del!='')
        {
            Alert.alert(
                "Success!",
                "Your order is successfuly deleted!",
                [
                  { text: "OK" }
                ]
              )
        }
        
    }
    
    const showmodalt = () =>{
        setModalVisiblet(true)
    }

    return (
        <View>
            {/* request to modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisiblet}
                onRequestClose={() => {
                    setModalVisiblet(!modalVisiblet);
                }}
            >
                <View style={styles.modalcenteredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={[styles.modalbutton, styles.modalbuttonClose, {alignItems:'center'}]}
                            onPress={() => setModalVisiblet(!modalVisiblet)}
                        >
                            <Icons name='close-circle-outline' color={'white'} size={hp('4%')} /> 
                        </Pressable>
                        <View style={styles.modaldetails}>
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Requested To</Text> : {donar} </Text>
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Requested For</Text> : {plate} plate, {fooditem}</Text>
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Pickup Timing</Text> : {pickfrom} to {pickto}</Text>
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Shelf Life</Text> : {shelf}</Text>
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Address</Text> : {address}</Text>
                            <View style={styles.buttonsmodal}>
                                {status=='PENDING'?
                                    <View style={[styles.statusbutton, {borderColor: '#53a0ed', marginLeft:wp('-1')}]}>
                                        <Text style={[styles.statusbuttonText, {color: '#53a0ed'}]}>Status: PENDING</Text>
                                    </View>
                                :
                                    status=='ACCEPTED'?
                                        <View style={[styles.statusbutton, {borderColor: '#43AB33', marginLeft:wp('-1')}]}>
                                            <Text style={[styles.statusbuttonText, {color: '#43AB33'}]}>Status: ACCEPTED</Text>
                                        </View>
                                    :
                                        <View style={[styles.statusbutton, {borderColor: '#F44646', marginLeft:wp('-1')}]}>
                                            <Text style={[styles.statusbuttonText, {color: '#F44646'}]}>Status: REFUSED</Text>
                                        </View>
                                }
                                {status!='REFUSED'?
                                <View style={[styles.call, {marginLeft:wp('3')}]}>
                                    <TouchableOpacity onPress={()=>{triggerCall(phone)}}>
                                        <Text style={styles.buttonTextcall} >Make a call</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                null}
                                
                            </View>
                            {status=='PENDING'?
                            <View style={[styles.refuse, {marginTop:hp('3'), width:wp('35')}]}>
                                <TouchableOpacity onPress={()=>{deletebooking(props.bid)}}>
                                    <Text style={styles.buttonTextrefuse}>Cancel Request</Text>
                                </TouchableOpacity>
                            </View>:null
                            }
                            
                        </View>
                    </View>
                </View>
            </Modal>
         <TouchableOpacity onPress={showmodalt} style={styles.card}>
                <Text style={styles.datetime}>{date}, {time}</Text>
                <Text style={styles.username}>Your request for {plate} plate, {fooditem} has been sent to {donar}</Text>
                <View style={styles.buttons}>
                        {status=='PENDING'?
                            <View style={[styles.statusbutton, {borderColor: '#53a0ed'}]}>
                                <Text style={[styles.statusbuttonText, {color: '#53a0ed'}]}>Status: PENDING</Text>
                            </View>
                        :
                            status=='ACCEPTED'?
                                <View style={[styles.statusbutton, {borderColor: '#43AB33'}]}>
                                    <Text style={[styles.statusbuttonText, {color: '#43AB33'}]}>Status: ACCEPTED</Text>
                                </View>
                            :
                                <View style={[styles.statusbutton, {borderColor: '#F44646'}]}>
                                    <Text style={[styles.statusbuttonText, {color: '#F44646'}]}>Status: REFUSED</Text>
                                </View>
                        }
                        {status=='PENDING'?
                            <View style={[styles.refuse, {width:wp('35'),  marginLeft:wp('1')}]}>
                                <TouchableOpacity onPress={()=>{deletebooking(props.bid)}}>
                                    <Text style={styles.buttonTextrefuse}>Cancel Request</Text>
                                </TouchableOpacity>
                            </View>:null
                        }
                        
                </View>
            </TouchableOpacity>
        
        </View>
        
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        height: hp('16%'),
        width: wp('85%'),
        padding: hp('2%'),
        marginVertical: hp('1%'),
        marginHorizontal: wp('3%'),
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
    datetime : {
        fontSize: 12,
        fontStyle: 'italic',
    },
    username: {
        fontSize: 15,
        fontFamily: 'Voces-Regular',
        marginTop: hp('1')
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        marginTop: hp('1'),
        
    },
    refuse: {
        borderRadius: hp('2'),
        paddingTop: 10,
        paddingBottom:10,
        alignSelf:'center',
        width:wp('20'),
        height:hp('4'),
        borderWidth: 2,
        borderColor: '#F44646',
        marginLeft: wp('5')
    },
    buttonTextrefuse: {
        color: '#F44646',
        fontFamily: 'Voces-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15,
        textAlign: 'center',
        marginTop: hp('-1')
      },
    accept: {
        borderRadius: hp('2'),
        paddingTop: 10,
        paddingBottom:10,
        alignSelf:'center',
        width:wp('20'),
        height:hp('4'),
        borderWidth: 2,
        borderColor: '#43AB33',
        marginLeft: wp('5')
    },
    buttonTextaccept: {
        color: '#43AB33',
        fontFamily: 'Voces-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15,
        textAlign: 'center',
        marginTop: hp('-1')
      },
    call: {
        borderRadius: hp('2'),
        paddingTop: 10,
        paddingBottom:10,
        alignSelf:'center',
        width:wp('30'),
        height:hp('4'),
        borderWidth: 2,
        borderColor: '#53a0ed',
        marginLeft: wp('5')
    },
    buttonTextcall: {
        color: '#53a0ed',
        fontFamily: 'Voces-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15,
        textAlign: 'center',
        marginTop: hp('-1')
      },
    statusbutton: {
        borderRadius: hp('2'),
        paddingTop: 10,
        paddingBottom:10,
        alignSelf:'center',
        width:wp('35'),
        height:hp('4'),
        borderWidth: 2,
        // borderColor: '#43AB33',
        marginLeft: wp('5')
    },
    statusbuttonText: {
        // color: '#43AB33',
        fontFamily: 'Voces-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15,
        textAlign: 'center',
        marginTop: hp('-1')
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
      

})
