import React, {useState, PropTypes} from 'react';
import { View, Text, Button, SafeAreaView, ScrollView, StyleSheet, StatusBar } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Card from '../components/Card'
import Imgcard from '../components/Imgcard';
import SwitchSelector from 'react-native-switch-selector';


export default function History({navigation}){
    const [toggle, settoggle] = useState('Donations')
  
    return (
    <SafeAreaView style={styles.container}>
      <View style={{alignSelf: 'center',width:wp('60%')}}>
            <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 24,color:'#C4C4C4' }}>Your activities</Text>
      </View>
      <SwitchSelector
        initial={0}
        style={{width:wp('80%'), marginTop: hp('2')}}
        onPress={value => settoggle(value)}
        textColor='#000000'
        selectedColor='white'
        buttonColor='#F44646'
        borderColor='#F44646'
        hasPadding
        options={[
          { label: "Donations", value: "Donations"}, 
          { label: "Recieves", value: "Recieves"}
        ]}
     
      />
      
          {toggle=='Donations'?
            <ScrollView style={styles.scrollView}>
                <Imgcard navigation={navigation} date='30 March' time='8:00 PM'  item='Chapati bhaji' quantity= '3' pickuptimefrom='9:30 AM' pickuptimeto='10:20 AM' shelflife='3 Hours' address='Naroji Nagar, Dadar, Mumbai' foodimg='../assets/images/food.jpg' donationstatus='PENDING' donatedto='Micky'></Imgcard>
                <Imgcard navigation={navigation} date='30 March' time='8:00 PM'  item='Chapati bhaji' quantity= '3' pickuptimefrom='9:30 AM' pickuptimeto='10:20 AM' shelflife='3 Hours' address='Naroji Nagar, Dadar, Mumbai' foodimg='../assets/images/food.jpg' donationstatus='DONATED' donatedto='Micky'></Imgcard>
            </ScrollView>
          :
            <ScrollView style={styles.scrollView}>
                <Card notificationtype='to' date='2 March' time='4:00 PM' user='Joan' item='Pav bhaji' quantity= '1' pickuptimefrom='9:30 AM' pickuptimeto='10:20 AM' shelflife='3 Hours' address='Naroji Nagar, Dadar, Mumbai' status='PENDING'></Card>
                <Card notificationtype='to' date='2 March' time='4:00 PM' user='Joan' item='Pav bhaji' quantity= '1' pickuptimefrom='9:30 AM' pickuptimeto='10:20 AM' shelflife='3 Hours' address='Naroji Nagar, Dadar, Mumbai' status='REFUSED'></Card>
                <Card notificationtype='to' date='2 March' time='4:00 PM' user='Joan' item='Pav bhaji' quantity= '1' pickuptimefrom='9:30 AM' pickuptimeto='10:20 AM' shelflife='3 Hours' address='Naroji Nagar, Dadar, Mumbai' status='ACCEPTED'></Card>
            </ScrollView>
          }
      
    </SafeAreaView>
    );
};



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






































































































// import React from 'react';
// import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// import {Card} from 'react-native-shadow-cards';
// import { useFonts } from 'expo-font';
// import AppLoading from 'expo-app-loading';

// const SettingsScreen = ({navigation}) => {
//     let [fontsLoaded] = useFonts({
//       'Volkhov-Bold': require('../assets/fonts/Volkhov-Bold.ttf'),
//     });

//     if (!fontsLoaded) {    
//       return <AppLoading />;
//     } else {
//       return (
//         <View style={styles.container}>
//           <Card elevation={20}  cornerRadius={wp('2%')} >
//               <View style={styles.feature}>
//                 <View style={{flex:5,left:wp('2%')}}>
//                     <Text style={{fontSize:hp('2%'),fontFamily:'Volkhov-Bold',fontWeight:'normal'}}>Ram Ahuja</Text>
//                     <Text></Text>
//                     <Text>Plates : 2</Text>
//                     <Text>30, Navinagar , Wadala</Text>
//                     <Text>Mumbai-400002</Text>
//                 </View>
//                 <View style={{flex:2,left:wp('8%')}}>
//                   <Text style={{fontStyle:'italic',fontFamily:'Volkhov-Bold'}}>17 June, 10:40</Text>
//                 </View>
//               </View>
//           </Card>   
//         </View>
//       )};
// };

// export default SettingsScreen;

// const styles = StyleSheet.create({
//   container: {
    
//     alignItems: 'center', 
//     justifyContent: 'center',
//     top:hp('22%')
//   },
//   feature:{
//     // alignItems: 'center', 
//     flexDirection: 'row',
//     padding:wp('2%'),
//     // paddingTop:hp('0.5%')
//     width:wp('80%')
//   },
// });