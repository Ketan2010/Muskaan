import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/Ionicons';

const Faqtoggle = (props) => {
    const [isChildVisible, setisChildVisible] = useState(false)

    const settrue = () =>{
        isChildVisible?setisChildVisible(false):setisChildVisible(true)
      }

    return (
        <View>
            <TouchableOpacity onPress={settrue} style={styles.question}>
              <Text style={{fontWeight: "bold"}}>{props.question}</Text>
            </TouchableOpacity>
            {isChildVisible?
                <View style={styles.answer}>
                    <Text>{props.answer}</Text>
                </View>
            :
                null
            }
        </View>
    )
}

export default Faqtoggle

const styles = StyleSheet.create({
    question:{
        padding:5,
        backgroundColor: '#DDD9D9',
        borderColor:'#C6C5C5',
        borderWidth: 2,
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: hp('1')
    },
    answer:{
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginBottom: hp('1'),
        borderRightColor:'#C6C5C5',
        borderLeftColor:'#C6C5C5',
        borderBottomColor:'#C6C5C5',
        borderTopColor: '#f0f0f0',
        borderWidth: 2,
    }
})
