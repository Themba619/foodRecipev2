import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 15}}>Add a cover photo</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.imageContainer} />}
    </View>
  );
}

const styles = StyleSheet.create({

  imageContainer:{
    padding: 20,
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 8,
    borderColor: 'grey',
    height: 200,
    marginBottom: 20

  },

  imageBtn:{
    padding: 20,
    backgroundColor: 'green',
    borderRadius: 8,
    marginBottom: 50

  },

})
