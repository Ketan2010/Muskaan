import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WheelOfFortune from 'react-native-wheel-of-fortune';

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
    };
    this.child = null;
  }

  buttonPress = () => {
    this.setState({
      started: true,
    });
    this.child._onPress();
  };

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
        <StatusBar barStyle={'light-content'} />
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
                      <TouchableOpacity style={styles.tryAgainButton}>
                        <Text style={styles.tryAgainText}>Go back</Text>
                      </TouchableOpacity>
                    :
                      <TouchableOpacity style={styles.tryAgainButton}>
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