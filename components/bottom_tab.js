import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, Image, TouchableOpacity,View } from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import Iconss from 'react-native-vector-icons/MaterialIcons';
import { Icon } from 'react-native-gradient-icon';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Post from '../screens/Post';
import Likes from '../screens/Likes';

import FeedbackScreen from '../screens/Feedbacks';
import AddButton from './add_button';
import { LinearGradient } from 'expo-linear-gradient';
import DonateReceiveDine from '../screens/DonateReceiveDine';
const Tab = createBottomTabNavigator(); 

const CustomTabBarButton = ({children,onPress}) =>{
    return(
    <TouchableOpacity
      style={{
          justifyContent:'center',
          alignItems:'center',
          
      }}
    >
        <View onPress={onPress} style={{width:80,height:80}}>
            {children}
        </View>
    </TouchableOpacity>
    )
};

const Tabs =() =>{

    return(
        <Tab.Navigator tabBarOptions={{
            showLabel: false, 
            style:{
                position:'absolute',
                paddingBottom:8,
                paddingLeft:5,
                paddingRight:5,
                paddingTop:8,
                bottom:hp('0%'),
                left:1,
                right:1,
                elevation:9,
                backgroundColor:'#f2f2f2',
                // borderRadius:15,
                borderColor:'#737373',
                borderWidth:hp('0.2'),
                borderTopLeftRadius:20,
                borderTopRightRadius:20,
                height:hp('8%'),
                ...styles.shadow
            } }}>
            <Tab.Screen name="Home" component={Home}  
            options={{
                tabBarIcon:({focused}) =>(
                    <View style={{alignItems:'center',justifyContent:'center',top:5}}>
                        
                        { focused ? 
                        <Icon  
                        size={wp('9%')}
                        colors={[
                            {color:"gold",offset:"0",opacity:"5"},
                            {color:"red",offset:"1",opacity:"1"},
                        ]}
                        name="home" type="ionicons" /> 
                        : <Icon  
                        size={wp('6%')}
                        colors={[
                            {color:"#ffe066",offset:"0",opacity:"5"},
                            {color:"#ff9933",offset:"1",opacity:"1"},
                        ]}
                        name="home" type="ionicons" /> } 
                        { focused ? <Text style={{color:'#cc7a00',fontSize:hp('1.5%')}}>Home</Text> : <Text style={{color:'#e69500',fontSize:hp('1.3%')}}>Home</Text> }
                    </View>
                )
            }} 
            />
            <Tab.Screen name="Search" component={Search} 
            options={{
                tabBarIcon:({focused}) =>(
                    <View style={{alignItems:'center',justifyContent:'center',top:5}}>
                        
                        { focused ? 
                        <Icon  
                        size={wp('9%')}
                        colors={[
                            {color:"gold",offset:"0",opacity:"5"},
                            {color:"red",offset:"1",opacity:"1"},
                        ]}
                        name="search" type="ionicons" /> 
                        : <Icon  
                        size={wp('6%')}
                        colors={[
                            {color:"#ffe066",offset:"0",opacity:"5"},
                            {color:"#ff9933",offset:"1",opacity:"1"},
                        ]}
                        name="search" type="ionicons" /> } 
                        { focused ? <Text style={{color:'#cc7a00',fontSize:hp('1.5%')}}>Search</Text> : <Text style={{color:'#e69500',fontSize:hp('1.3%')}}>Search</Text> }
                    </View>
                )
            }} 
             />

            <Tab.Screen name="DonateReceiveDine" component={DonateReceiveDine}  
                options={{
                    tabBarIcon:({focused}) =>(
                        <View style={{alignItems:'center',justifyContent:'center',top:2}}>
                        { focused ? 
                                <LinearGradient
                                //   colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
                                colors={['#ff6666','#ffa500']}
                                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                                style={{height: 55, alignItems: 'center', justifyContent: 'center', width: 55,borderRadius:40}}
                                >
                                    <Image style={{backgroundColor:'white'}} source={require('../assets/images/donationicon.png')} style={{height:40,width:40}} resizeMode='contain' />
                                </LinearGradient>
                                :
                                <LinearGradient
                                //   colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
                                colors={["#ffe066","#ff9933"]}
                                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                                style={{height: 55, alignItems: 'center', justifyContent: 'center', width: 55,borderRadius:40}}
                                >
                                    <Image style={{backgroundColor:'white'}} source={require('../assets/images/donationicon.png')} style={{height:40,width:40}} resizeMode='contain' />
                                </LinearGradient>
                        }
                        </View>
                    )
                }} 
            />

            
            <Tab.Screen name="Post" component={Post}  
            options={{
                tabBarIcon:({focused}) =>(
                    <View style={{alignItems:'center',justifyContent:'center',top:5}}>
                       { focused ? 
                        <Icon  
                        size={wp('9%')}
                        colors={[
                            {color:"gold",offset:"0",opacity:"5"},
                            {color:"red",offset:"1",opacity:"1"},
                        ]}
                        name="plus" type="ionicons" /> 
                        : <Icon  
                        size={wp('6%')}
                        colors={[
                            {color:"#ffe066",offset:"0",opacity:"5"},
                            {color:"#ff9933",offset:"1",opacity:"1"},
                        ]}
                        name="plus" type="ionicons" /> } 
                        { focused ? <Text style={{color:'#cc7a00',fontSize:hp('1.5%')}}>Post</Text> : <Text style={{color:'#e69500',fontSize:hp('1.3%')}}>Post</Text> }
                    </View>
                )
            }} 
            />
            <Tab.Screen name="Likes" component={Likes}  
            options={{
                tabBarIcon:({focused}) =>(
                    <View style={{alignItems:'center',justifyContent:'center',top:5}}>
                        { focused ? 
                        <Iconss
                        size={wp('9%')}
                        color='#ff9933'
                        // colors={[
                        //     {color:"gold",offset:"0",opacity:"5"},
                        //     {color:"red",offset:"1",opacity:"1"},
                        // ]}
                        name="leaderboard" type="materialicons" /> 
                        : <Iconss
                        size={wp('6%')}
                        color='#ff6633'
                        colors={[
                            {color:"#ffe066",offset:"0",opacity:"5"},
                            {color:"#ff9933",offset:"1",opacity:"1"},
                        ]}
                        name="leaderboard"  /> } 
                        { focused ? <Text style={{color:'#cc7a00',fontSize:hp('1.5%')}}>Leaderboard</Text> : <Text style={{color:'#e69500',fontSize:hp('1.3%')}}>Leaderboard</Text> }
                    </View>
                )
            }} 
            />
        </Tab.Navigator>

    )
}


const styles=StyleSheet.create({
    shadow:{
        shadowColor:'#7F5DF0',
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:9
    }
})

export default Tabs;