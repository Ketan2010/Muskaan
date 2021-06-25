import React from 'react';
import { View, Text, Button, SafeAreaView, ScrollView, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Card from '../components/Card';
import Icons from 'react-native-vector-icons/Ionicons';
import Imgcardshort from '../components/Imgcardshort';

const Requests = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{felx:1, flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>{navigation.navigate('HistoryScreen')}}>
                    <Icons style={{marginLeft:wp('-4')}} name='arrow-back-circle-outline' color={'#F44646'} size={hp('4%')} />
                </TouchableOpacity>
                <View style={{alignSelf: 'center',width:wp('60%')}}>
                        <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 20,color:'#C4C4C4' }}>Donating Item</Text>
                </View>

            </View>
            <Imgcardshort date='30 March' time='8:00 PM'  item='Chapati bhaji' quantity= '3' pickuptimefrom='9:30 AM' pickuptimeto='10:20 AM' shelflife='3 Hours' address='Naroji Nagar, Dadar, Mumbai' foodimg='../assets/images/food.jpg' donationstatus='PENDING' donatedto='Micky'></Imgcardshort>
            <View style={{alignSelf: 'center',width:wp('60%')}}>
                    <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 20,color:'#C4C4C4' }}>Requests</Text>
            </View>
            <ScrollView style={styles.scrollView}>
                <Card notificationtype='from' date='30 March' time='8:00 PM' user='Micky' item='Chapati bhaji' quantity= '3' pickuptimefrom='9:30 AM' pickuptimeto='10:20 AM' shelflife='3 Hours' address='Naroji Nagar, Dadar, Mumbai'></Card>
                <Card notificationtype='from' date='30 March' time='8:00 PM' user='Micky' item='Chapati bhaji' quantity= '3' pickuptimefrom='9:30 AM' pickuptimeto='10:20 AM' shelflife='3 Hours' address='Naroji Nagar, Dadar, Mumbai'></Card>
                <Card notificationtype='from' date='30 March' time='8:00 PM' user='Micky' item='Chapati bhaji' quantity= '3' pickuptimefrom='9:30 AM' pickuptimeto='10:20 AM' shelflife='3 Hours' address='Naroji Nagar, Dadar, Mumbai'></Card>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Requests

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
})
