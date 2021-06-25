import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet,Dimensions, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

const ReceiveScreen = ({navigation}) => {
    const [lat, setlat] = useState('37.78925');
    const [long, setlong] = useState('-122.4324');


  
    return (
      <View style={styles.container}>
       <MapView style={styles.map}
          initialRegion={{
              latitude: lat,
              longitude: long,
              latitudeDelta: 0.0,
              longitudeDelta: 0.0,
          }}
        >
        <MapView.Marker
            coordinate={{latitude: 20.957833,
            longitude: 74.688302}}
            title={"Hotel"}
            description={"1 plate, Soya chilli"}
         />
         <MapView.Marker
            coordinate={{latitude: 37.78925,
            longitude: -122.4324}}
            title={"Donated"}
            pinColor = {"green"} 
          
            description={"3 plate, Pav bhaji"}
         />
      </MapView>
      </View>
    );
};

export default ReceiveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});