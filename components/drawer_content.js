import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');

import {
    
    Drawer,
    Text,
    
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ImageBackground } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

export default function DrawerContent(props) {
    const onSignoutPress = () =>{
        // await props.navigation.navigate('Home', { screen: 'HomeScreen' })
        firebase.auth().signOut()
        // try {
        //       firebase.auth()
        //       .signOut()
        //       .then(() => {
        //         props.navigation.dispatch(
        //             NavigationActions.reset(
        //                 {
        //                    index: 0,
        //                    actions: [
        //                      NavigationActions.navigate({ routeName: 'Home'})
        //                    ]
        //                  })
        //         );
        //         // const resetAction = StackActions.reset({
        //         //   index: 0,
        //         //   actions: [NavigationActions.navigate('Home', { screen: 'Tabs'})],
        //         // });
        //         // props.navigation.dispatch(resetAction);
        //         // alert("You have signed out");
        //       });
        //   } catch (error) {
        //     console.log("err", error);
        //   }
    }
    const user = firebase.auth().currentUser;
    return(
        
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props} >
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',left:'-10%',top:hp('-1%')}}>
                            <ImageBackground 
                                source={require('../assets/images/1.png')}
                                // source={require('../assets/images/muskaan.png')}
                                style={styles.background}
                            >
                            
                            <View style={{top:'45%',left:30}} >
                                <Image source={require('../assets/images/dummyphoto.png')} style={{width:50,height:50, borderRadius:50/2,backgroundColor:'white'}}/>
                                {/* <Paragraph style={[styles.paragraph, styles.caption]}>-0</Paragraph> */}
                                {user.email?
                                <Text  style={{top:'15%',backgroundColor:'white',alignSelf: 'flex-start',padding:5, borderRadius:15}}>{user.email?user.email:null}</Text>
                                :null}
                             
                            </View>
                            </ImageBackground>
                        </View> 
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icons
                                name="home" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home', { screen: 'Tabs', params: { screen: 'Home' } })}}
                            labelStyle={styles.labelstyle}
                        />
                        {/* <View style={styles.line} /> */}
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icons 
                                name="account" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile" labelStyle={styles.labelstyle}
                            onPress={() => {props.navigation.navigate('Profile', { screen: 'ProfileScreen' })}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icons 
                                name="bell" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Notifications"  labelStyle={styles.labelstyle}
                            onPress={() => {props.navigation.navigate('Notifications', { screen: 'NotificationsScreen' })}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon
                                name="settings" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"  labelStyle={styles.labelstyle}
                            onPress={() => {props.navigation.navigate('Settings', { screen: 'SettingsScreen' })}}
                        />
                        
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="history" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="History"  labelStyle={styles.labelstyle}
                            onPress={() => {props.navigation.navigate('History', { screen: 'HistoryScreen' })}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="feedback" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Feedback"  labelStyle={styles.labelstyle}
                            onPress={() => {props.navigation.navigate('Feedback', { screen: 'FeedbackScreen' })}}
                        />
                        
                        
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="help" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="FAQ & Help "  labelStyle={styles.labelstyle}
                            onPress={() => {props.navigation.navigate('FAQ', { screen: 'FAQScreen' })}}
                        />
                        
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="exit-to-app" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Sign Out"  labelStyle={styles.labelstyle}
                            onPress={onSignoutPress}
                        />
                    </Drawer.Section>
                    
                </View>
            </DrawerContentScrollView>
            
        </View>
        
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    background:{
        width:wp('110%'),
        height:hp('30%')
    },
    userInfoSection: {
      paddingLeft: wp('4%'),
    },
    
    
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: hp('1%'),
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: hp('2%')
    },
    labelstyle:{
        fontSize:hp('2%')
    },
    line:{
        borderBottomColor: '#b3b2b2',
        paddingTop:hp('0.5%'),
        borderBottomWidth:wp('0.3%'),
        width:wp('58%'),
        left:wp('4%')
      }
    
    
  });