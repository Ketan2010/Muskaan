import React, {useState} from "react";
import { View, StyleSheet, TouchableHighlight, Animated, Image } from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';

export default class AddButton extends React.Component  {
    mode = new Animated.Value(0);
    buttonSize = new Animated.Value(1);

    

    handlePress = () => {
        console.log(this.navigation );
        Animated.sequence([
            Animated.timing(this.buttonSize, {
                toValue: 0,
                duration: 0
            }),
            Animated.timing(this.buttonSize, {
                toValue: 1
            }),
            Animated.timing(this.mode, {
                toValue: this.mode._value === 0 ? 1 : 0
            })
        ]).start();
    };

    render() {
        const thermometerX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, -100]
        });

        const thermometerY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, -100]
        });

        const timeX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, -24]
        });

        const timeY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, -150]
        });

        const pulseX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, 50]
        });

        const pulseY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, -100]
        });

        const rotation = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "45deg"]
        });

        const sizeStyle = {
            transform: [{ scale: this.buttonSize }]
        };


        return (
            <View style={{ position: "absolute", alignItems: "center" }}>
                <Animated.View style={{ position: "absolute", left: thermometerX, top: thermometerY }}>
                    <View style={styles.secondaryButton} onPress={()=>{navigation.navigate('ReceiveScreen')}}>
                        {/* <Feather name="thermometer" size={24} color="#FFF" /> */}
                        <Image source={require('../assets/images/donation..png')} resizeMode="contain" style={{width:wp('6%'),height:hp('6%')}}/>
                    </View>
                </Animated.View>
                <Animated.View style={{ position: "absolute", left: timeX, top: timeY }}>
                    <View style={styles.secondaryButton}>
                        {/* <Feather name="clock" size={24} color="#FFF" /> */}
                        <Image source={require('../assets/images/receive.png')} resizeMode="contain" style={{width:wp('6%'),height:hp('6%')}}/>
                    </View>
                </Animated.View>
                <Animated.View style={{ position: "absolute", left: pulseX, top: pulseY }}>
                    <View style={styles.secondaryButton}>
                        {/* <Feather name="activity" size={24} color="#FFF" /> */}
                        <Image source={require('../assets/images/order.png')} resizeMode="contain" style={{width:wp('8%'),height:hp('8%')}}/>
                    </View>
                </Animated.View>
                <Animated.View  style={[styles.button, sizeStyle]}>
                    <LinearGradient
                    // Button Linear Gradient
                    colors={['#ffe066', '#ff9933','#F44646','#F44646',]}
                    style={styles.button}>
                    <TouchableHighlight onPress={this.handlePress} underlayColor="transparent">
                        {/* <Animated.View style={{ transform: [{ rotate: rotation }] }}> */}
                            {/* <FontAwesome5 name="plus" size={24} color="#FFF" /> */}
                           
                            <Image source={require('../assets/images/donationicon.png')} resizeMode="contain" style={{width:wp('9%'),height:hp('9%')}}/>
                            
                             {/* </Animated.View> */}
                    </TouchableHighlight>
                    </LinearGradient>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#ffad33",
        position: "absolute",
        marginTop: -80,
        shadowColor: "#7F58FF",
        shadowRadius: 5,
        // shadowOffset: { height: 10 },
        shadowOpacity: 0.3,
        borderWidth: 0,
        borderColor: "#FFFFFF",
        elevation:9
    },
    secondaryButton: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#ffad33"
    }
});



// import React from 'react';
// import {
//   StyleSheet,Image,
//   View,
// } from 'react-native';
 
// import CircleButton from "react-native-circle-floatmenu";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
 
// export default function AddButton ()  {
//   return (
//     <View style={styles.btn_container}>
//           <CircleButton buttonColor="red"   size={80} radius={130} position="right">
//           <Image source={require('./assets/images/dine.png')}
//                 style={{...styles.circleButtonIcon,width:'100%',height:'70%'}}  resizeMode="stretch"
//               />
//             <CircleButton.Item size={60}
//               position="absolute"
//               // buttonColor="red"
//               title="Perfil"
//               onPress={() => console.log("BtnPress")}
//             >
//               <Image source={require('./assets/images/dine.png')}
//                 style={{...styles.circleButtonIcon,width:'100%',height:'70%'}}  resizeMode="stretch"
//               />
//             </CircleButton.Item>
            
            
//             <CircleButton.Item size={60}
//               position="absolute"
//               // buttonColor="red"
//               title="Perfil"
//               onPress={() => console.log("BtnPress")}
//             >
//               <Image source={require('./assets/images/dine.png')}
//                 style={{...styles.circleButtonIcon,width:'100%',height:'70%'}}  resizeMode="stretch"
//               />
//             </CircleButton.Item>
//             <CircleButton.Item
//               size={60}
//               position="absolute" 
//               // buttonColor="red" 
//               title="Perfil"
//               onPress={() => console.log("BtnPress")}
//             >
//               <Image source={require('./assets/images/dine.png')}
//                 style={{...styles.circleButtonIcon,width:'100%',height:'70%'}}  resizeMode="stretch"
//               />
//             </CircleButton.Item>
//           </CircleButton>
//     </View>
//   );
// };
 
// const styles = StyleSheet.create({
//   btn_container: {
//     flex: 1,
//     // backgroundColor: "#59a6eb",
//     justifyContent: "center",
//     width: "100%",
//     elevation: 8,
//     borderRadius: 5,
//     // margin: 1,
//   },
//   circleButtonIcon: {
//     // fontSize: 20,
//     height: 40,
//     // color: "white",
//   },
// });