// import React, {useState, useEffect, useCallback} from 'react';
// import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
// import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// const ChatScreen = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: 'Hello developer',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       },
//       {
//         _id: 2,
//         text: 'Hello world',
//         createdAt: new Date(),
//         user: {
//           _id: 1,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       },
//     ]);
//   }, []);

//   const onSend = useCallback((messages = []) => {
//     setMessages((previousMessages) =>
//       GiftedChat.append(previousMessages, messages),
//     );
//   }, []);

//   const renderSend = (props) => {
//     return (
//       <Send {...props}>
//         <View>
//           <MaterialCommunityIcons
//             name="send-circle"
//             style={{marginBottom: 5, marginRight: 5}}
//             size={32}
//             color="#F44646"
//           />
//         </View>
//       </Send>
//     );
//   };

//   const renderBubble = (props) => {
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: '#F44646',
//           },
//         }}
//         textStyle={{
//           right: {
//             color: '#fff',
//           },
//         }}
//       />
//     );
//   };

//   const scrollToBottomComponent = () => {
//     return(
//       <FontAwesome name='angle-double-down' size={22} color='#333' />
//     );
//   }

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={(messages) => onSend(messages)}
//       user={{
//         _id: 1,
//       }}
//       renderBubble={renderBubble}
//       alwaysShowSend
//       renderSend={renderSend}
//       scrollToBottom
//       scrollToBottomComponent={scrollToBottomComponent}
//     />
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     left:10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, {useState,useEffect, Component} from 'react';
import { Dimensions, TextInput } from 'react-native';
import {View ,Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/MaterialIcons'
// import { AsyncStorage } from 'react-native-community/async-storage';
import  { sendMessage, receiveMessage } from '../components/Message'
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');
require('firebase/storage');

export default function ChatScreen (props) {
  // console.log(props);
  const [message,setmessage] = useState('');
  const [allmessage,setallmessage] = useState([]);
  const currentId = props.route.params.userid;
  const SendMessage = async()=>{
    if (message){
      sendMessage(props.route.params.userid,props.route.params.id,message)
      setmessage('')
      .then( ()=> {
        setmessage('')
      }).catch((err) => {
        alert(err)
      })

      receiveMessage(props.route.params.userid,props.route.params.id,message)
      .then( ()=> {
        setmessage('')
      }).catch((err) => {
        alert(err)
      })

    }

  }
  useEffect(() => {
    try{
      firebase.database()
      .ref("feedbacks")
      .child(props.route.params.userid)
      .child(props.route.params.id)
      .on("value", snapshot =>{
        let datamessage=[]
        snapshot.forEach(data => {
          datamessage.push({
            sendby:data.val().sender,
            receiveby:data.val().receiver,
            message:data.val().message,
            date:data.val().date,
            time:data.val().time,
          })
        })
        setallmessage(datamessage.reverse());
        console.log(allmessage)
      })
    }catch(error){
      alert(error)
    }
  }, [])


  return(
    <View style={{flex:1}}>
    <FlatList
      inverted
      style={{marginBottom:hp('7')}}
      data={allmessage}
      keyExtractor={(index)=>index.toString()}
      renderItem={({item}) => (
        <View style={{maxWidth:Dimensions.get('window').width/2 + 70,alignSelf:currentId===item.sendby?'flex-end':'flex-start'}}>
          <View style={{margin:hp('0.5'),padding:hp('1'),paddingHorizontal:hp('2'),fontSize:hp('2'),borderTopEndRadius:hp('2'),borderBottomLeftRadius:currentId===item.sendby?hp('2'):null,borderBottomRightRadius:currentId===item.sendby?null:hp('2'),borderTopStartRadius:hp('2'),backgroundColor:currentId===item.sendby?'#f55656':'#d9d9d9'}}>
              <Text style={{fontSize:hp('2'),alignSelf:currentId===item.sendby?'flex-end':'flex-start',color:currentId===item.sendby?'white':'black'}}>
                {item.message}
              </Text>
              <Text style={{fontSize:hp('1'),fontStyle:'italic',color:currentId===item.sendby?'white':'black',alignSelf:currentId===item.sendby?'flex-end':'flex-start'}}>{item.date} {item.time}</Text>
              
          </View> 
        </View>
      )}
      />
    <View style={{flexDirection:'row',bottom:0,width:'100%',position:'absolute',height:hp('5'),alignItems:'center'}}>
      {/* <View style={{flex:1}}>

      </View> */}
      
      <View style={{flex:3,left:wp('2'),backgroundColor:'#cccccc',borderRadius:hp('2'),padding:wp('2')}} >
          <TextInput value={message} placeholder="Type your feedback here...."  onChangeText={(txt)=>setmessage(txt)} placeholderTextColor="#404040" />
      </View>
      <View style={{flex:0.7,left:wp('3')}}>
        <TouchableOpacity style={{borderRadius:hp('5'),backgroundColor:'#F44646',width:hp('5'),height:hp('5'),padding:hp('1')}} onPress={()=>SendMessage()}>
          <Icons style={{alignSelf:'center',left:hp('0.2')}} name="send" size={hp('3')} color="white" />
        </TouchableOpacity>
      </View>
    </View>
    </View>
  )
}