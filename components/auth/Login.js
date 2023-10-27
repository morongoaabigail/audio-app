import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Profile = () => {
  return(

    <View style={styles.container}>

    <Image source={require('../assets/Login.png')} />
    
    
    
    
    
    
    
    
      </View>



  )
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
      },
});
