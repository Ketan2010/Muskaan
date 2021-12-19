import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
  Button,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WheelOfFortune from 'react-native-wheel-of-fortune';
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');


class Spinthewheel extends Component {
    constructor(props) {
    super(props);
    console.log('lfl'+props.route.params.id)

    this.state = {
      winnerValue: this.props.route.params.reward,
      winnerIndex: null,
      started: false,
      id : null,
      karma:null,
      karma_required:null,
      coupon_id:null,
      coupon_code:null,
      generation_date:null,
      expiry_date:null,
      coupon_type:null,
      reward:'00',
      company_name:null,
      participants:[],
      
    };

    
    // this.child = null;
  }

  componentDidMount() {
          this.getData()
  }

  getData = () => {
        var user = firebase.auth().currentUser;
        firebase.database()
        .ref("users/")
        .orderByChild("uid")
        .equalTo(user.uid)
        .on('value', snapshot => {
            if (snapshot.exists()) {
              snapshot.forEach((child) => {
                this.setState({
                  id: child.key,
                });
                this.setState({
                  karma:child.val().karma,
                });
              });
            } else {
              console.log('Went wrong');
            }
        })

        firebase.database()
        .ref("coupons/"+this.props.route.params.id)
        .on('value', snapshot => {
          if (snapshot.exists()) {
              console.log('darshan '+this.state.id);
              this.setState({
                coupon_id: snapshot.key,
              });
              this.setState({
                karma_required:snapshot.val().karma_required,
              });
              this.setState({
                coupon_code:snapshot.val().coupon_code,
              });
              this.setState({
                coupon_type:snapshot.val().coupon_type,
              });
              this.setState({
                generation_date:snapshot.val().generation_date,
              });
              this.setState({
                expiry_date:snapshot.val().expiry_date,
              });
              this.setState({
                reward:snapshot.val().reward,
              });
              console.log(this.state.karma_required)
              
              this.setState({
                  participants : [
                  '50 points',
                  this.props.route.params.reward,
                  'Bad luck',
                  'Try Again',
                  'Voucher',
                  'Bad luck',
                  'Try Again'
                  ]
              })
              
          } else {
            console.log('Went wrong');
          }
      })
  }


  




  buttonPress = () => {
    this.setState({
      started: true,
    });
    this.child._onPress();
  };

  claim = () =>{
    if(this.state.winnerValue=='50 points')
    {
      var updated_karma = this.state.karma + 50;
      firebase.database()
      .ref("users/"+this.state.id)
      .update({karma:updated_karma})
      .then(() =>Alert.alert(
        "Congratulations!",
        "You earned 50 karma points!",
        [
          { text: "Thats Nice!", onPress: () => this.props.navigation.navigate('Home', { screen: 'Karma' }) }
        ]
      ));
    }
    if(this.state.winnerValue=='100 points')
    {
      var updated_karma = this.state.karma + 100;
      firebase.database()
      .ref("users/"+this.state.id)
      .update({karma:updated_karma})
      .then(() =>Alert.alert(
        "Congratulations!",
        "You earned 100 karma points!",
        [
          { text: "Thats Nice!", onPress: () => this.props.navigation.navigate('Home', { screen: 'Karma' }) }
        ]
      ));
    }
    if(this.state.winnerValue==this.props.route.params.reward)
    {
      var counter = 0;
      firebase.database()
      .ref("users/"+this.state.id+"/rewards")
      .push({
        coupon_id:this.props.route.params.id,
      })
      firebase.database()
      .ref("coupons/"+this.props.route.params.id)
      .on('value', snap => {
        counter = snap.val().winner_count
      })

      const count = 0;
      firebase.database()
      .ref("coupons/"+this.props.route.params.id+"/winner_id")
      .push({
        user_id:this.state.id,
      })

      firebase.database()
      .ref("coupons/"+this.props.route.params.id)
      .update({
        winner_count:counter+1
      })
      .then(() =>Alert.alert(
        "Congratulations!",
        `You have earned ${this.props.route.params.reward} voucher from ${this.state.company_name}!`,
        [
          { text: "Thats Nice!", onPress: () => this.props.navigation.navigate('Home', { screen: 'Karma' }) }
        ]
      ));
    }
  }

  render() {
    const participants = [
      '50 points',
      'Try Again',
      `Better luck next time`,
      this.props.route.params.reward,
      '100 points',
      'Try Again'
    ];

    const wheelOptions = {
      rewards: participants,
      knobSize: 30,
      borderWidth: 5,
      borderColor: '#fff',
      innerRadius: 30,
      duration: 6000,
      backgroundColor: '#000000',
      textAngle: 'horizontal',
      knobSource: require('../assets/images/pin.png'),
      onRef: ref => (this.child = ref),
    };
    return (
      <View style={styles.container}>
        {/* <StatusBar barStyle={'light-content'} /> */}
        <WheelOfFortune
          options={wheelOptions}
          getWinner={(value, index) => {
            this.setState({winnerValue: value, winnerIndex: index});
          }}
        />
        {!this.state.started && (
          <View style={styles.startButtonView}>
            <TouchableOpacity
              onPress={() => this.buttonPress()}
              style={styles.startButton}>
              <Text style={styles.startButtonText}>Spin to win!</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.winnerIndex != null && (
          <View style={styles.winnerView}>
            <Text style={styles.winnerText}>
              {participants[this.state.winnerIndex]}
            </Text>
            {this.state.winnerValue == "Try Again"?
              <TouchableOpacity
                onPress={() => {
                  this.setState({winnerIndex: null});
                  this.child._tryAgain();
                }}
                style={styles.tryAgainButton}>
                <Text style={styles.tryAgainText}>TRY AGAIN</Text>
              </TouchableOpacity>
            :
                    this.state.winnerValue == "Better luck next time" ?
                      <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home', { screen: 'Karma' })} style={styles.tryAgainButton}>
                        <Text style={styles.tryAgainText}>Go back</Text>
                      </TouchableOpacity>
                    :
                      <TouchableOpacity  onPress={() => this.claim()} style={styles.tryAgainButton}>
                        <Text style={styles.tryAgainText}>Claim Now</Text>
                      </TouchableOpacity>}
          </View>
        )}
      </View>
    );
  }
}
export default Spinthewheel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#E74C3C'
  },
  startButtonView: {
    position: 'absolute',
  },
  startButton: {
    marginTop: hp('70'),
    borderRadius: hp('2'),
    alignSelf:'center',
    width:wp('45'),
    height:hp('7'),
    borderWidth: 2,
    borderColor: '#E74C3C',
  },
  startButtonText: {
       color: '#E74C3C',
       fontFamily: 'Voces-Regular',
       fontStyle: 'normal',
       fontWeight: 'normal',
       fontSize: 25,
       textAlign: 'center',
       marginTop: hp('1')
  },
  winnerView: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    padding: hp(5),
    borderRadius: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tryAgainButton: {
    padding: hp('3'),
  },
  winnerText: {
    fontSize: 30,
  },
  tryAgainButton: {
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  tryAgainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});