import React, {useState, useEffect}from 'react'
import { StyleSheet, Text, Modal,Pressable, View, TouchableOpacity} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/Ionicons';
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');
// color condition
// modal for requested
const Card = (props) => {
    const [modalVisiblef, setModalVisiblef] = useState(false);
    const [fooditem, setfooditem] = useState(false);
    const [plate, setplate] = useState(false);
    const [requester, setrequester] = useState(false);
    const [status, setstatus] = useState(false);
    const [time, settime] = useState(false);
    const [date, setdate] = useState(false);
    const [address, setaddress] = useState(false);
    
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
    .ref("booking/"+props.id)
    .once('value',snapshot => {
        if (snapshot.exists()) {
            setfooditem(snapshot.val().fooditem)
            setplate(snapshot.val().bookedplate)
            setstatus(snapshot.val().bookingstatus)
            gettime(snapshot.val().bookingdate)
            getdate(snapshot.val().bookingdate)

            firebase.database()
            .ref("users/"+snapshot.val().receiverid)
            .once('value',snapshot2 => {
                setrequester(snapshot2.val().name)
                setaddress(snapshot2.val().address)
            })
        } else {
        console.log('Went wrong');
        }
    })

}



    const showmodalf = () =>{
        setModalVisiblef(true)
    }
    
    return (
        <View>
            {/* request from modal */}
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
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Request From</Text> : {requester}</Text>
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Request For</Text> : {plate} plate, {fooditem}</Text>
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Address of receiver</Text> : {address}</Text>
                            <View style={styles.buttonsmodal}>
                                <View style={[styles.accept, {marginLeft:wp('-1')}]}>
                                    <TouchableOpacity>
                                        <Text style={styles.buttonTextaccept}>ACCEPT</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.refuse, {marginLeft:wp('3')}]}>
                                    <TouchableOpacity>
                                        <Text style={styles.buttonTextrefuse}>REFUSE</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.call, {marginLeft:wp('3')}]}>
                                    <TouchableOpacity>
                                        <Text style={styles.buttonTextcall}>Make a call</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
          
     
            <TouchableOpacity onPress={showmodalf} style={styles.card}>
                <Text style={styles.datetime}>{date}, {time}</Text>
                <Text style={styles.username}>{requester} is requesting you for {plate} plate, {fooditem}</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity>
                        <View style={styles.accept}>
                            <Text style={styles.buttonTextaccept}>ACCEPT</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.refuse}>
                            <Text style={styles.buttonTextrefuse}>REFUSE</Text>
                        </View>
                    </TouchableOpacity>
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
