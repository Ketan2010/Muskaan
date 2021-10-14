import React ,{useState, useEffect} from 'react';
import { View, Text, Button,Modal, StyleSheet, StatusBar,Alert, Pressable, Image, TextInput, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/Ionicons';
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons'
// import ImagePicker from 'react-native-image-crop-picker';
import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import ActionButton from 'react-native-action-button';
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');
// const data =[
//   {
//     id:'1',
//     img:require('../assets/images/dummyphoto.png'),
//     post:'Hey guysssss'
//   },
//   {
//     id:'2',
//     img:require('../assets/images/dummyphoto.png'),
//   },
//   {
//     id:'2',
//     img:require('../assets/images/dummyphoto.png'),
//   },
//   {
//     id:'2',
//     img:require('../assets/images/dummyphoto.png'),
//   },
//   {
//     id:'2',
//     img:require('../assets/images/dummyphoto.png'),
//   },
//   {
//     id:'2',
//     img:require('../assets/images/dummyphoto.png'),
//   },
//   {
//     id:'2',
//     img:require('../assets/images/dummyphoto.png'),
//   },
//   {
//     id:'2',
//     img:require('../assets/images/dummyphoto.png'),
//   },
//   {
//     id:'2',
//     img:require('../assets/images/dummyphoto.png'),
//   },
//   {
//     id:'2',
//     img:require('../assets/images/dummyphoto.png'),
//   },
//   {
//     id:'2',
//     img:require('../assets/images/dummyphoto.png'),
//   },
//   {
//     id:'3',
//     img:require('../assets/images/dummyphoto.png'),
//   },
//   {
//     id:'4',
//     img:require('../assets/images/dummyphoto.png'),
//   }
// ]



const Post = ({navigation}) => {

  const user = firebase.auth().currentUser;
  console.log(user)

  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme();
  const [image, setImage] = useState(null);
  const [pickedImagePath,setPickedImagePath] = useState(null);
  const [modalImageVisible,setModalImageVisible] = useState(null);
  const [selectedPostImage, setSelectedPostImage] = useState(null);
  const [selectedPostText, setSelectedPostText] = useState(null);
  const [ createPost,setCreatePost] = useState(null);
  const [caption, setcaption] = useState('');
  const [lati, setlati] = useState('');
  const [longi, setlongi] = useState('');
  const [address, setaddress] = useState('');
  const [posttime, setposttime] = useState(new Date());
  const [times,settimes] = useState('');
  const [timewhilefetching, settimewhilefetching] = useState('');
  const [fetchlikes, setfetchlikes] = useState('');
  const [fetchtime, setfetchtime] = useState('');
  const [citystate, setcitystate] = useState('');
  const [fetchdate, setfetchdate] = useState('');
  const [loadingf, setLoadingf] = useState(false);
  const [errorMessage, seterrorMessage] = useState(null)

  const [data, setdata] = useState([]);


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        // replace requestMediaLibraryPermissionsAsync by getCameraPermissionsAsync
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
      getLocation();

    })();

    firebase.database()
    .ref('posts/'+user.uid)
    .on('value', snapshot => {
      let datareceive =[];
        if (snapshot.exists()) {
          snapshot.forEach((child) => {
            datareceive.push(child.val());
            // console.log(child.key)
          }); 
        } else {
          console.log('Went wrong');
        }
        setdata(datareceive.reverse());
    })


  }, []);


  async function getLocation() {
    await Location.enableNetworkProviderAsync().then().catch(_ => null);
    const status = await Location.hasServicesEnabledAsync();
    if(status){
      const getCurrentPosition = async () => await Location.getCurrentPositionAsync()
                                        .then(loc => loc)
                                        .catch(_ => null)
      let location = await getCurrentPosition();
      while(location === null){
        location = await getCurrentPosition();
      }
      console.log("llll"+location)
      setlati(location.coords.latitude);
      setlongi(location.coords.longitude);
    }else{
      // throw new Error("Please activate the location");
      seterrorMessage("Please activate the location");
    }

    fetch('https://us1.locationiq.com/v1/reverse.php?key=pk.d27567067f647aefc7289b09c8fae25f&lat='+(lati)+'&lon='+(longi)+'&format=json')
    .then((response) => response.json())
        .then((responseJson) => {
            // console.log(responseJson)
            setaddress(responseJson.display_name)
            setcitystate(responseJson.address.city+', '+responseJson.address.state+', '+responseJson.address.country)
            console.log(address);
            
    })

    
    // var today = new Date(),
    // time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    // settimes(time);

  }

  const uploadImage = async (uri, key) => {
    
    setModalVisible(false);

    const response = await fetch(uri);
    const blob = await response.blob()
    return firebase
    .storage()
    .ref('PostImgs/'+user.uid+'/'+key+'/postimg')
    .put(blob)  
    .then((snapshot) => {
      setLoadingf(false)
    })
   
  }

  const postAddition = () => {
    var date = new Date().getDate();
    const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var month =  monthNames[new Date().getMonth()]
    // var month = new Date().getMonth() + 1;
    var time = moment().utcOffset('+05:30').format(' hh:mm a');
    var year = new Date().getFullYear();
    getLocation();
    let d = new Date();
    setposttime(d);
    let datetime=date + ',' + month + ' ' + year+''+time
    settimewhilefetching(datetime);
    console.log("gate"+new Date());
    
    setLoadingf(true);
    var pushed_data = firebase.database().ref('posts/').child(user.uid).push({
      posttext:caption,
      time:'',
      timewhilefetching:'',
      latitude:lati,
      longitude:longi,
      address:address,
      citystate:citystate,
      likes:'0',
      imguri:''
    })
    uploadImage(pickedImagePath, pushed_data.key)
    .then(() =>Alert.alert(
      "Ohh great",
      "Your post has been posted successfully",
      [
        { text:"OK", onPress: () => {
                                      console.group(timewhilefetching);
                                      firebase.storage()
                                      .ref('PostImgs/'+user.uid+'/'+pushed_data.key+'/postimg')
                                      .getDownloadURL()
                                      .then((url) => {
                                              firebase.database()
                                              .ref("posts/"+user.uid+"/"+pushed_data.key+"/")
                                              .update({
                                                imguri: url,
                                                time:posttime,
                                                timewhilefetching:timewhilefetching,
                                                latitude:lati,
                                                longitude:longi,
                                                address:address,
                                              })
                                      }).catch(e=>{console.log(e)})
                                   
                                }
        }
      ]
    ));
  }

  const choosePhotoFromLibrary = async () => {
    // replace launchImageLibraryAsync by launchCameraAsync 
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [5, 5],
      base64: true,
    });
    if(result.cancelled){
      console.log('cancelled')
    }
    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      getLocation();
      setModalVisible(true);
      console.log(result.uri);
    }
  }

  const takePhotoFromCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      getLocation();
      setModalVisible(true);
      console.log(result.uri);
    }
  }

  const writePostText = () => {
      setPickedImagePath(null);
      getLocation();
      setModalVisible(true);
  }

  const fullViewImage = (path,post,time,likes) =>{
    
    setSelectedPostImage(path);
    setSelectedPostText(post)
    setfetchtime(time);
    setfetchlikes(likes);
    setModalImageVisible(true);
  }

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
    return (
      <View style={styles.container}>
        <View style={{alignSelf: 'center',width:wp('60%'),marginTop:hp('13')}}>
                 <Text style={{ alignSelf:'center', fontSize: 24,color:'#C4C4C4' }}>Your Posts</Text>
           </View>
        <View style={{height:hp('65'),marginTop:hp('0')}}>
          {
            data.length==0 ?
            <View style={{ alignItems: 'center', justifyContent: 'center',top:140}}>
                <Icon name="create-outline" style={{...styles.actionButtonIcon,fontSize:170,height:200,color:"#8c8c8c"}} />
                <Text style={{color:"#8c8c8c",fontSize:20}}>Your Posts will appear here...</Text>
            </View>
          :
            <FlatList style={{top:20}}
              showsVerticalScrollIndicator={false}
              // style={{borderWidth:1,borderColor:'#595959'}}
              data={formatData(data,numColumns)}
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
                            <Icon name='close-circle-outline' color={'white'} size={hp('4%')} /> 
                      </Pressable> 
                      { pickedImagePath!=null ? 
                      <View style={{alignItems:'center',top:hp('1'), marginBottom:hp('3')}}>
                                <Image source={{uri: pickedImagePath}} style={{height: hp('25%'), width:wp('60%'), borderRadius:10 }} />
                      </View>
                      : null}
                      <TextInput
                                    placeholder="Add a caption... "
                                    style={{fontSize:hp('2.2%'),left:wp('2%')}} 
                                    onChangeText={caption => setcaption(caption)}
                                    defaultValue={caption}
                                />
                      <View style={{borderBottomColor: '#F44646',width:wp('70'),paddingTop:hp('0.5%'),borderBottomWidth:wp('0.3%'),}}  />  
                      <TouchableOpacity style={[styles.post, {marginLeft:wp('3')}]} onPress={()=>{postAddition()}}>
                          <View style={{flexDirection:'row'}}>
                              <View style={{flex:2}}>
                                  <Text style={{...styles.buttonTextpost,left:wp('3')}}>POST</Text>
                              </View>
                              <View style={{flex:2}}>
                                  <Icons name='send' style={{...styles.buttonTextpost,marginTop: hp('-0.3')}} color={'red'} size={hp('4%')} /> 
                              </View>
                          </View>
                      </TouchableOpacity>
                  </View>
              </View>
        </Modal>
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
                                    <Text style={styles.text}><Text style={{fontWeight: "bold"}}>Post</Text> : {selectedPostText}</Text>
                                    <Text style={styles.text}><Text style={{fontWeight: "bold"}}>Likes</Text> : {fetchlikes}</Text>
                                    <Text style={styles.text}><Text style={{fontWeight: "bold"}}>Time</Text> : {fetchtime}</Text>
                                </View>
                      </View>
                      
                  </View>
              </View>
        </Modal>
       
      {/* <Text>Postmmm</Text> */}
      <ActionButton  buttonColor="#ff3333">
      {/* <ActionButton.Item
          buttonColor="#cccccc"
          title="Post only Text"
          onPress={writePostText}>
          <Icon name="create-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item> */}
        <ActionButton.Item
          buttonColor="#cccccc"
          title="Take Photo"
          onPress={takePhotoFromCamera}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#cccccc"
          title="Choose Photo from gallery"
          onPress={choosePhotoFromLibrary}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
      </View>
    );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginHorizontal:10,
    marginVertical:hp('7'),
    // alignItems: 'center', 
    // justifyContent: 'center',
    height:hp('100')
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'red',
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
  text: {
    fontSize: hp('2'),
    fontFamily: 'Voces-Regular',
},
  galleryItem:{
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    borderWidth:2,
    borderColor:'#595959',
    height: Dimensions.get('window').width/3,
  }
});