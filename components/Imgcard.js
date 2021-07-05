import React, {useState, useEffect}from 'react'
import { StyleSheet, Text, Modal,Pressable, View, Image, TouchableOpacity} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/Ionicons';
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');




const Imgcard = (props) => {

    const [starttime, setstartTime] = useState('');
    const [endtime, setendTime] = useState('');
    const [address, setaddress] = useState('');
    const [food, setFood] = useState('');
    const [shelf,setShelf]=useState('');
    const [plates, setPlates] = useState('');
    const [cost,setCost] = useState('');
    const [detail,setDetail] =useState(''); 
    const [lat,setlat] =useState(''); 
    const [long,setlong] =useState(''); 
    const [donationdate,setdonationdate] =useState(''); 
    const [donationtime,setdonationtime] =useState(''); 
    const [status,setstatus] =useState(''); 
    const [donatedto,setdonatedto] =useState(''); 
    const [foodimg,setfoodimg] =useState(''); 
    const [key,setkey] =useState(''); 


    useEffect(() => {
        if(props.itemid){
            // fetch data
            firebase.database()
            .ref("donations/"+props.itemid)
            .once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    setaddress(snapshot.val().address)
                    setDetail(snapshot.val().detail)
                    setdonationdate(snapshot.val().donationdate)
                    setstatus(snapshot.val().donationstatus)
                    setdonationtime(snapshot.val().donationtime)
                    setendTime(snapshot.val().endtime)
                    setstartTime(snapshot.val().starttime)
                    setFood(snapshot.val().fooditem)
                    setPlates(snapshot.val().plates)
                    setShelf(snapshot.val().shelf)
                    setCost(snapshot.val().cost)
                    setdonatedto(snapshot.val().donatedto)
                    setlat(snapshot.val().coords.latitude)
                    setlong(snapshot.val().coords.longitude)
                    setfoodimg(snapshot.val().imguri)
                } else {
                    console.log('Went wrong while fetching data');
                }
            });
        }
        else{
            console.log('Food Item not exist')
        }
    }, [props])

    return (
        <View>
            <View  style={styles.card}>
                <Text   style={styles.datetime}>{donationdate}, {donationtime}</Text>
                <View style={{flexDirection:'row', marginTop:hp('2')}}>
                    <View>
                                <Image 
                                style={{height:hp('10'), width:wp('25'), borderRadius: 4}}
                                source={{uri: foodimg}}
                                />                    
                    </View>
                    <View style={{marginLeft:wp('3'),width:wp('50')}}>
                        <Text style={styles.text}><Text style={{fontWeight: "bold"}}>Food Item</Text> : {food}</Text>
                        <Text style={styles.text}><Text style={{fontWeight: "bold"}}>No of plates</Text> : {plates}</Text>
                        <Text style={styles.text}><Text style={{fontWeight: "bold"}}>Pickup Timing</Text> : {starttime} - {endtime}</Text>
                        <Text style={styles.text}><Text style={{fontWeight: "bold"}}>Shelf Life</Text> : {shelf}</Text>
                        <Text style={styles.text}><Text style={{fontWeight: "bold"}}>Address</Text> : {address}</Text>
                    </View>
                </View>
                {props.fromrequests?
                    // if component is calld from requests page no need to show buttons
                    null
                :
                    [
                        status=='PENDING'?
                            <View style={styles.buttons}>
                                    <TouchableOpacity disabled={true}>
                                        <View style={[styles.accept, { borderColor: '#53a0ed'}]}>
                                            <Text style={[styles.buttonTextaccept, {color: '#53a0ed'}]}>Pending Donation</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{props.navigation.navigate('Requests', {iteid: props.itemid})}}>
                                        <View style={styles.accept}>
                                            <Text style={styles.buttonTextaccept}>View Requests</Text>
                                        </View>
                                    </TouchableOpacity>
                            </View>
                        :
                            <View style={styles.buttons}>
                                    <TouchableOpacity disabled={true}>
                                        <View style={[styles.accept, { borderColor: '#43AB33'}]}>
                                            <Text style={[styles.buttonTextaccept, {color: '#43AB33'}]}>Donated to {props.donatedto}</Text>
                                        </View>
                                    </TouchableOpacity>
                            </View>
                        
                    ]
                }
                
                
            </View>
        </View>
        
    )
}

export default Imgcard

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        height: hp('28%'),
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
    text: {
        fontSize: 12,
        fontFamily: 'Voces-Regular',
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        marginTop: hp('1'),
        
    },
    accept: {
        borderRadius: hp('2'),
        paddingTop: 10,
        paddingBottom:10,
        alignSelf:'center',
        width:wp('35'),
        height:hp('4'),
        borderWidth: 2,
        borderColor: '#F44646',
        marginLeft: wp('3')
    },
    buttonTextaccept: {
        color: '#F44646',
        fontFamily: 'Voces-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15,
        textAlign: 'center',
        marginTop: hp('-1')
      },
})
