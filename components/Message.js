import firebase from '@firebase/app';
import { TextInput } from 'react-native';
import moment from 'moment';
require('firebase/auth');
require('firebase/database');
require('firebase/storage');

export const sendMessage = async(currentuid,guestuid,message) => {
    
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
 
    //   Alert.alert(date + ',' + month + ' ' + year);
 
     
    try{
        var date = new Date().getDate();
        const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var month =  monthNames[new Date().getMonth()]
        // var month = new Date().getMonth() + 1;
        var time = moment().utcOffset('+05:30').format(' hh:mm a');
        var year = new Date().getFullYear();
        return await
        firebase.database()
        .ref("feedbacks/"+currentuid)
        .child(guestuid)
        .push({
            sender:currentuid,
            receiver:guestuid,
            message:message,
            time:time,
            date:date + ',' + month + ' ' + year
        })
    }
    catch(error){
        return error;
    }
}


export const receiveMessage = async(currentuid,guestuid,message) => {
    try{
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var time = moment().utcOffset('+05:30').format(' hh:mm:ss a');
        return await 
        firebase.database()
        .ref("feedbacks/"+guestuid)
        .child(currentuid)
        .push({
            sender:currentuid,
            receiver:guestuid,
            message:message,
            time:time,
            date:date + ',' + month + ' ' + year
        })
    }
    catch(error){
        return error;
    }
}