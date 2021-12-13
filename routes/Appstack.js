import {createStackNavigator} from "@react-navigation/stack"
import React from 'react'
import { View,StyleSheet, Image,Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContent from "../components/drawer_content";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
import NotificationsScreen from '../screens/Notifications';
import SettingsScreen from "../screens/Settings";
import FeedbackScreen from '../screens/Feedbacks';
import HistoryScreen from '../screens/History';
import FAQScreen from '../screens/FAQ';
import HomeHeader from "../components/home_header";
import Editprofile from '../screens/Editprofile'
import Upgradeprofile from '../screens/Upgradeprofile'
import SearchResult from '../screens/SearchResult'
import ChatScreen from '../screens/ChatScreen'
import Requests from '../screens/Requests'
import FAQanswer from '../screens/FAQanswer'
import ForgotPass from '../screens/Forgot_pass'
import ReceiveScreen from "../screens/ReceiveScreen";
import Donation from '../screens/Donation'
import Tabs from "../components/bottom_tab";
import Karma from "../screens/Karma";
import { TouchableOpacity } from "react-native";
import Spinthewheel from "../screens/Spinthewheel";
import HistoryReceive from "../screens/history_receive";
import Card from "../components/Card_book";

const Stack = createStackNavigator()
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const HistoryStack = createStackNavigator();;
const FeedbackStack = createStackNavigator();
const FAQStack = createStackNavigator();
// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MessageStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} 
    options={{
                  headerTitle:false,
                  headerStyle: {
                    height:400, // Specify the height of your custom header
                  },
                  headerTransparent: true,
                  headerBackground: props => <HomeHeader style={{position:'absolute'}}{...props}/>,
                  headerLeft: () => (
                      <Icon name="menu" size={hp('5%')} style={{position:'absolute',top:hp('9%'),left:wp('2%'),color:'white'}} onPress={() => navigation.openDrawer()}></Icon>
                  ),
                  
                  }}
                   />
    <Stack.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={({route}) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
        headerStyle: {
          height:100, 
           // Specify the height of your custom header
        },
      })}
    />
  </Stack.Navigator>
);




const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator initialRouteName='Tabs'>
          
          <HomeStack.Screen name="Tabs" component={Tabs} options={{
          headerTitle:false,
          headerStyle: {
            height:400, // Specify the height of your custom header
          },
          headerTransparent: true,
          headerBackground: props => <HomeHeader style={{position:'absolute'}}{...props}/>,
          headerLeft: () => (
              <Icon name="menu" size={hp('5%')} style={{position:'absolute',top:hp('5%'),left:wp('2%'),color:'white'}} onPress={() => navigation.openDrawer()}></Icon>
          ),
           headerRight: () => (
              <Icon name="" size={hp('7%')} style={{position:'absolute',top:hp('5%'),right:wp('5%'),color:'white'}} onPress={() => navigation.navigate('Home', { screen: 'Karma' })}>
                  <Image style={{position:'absolute',top:hp('5%'), width:wp('10%'),height:hp('5%'), right:wp('5%')}}  source={require('../assets/images/karma.png')} />   
              </Icon>                    
            ),
          }} />
          <HomeStack.Screen name="SearchResult" component={SearchResult} options={{
          headerTitle:false,
          headerStyle: {
            height:400, // Specify the height of your custom header
          },
          headerTransparent: true,
          headerBackground: props => <HomeHeader style={{position:'absolute'}}{...props}/>,
          headerLeft: () => (
              <Icon name="menu" size={hp('5%')} style={{position:'absolute',top:hp('5%'),left:wp('2%'),color:'white'}} onPress={() => navigation.openDrawer()}></Icon>
          ),
           headerRight: () => (
              <Icon name="" size={hp('7%')} style={{position:'absolute',top:hp('5%'),right:wp('5%'),color:'white'}} onPress={() => navigation.navigate('Home', { screen: 'Karma' })}>
                  <Image style={{position:'absolute',top:hp('5%'), width:wp('10%'),height:hp('5%'), right:wp('5%')}}  source={require('../assets/images/karma.png')} />   
              </Icon>                    
            ),
          }} />
          <HomeStack.Screen name="ReceiveScreen" component={ReceiveScreen} options={{
          headerTitle:false,
          headerStyle: {
            height:400, // Specify the height of your custom header
          },
          headerTransparent: true,
          headerBackground: props => <HomeHeader style={{position:'absolute'}}{...props}/>,
          headerLeft: () => (
              <Icon name="menu" size={hp('5%')} style={{position:'absolute',top:hp('5%'),left:wp('2%'),color:'white'}} onPress={() => navigation.openDrawer()}></Icon>
          ),
          headerRight: () => (
            <Icon name="" size={hp('7%')} style={{position:'absolute',top:hp('5%'),right:wp('5%'),color:'white'}} onPress={() => navigation.navigate('Home', { screen: 'Karma' })}>
                <Image style={{position:'absolute',top:hp('5%'), width:wp('10%'),height:hp('5%'), right:wp('5%')}}  source={require('../assets/images/karma.png')} />   
            </Icon>                    
          ),
          
          }} />
          <HomeStack.Screen name="Donation" component={Donation} options={{
          headerTitle:false,
          headerStyle: {
            height:400, // Specify the height of your custom header
          },
          headerTransparent: true,
          headerBackground: props => <HomeHeader style={{position:'absolute'}}{...props}/>,
          headerLeft: () => (
              <Icon name="menu" size={hp('5%')} style={{position:'absolute',top:hp('5%'),left:wp('2%'),color:'white'}} onPress={() => navigation.openDrawer()}></Icon>
          ),
          headerRight: () => (
            <Icon name="" size={hp('7%')} style={{position:'absolute',top:hp('5%'),right:wp('5%'),color:'white'}} onPress={() => navigation.navigate('Home', { screen: 'Karma' })}>
                <Image style={{position:'absolute',top:hp('5%'), width:wp('10%'),height:hp('5%'), right:wp('5%')}}  source={require('../assets/images/karma.png')} />   
            </Icon>                    
          ),
          
          }} />
          <HomeStack.Screen name="Karma" component={Karma} options={{
          headerTitle:false,
          headerStyle: {
            height:400, // Specify the height of your custom header
          },
          headerTransparent: true,
          headerBackground: props => <HomeHeader style={{position:'absolute'}}{...props}/>,
          headerLeft: () => (
              <Icon name="menu" size={hp('5%')} style={{position:'absolute',top:hp('5%'),left:wp('2%'),color:'white'}} onPress={() => navigation.openDrawer()}></Icon>
          ),
          headerRight: () => (
            <Icon name="" size={hp('7%')} style={{position:'absolute',top:hp('5%'),right:wp('5%'),color:'white'}} onPress={() => navigation.navigate('Home', { screen: 'Karma' })}>
                <Image style={{position:'absolute',top:hp('5%'), width:wp('10%'),height:hp('5%'), right:wp('5%')}}  source={require('../assets/images/karma.png')} />   
            </Icon>                    
          ),
          
          }} />

          <HomeStack.Screen name="Spinthewheel" component={Spinthewheel} options={{
            // headerShown: false
          headerTitle:false,
          headerStyle: {
            height:400, // Specify the height of your custom header
          },
          headerTransparent: true,
          headerBackground: props => <HomeHeader style={{position:'absolute'}}{...props}/>,
          headerLeft: () => (
              <Icon name="menu" size={hp('5%')} style={{position:'absolute',top:hp('5%'),left:wp('2%'),color:'white'}} onPress={() => navigation.openDrawer()}></Icon>
          ),
          headerRight: () => (
            <Icon name="" size={hp('7%')} style={{position:'absolute',top:hp('5%'),right:wp('5%'),color:'white'}} onPress={() => navigation.navigate('Home', { screen: 'Karma' })}>
                <Image style={{position:'absolute',top:hp('5%'), width:wp('10%'),height:hp('5%'), right:wp('5%')}}  source={require('../assets/images/karma.png')} />   
            </Icon>                    
          ),
          
          }} />
  </HomeStack.Navigator>
  );
  
  const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator  >
          <ProfileStack.Screen  name="ProfileScreen" component={ProfileScreen} options={{
            headerTitle:false,
            headerStyle: {
              height:400, // Specify the height of your custom header
            },
            headerTransparent: true,
            
            headerBackground: props => <HomeHeader style={{position:'absolute'}}{...props}/>,
            headerLeft: () => (
                <Icon name="menu" size={hp('5%')} style={{position:'absolute',top:hp('5%'),left:wp('2%'),color:'white'}} onPress={() => navigation.openDrawer()}></Icon>
            ),
           
          
          }} />
          <ProfileStack.Screen name="Editprofile" component={Editprofile} options={{
            headerTitle:false,
            headerStyle: {
              height:400, // Specify the height of your custom header
            },
            headerTransparent: true,
            unmountOnBlur: true,
            headerBackground: props => <HomeHeader style={{position:'absolute'}}{...props}/>,
            headerLeft: () => (
                <Icon name="menu" size={hp('5%')} style={{position:'absolute',top:hp('5%'),left:wp('2%'),color:'white'}} onPress={() => navigation.openDrawer()}></Icon>
            ),
          
          }} />
          <ProfileStack.Screen name="Upgradeprofile" component={Upgradeprofile} options={{
            headerTitle:false,
            headerStyle: {
              height:400, // Specify the height of your custom header
            },
            headerTransparent: true,
            unmountOnBlur: true,
            headerBackground: props => <HomeHeader style={{position:'absolute'}}{...props}/>,
            headerLeft: () => (
                <Icon name="menu" size={hp('5%')} style={{position:'absolute',top:hp('5%'),left:wp('2%'),color:'white'}} onPress={() => navigation.openDrawer()}></Icon>
            ),
          
          }} />
  </ProfileStack.Navigator>
  );


  const NotificationsStackScreen = ({navigation}) => (
    <NotificationsStack.Navigator >
            <NotificationsStack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{
            headerTitle:false,
            headerStyle: {
              height:400, // Specify the height of your custom header
            },
            headerTransparent: true,
            headerBackground: props => <HomeHeader style={{position:'absolute'}}{...props}/>,
            headerLeft: () => (
                <Icon name="menu" size={hp('5%')} style={{position:'absolute',top:hp('5%'),left:wp('2%'),color:'white'}} onPress={() => navigation.openDrawer()}></Icon>
            ),
            }} />
    </NotificationsStack.Navigator>
    );

    const SettingsStackScreen = ({navigation}) => (
      <SettingsStack.Navigator >
              <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} options={{
              headerTitle:false,
              headerStyle: {
                height:400, // Specify the height of your custom header
              },
              headerTransparent: true,
              headerBackground: props => <HomeHeader style={{position:'absolute'}}{...props}/>,
              headerLeft: () => (
                  <Icon name="menu" size={hp('5%')} style={{position:'absolute',top:hp('5%'),left:wp('2%'),color:'white'}} onPress={() => navigation.openDrawer()}></Icon>
              ),
              
              }} />
              <SettingsStack.Screen name="ForgotPassScreen" component={ForgotPass} options={{
              headerTitle:false,
              headerStyle: {
                height:400, // Specify the height of your custom header
              },
              headerTransparent: true,
              headerBackground: props => <HomeHeader style={{position:'absolute'}}{...props}/>,
              headerLeft: () => (
                  <Icon name="menu" size={hp('5%')} style={{position:'absolute',top:hp('5%'),left:wp('2%'),color:'white'}} onPress={() => navigation.openDrawer()}></Icon>
              ),
              
              }} />
      </SettingsStack.Navigator>
      );

      const HistoryStackScreen = ({navigation}) => (
        <HistoryStack.Navigator initialRouteName="HistoryScreen" >
                <HistoryStack.Screen name="HistoryScreen"  component={HistoryScreen} options={{
                headerTitle:false,
                headerStyle: {
                  height:400, // Specify the height of your custom header
                },
                headerTransparent: true,
                headerBackground: props => <HomeHeader style={{position:'absolute'}}{...props}/>,
                headerLeft: () => (
                    <Icon name="menu" size={hp('5%')} style={{position:'absolute',top:hp('5%'),left:wp('2%'),color:'white'}} onPress={() => navigation.openDrawer()}></Icon>
                ),
                
                }} />
                <HistoryStack.Screen name="Requests" component={Requests} options={{
                headerTitle:false,
                headerStyle: {
                  height:400, // Specify the height of your custom header
                },
                headerTransparent: true,
                headerBackground: props => <HomeHeader style={{position:'absolute'}}{...props}/>,
                headerLeft: () => (
                    <Icon name="menu" size={hp('5%')} style={{position:'absolute',top:hp('5%'),left:wp('2%'),color:'white'}} onPress={() => navigation.openDrawer()}></Icon>
                ),
                
                }} />
                <HistoryStack.Screen name="HistoryReceive" component={HistoryReceive} options={{
                headerTitle:false,
                headerStyle: {
                  height:400, // Specify the height of your custom header
                },
                headerTransparent: true,
                headerBackground: props => <HomeHeader style={{position:'absolute'}}{...props}/>,
                headerLeft: () => (
                    <Icon name="menu" size={hp('5%')} style={{position:'absolute',top:hp('5%'),left:wp('2%'),color:'white'}} onPress={() => navigation.openDrawer()}></Icon>
                ),
                
                }} />
                <HistoryStack.Screen
                  name="ChatScreen"
                  component={ChatScreen}
                  options={({route}) => ({
                    title: route.params.userName,
                    headerBackTitleVisible: false,
                    headerStyle: {
                      height:100, 
                      // Specify the height of your custom header
                    },
                  })}
                />
                
        </HistoryStack.Navigator>
        );

        const FeedbackStackScreen = ({navigation}) => (
          <FeedbackStack.Navigator >
                  <FeedbackStack.Screen name="FeedbackScreen" component={MessageStack} options={{
                  headerTitle:false,
                  // headerStyle: {
                  //   height:400, // Specify the height of your custom header
                  // },
                  headerTransparent: true,
                  // headerBackground: props => <HomeHeader style={{position:'absolute'}}{...props}/>,
                  // headerLeft: () => (
                  //     <Icon name="menu" size={hp('5%')} style={{position:'absolute',top:hp('5%'),left:wp('2%'),color:'white'}} onPress={() => navigation.openDrawer()}></Icon>
                  // ),
                  
                  }} />
                  {/* <FeedbackStack.Screen name="ChatScreen" component={ChatScreen} options={{
                  headerTitle:false,
                  headerStyle: {
                    height:400, // Specify the height of your custom header
                  },
                  headerTransparent: true,
                  headerBackground: props => <HomeHeader style={{position:'absolute'}}{...props}/>,
                  headerLeft: () => (
                      <Icon name="menu" size={hp('5%')} style={{position:'absolute',top:hp('5%'),left:wp('2%'),color:'white'}} onPress={() => navigation.openDrawer()}></Icon>
                  ),
                  
                  }} /> */}
                  
          </FeedbackStack.Navigator>
          );

          const FAQStackScreen = ({navigation}) => (
            <FAQStack.Navigator >
                    <FAQStack.Screen name="FAQScreen" component={FAQScreen} options={{
                    headerTitle:false,
                    headerStyle: {
                      height:400, // Specify the height of your custom header
                    },
                    headerTransparent: true,
                    headerBackground: props => <HomeHeader style={{position:'absolute'}}{...props}/>,
                    headerLeft: () => (
                        <Icon name="menu" size={hp('5%')} style={{position:'absolute',top:hp('5%'),left:wp('2%'),color:'white'}} onPress={() => navigation.openDrawer()}></Icon>
                    ),
                    
                    }} />
                    <FAQStack.Screen name="FAQanswer" component={FAQanswer} options={{
                    headerTitle:false,
                    headerStyle: {
                      height:400, // Specify the height of your custom header
                    },
                    headerTransparent: true,
                    headerBackground: props => <HomeHeader style={{position:'absolute'}}{...props}/>,
                    headerLeft: () => (
                        <Icon name="menu" size={hp('5%')} style={{position:'absolute',top:hp('5%'),left:wp('2%'),color:'white'}} onPress={() => navigation.openDrawer()}></Icon>
                    ),
                    
                    }} />
            </FAQStack.Navigator>
            );

const AppStack = () => {
 
  return(
    // <NavigationContainer>
        <Drawer.Navigator drawerContent = { props => <DrawerContent {...props}/>}>
          <Drawer.Screen name="Home" component={HomeStackScreen} />
          <Drawer.Screen name="Profile" component={ProfileStackScreen} />
          <Drawer.Screen name="Notifications" component={NotificationsStackScreen} />
          <Drawer.Screen name="Settings" component={SettingsStackScreen} />
          <Drawer.Screen name="History" component={HistoryStackScreen} />
          <Drawer.Screen name="Feedback" component={FeedbackStackScreen} />
          <Drawer.Screen name="FAQ" component={FAQStackScreen} />
        </Drawer.Navigator>
    // </NavigationContainer>
    
  )

}

export default AppStack;