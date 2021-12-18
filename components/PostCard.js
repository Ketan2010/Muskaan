import React, {useState, useEffect} from 'react'
import { View, Text, Button,Modal,Pressable,BreakException, Image, StyleSheet, Alert, TouchableOpacity} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Container,Card, UserInfo, UserImg, UserInfoText, UserName, PostTime, PostText, PostImg, InteractionWrapper, Interaction, InteractionText, Divider, PostLocation} from '../styles/FeedStyles'
import firebase from '@firebase/app';
import { LinearGradient } from "expo-linear-gradient";
import moment from 'moment-jalaali';
require('firebase/auth');
require('firebase/database');

const PostCard = (props) =>{

    const user = firebase.auth().currentUser;

    // console.log(props);
    const [postownername, setpostownername] = useState('');
    const [reportername, setreportername] = useState('');
    const [reportercontact, setreportercontact] = useState('');
    const [postownercontact, setpostownercontact] = useState('');
    const [alreadyliked, setalreadyliked] = useState(false);

    // console.warn(props.postownerid)
    useEffect(() => {
        let name='';

        firebase.database()
        .ref("users/")
        .orderByChild("uid")
        .equalTo(user.uid)
        .on('value', snapshot => {
            if (snapshot.exists()) {
            snapshot.forEach((child) => {
                child.val().name? setreportername(child.val().name):setreportername('')
                child.val().phone? setreportercontact(child.val().phone):setreportercontact('')
            });
            } else {
                console.log('Went wrong');
            }
        })

        firebase.database()
        .ref('users/')
        .orderByChild("uid")
        .equalTo(props.postownerid)
        .on('value',snap=>{
            if(snap.exists()){
                snap.forEach((child) => {
                    name=child.val().name
                    setpostownercontact(child.val().phone)
                    // console.warn(name)
                    firebase.database()
                    .ref('users/'+child.key+'/likedposts')
                    .on('value', snapshots =>{
                        if(snapshots.exists()){
                            snapshots.forEach((child1)=>{
                                if (child1.val().postlikedid==props.postkey){
                                    // console.log('inside'+props.postkey)
                                    setalreadyliked(true);
                                }
                            })
                        }
                    })
                    
                })
            }
            setpostownername(name);
        });
    }, [])

    // console.warn('ll'+postownername)
    // work on this function
    const likedpost =(key) => {

        // console.log(user.key)
        var flag=alreadyliked
        if ( flag == false){
                firebase.database()
                .ref('users/')
                .on('value', snapshot => {
                    if (snapshot.exists()) {
                    snapshot.forEach((child) => {
                        if ( child.val().uid==props.uids && flag==false)
                        {    
                            setalreadyliked(true);
                            flag=true;
                            firebase.database()
                            .ref('users/'+child.key+'/likedposts/')
                            .push({
                                postlikedid: key
                            }) 
                        }
                    }); 
                    } else {
                    console.log('Went wrong');
                    }})
        }else if (flag == true){
            firebase.database()
            .ref('users/')
            .on('value', snapshot => {
            if (snapshot.exists()) {
                snapshot.forEach((child) => {
                    if ( child.val().uid==props.uids)
                    {    
                        firebase.database()
                        .ref('users/'+child.key+'/likedposts/')
                        .on( 'value', snapshots => {
                            if(snapshots.exists()){
                                snapshots.forEach((child1) => {
                                    if (child1.val().postlikedid==props.postkey && flag==true){
                                        setalreadyliked(false);
                                        // console.log(child1.key)
                                        
                                        flag=false;
                                        // console.log('users/' + child.key+'/likedpost/'+child1.key)
                                        // firebase.database().ref('users/'+child.key+'/likedpost/').remove();
                                        firebase.database().ref('users/' + child.key+'/likedposts/'+child1.key).remove();
                                        // refe.remove();
                                    }
                                })
                            }
                        })

                    }
                }); 
                } else {
                console.log('Went wrong');
                }})
        }


        var likes_count;
        firebase.database().ref('posts/'+props.postownerid+'/'+props.postkey)
        .on( 'value', snapshot => {
            if (snapshot.exists){
                likes_count = snapshot.val().likes
            }
        })
        if ( flag == false)
        firebase.database().ref('posts/'+props.postownerid+'/'+props.postkey).update({likes:likes_count - 1})
        else
        firebase.database().ref('posts/'+props.postownerid+'/'+props.postkey).update({likes:likes_count + 1})
        

    }

    const reportpost = () =>{
        Alert.alert(
            "Do you really want to report this post?",
            "After reporting this post, This post will be checked againts Muskaan terms & conditions and neccessary actions will be taken. In this process your identity will not be reveal. Thanks!",
            [
              { text: "Report", onPress: () => {firebase.database().ref('report/post').push({
                postowner: postownername,
                reportername: reportername,
                postownerid: props.postownerid,
                postkey: props.postkey,
                reportercontact: reportercontact,
                postownercontact: postownercontact
            })} },
              { text: "Cancle"}
            ]
        );
    }

    return(
        <View style={styles.card} >
        <UserInfo>
        <LinearGradient
        //   colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
        colors={['#ff6666','#ffa500']}
          start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
          style={{height: 55, alignItems: 'center', justifyContent: 'center', width: 55,borderRadius:40}}
          >
            <UserImg style={{backgroundColor:'white'}} source={require('../assets/images/dummyphoto.png')} />
            </LinearGradient>
            <UserInfoText>
                <UserName>{postownername}{props.val.postowner}</UserName>
                <PostLocation>{props.val.citystate}</PostLocation>
                <TouchableOpacity onPress={reportpost}>
                    <View style={{marginLeft:wp('65')}}>
                        <Ionicons name="alert-circle-outline" color="black" size={25} />
                    </View>
                </TouchableOpacity>
            </UserInfoText>
            
        </UserInfo>
        <Image source={{uri:props.val.imguri}}  style={{height:hp('27'),borderWidth:wp('0.2'),borderColor:'#bfbfbf'}} resizeMode='contain' />
        {/* <Divider/> */}
        <PostText>{props.val.posttext}</PostText>
        <InteractionWrapper>
                <TouchableOpacity onPress={()=>likedpost(props.postkey)}>

                    {   alreadyliked==true ? <Ionicons name="heart" color="red" size={25} /> 
                        : <Ionicons name="heart-outline" color="black" size={25} />
                    }
                </TouchableOpacity>

                
                <InteractionText>
                {
                    alreadyliked == true ?
                        props.val.likes == 1 ?
                            'You and 0 other'
                        :
                            props.val.likes == 2 ?
                                ` You and 1 other`
                            :
                                ` You and ${props.val.likes - 1 } others`
                    :
                        `${props.val.likes} Likes`

                }
                </InteractionText>
               
                {/* <InteractionText>{ alreadyliked == true ? props.val.likes == 1 ? ` You and ${props.val.likes - 1 } other` :  ` You and ${props.val.likes - 1} others` : `${props.val.likes } likes` } Likes</InteractionText> */}
        </InteractionWrapper>
        <PostTime>{moment(props.val.time).fromNow()}</PostTime>
        {/* console.warn(moment("2021-10-04T07:28:36.415Z").fromNow()); */}
        </View>
    )
}

export default PostCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        // height: hp('50'),
        width: wp('94'),
        marginTop:hp('1%'),
        marginVertical: hp('0.5%'),
        marginHorizontal: wp('2%'),
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7, 
    }
})