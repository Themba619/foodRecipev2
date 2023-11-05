import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {firestore} from '../firebase/config';
import { collection, addDoc, doc} from 'firebase/firestore';
// import { ref, push } from '@react-native-firebase/database';


// console.log(firestore);
import auth from "../firebase/config";

// console.log(firestore);


const BMICalculatorScreen = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userUid, googleUid } = route.params;
  console.log("This is from bmi screen via email and password: ", userUid);
  console.log("This is from bmi screen via google: ", googleUid);
  // Check if userUid is available and has the _j property
  const userUidAvailable = userUid && userUid._j;

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBMIResult] = useState('');

  const calculateBMI = async () => {
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    setBMIResult(bmi.toFixed(2));
  
    // Save BMI to Firestore
    const bmiData = {
      height: parseFloat(height),
      weight: parseFloat(weight),
      bmi: parseFloat(bmiResult),
      timestamp: new Date().toISOString(), // You can add a timestamp if needed
    };
  
    try {
      if (userUid) {
        // Use userUid method
        const userBmiRef = collection(firestore, 'users', userUid._j, 'bmiRecords');
        const docRef = await addDoc(userBmiRef, bmiData);
        console.log('Document written with ID: ', docRef.id);
      } else if (googleUid) {
        // Use GoogleUid method
        const userBmiRef = collection(firestore, 'users', googleUid, 'bmiRecords');
        const docRef = await addDoc(userBmiRef, bmiData);
        console.log('Document for bmi written with ID: ', docRef.id);
      } else {
        console.error("No UID available to store BMI data.");
      }
    } catch (error) {
      console.error(error);
      console.log("error message says i have insuffecient permissions")
    }
  };
  

  const isDataValid = height !== '' && weight !== '';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Height (cm):</Text>
      <TextInput
        style={styles.input}
        onChangeText={setHeight}
        value={height}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Enter Weight (kg):</Text>
      <TextInput
        style={styles.input}
        onChangeText={setWeight}
        value={weight}
        keyboardType="numeric"
      />
      <Button title="Calculate BMI" onPress={calculateBMI} />
      <Text style={styles.result}>BMI Result: {bmiResult}</Text>
      <Button
        title="Go to Home Screen"
        onPress={() => {
          if (isDataValid) {
            navigation.navigate('BottomTabNavigator');
          } else {
            // Optionally, you can show an error message or handle the case where data is not valid.
            console.log('Please enter valid height and weight');
          }
        }}
        disabled={!isDataValid} // Disable the button when data is not valid
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
  },
  result: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default BMICalculatorScreen;
