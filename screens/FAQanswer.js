import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,ScrollView, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import Faqtoggle from '../components/Faqtoggle';
import Icons from 'react-native-vector-icons/Ionicons';
import Unorderedlist from 'react-native-unordered-list';

const FAQanswer = (props) => {

    const answerfunction= () => {
      switch (props.route.params.answeid) {
        case 'cat11':
          return (
            <View>
              <Text style={styles.answer}>Deletion of account is possible within the MUSKAAN app. It is an irreversible process, which we can’t revert even you perform it by accident. You can’t regain access to your account.</Text>
              <Text style={{...styles.answer,fontSize:hp('2'),marginVertical:hp('1'),color:'black'}}>TO DELETE YOUR ACCOUNT :- </Text>
              <View style={{marginLeft:hp('2')}}>
                <Text style={styles.answer}>1. Open <Text style={{color:'black'}}>MUSKAAN</Text> </Text>
                <Text style={styles.answer}>2. Find the <Text style={{color:'black'}}>SETTINGS</Text> option in the Menu bar <Text style={{color:'black'}}>☰</Text> </Text>
                <Text style={styles.answer}>3. Tap <Text style={{color:'black'}}>DELETE MY ACCOUNT</Text></Text>
                <Text style={styles.answer}>Select a reason from the dropdown </Text>
                <Text style={styles.answer}>4. Tap <Text style={{color:'black'}}>DELETE </Text>option</Text>
              </View>
              <Text style={{...styles.answer,fontSize:hp('2'),marginVertical:hp('1'),color:'black'}}>Delete your account will:-</Text> 
              <Unorderedlist><Text style={styles.answer}>Delete your account from MUSKAAN </Text></Unorderedlist> 
              <Unorderedlist><Text style={styles.answer}>Delete your data</Text></Unorderedlist>
              <Unorderedlist><Text style={styles.answer}>Erase your messages and history </Text></Unorderedlist>     
            </View>
            );
        case 'cat12':
          return (
            <View>
              <Text style={styles.answer}>Whether your login has been revealed in a data breach, you want to make things more secure or you have forgotten password.</Text>
              <Text style={{...styles.answer,fontSize:hp('2'),marginVertical:hp('1'),color:'black'}}>TO CHANGE YOUR PASSWORD :- </Text>
              <View style={{marginLeft:hp('2')}}>
                <Text style={styles.answer}>1. Open <Text style={{color:'black'}}>MUSKAAN</Text> </Text>
                <Text style={styles.answer}>2. Find the <Text style={{color:'black'}}>SETTINGS</Text> option in the Menu bar <Text style={{color:'black'}}>☰</Text> </Text>
                <Text style={styles.answer}>3. Tap <Text style={{color:'black'}}>Security Change Password</Text></Text>
                <Text style={styles.answer}>4. Type in your current password once and new password twice </Text>
                <Text style={styles.answer}>5. Tap <Text style={{color:'black'}}>RESET </Text></Text>
              </View>
              <Text style={{...styles.answer,fontSize:hp('2'),marginVertical:hp('1'),color:'black'}}>Delete your account will:-</Text> 
              <Unorderedlist><Text style={styles.answer}>Delete your account from MUSKAAN </Text></Unorderedlist> 
              <Unorderedlist><Text style={styles.answer}>Delete your data</Text></Unorderedlist>
              <Unorderedlist><Text style={styles.answer}>Erase your messages and history </Text></Unorderedlist>     
            </View>
            );
        case 'cat12':
          return (
            <View>
              <Text style={styles.answer}>Whether your login has been revealed in a data breach, you want to make things more secure or you have forgotten password.</Text>
              <Text style={{...styles.answer,fontSize:hp('2'),marginVertical:hp('1'),color:'black'}}>TO CHANGE YOUR PASSWORD :- </Text>
              <View style={{marginLeft:hp('2')}}>
                <Text style={styles.answer}>1. Open <Text style={{color:'black'}}>MUSKAAN</Text> </Text>
                <Text style={styles.answer}>2. Find the <Text style={{color:'black'}}>SETTINGS</Text> option in the Menu bar <Text style={{color:'black'}}>☰</Text> </Text>
                <Text style={styles.answer}>3. Tap <Text style={{color:'black'}}>Security Change Password</Text></Text>
                <Text style={styles.answer}>4. Type in your current password once and new password twice </Text>
                <Text style={styles.answer}>5. Tap <Text style={{color:'black'}}>RESET </Text></Text>
              </View>
              <Text style={{...styles.answer,fontSize:hp('2'),marginVertical:hp('1'),color:'black'}}>Delete your account will:-</Text> 
              <Unorderedlist><Text style={styles.answer}>Delete your account from MUSKAAN </Text></Unorderedlist> 
              <Unorderedlist><Text style={styles.answer}>Delete your data</Text></Unorderedlist>
              <Unorderedlist><Text style={styles.answer}>Erase your messages and history </Text></Unorderedlist>     
            </View>
            );
        case 'cat13':
          return (
                <View>
                  <Text style={styles.answer}>You can edit your profile photo/bitmoji, contact details, about information and upgrade account in MUSKAAN.</Text>
                  <Text style={{...styles.answer,fontSize:hp('2'),marginVertical:hp('1'),color:'black'}}>TO EDIT YOUR PROFILE:- </Text>
                  <View style={{marginLeft:hp('2')}}>
                    <Text style={styles.answer}>1. Open MUSKAAN <Text style={{color:'black'}}> tap ☰ and then click Profile</Text> </Text>
                    <Text style={styles.answer}>2. To change <Text style={{color:'black'}}> profile photo/bitmoji tap the circular profile icon</Text> </Text>
                    <Text style={styles.answer}>3.<Text style={{color:'black'}}> Tap edit </Text> to customize your about details</Text>
                    <Text style={styles.answer}>5.<Text style={{color:'black'}}>Tap DONE  </Text></Text>
                  </View>    
                </View>
                );
        case 'cat14':
            return (
                  <View>
                       {/* <Text style={styles.answer}>You can edit your profile photo/bitmoji, contact details, about information and upgrade account in MUSKAAN.</Text> */}
                       <Text style={{...styles.answer,fontSize:hp('2'),marginVertical:hp('1'),color:'black'}}>TO UPGRADE YOUR ACCOUNT:- </Text>
                       <View style={{marginLeft:hp('2')}}>
                       <Text style={styles.answer}>1. Open MUSKAAN <Text style={{color:'black'}}> tap ☰ and then click Profile</Text> </Text>
                            <Text style={styles.answer}>2. Tap <Text style={{color:'black'}}> UPGRADE TO RESTAURANT / NGO </Text> </Text>
                            <Text style={styles.answer}>3. Select one of the options from <Text style={{color:'black'}}> NGO or Restaurant </Text></Text>
                            <Text style={styles.answer}>4. Enter your organization’s name, address, city and state</Text>
                            <Text style={styles.answer}>5. Upload scanned picture of documents stating that you are a part of this organization</Text>
                            <Text style={styles.answer}>6. Tap <Text style={{color:'black'}}>UPGRADE</Text> button </Text>
                            <Text style={styles.answer}>7. Your account will be upgraded within 24 hours after confirmation</Text>
                           
                        </View>    
                        </View>
          );
          case 'cat15':
            return (
              <View>
                <Text style={styles.answer}>Mode allows you to change the color theme of MUSKAAN from white to black or from black to white.</Text>
                <Text style={{...styles.answer,fontSize:hp('2'),marginVertical:hp('1'),color:'black'}}>TO CHANGE THEME / MODE :- </Text>
                <View style={{marginLeft:hp('2')}}>
                <Text style={styles.answer}>1. Open MUSKAAN <Text style={{color:'black'}}> tap ☰ and then click Settings</Text> </Text>
                  <Text style={styles.answer}>2. Select from the toggle option: </Text>
                  <Unorderedlist><Text style={styles.answer}><Text style={{color:'black'}}>Dark </Text>: Turn dark mode on</Text></Unorderedlist> 
                  <Unorderedlist><Text style={styles.answer}><Text style={{color:'black'}}>Light:</Text> Turn dark mode off</Text></Unorderedlist>
                </View>
              </View>
              );
        case 'cat21':
          return (
            <View>
              <Text style={styles.answer}>You can easily update from our website <Text style={{color:'black'}}> Muskaan.com </Text>. Please note if you received a message that isn’t supported by your version, you’ll need to update MUSKAAN. We encourage you to always use the latest version of our application. Latest version contains the newest features and bug fixes.</Text>    
            </View>
            );
        case 'cat22':
              return (
                <View>
                  <Text style={{...styles.answer,fontSize:hp('2'),bottom:hp("0.5")}}>We provide support for and recommend using the following devices:</Text>
                  <Unorderedlist><Text style={{...styles.answer,color:'black'}}>Android running OS 4.1 and newer</Text></Unorderedlist> 
                  <Unorderedlist><Text style={{...styles.answer,color:'black'}}>iPhone running iOS 10 and newer</Text></Unorderedlist>
                </View>
          );
          case 'cat31':
            return (
              <View>
                <Text style={styles.answer}>KARMA board is a resemblance of leaderboard with highest KARMA points holder.</Text>
                <Text style={styles.answer}>This leaderboard is released on national, state and city level.</Text>
                <Text style={{...styles.answer,fontSize:hp('2'),marginVertical:hp('1'),color:'black'}}>Benefits of having account name on KARMA board :- </Text>
                <Unorderedlist><Text style={styles.answer}>A chance to <Text style={{color:'black'}}>enter KARMA zone and play exciting games, lucky draws to win amazing coupon</Text> which you can redeem in the prescribed amount of time. </Text></Unorderedlist> 
                <Unorderedlist><Text style={styles.answer}>You <Text style={{color:'black'}}>get a MUSKAAN badge </Text>if your account name is in top 50 holders of KARMA board.</Text></Unorderedlist>
                <Unorderedlist><Text style={styles.answer}>An achievement of performing good KARMA which you <Text style={{color:'black'}}> can share on MUSKAAN MINGLE to encourage others </Text> and help as many people in need as you can.</Text></Unorderedlist>     
              </View>
              );
          case 'cat32':
            return (
              <View>
                <Text style={styles.answer}>You are not required to be a celebrity or a public figure and have a huge number of followers. By doing good KARMA, you can have the MUSKAAN badge on MUSKAAN MINGLE.</Text>
                <Text style={{...styles.answer,color:'black',fontSize:hp('2'),marginTop:hp('2')}}>Either of the criteria should match to your account:</Text>
                <Unorderedlist><Text style={{...styles.answer,color:"black"}}>Represent a real person or identity </Text></Unorderedlist> 
                <Unorderedlist><Text style={{...styles.answer,color:"black"}}>Your account should have a profile photo and be active </Text></Unorderedlist>
                <Unorderedlist><Text style={{...styles.answer,color:"black"}}>You hold the KARMA board position in top 50 consistently. </Text></Unorderedlist>
                <Unorderedlist><Text style={{...styles.answer,color:"black"}}>You have huge number of KARMA points. </Text></Unorderedlist>
                <Unorderedlist><Text style={{...styles.answer,color:"black"}}>Highly active on MUSKAAN MINGLE. </Text></Unorderedlist>
                <Text style={{...styles.answer,marginTop:hp('2')}}><Text style={{color:'black'}}>MUSKAAN badge is not permanent</Text> and should constantly match with the above-mentioned criteria. Once applied this badge to your account, you’ll receive an email on your registered email address.</Text>
                <Text style={styles.answer}><Text style={{color:'black'}}>Once have the badge, you may not change the email address attached to your account</Text>, and MUSKAAN badge <Text style={{color:'black'}}>cannot be transferred</Text> to a different account.</Text>     
                <Text style={styles.answer}>Keep in mind that if you <Text style={{color:'black'}}> receive a MUSKAAN badge using false or misleading information we will remove your badge</Text> and may take <Text style={{color:'black'}}>additional action to disable your account.</Text></Text>     
              </View>
              );
              case 'cat33':
                return (
                  <View>
                    <Text style={{...styles.answer,fontSize:hp('1.8')}}>Application has the authority to <Text style={{color:'black'}}> delete a post or story</Text>  which do <Text style={{color:'black'}}>not match with our community guidelines</Text> on MUSKAAN MINGLE platform.</Text>
                    <View style={{top:hp('1')}}>
                    <Unorderedlist><Text style={{...styles.answer}}>Community guidelines state that a <Text style={{color:'black'}}>user’s identity of receiving food must not be revealed</Text> in any way. </Text></Unorderedlist> 
                    <Unorderedlist><Text style={styles.answer}>The other reason when <Text style={{color:'black'}}>someone reports your post or a story</Text>, so either the picture was inappropriate, or a friend was playing a joke on you.</Text></Unorderedlist>
                    <Unorderedlist><Text style={styles.answer}><Text style={{color:'black'}}>Post notifications and reason will only be generated</Text> by application for violating community guidelines.</Text></Unorderedlist>     
                    </View>
                  </View>
                  );
              case 'cat34':
                return (
                  <View>
                    <Text style={{...styles.answer,color:'black'}}>You can report or block an account or post if it does not follow our community guidelines:</Text>
                    <Unorderedlist><Text style={styles.answer}>Receiver’s identity is revealed </Text></Unorderedlist> 
                    <Unorderedlist><Text style={styles.answer}>Donating stale food</Text></Unorderedlist>
                    <Unorderedlist><Text style={styles.answer}>Spam </Text></Unorderedlist>   
                    <Unorderedlist><Text style={styles.answer}>Nudity or sexual activity </Text></Unorderedlist> 
                    <Unorderedlist><Text style={styles.answer}>Hate speech or symbols </Text></Unorderedlist>
                    <Unorderedlist><Text style={styles.answer}>Racist language or activity </Text></Unorderedlist>  
                    <Unorderedlist><Text style={styles.answer}>Violence or dangerous organizations </Text></Unorderedlist> 
                    <Unorderedlist><Text style={styles.answer}>Bullying or harassment</Text></Unorderedlist>
                    <Unorderedlist><Text style={styles.answer}>Selling illegal or regulated goods </Text></Unorderedlist>  
                    <Unorderedlist><Text style={styles.answer}>Intellectual property violations </Text></Unorderedlist> 
                    <Unorderedlist><Text style={styles.answer}>Suicide or self-injury</Text></Unorderedlist>
                    <Unorderedlist><Text style={styles.answer}>Or any other activity which does not match with the purpose of our application. </Text></Unorderedlist>    
                    <Text style={{...styles.answer,fontSize:hp('2'),marginVertical:hp('1'),color:'black'}}>TO REPORT OR BLOCK AN ACCOUNT:-</Text> 
                    <View style={{marginLeft:hp('2')}}>
                      <Text style={styles.answer}>1. Open <Text style={{color:'black'}}>MUSKAAN</Text> </Text>
                      <Text style={styles.answer}>2. Click on the <Text style={{color:'black'}}>additional option’s menu</Text> next to the account name </Text>
                      <Text style={styles.answer}>3. Choose the <Text style={{color:'black'}}>report or block option</Text> from the Menu</Text>
                      <Text style={styles.answer}>4. Select a <Text style={{color:'black'}}> reason from the dropdown menu</Text> or mention others </Text>
                    </View>
                    </View>
                  );
          case 'cat41':
           return (
            <View style={{marginBottom:hp('3')}}>
               <Text style={{...styles.answer,marginTop:hp('2'),color:'black'}}>Shelf life of a food is the length of time it may be stored without being unfit for consumption.</Text>
               <Text style={{...styles.answer,marginTop:hp('1'),color:'black'}}>Shelf life varies for different food items. If you are doubtful, for dry food items mention shelf life of food as 7-8 hours after cooking.</Text>
               <Text style={{...styles.answer,marginTop:hp('1'),color:'black'}}>In case the food is not dry, mention shelf life of food as 3-4 hours only from the time being cooked. </Text>
               <Text style={{...styles.answer,marginTop:hp('1'),color:'black'}}>You can increase the shelf life of food by storing it in a refrigerator</Text>
            </View>
          );
          case 'cat43':
            return (
              <View>
                <Text style={styles.answer}>For an individual user, the parameter of two plates is sufficient. Incase you want to receive food in bulk amount,</Text>
                <View style={{marginTop:hp('1')}}>
                  <Unorderedlist><Text style={styles.answer}><Text style={{color:'black'}}>Try contacting an NGO</Text></Text></Unorderedlist> 
                  <Unorderedlist><Text style={styles.answer}><Text style={{color:'black'}}>Upgrade to NGO user (if a part of NGO) </Text></Text></Unorderedlist>
                </View>
              </View>
              );
          case 'cat44':
            return (
             <View style={{marginBottom:hp('3')}}>
                <Text style={{...styles.answer,marginTop:hp('2'),color:'black'}}>Our application flow involves no delivery system and the receiver need to reach out to the location. </Text>
                <Text style={{...styles.answer,marginTop:hp('1'),color:'black'}}>To involve safety and for security reasons, you need to upload a photo identity proof with residential address. </Text>
             </View>
           );
           case 'cat51':
            return (
             <View style={{marginBottom:hp('3')}}>
                <Text style={{...styles.answer,marginTop:hp('2')}}>Email : <Text style={{color:'black'}}>muskaan@gmail.com </Text>  </Text>
                <Text style={{...styles.answer,marginTop:hp('2')}}>Contact no : <Text style={{color:'black'}}>+91 ----- ----- </Text>  </Text>
                <Text style={{...styles.answer,marginTop:hp('2')}}>Website : <Text style={{color:'black'}}>Muskaan.com </Text>  </Text>
                
                </View>
           );
        default:
          return (
            <View>
              <Text>Null</Text>
            </View>
            );
        }
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{props.navigation.navigate('FAQScreen')}}>
                    <Icons style={{marginLeft:wp('-4')}} name='arrow-back-circle-outline' color={'#F44646'} size={hp('4%')} />
        </TouchableOpacity>
        <ScrollView style={styles.scrollView}>
            <Text style={styles.question}> {props.route.params.question}</Text>
            <View style={styles.answerview}>
                  {answerfunction()}
            </View>
        </ScrollView>
      </View>
    );
};

export default FAQanswer;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: hp('20%'),
  },
  scrollView: {
    width: wp('90%'),
    marginTop: hp('2'),
  },
  question: {
    alignSelf:'center',
    paddingHorizontal:5,
    fontSize: 20,
    fontFamily: 'Voces-Regular',
    color:'#000000' 
  },
  answer: {
    fontSize: 15,
    fontFamily: 'Voces-Regular',
    color:'grey'
  },
  answerview: {
    backgroundColor: '#ffffff',
        // height: hp('20%'),
        width: wp('85%'),
        padding: hp('2%'),
        marginVertical: hp('1%'),
        marginHorizontal: wp('3%'),
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,

  }
});