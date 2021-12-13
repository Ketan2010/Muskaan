import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, Pressable, Modal, Dimensions, Keyboard, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons'
import SearchableDropdown from 'react-native-searchable-dropdown';
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');
require('firebase/storage');
import {
    Card,
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserInfoText,
    UserName,
    MessageText,
    TextSection,
  } from '../styles/FeedbackStyle';

const SearchResult = (props) => {
  const user = firebase.auth().currentUser;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [postdata, setpostdata] = useState([]);
  const [username, setusername] = useState('');
  const [userid, setuserid] = useState('');
  const [useremail, setuseremail] = useState('');
  const [userkarma, setuserkarma] = useState('');

  useEffect(() => {
    // fetch all posts from user
    setuserid(props.route.params.userid)
    setuseremail(props.route.params.usermail)
    setusername(props.route.params.username)
    setuserkarma(props.route.params.userkarma)
    firebase.database()
    .ref('posts/'+props.route.params.userid)
    .on('value', snapshot => {
      let datareceive =[];
        if (snapshot.exists()) {
          snapshot.forEach((child) => {
            datareceive.push(child.val());
            // console.log(child.key)
          }); 
        } else {
          console.log('Went wrong while fetching user posts');
        }
        setpostdata(datareceive.reverse());
    })
  }, [])

  const formatData = ( data, numColumns) =>{
    const numberOfFullRows = Math.floor(data.length/numColumns);
    let inc = data.length;
    let numberOfElementsLastRow = data.length-(numberOfFullRows * numColumns);
    while (numberOfElementsLastRow!==numColumns && numberOfElementsLastRow!==0){
      // data.push({ id: inc,img: null});
      data.push({id:inc,img:null})
      numberOfElementsLastRow = numberOfElementsLastRow + 1;
      inc=inc+1;
      console.log(inc)
      console.log(data)
    }
    return data;
  }
  const numColumns = 3
  
  const [selectedPostImage, setSelectedPostImage] = useState(null);
  const [selectedPostText, setSelectedPostText] = useState(null);
  const [fetchlikes, setfetchlikes] = useState('');
  const [fetchtime, setfetchtime] = useState('');
  const [modalImageVisible,setModalImageVisible] = useState(null);

  const fullViewImage = (path,post,time,likes, author) =>{
    setSelectedPostImage(path);
    setSelectedPostText(post)
    setfetchtime(time);
    setfetchlikes(likes);
    setModalImageVisible(true);
  }

    return (
          <View style={styles.container}>
              
              <Card>
                  <UserInfo>
                    <UserImgWrapper>
                      <UserImg  source={require('../assets/images/dummyphoto.png')} />
                    </UserImgWrapper>
                    <TextSection>
                      <UserInfoText>
                        <UserName>{username}</UserName>
                      </UserInfoText>
                      <MessageText>{useremail}</MessageText>
                      <MessageText>Karma Points: {userkarma}</MessageText>
                    </TextSection>
                  </UserInfo>
                </Card>
                <View style={{alignSelf: 'center',width:wp('60%'),marginTop:hp('1')}}>
                 <Text style={{ alignSelf:'center', fontSize: 24,color:'#C4C4C4' }}>Posts from {username}</Text>
                </View>
              <View style={{height:hp('65'),marginTop:hp('0')}}>
                {
                  postdata.length==0 ?
                  <View style={{ alignItems: 'center', justifyContent: 'center',top:140}}>
                      <Icon name="search" style={{...styles.actionButtonIcon,fontSize:170,height:200,color:"#8c8c8c"}} />
                      <Text style={{color:"#8c8c8c",fontSize:20}}>No posts from this user</Text>
                  </View>
                :
                  <FlatList style={{top:20}}
                    showsVerticalScrollIndicator={false}
                    // style={{borderWidth:1,borderColor:'#595959'}}
                    data={formatData(postdata,numColumns)}
                    numColumns={numColumns}
                    renderItem={({item }) =>{
                      console.log(item)
                      if (item.img===null){
                        return(
                          <View style={styles.itemInvisible} >
                              <Text></Text>
                          </View>
                        )
                      }else{
                        return (
                          <TouchableOpacity onPress={()=>fullViewImage(item.imguri,item.posttext,item.timewhilefetching,item.likes)}>
                            <View style={styles.galleryItem} >
                                <Image source={{uri: item.imguri}} style={{height:Dimensions.get('window').width/3-5,width:Dimensions.get('window').width/3-11}} resizeMode='cover' />
                            </View>
                          </TouchableOpacity>
                        ) 
                      }
                      }}
                      keyExtractor={(item)=>item.id}
                    />
                    }
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalImageVisible}
                    onRequestClose={() => {
                        setModalImageVisible(!modalImageVisible);
                    }}
                >
                  <View style={styles.modalcenteredView}>
                      <View style={styles.modalView}>
                          <Pressable
                              style={[styles.modalbutton, styles.modalbuttonClose, {alignItems:'center'}]}
                              onPress={() => setModalImageVisible(false)}
                          >
                                <Icon name='close-circle-outline' color={'white'} size={hp('4%')} /> 
                          </Pressable> 
                          <View style={{alignItems:'center',top:hp('1'), marginBottom:hp('3')}}>
                                    <Image source={{uri:selectedPostImage}} style={{height: hp('25%'), width:wp('70%'), borderRadius:10 }}  resizeMode='contain'/>
                                    <View style={{marginLeft:wp('3'),width:wp('50')}}>
                                        <Text style={styles.text}><Text style={{fontWeight: "bold"}}>User</Text> : {username}</Text>
                                        <Text style={styles.text}><Text style={{fontWeight: "bold"}}>Post</Text> : {selectedPostText}</Text>
                                        <Text style={styles.text}><Text style={{fontWeight: "bold"}}>Likes</Text> : {fetchlikes}</Text>
                                        <Text style={styles.text}><Text style={{fontWeight: "bold"}}>Time</Text> : {fetchtime}</Text>
                                    </View>
                          </View>
                          
                      </View>
                  </View>
                </Modal>
          </View>
    );
};

export default SearchResult;

const styles = StyleSheet.create({
  container: {
    marginTop:hp('18'),
    flex: 1, 
    marginHorizontal:10,
    marginVertical:hp('7'),
    // alignItems: 'center', 
    // justifyContent: 'center',
    height:hp('100')
  },
  post: {
    borderRadius: hp('1'),
    top:hp('3'),
    paddingTop: 10,
    paddingBottom:10,
    alignSelf:'center',
    width:wp('20'),
    height:hp('4'),
    borderWidth: 2,
    borderColor: '#F44646',
    marginLeft: wp('5')
  },
  buttonTextpost: {
    color: '#F44646',
    fontFamily: 'Voces-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 15,
    textAlign: 'center',
    marginTop: hp('-0.5')
  },
  itemInvisible : {
    backgroundColor:"transparent",
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    margin:2,
    height: Dimensions.get('window').width/3,
  },
  galleryItem:{
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    borderWidth:2,
    borderColor:'#595959',
    height: Dimensions.get('window').width/3,
  },
  modalcenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 10,
    backgroundColor: "#e6e6e6",
    borderRadius: 15,
    padding: 30,
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
    marginTop: hp('-3'),
  },
  modalbuttonOpen: {
    backgroundColor: "#F194FF",
  },
  modalbuttonClose: {
    backgroundColor: "#F44646",
    width: wp('10')
  },
});