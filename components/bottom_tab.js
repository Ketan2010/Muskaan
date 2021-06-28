import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, Image, TouchableOpacity,View } from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-gradient-icon';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Post from '../screens/Post';
import Likes from '../screens/Likes';

import FeedbackScreen from '../screens/Feedbacks';
import AddButton from './add_button';
import { LinearGradient } from 'expo-linear-gradient';
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
                bottom:hp('0.5%'),
                left:10,
                right:10,
                elevation:9,
                backgroundColor:'white',
                borderRadius:15,
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
            <Tab.Screen name="FeedbackScreen" component={FeedbackScreen}  
            options={{
                tabBarIcon:({focused}) => (
                    // <Image source={require('../assets/images/donationicon.png')} resizeMode="contain"
                    //     style={{width:30,height:30,tintColor:focused ? '#e32f45' : '#748c94'}}/>
                    // <View style={{alignItems:'center',justifyContent:'center',top:5}}>
                    //    { focused ? 
                    //     <Icon  
                    //     size={wp('9%')}
                    //     colors={[
                    //         {color:"gold",offset:"0",opacity:"5"},
                    //         {color:"red",offset:"1",opacity:"1"},
                    //     ]}
                    //     name="plus" type="ionicons" /> 
                    //     : <Icon  
                    //     size={wp('6%')}
                    //     colors={[
                    //         {color:"#ffe066",offset:"0",opacity:"5"},
                    //         {color:"#ff9933",offset:"1",opacity:"1"},
                    //     ]}
                    //     name="plus" type="ionicons" /> } 
                    //     {/* <Text>Post</Text> */}
                    // </View>
                    <AddButton/>
                ),
                // tabBarButton : (props) => (
                //     <CustomTabBarButton {...props} />
                // )
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
                        <Icon  
                        size={wp('9%')}
                        colors={[
                            {color:"gold",offset:"0",opacity:"5"},
                            {color:"red",offset:"1",opacity:"1"},
                        ]}
                        name="heart" type="ionicons" /> 
                        : <Icon  
                        size={wp('6%')}
                        colors={[
                            {color:"#ffe066",offset:"0",opacity:"5"},
                            {color:"#ff9933",offset:"1",opacity:"1"},
                        ]}
                        name="heart" type="ionicons" /> } 
                        { focused ? <Text style={{color:'#cc7a00',fontSize:hp('1.5%')}}>Likes</Text> : <Text style={{color:'#e69500',fontSize:hp('1.3%')}}>Likes</Text> }
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
        elevation:5
    }
})

export default Tabs;