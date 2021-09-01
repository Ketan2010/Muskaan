// import React, { Component } from 'react'
// import { Text, StyleSheet, SafeAreaView, ScrollView, Image, Fragment, View } from 'react-native'
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import Imgcard from '../components/Imgcard';
// import SwitchSelector from 'react-native-switch-selector';
// import Card from '../components/Card';
// import HistoryReceive from '../screens/history_receive'
// import firebase from '@firebase/app'; 
// require('firebase/auth');
// require('firebase/database');

// export default class History extends Component {
  
//   constructor(props) {
//     super(props);
//     this.state = { data: ['empty'], loading:true, toggle:'Donations' };
//   }

//   componentDidMount() {
//       this.getData()
//   }

//   getData = () => {
//     var user = firebase.auth().currentUser;
//     firebase.database()
//     .ref("users/")
//     .orderByChild("uid")
//     .equalTo(user.uid)
//     .on('value', snapshot => {
//         if (snapshot.exists()) {
//           snapshot.forEach((child) => {
//             // to get donations of current user logged in
//             firebase.database()
//             .ref("users/"+child.key+"/donationsmade/")
//             .on('value', snap => {
//                 if (snap.exists()) {
//                     var dataContainer = []
//                     snap.forEach((child1) => {
//                           var val = child1.val()
//                           // push only donation id's of current user
//                           dataContainer.push(val.donationid) 
//                     });
//                     this.setState({ data: dataContainer.reverse() });   
//                     console.log('Donations array:', this.state.data)                  
//                     this.setState({loading:false})
//                 } else {
//                     console.log('There is no donations associated with this user');
//                     console.log('Donations array:', this.state.data)
//                     this.setState({loading:false})
//                 }
//             })
//           }); 
//         } else {
//           console.log('Went wrong');
//           this.setState({loading:false})
//         }
//     }) 
//   }

//   render() {
   
//     return (
//       <SafeAreaView style={styles.container}>
//           <View style={{alignSelf: 'center',width:wp('60%')}}>
//                  <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 24,color:'#C4C4C4' }}>Your activities</Text>
//            </View>
//            <SwitchSelector
//             initial={0}
//             style={{width:wp('80%'), marginTop: hp('2')}}
//             onPress={value => this.setState({toggle:value})}
//             textColor='#000000'
//             selectedColor='white'
//             buttonColor='#F44646'
//             borderColor='#F44646'
//             hasPadding
//             options={[
//               { label: "Donations", value: "Donations"}, 
//               { label: "Recieves", value: "Recieves"}
//             ]}
         
//           />  
          
//               {this.state.toggle=='Donations'?
//                 <ScrollView style={styles.scrollView}>
//                     {this.state.data[0]!=['empty']?
//                       this.state.loading?
//                           <View style={{alignItems:'center'}}>
//                             <Image 
//                                 style={{height:hp('40'), width:wp('55'), borderRadius: 4}}
//                                 source={require('../assets/images/load.gif')}
//                                 /> 
//                           </View>
//                       :
                            
//                       <View>
//                         {this.state.data.map((v)=>{
//                             return(<Imgcard key={v} itemid={v} navigation={this.props.navigation}></Imgcard>)
//                         })}
//                       </View>
                  
//                     :
//                     <View style={{alignItems:'center', marginTop:hp('20')}}>
//                             <Image 
//                                 style={{height:hp('20'), width:wp('25'), borderRadius: 4}}
//                                 source={require('../assets/images/pin.png')}
//                                 />
//                             <Text>Your donations will appear here</Text>
                            
//                     </View>
//                     }
                    
//                 </ScrollView>
//               :
//                 <HistoryReceive />
                
//               }
          
//         </SafeAreaView>
//     )
//   }
// }

// const styles = StyleSheet.create({
//     container: { 
//     flex: 1, 
//     alignItems: 'center', 
//     justifyContent: 'center',
//     marginTop: hp('20%'),
    
//   },
//   scrollView: {
//     width: wp('90%'),
//     marginTop: hp('2')

//   },
// })



import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, SafeAreaView, ScrollView, Image, Fragment, View, Button } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Imgcard from '../components/Imgcard';
import SwitchSelector from 'react-native-switch-selector';
import Card from '../components/Card';
import HistoryReceive from '../screens/history_receive'
import firebase from '@firebase/app'; 
import { TouchableOpacity } from 'react-native';
require('firebase/auth');
require('firebase/database');

export default function History({navigation}) {
  
  
  const [data,setdata] = useState(['empty'])
  const [loading,setloading] = useState(true)

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    var user = firebase.auth().currentUser;
    firebase.database()
    .ref("users/")
    .orderByChild("uid")
    .equalTo(user.uid)
    .on('value', snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach((child) => {
            // to get donations of current user logged in
            firebase.database()
            .ref("users/"+child.key+"/donationsmade/")
            .on('value', snap => {
                if (snap.exists()) {
                    var dataContainer = []
                    snap.forEach((child1) => {
                          var val = child1.val()
                          // push only donation id's of current user
                          dataContainer.push(val.donationid) 
                    });
                    setdata(dataContainer.reverse())
                    console.log('Donations array:', data)                  
                    setloading(false)
                } else {
                    console.log('There is no donations associated with this user');
                    console.log('Donations array:', data)
                    setloading(false)
                }
            })
          }); 
        } else {
          console.log('Went wrong');
          setloading(false);
        }
    }) 
  }

   
    return (
      <SafeAreaView style={styles.container}>
          <View style={{alignSelf: 'center',width:wp('60%')}}>
                 <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 24,color:'#C4C4C4' }}>Your activities</Text>
           </View>
           <View style={{flexDirection:'row'}}>
             <View style={{flex:1,flexWrap:'wrap-reverse'}}>
             <TouchableOpacity style={{...styles.buttonstyle,width:hp(20)}} onPress={()=>navigation.navigate('HistoryScreen')}>
                  <Text style={{fontSize:hp('2'),textAlign:'center',top:hp('1')}}>Donations</Text>
               </TouchableOpacity>
             </View>
             <View style={{flex:1,marginLeft:wp('-8')}}>
             <TouchableOpacity style={{...styles.buttonstyle,backgroundColor:'transparent',borderColor:'red',borderWidth:1,width:hp(20)}} onPress={()=>navigation.navigate('HistoryReceive')}>
                  <Text style={{fontSize:hp('2'),textAlign:'center',top:hp('1')}}>Receive</Text>
               </TouchableOpacity>
             </View>
           </View>
           {/* <SwitchSelector
            initial={0}
            style={{width:wp('80%'), marginTop: hp('2')}}
            onPress={value => this.setState({toggle:value})}
            textColor='#000000'
            selectedColor='white'
            buttonColor='#F44646'
            borderColor='#F44646'
            hasPadding
            options={[
              { label: "Donations", value: "Donations"}, 
              { label: "Recieves", value: "Recieves"}
            ]}
          />   */}
          
              {/* {this.state.toggle=='Donations'? */}
                <ScrollView style={styles.scrollView}>
                    {data[0]!=['empty']?
                      loading?
                          <View style={{alignItems:'center'}}>
                            <Image 
                                style={{height:hp('40'), width:wp('55'), borderRadius: 4}}
                                source={require('../assets/images/load.gif')}
                                /> 
                          </View>
                      :
                            
                      <View>
                        {data.map((v)=>{
                            return(<Imgcard key={v} itemid={v} navigation={navigation}></Imgcard>)
                        })}
                      </View>
                  
                    :
                    <View style={{alignItems:'center', marginTop:hp('20')}}>
                            <Image 
                                style={{height:hp('20'), width:wp('25'), borderRadius: 4}}
                                source={require('../assets/images/pin.png')}
                                />
                            <Text>Your donations will appear here</Text>
                            
                    </View>
                    }
                    
                </ScrollView>
              {/* :
                <HistoryReceive /> */}
                
              {/* } */}
          
        </SafeAreaView>
    )
  }


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
  buttonstyle:{
    borderRadius:wp('10'),
    backgroundColor:'red',
    width:wp('30'),
    height:hp('5')
  }
})