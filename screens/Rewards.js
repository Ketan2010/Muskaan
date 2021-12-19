import React, { useEffect, useState} from 'react'
import {StyleSheet, View, Text , Image, TouchableOpacity, Alert} from 'react-native'
import firebase from '@firebase/app';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { forEach } from 'lodash';
import { FlatGrid } from 'react-native-super-grid';
import RewardsEarned from '../components/RewardsEarned';
require('firebase/auth');
require('firebase/database');

export default function Rewards() {
    const [coupon_wins, setcoupon_wins] = useState([]);
    
    const user = firebase.auth().currentUser;
    console.log(user.uid)
    useEffect(() => {
        var datacontainer =[];
        var key ='';
        firebase.database()
        .ref("users/")
        .orderByChild("uid")
        .equalTo(user.uid)
        .on('value', snapshot => {
            if (snapshot.exists()) {
                
                snapshot.forEach((child) => {
                
                key = child.key
              });

              console.log(key)
                firebase.database().ref('users/'+key+'/rewards/')
                .on('value', snap => {
                    if (snap.exists()){
                        snap.forEach((child)=>{
                            datacontainer.push({'id':child.val().coupon_id})
                        })
                    }
                    setcoupon_wins(datacontainer)
                })
            console.log(datacontainer)
            } else {
              console.log('Went wrong');
            }
        })
    }, [])
    return (
        <View>
            <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 30,color:'#C4C4C4',marginTop:hp('20') }}>VOUCHERS</Text>
            { coupon_wins.length != 0 ?
                <FlatGrid
                itemDimension={130}
                data={coupon_wins}
                style={styles.gridView}
                spacing={10}
                renderItem={({ item }) => (
                    
                    <RewardsEarned id={item['id']}/>
                )}
                />
                :
                <View style={{alignItems:'center', marginTop:hp('20')}}>
                    <Icon name='gift-outline'  color={'grey'} size={hp('20%')} />
                    <Text style={{color:'grey',fontSize:20}}>Your vouchers will appear here...</Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    gridView: {
      marginTop: hp('2'),
    //   flex: 1,
    },
    
  });

