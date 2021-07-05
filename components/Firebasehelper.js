import firebase from '@firebase/app'; 
require('firebase/auth');
require('firebase/database');



export const  Firebasehelper =()=>{
    let returnArr = [];
  
    console.log('called func')
    firebase.database()
    .ref("users/")
    .orderByChild("uid")
    .equalTo(firebase.auth().currentUser.uid)
    .on('value', snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach((child) => {
            // setid(child.key)
            // to get donations of current user logged in
            firebase.database()
            .ref("users/"+child.key+"/donationsmade/")
            .on('value', snap => {
                returnArr = []
                if (snap.exists()) {
                    snap.forEach((child1) => {
                                  // to get details of each donations made by user logged in
                                  firebase.database()
                                  .ref("donations/"+child1.val().donationid)
                                  .on('value', snap1 => {
                                      if (snap1.exists()) {
                                        //   return(<Imgcard navigation={navigation} key={item.key} keyvalue={item.key} date={item.donationdate} time={item.donationtime}  item={item.fooditem} quantity= {item.plates+' Plate(s)'} pickuptimefrom={item.starttime} pickuptimeto={item.endtime} shelflife={item.shelf+' Hours'} address={item.address} foodimg={item.imguri} donationstatus={item.donationstatus} donatedto={item.donatedto}></Imgcard>)
                                        returnArr.push(snap1.val())                             
                                      } else {
                                        console.log('Went wrong while fetching donation details');
                                      }
                                  })
                    });
                    // var dc = []
                    // dataContainer.reverse().map(v=>{
                    //   dc.push(v)
                    // })
                    // setdonations(dataContainer)
                    // var imgk = []
                    // imgkeys.reverse().map(v=>{
                    //   imgk.push(v)
                    // })
                    // setkeys(imgk)
                    // setloading(false)
                } else {
                    console.log('Went wrong while fetching data');
                }
            })
          }); 
        } else {
          console.log('Went wrong');
        }
    })    

  
    return returnArr;
  };