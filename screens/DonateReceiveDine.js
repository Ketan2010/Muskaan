import React, {useEffect, useState} from 'react'
import { View, Text, Image,Dimensions,ScrollView, Button,Modal,Pressable, StyleSheet, TouchableOpacity} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');
const DonateReceiveDine = ({navigation}) => {
  const subjects = [
    { id: 1, name: 'Donate' },
    { id: 2, name: 'Receive' },
    { id: 3, name: 'Dine' },
    { id: 4, name: 'Karma' },
  ];

  const cardGap = 16;

  const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;
  const user = firebase.auth().currentUser;
    return (
        <View style={{marginTop: hp('15')}}>
              <ScrollView>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                    }}
                  >
                          {/* card 1 */}
                          <View
                            style={{
                              marginTop: hp('5'),
                              marginBottom: hp('2'),
                              marginLeft: 0 % 2 !== 0 ? cardGap : 0,
                              width: cardWidth,
                              backgroundColor: 'white',
                              borderRadius: 16,
                              shadowOpacity: 0.2,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                              <View style={{ elevation:hp('1'), backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
                                    <View>
                                        <Image
                                          source={require("../assets/images/card-donate.png")}
                                          style={{
                                            height: 165,
                                            width: 155
                                          }}
                                        />
                                    </View>
                                    <View style={{ padding: 10, width: 155 }}>
                                        {/* <Text>Donate</Text> */}
                                        <Text style={{ textAlign:'center', color: "#777", paddingTop: 5 }}>
                                          Lets donate.
                                        </Text>
                                        <View style={[styles.button, {marginBottom:hp('2%')}]}>
                                            <TouchableOpacity onPress={()=>{navigation.navigate('Donation')}}>
                                                <Text style={styles.buttonText}>Donate</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                              </View>
                          </View>

                          {/* card 2 */}
                          <View
                            style={{
                              marginTop: hp('5'),
                              marginBottom: hp('2'),
                              marginLeft: 1 % 2 !== 0 ? cardGap : 0,
                              width: cardWidth,
                              backgroundColor: 'white',
                              borderRadius: 16,
                              shadowOpacity: 0.2,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                              <View style={{ elevation:hp('1'), backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
                                    <View>
                                        <Image
                                          source={require("../assets/images/card-receive.png")}
                                          style={{
                                            height: 165,
                                            width: 155
                                          }}
                                        />
                                    </View>
                                    <View style={{ padding: 10, width: 155 }}>
                                        {/* <Text>Receive</Text> */}
                                        <Text style={{  textAlign:'center', color: "#777", paddingTop: 5 }}>
                                          Hungry? Lets try it!
                                        </Text>
                                        <View style={[styles.button, {marginBottom:hp('2%')}]}>
                                            <TouchableOpacity onPress={()=>{navigation.navigate('ReceiveScreen')}}>
                                                <Text style={styles.buttonText}>Receive</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                              </View>
                          </View>

                          {/* card 3 */}
                          <View
                            style={{
                              marginBottom: hp('2'),
                              marginLeft: 2 % 2 !== 0 ? cardGap : 0,
                              width: cardWidth,
                              backgroundColor: 'white',
                              borderRadius: 16,
                              shadowOpacity: 0.2,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                              <View style={{ elevation:hp('1'), backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
                                    <View>
                                        <Image
                                          source={require("../assets/images/card-dine.png")}
                                          style={{
                                            height: 165,
                                            width: 155
                                          }}
                                        />
                                    </View>
                                    <View style={{ padding: 10, width: 155 }}>
                                        {/* <Text>Dine</Text> */}
                                        <Text style={{  textAlign:'center', color: "#777", paddingTop: 5 }}>
                                          Lets boot the table!
                                        </Text>
                                        <View style={[styles.button, {marginBottom:hp('2%')}]}>
                                            <TouchableOpacity onPress={()=>{navigation.navigate('ReceiveScreen')}}>
                                                <Text style={styles.buttonText}>Dine</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                              </View>
                          </View>

                          {/* card 4 */}
                          <View
                            style={{
                              marginBottom: hp('2'),
                              marginLeft: 3 % 2 !== 0 ? cardGap : 0,
                              width: cardWidth,
                              backgroundColor: 'white',
                              borderRadius: 16,
                              shadowOpacity: 0.2,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                              <View style={{ elevation:hp('1'), backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
                                    <View>
                                        <Image
                                          source={require("../assets/images/card-karma.png")}
                                          style={{
                                            height: 165,
                                            width: 155
                                          }}
                                        />
                                    </View>
                                    <View style={{ padding: 10, width: 155 }}>
                                        {/* <Text>Karma</Text> */}
                                        <Text style={{  textAlign:'center', color: "#777", paddingTop: 5 }}>
                                          Your savings here!
                                        </Text>
                                        <View style={[styles.button, {marginBottom:hp('2%')}]}>
                                            <TouchableOpacity onPress={()=>{navigation.navigate('Karma')}}>
                                                <Text style={styles.buttonText}>Karma</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                              </View>
                          </View>
                  </View>
              </ScrollView>
        </View>
    );
};

export default DonateReceiveDine;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  button: {
    borderRadius: wp('9%'),
    paddingTop: wp('2%'),
    paddingBottom:wp('2%'),
    backgroundColor: '#F44646',
    alignSelf:'center',
    width:wp('30%'),
    top:hp('2%'),
},

buttonText: {
    color: '#FFFEFE',
    fontFamily: 'Voces-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: hp('2%'),
    textAlign: 'center',
    position:'relative'
},
});