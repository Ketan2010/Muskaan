import React, {useState, useEffect} from 'react';
import { View, Text, Button, SafeAreaView, Image, ScrollView, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Card from '../components/Card';
import Icons from 'react-native-vector-icons/Ionicons';
import Imgcardshort from '../components/Imgcardshort';
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');
import { useFocusEffect } from '@react-navigation/native'

const Requests = (props) => {
    // states to store data
    const [starttime, setstartTime] = useState('');
    const [endtime, setendTime] = useState('');
    const [address, setaddress] = useState('');
    const [food, setFood] = useState('');
    const [shelf,setShelf]=useState('');
    const [plates, setPlates] = useState('');
    const [initialplates,setinitialplates] = useState('');
    const [cost,setCost] = useState('');
    const [detail,setDetail] =useState(''); 
    const [lat,setlat] =useState(''); 
    const [long,setlong] =useState(''); 
    const [donationdate,setdonationdate] =useState(''); 
    const [donationtime,setdonationtime] =useState(''); 
    const [status,setstatus] =useState(''); 
    const [donatedto,setdonatedto] =useState(''); 
    const [foodimg,setfoodimg] =useState(''); 
    const [requests,setrequests] =useState([]); 
    const [key,setkey] =useState(''); 
    
   
    

    // fetch data
    useEffect(() => {
        if(props.route.params.iteid){
            // fetch data
            firebase.database()
            .ref("donations/"+props.route.params.iteid)
            .once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    snapshot.val().address? setaddress(snapshot.val().address):setaddress('')
                    snapshot.val().detail? setDetail(snapshot.val().detail):setDetail('')
                    snapshot.val().donationdate? setdonationdate(snapshot.val().donationdate):setdonationdate('')
                    snapshot.val().donationstatus? setstatus(snapshot.val().donationstatus):setstatus('')
                    snapshot.val().donationtime? setdonationtime(snapshot.val().donationtime):setdonationtime('')
                    snapshot.val().endtime? setendTime(snapshot.val().endtime):setendTime('')
                    snapshot.val().starttime? setstartTime(snapshot.val().starttime):setstartTime('')
                    snapshot.val().fooditem? setFood(snapshot.val().fooditem):setFood('')
                    snapshot.val().plates? setPlates(snapshot.val().plates):setPlates('')
                    snapshot.val().initialplates? setinitialplates(snapshot.val().initialplates):setinitialplates('')
                    snapshot.val().shelf? setShelf(snapshot.val().shelf):setShelf('')
                    snapshot.val().cost? setCost(snapshot.val().cost):setCost('')
                    snapshot.val().donatedto? setdonatedto(snapshot.val().donatedto):setdonatedto('')
                    snapshot.val().coords.latitude? setlat(snapshot.val().coords.latitude):setlat('')
                    snapshot.val().coords.longitude? setlong(snapshot.val().coords.longitude):setlong('')
                    snapshot.val().imguri? setfoodimg(snapshot.val().imguri):setfoodimg('')

                    firebase.database()
                    .ref("booking/")
                    .once('value',snapshot =>{
                    if(snapshot.exists()){
                        var datareceive=[];
                        snapshot.forEach((child) =>{
                            if (child.val().donationid==props.route.params.iteid && child.val().bookingstatus!="CANCELLED")
                            {
                                datareceive.push(child.val().bid)
                            }}
                        )
                        // reverse it to get letest item first
                        setrequests(datareceive.reverse());
                    }
                    else{
                        console.log('Something went wrong');
                    }
                    })
                } else {
                    console.log('Went wrong while fetching data');
                }
            });
        }
        else{
            console.log('Food Item not exist')
        }
    }, [props.route])

    console.warn(requests)
    return (
        <SafeAreaView style={styles.container}>
            <View style={{felx:1, flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('HistoryScreen')}}>
                    <Icons style={{marginLeft:wp('-4')}} name='arrow-back-circle-outline' color={'#F44646'} size={hp('4%')} />
                </TouchableOpacity>
                <View style={{alignSelf: 'center',width:wp('60%')}}>
                        <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 20,color:'#C4C4C4' }}>Donating Item</Text>
                </View>
            </View>
            <Imgcardshort date={donationdate} time={donationtime}  item={food} initialplates={initialplates} quantity= {plates} pickuptimefrom={starttime} pickuptimeto={endtime} shelflife={shelf+' Hours'} address={address} foodimg={foodimg} donationstatus={status} donatedto={donatedto}></Imgcardshort>
            <View style={{alignSelf: 'center',width:wp('60%')}}>
                    <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 20,color:'#C4C4C4' }}>Requests</Text>
            </View>
            <ScrollView style={styles.scrollView}>
                {requests.length==0?
                    <View style={{alignItems:'center', marginTop:hp('20')}}>
                            <Image 
                                style={{height:hp('20'), width:wp('25'), borderRadius: 4}}
                                source={require('../assets/images/pin.png')}
                                />
                            <Text>Requests will appear here</Text>
                    </View>
                        
                    :
                    requests.map((val,key) => {
                        return (<Card id={val}></Card>) 
                    } )
                }
                
                {/* <Card notificationtype='from' date='30 March' time='8:00 PM' user='Micky' item='Chapati bhaji' quantity= '3' pickuptimefrom='9:30 AM' pickuptimeto='10:20 AM' shelflife='3 Hours' address='Naroji Nagar, Dadar, Mumbai'></Card>
                <Card notificationtype='from' date='30 March' time='8:00 PM' user='Micky' item='Chapati bhaji' quantity= '3' pickuptimefrom='9:30 AM' pickuptimeto='10:20 AM' shelflife='3 Hours' address='Naroji Nagar, Dadar, Mumbai'></Card>
                <Card notificationtype='from' date='30 March' time='8:00 PM' user='Micky' item='Chapati bhaji' quantity= '3' pickuptimefrom='9:30 AM' pickuptimeto='10:20 AM' shelflife='3 Hours' address='Naroji Nagar, Dadar, Mumbai'></Card> */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Requests

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: hp('20%'),
        
      },
      scrollView: {
        width: wp('90%'),
        marginTop: hp('2')
    
      },
})
