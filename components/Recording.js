import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet,TouchableOpacity, Text, View } from "react-native";
import {Card} from 'react-native-paper';
import{MaterialIcons} from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';

import { Audio } from "expo-av";

export default function App() {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false); 

  useEffect(() => {
    Audio.requestPermissionsAsync();
  }, []);

  async function startRecording() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recordingInstance = new Audio.Recording();
      await recordingInstance.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recordingInstance.startAsync();
      setRecording(recordingInstance);
      setIsRecording(true);
    } catch (err) {
      console.error("failed to start recording", err);
    }
  }

  async function stopRecording() {
    if (!recording) {
      return;
    }

    try {
      await recording.stopAndUnloadAsync();
      const { sound, status } = await recording.createNewLoadedSoundAsync();

      let updatedRecordings = [...recordings];
      updatedRecordings.push({
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI(),
      });
      setRecordings(updatedRecordings);
      setRecording(null);
      setIsRecording(false);
    } catch (err) {
      console.error("failed to stop recording", err);
    }
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function deleteRecording(index) {
    const updatedRecordings = [...recordings];
    updatedRecordings.splice(index, 1);
    setRecordings(updatedRecordings);
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => (
      <View key={index} style={styles.row}>
        <Card style={{width:400, height:60, marginTop:20}}>
        <Text style={styles.fill}>
          Recording {index + 1} - {recordingLine.duration}
        </Text>
        
        
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => recordingLine.sound.replayAsync()}
        >
        <Foundation name="play" size={24} color="black" />
        
        </TouchableOpacity>
      
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteRecording(index)}
          >
         <AntDesign name="delete" size={23} color="black" width={30}/>
          
          </TouchableOpacity>
          </Card>
      </View>
    ));
  }

  return (
    <View style={styles.container}>
      <Text style={{color:"red"}}>{isRecording ? "Recording..." :message}</Text>
      <TouchableOpacity 
     
        style={styles.initialButton}
      
        onPress={recording ? stopRecording : startRecording}
    
      > <MaterialIcons name="mic" size={70} color="red" />
        <Text>{recording ? "Stop recording" : "Start recording"}</Text>
        </TouchableOpacity>
      {getRecordingLines()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    color: "red",
    
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fill: {
    flex: 2,
    margin: 16,
    fontSize:17,
    
    
  },
  playButton:{
    bottom:50,
  padding: 15,
  marginLeft:260,
  borderRadius:10,
  },
  deleteButton:{
    bottom:110,
    marginLeft:310,
   padding: 15,
   borderRadius:10,
   },
  initialButton:{
    alignItems:"center",
  },
  
});