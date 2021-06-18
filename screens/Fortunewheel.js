import React from 'react'
import { View, Text, Button } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WheelOfFortune from 'react-native-wheel-of-fortune'

export default function Fortunewheel(){
    const [winnerValue, setwinnerValue] = useState('')
    const [winnerIndex, setwinnerIndex] = useState('')
    const participants = [
        '%10',
        '%20',
        '%30',
        '%40',
        '%50',
        '%60',
        '%70',
        '%90',
      ];
      const wheelOptions = {
            rewards: participants,
            knobSize: 50,
            borderWidth: 5,
            borderColor: '#000',
            innerRadius: 50,
            duration: 4000,
            colors: ['#FFAA64','#FF534A','#AADB6B','#FFE05F','#FFAA64','#FF534A','#AADB6B','#FFE05F'],
            backgroundColor: 'transparent',
            textAngle: 'horizontal',
            knobSource: require('../assets/images/knoob.png'),
            getWinner: (value, index) => {
                setwinnerValue(value)
                setwinnerIndex(index)
            },
            onRef: ref => (child = ref),
        };
    return(
        <View style={styles.container}>
            <WheelOfFortune
                wheelOptions={wheelOptions}
            />
            <Text>{winnerValue} and {winnerIndex}</Text>
        </View>
    )
        
        
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFEFE',
    },
})