import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { BlurView } from "expo-blur";
import { TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const Profile = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const signin = () => {
    createUserWithEmailAndPassword(auth, "kamogelo@mail.com", "12345678")
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user.email, user.uid);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../audio-app/components/auth/Login.png")}
        style={{
          width: 200,
          height: 200,
          justifySelf: "center",
          alignSelf: "center",
        }}
      />

      <TextInput style={styles.input} placeholder="Enter your email" textColor="white" placeholderTextColor="grey" />

      <TextInput style={styles.input2} placeholder="Enter your password"  textColor="white"placeholderTextColor="grey" />

      <TouchableOpacity style={{ borderColor: "gray", borderWidth: 1,borderRadius: 18,  width: 300,
          height: 40,justifySelf: "center", alignSelf: "center", backgroundColor:'white', padding:12, paddingLeft:270}} onPress={()=> signin()}>
        <Text
          style={{ color: "#040b33", justifySelf: "center", alignSelf: "center",borderRadius: 18,  width: 300,
          height: 40, fontWeight:'600', }}
          
        >
          Login
        </Text>
      </TouchableOpacity>

<Text style={{color:'white', alignSelf:'center', justifySelf:'center', marginTop:20}}>Don't have an account?</Text>
<TouchableOpacity style={{color:'white', alignSelf:'center', justifySelf:'center', marginTop:20, fontWeight:'600'}}>Register</TouchableOpacity>

    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#040b33",
    padding: 8,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 60,
    borderRadius: 18,
    justifySelf: "center",
    alignSelf: "center",
    marginTop: 40,
    
  },

  input2: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 60,
    borderRadius: 18,
    justifySelf: "center",
    alignSelf: "center",
  },
});
