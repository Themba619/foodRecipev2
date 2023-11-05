import { StyleSheet, View, Text, TextInput } from "react-native";
import React, { useState } from "react";

export const CustomInputCode = ({ onVerifyOTP, verificationCode }) => {
  const [code, setCode] = useState(["", "", "", ""]);

  const handleChange = (text, index) => {
    // Update the code array with the entered value
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    console.log(newCode);

    // Move to the next input field (if not the last one)
    if (index < 3 && text) {
      inputRefs[index + 1].focus();
    }

    // Check if the code is complete (all digits entered) and call the onVerifyOTP callback
    if (newCode.every((digit) => digit !== "")) {
      onVerifyOTP(newCode.join("")); // Ensure it's always a string
    }
  };

  // Create an array of refs for input fields
  const inputRefs = [null, null, null, null];

  return (
    <View style={styles.inputContainer}>
      {code.map((value, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs[index] = ref)}
          style={styles.input}
          placeholder="0"
          keyboardType="numeric"
          value={value}
          onChangeText={(text) => handleChange(text, index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 50,
  },
  input: {
    width: 72,
    height: 72,
    backgroundColor: "#fff",
    color: "#000",
    textAlign: "center",
    fontSize: 35,
    borderRadius: 5,
    borderWidth: 1,
  },
});
