import React, {useEffect,useState} from 'react'
import { View, Text, StyleSheet,Image, TouchableOpacity, Alert ,Modal, Pressable} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/Ionicons';
require('firebase/auth');
require('firebase/database');
import firebase from '@firebase/app';

 const RewardsEarned = (props) => {
    console.log('darshan'+props.id)
    const [modalVisible, setModalVisible] = useState(false);
    const [company_name, setcompany_name] = useState('');
    const [coupon_code, setcoupon_code] = useState('');
    const [coupon_type, setcoupon_type] = useState('');
    const [expiry_date, setexpiry_date] = useState('');
    const [generation_date, setgeneration_date] = useState('');
    const [karma_required, setkarma_required] =useState('');
    const [imageuri, setimageuri] = useState('');
    const [reward, setreward] = useState('');
    useEffect(() => {
        firebase.database().ref('coupons/'+props.id)
        .on('value', snap =>{
            if (snap.exists()){
                setcompany_name(snap.val().company_name);
                setcoupon_code(snap.val().coupon_code)
                setcoupon_type(snap.val().coupon_type)
                setexpiry_date(snap.val().expiry_date)
                setgeneration_date(snap.val().generation_date)
                setkarma_required(snap.val().karma_required)
                setreward(snap.val().reward)
                setimageuri(snap.val().imageuri)

            }else{
                console.log('Data not found')
            }
        })

        console.log('hh'+imageuri)
    }, [])
    return (
        <View style={[styles.itemContainer, { backgroundColor: '#e4e7e7' }]} >
            <TouchableOpacity activeOpacity = { .5 } onPress={()=> {setModalVisible(true)}}>
            <Image 
                style={{resizeMode:'contain', height:hp('13'), width:wp('40'), borderRadius: 4}}
                source={{uri:imageuri}}
            /> 
            </TouchableOpacity>
            <Text style={{alignItems:'center',textAlign:'center',marginTop:'1%'}}>From {company_name}</Text>
          {/* <Text style={styles.itemName} onPress={()=>console.log(item.name)}>{item.name}</Text>
          <Text style={styles.itemCode}>{item.code}</Text> */}


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
                                  <View style={{alignItems:'center',flex:2}}>
                                        <Image 
                                        style={{resizeMode:'contain',height:hp('15'), width:wp('30'), borderRadius: 4}}
                                        source={{uri:imageuri}}
                                        
                                        /> 
                                   </View>
                                  <View style={{flex:3,marginLeft:hp('2')}}>
                                      <Text style={styles.modalText}><Text style={{fontWeight: "bold",color:'#7a8585'}}>Reward:  </Text ><Text style={{fontSize:18}}>{reward}</Text></Text>
                                      <Text style={styles.modalText}><Text style={{fontWeight: "bold",color:'#7a8585'}}>Company Name:  </Text><Text style={{fontSize:18}}>{company_name}</Text></Text>
                                      <Text style={styles.modalText}><Text style={{fontWeight: "bold",color:'#7a8585'}}>Expiry Date:  </Text><Text style={{fontSize:18}}>{expiry_date}</Text></Text>
                                      <Text style={styles.modalText}><Text style={{fontWeight: "bold",color:'#7a8585'}}>Coupon Code: </Text><Text style={{fontSize:18}}>{coupon_code}</Text></Text>
                                  </View>
                            </View>
                            <Text style={{...styles.modalText,textAlign:'center',marginTop:'4%'}}><Text style={{fontWeight: "bold",}}>You can Redeem your voucher by using the code "<Text style={{fontSize:24,color:'#7a8585'}}>{coupon_code}</Text>"</Text></Text>
                                      
                      </View>
                </View>
          </Modal> 
        </View>
    )
}

export default RewardsEarned;

const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
      },
      itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
      },
      itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
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
          width: wp('77%'),
          flexDirection:'row'
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
})
