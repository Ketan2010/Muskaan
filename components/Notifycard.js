import React, {useState, useEffect}from 'react'
import { StyleSheet, Text, Alert, Modal,Pressable, View, TouchableOpacity} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/Ionicons';
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');


const Notifycard = (props) => {
    const [claimed, setclaimed] = useState(false);
    const [date, setdate] = useState(false);
    const [time, settime] = useState(false);
    const [fooditem, setfooditem] = useState(false);
    const [karma, setkarma] = useState(false);
    const [plates, setplates] = useState(false);

    useEffect(() => {
        getbookinfo();
   }, []);

   const getbookinfo = () =>{
    firebase.database()
    .ref("users/"+props.userid+'/karmanotify/'+props.itemid)
    .on('value',snapshot => {
        if (snapshot.exists()) {
            setclaimed(snapshot.val().claimed)
            setdate(snapshot.val().date)
            settime(snapshot.val().time)
            setfooditem(snapshot.val().fooditem)
            setkarma(snapshot.val().karma)
            setplates(snapshot.val().plates)
        } else {
        console.log('Went wrong');
        }
    })

    }

    const claim = (k) =>{
        var updated_karma = k + karma;
        firebase.database()
        .ref("users/"+props.userid)
        .update({karma:updated_karma})

        firebase.database()
        .ref("users/"+props.userid+'/karmanotify/'+props.itemid)
        .update({claimed:'YES'})
        .then(() =>Alert.alert(
            "Congratulations!",
            "You earned " +karma+ " karma points! Now your total karma points are "+updated_karma,
            [
              { text: "Thats Nice!" }
            ]
          ));
    }

    return (
        <View style={styles.card}>
            <Text style={styles.datetime}>{date}, {time}</Text>
            <Text style={styles.username}>Congratulations! You have won <Text style={{fontWeight: "bold"}}>{karma} karma points</Text> as a reward for {plates} plates, {fooditem} donation.</Text>
            {claimed=='NO'?
                <View style={[styles.refuse, {marginTop:hp('1'), width:wp('35'),  marginLeft:wp('1')}]}>
                    <TouchableOpacity onPress={()=>{claim(props.karma)}}>
                        <Text style={styles.buttonTextrefuse}>Claim Now</Text>
                    </TouchableOpacity>
                </View>
                :
                null
            }
        </View>
        
    )
}

export default Notifycard

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
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
