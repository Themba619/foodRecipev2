import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const EditProfileScreen = () => {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('');
  const [profileImage, setProfileImage] = useState(null);


  const handleImageChange = async () => {
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

  const handleSave = () => {
    // Implement logic to save the updated profile information
    console.log('Saving profile...');
  };

  const handleDeleteAccount = () => {
    // Implement logic to delete the user's account
    console.log('Deleting account...');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.usernameIconContainer}>
          <View style={styles.circularIcon}>
            <FontAwesome5 name="user" size={80} color="green" />
          </View>
          <TouchableOpacity style={styles.cameraIcon} onPress={handleImageChange}>
            <FontAwesome5 name="camera" size={20} color="green" />
          </TouchableOpacity>
        </View>
        <Text style={styles.changeProfileText}>Change Profile Photo</Text>
      </View>
      <View style={styles.profileInfo}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={text => setUsername(text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>BMI status:</Text>
          <TextInput
            style={styles.input}
            placeholder="BMI"
            onChangeText={text => setStatus(text)}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <View style={{ marginHorizontal: 10 }} />
        <TouchableOpacity style={styles.buttonDelete} onPress={handleDeleteAccount}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 200
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  usernameIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circularIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    marginLeft: 10,
  },
  changeProfileText: {
    color: 'green',
    marginTop: 10,
  },
  profileInfo: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: 'green',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonDelete: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;