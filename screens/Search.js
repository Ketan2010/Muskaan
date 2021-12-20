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

const Search = (props) => {
  const user = firebase.auth().currentUser;
  const [data,setdata] = useState([]);
  const [userkey,setuserkey] = useState([]);
  const [filterdata,setfilterdata] = useState([]);
  const [ids,setids] = useState([]);
  const [name,setname]=useState([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [postdata, setpostdata] = useState([]);

  // to close search results on closing keyboard
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    // fetch all users present in database
    firebase.database()
    .ref('users/')
    .once( 'value' , snapshot =>{
      var names= [];
      var idss = [];
      var datapush=[];
      if (snapshot.exists())
      {
        snapshot.forEach( (child) =>{
        if (child.val().uid!=user.uid)
        {
          datapush.push({'id':child.val().uid,'name':child.val().name,'email':child.val().email, 'karma':child.val().karma})
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

    // fetch all posts present in database
    firebase.database()
    .ref('posts/')
    .on('value', snapshot =>{
        let datareceive =[];
        let namex;
        if(snapshot.exists()){
          snapshot.forEach((child1)=>{
                // console.log(child1.key)
                firebase.database()
                .ref("users/")
                .orderByChild("uid")
                .equalTo(child1.key)
                .on('value', snapshotb => {
                    if (snapshotb.exists()) {
                      snapshotb.forEach((childb) => {
                        namex = childb.val().name
                      });
                    } else {
                      console.log('Went wrong while fetching names');
                    }
                })

                firebase.database()
                .ref('posts/'+child1.key)
                .on('value', snapshot2 => {
                    if (snapshot2.exists()) {
                      snapshot2.forEach((child) => {
                        if(child.val().status == 'active'){
                          let dic = child.val()
                          dic['name'] = namex
                          datareceive.push(dic);
                        }
                        // console.log(child.val().time)
                      }); 
                    } else {
                      console.log('Went wrong');
                    }
                })
          })
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
  const [nameofauthor, setnameofauthor] = useState(null);
  const [fetchlikes, setfetchlikes] = useState('');
  const [fetchtime, setfetchtime] = useState('');
  const [modalImageVisible,setModalImageVisible] = useState(null);

  const fullViewImage = (path,post,time,likes, author) =>{
    setSelectedPostImage(path);
    setSelectedPostText(post)
    setfetchtime(time);
    setfetchlikes(likes);
    setnameofauthor(author);
    setModalImageVisible(true);
  }

    return (
          <View style={styles.container}>
              <SearchableDropdown
                  onTextChange={(text) => console.log(text)}
                  onItemSelect={(item) =>props.navigation.navigate('SearchResult', {username: item.name, userid:item.id, usermail:item.email, userkarma:item.karma})}
                  containerStyle={{ padding: 5 }}
                  textInputStyle={{
                    height:hp('5'),
                    width:wp('90'),
                    borderWidth:hp('0.2'),
                    paddingLeft:hp('2'),
                    marginTop:hp('12'),
                    borderColor:'#808080',
                    borderRadius:hp('1')
                  }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    borderColor: '#bbb',
                    borderRadius: 10,
                    borderWidth: 1,
                  }}
                  itemTextStyle={{
                    color: '#222',
                  }}
                  itemsContainerStyle={
                    isKeyboardVisible ? { maxHeight: hp('90%') } : { display: "none" }
                  }
                  items={data}
                  placeholder="Search your friend"
                  resetValue={false}
                  underlineColorAndroid="transparent"
              />

              <View style={{height:hp('65'),marginTop:hp('0')}}>
                {
                  postdata.length==0 ?
                  <View style={{ alignItems: 'center', justifyContent: 'center',top:140}}>
                      <Icon name="search" style={{...styles.actionButtonIcon,fontSize:170,height:200,color:"#8c8c8c"}} />
                      <Text style={{color:"#8c8c8c",fontSize:20}}>Search your friends/post</Text>
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
                          <TouchableOpacity onPress={()=>fullViewImage(item.imguri,item.posttext,item.timewhilefetching,item.likes, item.name)}>
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
                                        <Text style={styles.text}><Text style={{fontWeight: "bold"}}>User</Text> : {nameofauthor}</Text>
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

export default Search;

const styles = StyleSheet.create({
  container: {
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