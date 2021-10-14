import React, {useState, useEffect} from 'react'
import { View, Text, Button,Modal,Pressable,BreakException, Image, StyleSheet, TouchableOpacity} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Container,Card, UserInfo, UserImg, UserInfoText, UserName, PostTime, PostText, PostImg, InteractionWrapper, Interaction, InteractionText, Divider, PostLocation} from '../styles/FeedStyles'
import firebase from '@firebase/app';
import { LinearGradient } from "expo-linear-gradient";
import moment from 'moment-jalaali';
require('firebase/auth');
require('firebase/database');

const PostCard = (props) =>{

    
    // console.log(props.postownerid)
    const [postownername, setpostownername] = useState('');
    const [alreadyliked, setalreadyliked] = useState(false);

    // console.warn(props.postownerid)
    useEffect(() => {
        let name='';
        
        firebase.database()
        .ref('users/')
        .orderByChild("uid")
        .equalTo(props.postownerid)
        .on('value',snap=>{
            if(snap.exists()){
                snap.forEach((child) => {
                    name=child.val().name
                    // console.warn(name)
                    firebase.database()
                    .ref('users/'+child.key+'/likedposts')
                    .on('value', snapshots =>{
                        if(snapshots.exists()){
                            snapshots.forEach((child1)=>{
                                if (child1.val()==props.postkey){
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
        if ( flag === false){
                // console.log(alreadyliked);
                console.log('chack flaf valre in inser'+flag)
                firebase.database()
                .ref('users/')
                .on('value', snapshot => {
                
                // console.log(user.uid)
                    if (snapshot.exists()) {
                    snapshot.forEach((child) => {
                        if ( child.val().uid==props.uids && flag==false)
                        {    
                            // console.log(props.uids)
                            setalreadyliked(true);
                            
                            flag=true;
                            console.log('insert jjjjjjjjjjjjjjjjj'+flag)
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
        }else{
            console.log('chack flaf valre in delete'+flag)
            firebase.database()
            .ref('users/')
            .on('value', snapshot => {
            if (snapshot.exists()) {
                snapshot.forEach((child) => {
                    if ( child.val().uid==props.uids)
                    {    
                        flag=true;
                        firebase.database()
                        .ref('users/'+child.key+'/likedposts/')
                        .once( 'value', snapshots => {
                            if(snapshots.exists()){
                                snapshots.forEach((child1) => {
                                    if (child1.val().postlikedid==props.postkey && flag==true){
                                        setalreadyliked(false);
                                        // console.log(child1.key)
                                        
                                        flag=false;
                                        console.log('delete'+flag);
                                        // console.log('users/' + child.key+'/likedpost/'+child1.key)
                                        // firebase.database().ref('users/'+child.key+'/likedpost/').remove();
                                        firebase.database().ref('users/' + child.key+'/likedpost/'+child1.key).child('postlikedid').remove();
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
                <UserName>{postownername}</UserName>
                <PostLocation>{props.val.citystate}</PostLocation>
            </UserInfoText>
        </UserInfo>
        <Image source={{uri:props.val.imguri}}  style={{height:hp('27'),borderWidth:wp('0.2'),borderColor:'#bfbfbf'}} resizeMode='contain' />
        {/* <Divider/> */}
        <PostText>{props.val.posttext}</PostText>
        <TouchableOpacity onPress={()=>likedpost(props.postkey)}>
            <InteractionWrapper>
                    {   alreadyliked==true ? <Ionicons name="heart" color="red" size={25} /> 
                        : <Ionicons name="heart-outline" color="black" size={25} />
                    }
                    
                    <InteractionText>{props.val.likes} Likes</InteractionText>
            </InteractionWrapper>
        </TouchableOpacity>
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
        marginVertical: hp('2%'),
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