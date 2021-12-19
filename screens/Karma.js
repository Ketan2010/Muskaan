import React, {useState, useEffect} from 'react'
import { View, Text, Button, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import Karmacard from '../components/Karmacard'
import Vouchercard from '../components/Vouchercard'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as moment from 'moment'
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');

export default function Karma({navigation}){
    const [karma, setkarma] = useState('');
    const [id, setid] = useState('');
    const [coupon_ids, setcoupon_ids] = useState([]);
    const [reqkarma, setreqkarma] = useState([]);
    const [coupon_data, setcoupon_data] = useState([]);
    const user = firebase.auth().currentUser;

    let today = new Date();   
    let date=today.getFullYear() +"-"+ parseInt(today.getMonth()+1) +"-"+ today.getDate() ;

console.log(date)
    useEffect(() => {
        firebase.database()
        .ref("users/")
        .orderByChild("uid")
        .equalTo(user.uid)
        .on('value', snapshot => {
            if (snapshot.exists()) {
              snapshot.forEach((child) => {
                setid(child.key)
                child.val().karma? setkarma(child.val().karma):setkarma('')
              });
            } else {
              console.log('Went wrong');
            }
        })

        let today = new Date();   
        let date=today.getFullYear() +"-"+ parseInt(today.getMonth()+1) +"-"+ today.getDate() ;
        var datacontainer = []
        var datas = {};
        firebase.database()
        .ref("coupons")
        .on('value', snapshot => {
            if (snapshot.exists()) {
              snapshot.forEach((child) => {
                if(date <= child.val().expiry_date)
                {
                  datas = {'id':child.key,'karmareq':child.val().karma_required,'reward':child.val().reward,'imageuri':child.val().imageuri}
                  datacontainer.push(datas)
                }
                
                // dataid.push(child.key)
                // datakarma.push(child.val().karma_required)
              });
              // setcoupon_ids(dataid)
              // setreqkarma(datakarma)
              setcoupon_data(datacontainer)
              console.log(coupon_data)
            } else {
              console.log('Went wrong');
            }
        })

  }, [])


    return (
        <SafeAreaView style={styles.container}>
            <View style={{marginTop:hp('20')}}>
                <Karmacard karma={karma} ></Karmacard>
            </View>
            <View style={{alignSelf: 'center',width:wp('90%'), marginTop:hp('2')}}>
                    <Text style={{alignSelf:'center', paddingHorizontal:5, fontSize: 35,color:'#C4C4C4'}}>
                        <Text style={{fontWeight: "bold", color:'#F44646'}}>F</Text>
                        <Text style={{fontWeight: "bold", color:'#22f55a'}}>U</Text>
                        <Text style={{fontWeight: "bold", color:'#1d74f5'}}>N</Text>
                        <Text style={{fontWeight: "bold", color:'#96ad00'}}>  Z</Text>
                        <Text style={{fontWeight: "bold", color:'#f51d7b'}}>O</Text>
                        <Text style={{fontWeight: "bold", color:'#06c2b5'}}>N</Text>
                        <Text style={{fontWeight: "bold", color:'#f5830a'}}>E</Text>
                        
                        
                    </Text>
                    <TouchableOpacity style={{position:'absolute',marginLeft:'65%'}} onPress={()=>navigation.navigate('Home',{screen:'Rewards'})}>
                          {/* <Icons name='gift-outline' color={'#F44646'} size={hp('4.5%')} style={{left:wp('15%')}}/> */}
                        <Text style={{marginLeft:wp('15%'),backgroundColor:'#b3d1ff',borderRadius:50,padding:7}}><Icons name='gift-outline' color={'#F44646'} size={hp('7.5%')} /></Text>
                        </TouchableOpacity>
                    <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 20,color:'#C4C4C4' }}>Redeem yourselves!!</Text>
            </View>
            <ScrollView style={styles.scrollView}>
            {coupon_data.map((v)=>{
                            return(
                            <Vouchercard id={id} coupon_id={v['id']} imageuri={v['imageuri']} reward={v['reward']} karma={karma} navigation = {navigation} reqkarma={v['karmareq']} type="Normal"></Vouchercard>
                            
                            )
                            
                        })}
                {/* <Vouchercard id={id} karma={karma} navigation = {navigation} reqkarma='500' type="Normal"></Vouchercard>
                <Vouchercard id={id} karma={karma} navigation = {navigation} reqkarma='100' type="Premium"></Vouchercard>
                <Vouchercard id={id} karma={karma} navigation = {navigation} reqkarma='50' type="Normal"></Vouchercard>
                <Vouchercard id={id} karma={karma} navigation = {navigation} reqkarma='400' type="Premium"></Vouchercard>
                <Vouchercard id={id} karma={karma} navigation = {navigation} reqkarma='300' type="Normal"></Vouchercard> */}
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
    //   justifyContent: 'center'
    },
  });