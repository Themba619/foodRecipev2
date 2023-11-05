import { StyleSheet, View, Text, TextInput } from "react-native";
import React from "react";

// vector icons 
import { Entypo } from '@expo/vector-icons';

export const CustomInput = ({
  placeholder,
  name,
  value,
  setValue,
  secureTextEntry,
  IconName1,
  IconName2
}) => {
  return (
    <View style={styles.root}>
      <Text>{name}</Text>
      <TextInput
        style={styles.inputContainer}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        secureTextEntry = {secureTextEntry}
      />
      {
        IconName1 && <Entypo name="eye-with-line" size={24} color="black" />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // backgroundColor: 'red'
  },
  inputContainer: {
    backgroundColor: "white",
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    paddingHorizontal: 5,
  },
});
