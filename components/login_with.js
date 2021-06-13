import React from 'react';
import { Text, View,StyleSheet, Image, TextInput, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default  function LoginWith () {
        return(
            <View>
                <View style={{flexDirection: 'row',marginTop:hp('15%'),alignSelf: 'center',width:wp('60%')}}>
                        <View style={{backgroundColor: '#C4C4C4', height: 2, flex: 1, alignSelf: 'center'}} />
                        <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 24,color:'#C4C4C4' }}>OR</Text>
                        <View style={{backgroundColor: '#C4C4C4', height: 2, flex: 1, alignSelf: 'center'}} />
                    </View>
            
            <View style={{marginTop:hp('2%'),left:wp('23%')}}>
                    <TouchableHighlight style={styles.border}>
                        <Image style={styles.logo} resizeMode={'stretch'} 
                        source={require('../assets/images/google.png')}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight style={{marginLeft:wp('23%'),...styles.border}}>
                    <Image style={{...styles.logo,left:wp('-0.6%'),top:hp('-0.2%')}} resizeMode={'stretch'}
                    source={require('../assets/images/facebook.png')}
                    />
                    </TouchableHighlight>
                    <TouchableHighlight style={{marginLeft:wp('46%'),...styles.border}}>
                    <Image style={styles.logo} resizeMode={'stretch'}
                    source={require('../assets/images/outlook.png')}
                    />
                    </TouchableHighlight>
                </View>
                </View>
        )
}


const styles=StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFEFE',
    },
    
    logo:{
        width:wp('6%'),
        height:hp('3%'),
        alignSelf:'center',
        
        },
    border:{
    position:'absolute',
    borderRadius: wp('5%'),
    borderColor:'#F44646',
    borderWidth:2,
    padding:wp('1.5%'),
    
    },
})

