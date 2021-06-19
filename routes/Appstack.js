import {createStackNavigator} from "@react-navigation/stack"
import React from 'react'
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

const Stack = createStackNavigator()
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const HistoryStack = createStackNavigator();;
const FeedbackStack = createStackNavigator();
const FAQStack = createStackNavigator();

const Drawer = createDrawerNavigator();

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator >
          
          <HomeStack.Screen name="Home" component={HomeScreen} options={{
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
  </HomeStack.Navigator>
  );
  
  const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator >
          <ProfileStack.Screen name="Details" component={ProfileScreen} options={{
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
  </ProfileStack.Navigator>
  );


  const NotificationsStackScreen = ({navigation}) => (
    <NotificationsStack.Navigator >
            <NotificationsStack.Screen name="Notifications" component={NotificationsScreen} options={{
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
              <SettingsStack.Screen name="Settings" component={SettingsScreen} options={{
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
        <HistoryStack.Navigator >
                <HistoryStack.Screen name="History" component={HistoryScreen} options={{
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
        </HistoryStack.Navigator>
        );

        const FeedbackStackScreen = ({navigation}) => (
          <FeedbackStack.Navigator >
                  <FeedbackStack.Screen name="Feedback" component={FeedbackScreen} options={{
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
          </FeedbackStack.Navigator>
          );

          const FAQStackScreen = ({navigation}) => (
            <FAQStack.Navigator >
                    <FAQStack.Screen name="FAQ" component={FAQScreen} options={{
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