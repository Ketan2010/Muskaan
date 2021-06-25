import React, {useState, useEffect}from 'react'
import { StyleSheet, Text, Modal,Pressable, View, TouchableOpacity} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/Ionicons';
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');
// color condition
// modal for requested
const Notifycard = (props) => {
    const [modalVisiblef, setModalVisiblef] = useState(false);
    const [modalVisiblet, setModalVisiblet] = useState(false);

    const showmodalf = () =>{
        setModalVisiblef(true)
    }
    const showmodalt = () =>{
        setModalVisiblet(true)
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
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Request From</Text> : {props.user}</Text>
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Request For</Text> : {props.quantity} plate, {props.item}</Text>
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Pickup Timing</Text> : {props.pickuptimefrom} to {props.pickuptimeto}</Text>
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Shelf Life</Text> : {props.shelflife}</Text>
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Address</Text> : {props.address}</Text>
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
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Requested To</Text> : {props.user}</Text>
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Requested For</Text> : {props.quantity} plate, {props.item}</Text>
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Pickup Timing</Text> : {props.pickuptimefrom} to {props.pickuptimeto}</Text>
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Shelf Life</Text> : {props.shelflife}</Text>
                            <Text style={styles.modalText}><Text style={{fontWeight: "bold"}}>Address</Text> : {props.address}</Text>
                            <View style={styles.buttonsmodal}>
                                {props.status=='PENDING'?
                                    <View style={[styles.statusbutton, {borderColor: '#53a0ed', marginLeft:wp('-1')}]}>
                                        <Text style={[styles.statusbuttonText, {color: '#53a0ed'}]}>Status: PENDING</Text>
                                    </View>
                                :
                                    props.status=='ACCEPTED'?
                                        <View style={[styles.statusbutton, {borderColor: '#43AB33', marginLeft:wp('-1')}]}>
                                            <Text style={[styles.statusbuttonText, {color: '#43AB33'}]}>Status: ACCEPTED</Text>
                                        </View>
                                    :
                                        <View style={[styles.statusbutton, {borderColor: '#F44646', marginLeft:wp('-1')}]}>
                                            <Text style={[styles.statusbuttonText, {color: '#F44646'}]}>Status: REFUSED</Text>
                                        </View>
                                }
                                {props.status!='REFUSED'?
                                <View style={[styles.call, {marginLeft:wp('3')}]}>
                                    <TouchableOpacity>
                                        <Text style={styles.buttonTextcall}>Make a call</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                null}
                                
                            </View>
                            {props.status=='PENDING'?
                            <View style={[styles.refuse, {marginTop:hp('3'), width:wp('35')}]}>
                                <TouchableOpacity>
                                    <Text style={styles.buttonTextrefuse}>Cancel Request</Text>
                                </TouchableOpacity>
                            </View>:null
                            }
                            
                        </View>
                    </View>
                </View>
            </Modal>
        {props.notificationtype=='from'?
            <TouchableOpacity onPress={showmodalf} style={styles.card}>
                <Text style={styles.datetime}>{props.date}, {props.time}</Text>
                <Text style={styles.username}>{props.user} is requesting you for {props.quantity} plate, {props.item}</Text>
            </TouchableOpacity>
        :
            <TouchableOpacity onPress={showmodalt} style={styles.card}>
                <Text style={styles.datetime}>{props.date}, {props.time}</Text>
                <Text style={styles.username}>Your request for {props.quantity} plate, {props.item} has been sent to {props.user}</Text>
            </TouchableOpacity>
        }
        </View>
        
    )
}

export default Notifycard

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        height: hp('12%'),
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
