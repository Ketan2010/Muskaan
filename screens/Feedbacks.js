import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/FeedbackStyle';
import firebase from '@firebase/app';
import { Children } from 'react';
require('firebase/auth');
require('firebase/database');
require('firebase/storage');

const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assets/images/dummyphoto.png'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assets/images/dummyphoto.png'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assets/images/dummyphoto.png'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg:require('../assets/images/dummyphoto.png'),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assets/images/dummyphoto.png'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];






const MessagesScreen = ({navigation}) => {

  // const [Messages,setMessages] = useState([]);
  const user = firebase.auth().currentUser;
  const [ids,setids] = useState([]);
  const [name,setname]=useState([]);
  const [data,setdata] = useState([]);
  const [userkey,setuserkey] = useState([]);

useEffect(() => {
  firebase.database()
.ref('users/')
.once( 'value' , snapshot =>{
  var names= [];
  var idss = [];
  var imagess =[];
  var datapush=[];
  if (snapshot.exists())
  {
    snapshot.forEach( (child) =>{
    if (child.val().uid!=user.uid)
    {
      datapush.push({'id':child.key,'name':child.val().name,'email':child.val().email})
      names.push(child.val().name);
      idss.push(child.key);
    }
    else{
      setuserkey(child.key);
    }
  })
  }
  setids(idss);
  setname(names);
  setdata(datapush)
})
}, [])

    return (
      <Container>
        <FlatList 
          data={data}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <Card onPress={() => navigation.navigate('ChatScreen', {userName: item.name, id:item.id, userid:userkey})}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg  source={require('../assets/images/dummyphoto.png')} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.name}</UserName>
                    {/* <PostTime>{item.messageTime}</PostTime> */}
                  </UserInfoText>
                  <MessageText>{item.email}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});