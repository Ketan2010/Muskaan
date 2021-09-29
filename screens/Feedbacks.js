import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons'
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
import { heightPercentageToDP } from 'react-native-responsive-screen';
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
  const [search, setsearch] = useState('');
  const [filterdata,setfilterdata] = useState([]);

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
  setfilterdata(datapush)
})
}, [])

const searchFilter = (text)  =>{
  if (text){
    const newData = data.filter( (item) => {
      const itemData = item.name  ? item.name.toUpperCase(): ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) >-1;
    });
    setfilterdata(newData);
    setsearch(text);
  }else{
    setfilterdata(data);
    setsearch(text)
  }
}

    return (
      

          <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
                <View style={{flex:0.5}}>
                    <Icon  style={{left:40,top:hp('2.3')}} name="ios-search" size={20} color="#808080"/>
                </View>
                <View style={{flex:7}}>
                    <TextInput
                      style={styles.textInputStyle}
                      value={search}
                      placeholder="search here"
                      underlineColorAndroid="transparent"
                      onChangeText={(text) => searchFilter(text)}
                    />
                </View>
                   
            </View>
            <FlatList 
              data={filterdata}
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
          </View>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop:hp('19')
  },
  textInputStyle:{
    height:heightPercentageToDP('5'),
    width:wp('90'),
    borderWidth:heightPercentageToDP('0.2'),
    paddingLeft:hp('5'),
    marginTop:hp('1'),
    borderColor:'#808080',
    borderRadius:hp('1')
    }
});