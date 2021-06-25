import React from 'react';
import { View, Text, Button, SafeAreaView, ScrollView, StyleSheet, StatusBar } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Notifycard from '../components/Notifycard';

const NotificationsScreen = ({navigation}) => {

  
    return (
    <SafeAreaView style={styles.container}>
      <View style={{alignSelf: 'center',width:wp('60%')}}>
            <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 24,color:'#C4C4C4' }}>Notifications</Text>
      </View>
      <ScrollView style={styles.scrollView}>
          <Notifycard notificationtype='from' date='30 March' time='8:00 PM' user='Micky' item='Chapati bhaji' quantity= '3' pickuptimefrom='9:30 AM' pickuptimeto='10:20 AM' shelflife='3 Hours' address='Naroji Nagar, Dadar, Mumbai'></Notifycard>
          <Notifycard notificationtype='to' date='2 March' time='4:00 PM' user='Joan' item='Pav bhaji' quantity= '1' pickuptimefrom='9:30 AM' pickuptimeto='10:20 AM' shelflife='3 Hours' address='Naroji Nagar, Dadar, Mumbai' status='ACCEPTED'></Notifycard>
          <Notifycard notificationtype='from' date='30 March' time='8:00 PM' user='Micky' item='Chapati bhaji' quantity= '3' pickuptimefrom='9:30 AM' pickuptimeto='10:20 AM' shelflife='3 Hours' address='Naroji Nagar, Dadar, Mumbai'></Notifycard>
          <Notifycard notificationtype='to' date='2 March' time='4:00 PM' user='Joan' item='Pav bhaji' quantity= '1' pickuptimefrom='9:30 AM' pickuptimeto='10:20 AM' shelflife='3 Hours' address='Naroji Nagar, Dadar, Mumbai' status='PENDING'></Notifycard>
          <Notifycard notificationtype='to' date='2 March' time='4:00 PM' user='Joan' item='Pav bhaji' quantity= '1' pickuptimefrom='9:30 AM' pickuptimeto='10:20 AM' shelflife='3 Hours' address='Naroji Nagar, Dadar, Mumbai' status='REFUSED'></Notifycard>
      </ScrollView>
    </SafeAreaView>
    );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: hp('20%'),
    
  },
  scrollView: {
    width: wp('90%'),
    marginTop: hp('2')

  },
});