import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, TouchableOpacity, Text,  } from 'react-native';
import { Video } from 'expo-av';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  
  const video = React.useRef(null);
  const [videoUri, setVideoUri] = useState("");
  const [status, setStatus] = React.useState({});
  
  const selectVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setVideoUri(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.videoBtn}onPress={selectVideo}>
        <Text style={{color: 'white'}}>Pick a video from camera roll</Text>
      </TouchableOpacity>

      <View style={styles.videoContainer}>
        <Video
          ref={video}
          style={styles.video}
          source={{ uri: videoUri }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={setStatus}
        />
      
      </View>
      <StatusBar style="auo" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 20,
    marginBottom: 20
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
    borderColor: 'green', 
    borderStyle: 'dashed', 
    borderWidth: 5,
    backgroundColor: 'black'
  },
  
  videoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 16 / 9, 
    width: '100%',
    marginLeft: 20,
    marginRight: 20
  }
});
