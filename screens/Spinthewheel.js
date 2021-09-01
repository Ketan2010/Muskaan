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

const participants = [
  '50 points',
  'Voucher',
  'Bad luck',
  'Try Again',
  'Voucher',
  'Bad luck',
  'Try Again'
];
class Spinthewheel extends Component {
    constructor(props) {
    super(props);

    this.state = {
      winnerValue: null,
      winnerIndex: null,
      started: false,
      id : null,
      karma:null
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
  }

  render() {
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
                    this.state.winnerValue == "Bad luck"?
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