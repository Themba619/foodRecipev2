import React, { useState } from 'react';
import { TextInput, Button, View , StyleSheet, Text} from 'react-native';

const ImageDescriptionInput = ({ setDescription }) => {
  const [text, setText] = useState('');

  const handleInputChange = (inputText) => {
    setText(inputText);
  };

  const submitDescription = () => {
    setDescription(text);
    setText('');
  };

  return (
    <View style ={styles.container}>
      <Text style={styles.stepsHeader}>Steps</Text>
      <View style={styles.textInpContainer}>
        <TextInput
          placeholder="Tell a little about your food"
          onChangeText={handleInputChange}
          value={text}
          multiline
          style={styles.stepInput}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
  },

  stepsHeader:{
    fontWeight: 'bold',
    fontSize: 20,
    color: 'grey',
    marginBottom: 15
  },

  textInpContainer:{
    borderColor: 'gray',
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 15
  },

  stepInput:{
    color: 'grey',
    borderRadius: 20,
    padding: 20,
    height: 200
  }


})

export default ImageDescriptionInput;
