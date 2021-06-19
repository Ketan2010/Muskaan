import React, { Component , useState} from 'react';
import { View, Text, Image, Button , StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Card} from 'react-native-shadow-cards';
import {Picker} from '@react-native-picker/picker';
import { SearchBar } from 'react-native-elements';
// import { SearchBar } from 'react-native-elements';
const SettingsScreen = ({navigation}) => {
  
  const [selectedValue, setSelectedValue] = useState("java");

  const [isEnabledApp, setIsEnabledApp] = useState(false);
  const toggleSwitchApp = () => setIsEnabledApp(previousState => !previousState);

  const [isEnabledMail, setIsEnabledMail] = useState(false);
  const toggleSwitchMail = () => setIsEnabledMail(previousState => !previousState);

  const [isNotificationsEnabled, setIsNotificationsEnabled] =useState(false);
  const NotificationSwitch =() =>setIsNotificationsEnabled (previousState=> !previousState)

  const [isEnabledHelp, setEnabledHelp] = useState(false);
  const helpSwitch = () => setEnabledHelp(previousState=>!previousState)
  
  

 
    return (
      <View style={styles.container}>
        
          <View style={styles.parameter}>
             <View style={{flex:1}}>
                <Icons name='globe-outline'  color={'#5a5858'} size={hp('4.5%')} />
                {/* <Image source={require('../assets/images/languageicon.png')} style={{width:wp('3%'),height:hp('5%')}}/> */}
              </View>
              <View style={{flex:3}}>
                <Text style={styles.text}>Languages</Text>
              </View>
              <View style={{flex:3,left:wp('7%')}}>
              <Picker
                
                selectedValue={selectedValue}
                style={{ height: hp('5%'), width:wp('33%') }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
                <Picker.Item  style={{fontSize:9}} label="English" value="java" />
                <Picker.Item label="Hindi" value="js" />
              </Picker>
                  
                
              </View>
          </View>
          {/* <View style={styles.line} /> */}
          <TouchableOpacity onPress={ () => NotificationSwitch()}>
          <View style={styles.parameternotify}>
             <View style={{flex:1}}>
                <Icon name='bell-outline' color={'#5a5858'} size={hp('4.5%')} />
              </View>
              <View style={{flex:6}}>
              <Text style={styles.text}>Notifications</Text>
              </View>
          </View>
          </TouchableOpacity>
          <Text> { isNotificationsEnabled ? 
          <Card elevation={6}  cornerRadius={wp('2%')} style={{width:wp('80%')}}>
          <View style={{backgroundColor:'#d9d9d9'}}>
          <View style={styles.feature}>
             <View style={{flex:5,left:wp('2%')}}>
                <Text>App Notofications</Text>
              </View>
              <View style={{flex:2}}>
                <Switch
                  trackColor={{ false: "#767577", true: "#f5dd4b" }}
                  thumbColor={isEnabledApp ? "#F44646" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchApp}
                  value={isEnabledApp}
                />
              </View>
          </View>
          <View style={styles.feature}>
             <View style={{flex:5,left:wp('2%')}}>
                <Text>Mail and SMS Notifications</Text>
              </View>
              <View style={{flex:2}}>
                <Switch
                  trackColor={{ false: "#767577", true: "#f5dd4b" }}
                  thumbColor={isEnabledMail ? "#F44646" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchMail}
                  value={isEnabledMail}
                />
              </View>
          </View>
          </View>
          </Card> : ''}
          </Text>
          {/* <View style={styles.line} /> */}
          <View style={styles.parameter}>
             <View style={{flex:1}}>
                <Icon name='security' color={'#5a5858'} size={hp('4.5%')} />
              </View>
              <View style={{flex:2}}>
                <Text style={styles.text}>Security</Text>
              </View>
              <View style={{flex:4}}>
              
                <Text style={{textAlign:'right'}}>Change password</Text>
              </View>
          </View>
          {/* <View style={styles.line} /> */}
          <TouchableOpacity onPress={() => helpSwitch()}>
          <View style={styles.parameternotify}>
             <View style={{flex:1}}>
                <Icons name='help-circle-outline' color={'#5a5858'} size={hp('4.5%')} />
              </View>
              <View style={{flex:3}}>
                <Text style={styles.text}>Help</Text>
              </View>
              <View style={{flex:3}}>
              </View>
          </View>
          </TouchableOpacity>
          <Text>{ isEnabledHelp ? 
          <View>
          <Text style={{left:wp('12%'),top:hp('1%'),fontSize:hp('2%')}}>Report a problem</Text>
          <Text style={{left:wp('12%'),top:hp('1%'),fontSize:hp('2%')}}>Help Center</Text> 
          </View> : null }
          </Text>
          {/* <View style={styles.line} /> */}
          <View style={styles.parameter}>
             <View style={{flex:1}}>
                <Icon name='theme-light-dark' color={'#5a5858'} size={hp('4.5%')} />
              </View>
              <View style={{flex:3}}>
                <Text style={styles.text}>Dark Mode</Text>
              </View>
              <View style={{flex:3}}>
              </View>
          </View>
          {/* <View style={styles.line} /> */}
          <View style={styles.parameter}>
             <View style={{flex:1}}>
                <Icons name='information-circle-outline' color={'#5a5858'} size={hp('4.5%')} />
              </View>
              <View style={{flex:3}}>
                <Text style={styles.text}>About</Text>
              </View>
              <View style={{flex:3}}>
              </View>
          </View>
          {/* <View style={styles.line} /> */}
          <View style={styles.parameter}>
             <View style={{flex:1}}>
                <Icon name='delete-outline' color={'#5a5858'} size={hp('4.5%')} />
              </View>
              <View style={{flex:6}}>
                <Text style={styles.text}>Delete my account</Text>
              </View>
              
          </View>
          {/* <View style={styles.line} /> */}
      </View>
    );
  
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    top:hp('20%'),
    width:wp('100%'),
    // alignItems: 'center', 
    
  },
  parameter:{
    alignItems: 'center', 
    flexDirection: 'row',
    padding:hp('1.5%'),
    marginTop:hp('1.5%'),
    left:wp('5%'),
    width:wp('90%')
  },
  parameternotify:{
    alignItems: 'center', 
    flexDirection: 'row',
    padding:hp('1.5%'),
    marginBottom:hp('-2%'),
    marginTop:hp('1.5%'),
    left:wp('5%'),
    width:wp('90%')
  },
  feature:{
    alignItems: 'center', 
    flexDirection: 'row',
    // paddingTop:hp('0.5%')
  },
  text:{
    fontSize:hp('2%')
  },
  line:{
    borderBottomColor: '#b3b2b2',
    paddingTop:hp('0.5%'),
    borderBottomWidth:wp('0.3%'),
  }
});