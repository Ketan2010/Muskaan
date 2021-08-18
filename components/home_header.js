import React, { Component } from 'react';
import { View,StyleSheet, Image,Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native';

// class HomeHeader extends Component {
//     render(){
//         return(
//             <View>
//                 <View style={styles.container}>
                    
//                     <View style={styles.parent1}>
//                         <LinearGradient
//                             // Background Linear Gradient
//                             colors={['#F44646','#882929']}
//                             style={styles.child1}
//                         />
//                         <Image  style={{...styles.header,top:60,width:115,height:80,alignSelf:'center',
//                     resizeMode:'stretch', padding:20}}  source={require('../assets/images/muskaan4.png')} />
//                     </View>  
//                 </View>
                
//             </View>
            
//         )
//     }
// }

// export default HomeHeader

// const styles= StyleSheet.create({
//     container:{
//         flex:1,
//         flexDirection: "row",
//     },
//     header:{
//        width:'100%',
//        position: 'absolute',

//     },
//     parent1 : {
//         height : '25%',
//         width : '100%',
//         transform : [ { scaleX : 2 } ],
//         borderBottomStartRadius : 700,
//         borderBottomEndRadius : 700,
//         overflow : 'hidden',
//     },
//     child1 : {
//         flex:1,
//         transform : [ { scaleX : 0.5 } ],
//         backgroundColor : 'red',
//         alignItems : 'center',
//         justifyContent : 'center'
//     }
// })


export default function HomeHeader(){
    return(
        <View style={styles.parent}>
            {/* <View style={styles.child}> */}
            <LinearGradient
            // Background Linear Gradient
            colors={['#F44646','#F44646']}
            style={styles.child}
            />
        
            <Image  style={{position:'absolute',top:hp('5%'),width:wp('22%'),height:hp('8%'),left:wp('32%'),
            resizeMode:'stretch'}}  source={require('../assets/images/muskaan.png')} />
        </View> 
    )
}

const styles = StyleSheet.create({
    parent : {
        height : hp('15%'),
        width : wp('100%'),
        transform : [ { scaleX :2 } ],
        // borderBottomStartRadius : 200,
        // borderBottomEndRadius : 200,
        overflow : 'hidden',
    },
    child : {
        flex : 1,
        // transform : [ { scaleX : 0.5 } ],
        backgroundColor : 'yellow',
        alignItems : 'center',
        justifyContent : 'center'
    },
    images:{
        borderRadius: 80/ 2,
        borderColor:'#fbb7b7',
        backgroundColor:'white',
        borderWidth:1,
        padding:10,
    
    }
})

// checking