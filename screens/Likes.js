// import React from 'react';
// import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
// import { useTheme } from '@react-navigation/native';
// import Leaderboard from 'react-native-leaderboard';

// const Likes = ({navigation}) => {

//   const  data = [
//       {userName: 'Joe', highScore: 52},
//       {userName: 'Jenny', highScore: 120},
//   ] 
//   const { colors } = useTheme();

//   const theme = useTheme();
  
//     return (
//       <View style={styles.container}>
       
//       <Text>Likes</Text>
//       <Leaderboard 
//         data={data} 
//         sortBy='highScore' 
//         labelBy='userName'/>
//       </View>
//     );
// };

// export default Likes;

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1, 
//     top:'20%',
//     alignItems: 'center', 
//     justifyContent: 'center'
//   },
// });


import React, { Component, useEffect } from 'react';
import { View, Alert, Image, Text, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
// import { colors } from '../../config';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Leaderboard from 'react-native-leaderboard';
import firebase from '@firebase/app';
import { TouchableOpacity } from 'react-native-gesture-handler';
require('firebase/auth');
require('firebase/database');

export default class Likes extends Component {

  
  // useEffect(() => {
  //   firebase
  //   .database()
  //   .ref('users/')
  //   .on('value', snapshots =>{
  //     if(snapshots.exists()){
  //         snapshots.forEach((child1)=>{
  //             console.log(snapshots.child1.val())
  //         })
  //     }
  //   })
  // }, [])
    
    // state = {
    //     globalData: [
    //         { name: 'We Tu Lo', score: null, iconUrl: 'https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094043-stock-illustration-profile-icon-male-avatar.jpg' },
    //         { name: 'Adam Savage', score: 12, iconUrl: 'https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png' },
    //         { name: 'Derek Black', score: 244, iconUrl: 'http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png' },
    //         { name: 'Erika White', score: 0, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-eskimo-girl.png' },
    //         { name: 'Jimmy John', score: 20, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
    //         { name: 'Joe Roddy', score: 69, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-braindead-zombie.png' },
    //         { name: 'Ericka Johannesburg', score: 101, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz' },
    //         { name: 'Tim Thomas', score: 41, iconUrl: 'http://conserveindia.org/wp-content/uploads/2017/07/teamMember4.png' },
    //         { name: 'John Davis', score: 80, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-afro-guy.png' },
    //         { name: 'Tina Turner', score: 22, iconUrl: 'https://cdn.dribbble.com/users/223408/screenshots/2134810/me-dribbble-size-001-001_1x.png' },
    //         { name: 'Harry Reynolds', score: null, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsSlzi6GEickw2Ft62IdJTfXWsDFrOIbwXhzddXXt4FvsbNGhp' },
    //         { name: 'Betty Davis', score: 25, iconUrl: 'https://landofblogging.files.wordpress.com/2014/01/bitstripavatarprofilepic.jpeg?w=300&h=300' },
    //         { name: 'Lauren Leonard', score: 30, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-' },
    //     ],
    //     topThree: [
    //         { name: 'Joe Roddy', score: 69, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-braindead-zombie.png' },
    //         { name: 'Ericka Johannesburg', score: 101, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz' },
    //         { name: 'Tim Thomas', score: 41, iconUrl: 'http://conserveindia.org/wp-content/uploads/2017/07/teamMember4.png' },
    //     ],
    //     filter: 0,
    //     userRank: 1,
    //     user: {
    //         name: 'Joe Roddy',
    //         score: 69,
    //     }
    // }

    state = {
      globalData:[],
      topThree:[],
      filter: 0,
      userRank: 1,
      user:{
        name:'',
        score:'',
      }
    }

    componentDidMount(){
      firebase
      .database()
      .ref('users/')
      .on('value', snapshots =>{
        if(snapshots.exists()){
          var datapush = []
          var dataname ='';
          var score = '';
          var iconurl=''
          var  user = firebase.auth().currentUser;
          console.log(user.uid)
            snapshots.forEach((child1)=>{
                console.log(child1.val().name)
                dataname = child1.val().name
                score = child1.val().karma_this_week;
                iconurl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-'
                datapush.push({name:dataname,score:score,iconUrl:iconurl})
                if (child1.val().uid==user.uid){
                  this.setState({user:{name:child1.val().name,score:child1.val().karma_this_week}})
                }
            })

            this.setState({globalData:datapush})
        }
      })
    }

    alert = (title, body) => {
        Alert.alert(
            title, body, [{ text: 'OK', onPress: () => { } },],
            { cancelable: false }
        )
    }

    sort = (data) => {
        const sorted = data && data.sort((item1, item2) => {
            return item2.score - item1.score;
        })
        let userRank = sorted.findIndex((item) => {
            return item.name === this.state.user.name;
        })
        this.setState({ userRank: ++userRank });
        return sorted;
    }

    renderHeader() {
        return (
            <View colors={[, '#ff9999', '#ff3333']}
                style={{ backgroundColor: '#ffbf00', padding: 15, paddingTop: 15,marginLeft:'2.5%',width:'95%',
                borderWidth: 1,
                borderColor: '#ddd',
                shadowColor: '#333333',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.9,
                shadowRadius: 80,
                elevation: 10,marginBottom:10, alignItems: 'center',marginTop:'38%',borderTopLeftRadius:80,borderBottomRightRadius:80,height:'20%' }}>
                {/* <Text style={{ fontSize: 20, color: 'white', }}>Leaderboard</Text> */}
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    marginBottom: 10, marginTop: 10
                }}>
                    <Text style={{ color: 'white', fontSize: 25, flex: 1.2, textAlign: 'right', marginRight: 30 }}>
                        {ordinal_suffix_of(this.state.userRank)} position
                    </Text>
                    <Image style={{ flex: .66, height: 70, width: 70, borderRadius: 60 / 2 }}
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-' }} />
                    
                    <Text style={{ color: 'white', fontSize: 25, flex: 1, marginLeft: 40 }}>
                        {this.state.user.score}pts
                    </Text>
                </View>
                <Text style={{fontSize:22,color:'#992600',fontWeight:'bold'}}>{this.state.user.name}</Text>
                <ButtonGroup
                    onPress={(x) => { this.setState({ filter: x }) }}
                    selectedIndex={this.state.filter}
                    buttons={['Leaderboard', 'Top 3 Karma Holder']}
                    style={{color:'red'}}
                    containerStyle={{ height: 30,width:'70%', }}
                    selectedButtonStyle={{backgroundColor:'#ff8080'}} />
                    
                {/* <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <TouchableOpacity style={styles.buttonLeaderboard} onPress={()=> this.setState({ filter: 0 })} >
                            <Text style={{fontSize:hp('2')}}>Leaderboard</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1}}>
                        <TouchableOpacity style={styles.buttonwinner} onPress={()=> this.setState({ filter: 1 })}>
                            <Text style={{fontSize:hp('2')}}>Top 3</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
                

            </View>
        )
    }

    render() {
        const props = {
            labelBy: 'name',
            sortBy: 'score',
            data: this.state.filter == 0 ?  this.state.globalData : this.state.topThree ,
            icon: 'iconUrl',
            // onRowPress: (item, index) => { this.alert(item.name + " clicked", item.score + " points, wow!") },
            sort: this.sort
        }

      // firebase
      // .database()
      // .ref('users/')
      // .on('value', snapshots =>{
      //   if(snapshots.exists()){
      //     var datapush = []
      //     var dataname ='';
      //     var score = '';
      //     var iconurl=''
      //       snapshots.forEach((child1)=>{
      //           console.log(child1.val().name)
      //           dataname = child1.val().name
      //           score = child1.val().karma_this_week;
      //           iconurl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-'
      //           datapush.push({name:dataname,score:score,iconUrl:iconurl})
      //       })

      //       this.setState({globalData:datapush})
      //   }
      // })

        return (
            <View style={{ flex: 1, backgroundColor: 'white', }}>
                {this.renderHeader()}
                { this.state.filter == 0 ?
                    <Leaderboard {...props} />
                :
                <View>
                    <View style={{height:hp('60'),marginLeft:hp('0.5'),marginRight:hp('0.5'),marginTop:hp('2')}}>
                        <Image source={require('../assets/images/leaderboard-background.jpg')}  style={{opacity:0.2}} />
                        <Image source={require('../assets/images/congratulations.png')} resizeMode='contain' style={{opacity:20, width:hp(50),marginTop:hp('-53')}}/>
                        <Text style={{marginTop:hp('-12'),color:'#808000',fontSize:40,textAlign:'center',fontWeight:'bold',textAlign:'center',marginLeft:'5%'}}>TOP 3 </Text>
                        <Text style={{marginTop:hp('-1'),color:'#808000',fontStyle:'italic',fontSize:20,textAlign:'center',fontWeight:'bold',marginLeft:hp('2')}}>Karma Points Holder of the Week</Text>
                        
                        <View style={{flexDirection:'row',marginTop:hp('-1')}}>
                            <View style={{flex:1}}>
                                <Text style={{marginTop:hp('5'),textAlign:'center',color:'#800000'}}><Text style={{fontSize:40}}>2</Text><Text>nd</Text></Text>
                                <Text style={{textAlign:'center',fontSize:22,fontStyle:'italic',fontWeight:'100',color:'red'}}>{this.state.globalData[1].name}</Text>
                                <Text style={{textAlign:'center',fontSize:15,fontWeight:'bold',color:'purple'}}>{this.state.globalData[1].score} pts</Text>
                                <View style={{marginLeft:hp('0.5'),height:hp('15'),width:hp('15'),backgroundColor:'#ff4d4d',borderTopLeftRadius:20}}>
                                    <Image source={require('../assets/images/silver-medal.png')} style={{marginTop:hp('3'),marginLeft:hp('2'),width:wp('20'),height:hp('10')}} />
                                </View>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{textAlign:'center',color:'#800000'}}><Text style={{fontSize:40}}>1</Text><Text>st</Text></Text>
                                <Text style={{textAlign:'center',fontSize:22,fontStyle:'italic',fontWeight:'100',color:'red'}}>{this.state.globalData[0].name}</Text>
                                <Text style={{textAlign:'center',fontSize:15,fontWeight:'bold',color:'purple'}}>{this.state.globalData[0].score} pts</Text>
                                <View style={{marginLeft:hp('0.2'),height:hp('20'),width:hp('15'),backgroundColor:'orange',borderTopLeftRadius:20,borderTopRightRadius:20}}>
                                    <Image source={require('../assets/images/gold-medal.png')} style={{marginTop:hp('5'),marginLeft:hp('3'),width:wp('20'),height:hp('10')}} />
                                </View>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{marginTop:hp('10'),textAlign:'center',color:'#800000'}}><Text style={{fontSize:40}}>3</Text><Text>rd</Text></Text>
                                <Text style={{textAlign:'center',fontSize:22,fontStyle:'italic',fontWeight:'100',color:'red'}}>{this.state.globalData[2].name}</Text>
                                <Text style={{textAlign:'center',fontSize:15,fontWeight:'bold',color:'purple'}}>{this.state.globalData[2].score} pts</Text>
                                <View style={{height:hp('10'),width:hp('15'),backgroundColor:'green',borderTopRightRadius:20}}>
                                    <Image source={require('../assets/images/bronze-medal.png')} style={{marginLeft:hp('3'),width:wp('20'),height:hp('10')}} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                }
            </View>
        )
    }
}

const ordinal_suffix_of = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

const styles = StyleSheet.create({
    buttonLeaderboard:{
        marginLeft:hp('10'),
    },

    buttonwinner:{
        marginLeft:hp('5'),
        
    }
    
})