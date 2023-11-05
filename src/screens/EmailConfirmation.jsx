import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import {sendEmailVerification} from "firebase/auth";
// emailjs API for sending OTP

import emailjs from 'emailjs-com';


// Components
import { CustomBackBtn } from '../components/CustomBackBtn';
import { CustomInputCode } from '../components/CustomInputCode';

const EmailConfirmation = ({ navigation, route }) => {
  const initialMinutes = 4;
  const initialSeconds = 0;

  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [verificationCode, setVerificationCode] = useState('');
  const [otp, setOtp] = useState('');
  
  const { email, userUid } = route.params;
  // console.log("email confirmation uid: ", userUid);
  // console.log(email)


  function goBack() {
    navigation.goBack();
  }

  // 4 min time interval
  useEffect(() => {
    const timer = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        // Timer has reached 00:00, you can perform some action here.
        clearInterval(timer); // Stop the timer
      } else {
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, [minutes, seconds]);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  // Send pin on first render
  useEffect( () => {
    sendOtp();
  }, []);


  // Generate random OTP
  function generateOTP() { 
    // Declare a digits variable  
    // which stores all digits 
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 4; i++ ) { 
      OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    console.log(OTP)
    return OTP; 
  }

  async function sendOtp() {
    const newOtp = generateOTP();

    const templateParams = {
      to: email.trim(),
      message: `Your OTP is: ${newOtp}`, // Use a placeholder for the OTP
    };

    // Send email
    try{
      await emailjs
      .send('service_cgpfw0v', 'template_e0twm1j', templateParams, 'EgCPhcJ0BZPSTpR4I')
      .then( (response) => {
        console.log("Email sent: ", response);
        setOtp(newOtp);
      })
      .catch( (response) => {
        console.error('Error sending email: ', response);
      })
    }catch(response) {
      console.log("Error message: ", response)
    }
  }

  // Reset timer send new pin
  function handleSendAgainClick() {
    // Reset the timer to initial values
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    sendOtp();
  }


  function handleVerifyClick(enteredOTPArray) {
    console.log("The entered OTP array is: ", enteredOTPArray);
    // const enteredOTP = parseInt(enteredOTPArray.join(""), 10);
  
    if (enteredOTPArray === otp) {
      // OTP is correct, you can add your logic here
      console.log('OTP verified');
      navigation.navigate("BMIScreen", {userUid});
    } else {
      // Incorrect OTP
      Alert.alert('Invalid OTP', 'Please enter a valid OTP', [
        {
          text: 'Ok',
          onPress: () => console.log('Ok Pressed'),
        },
      ]);
    }
  }
  


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        <View>
          <CustomBackBtn backNavigation={goBack} />
          <CustomInputCode 
            verificationCode={String(verificationCode)}
            onVerifyOTP={enteredOTPArray => handleVerifyClick(enteredOTPArray)}
          />
          <View style={styles.timer}>
            <Text>
              Code expires in <Text style={{ color: 'red' }}>{formattedMinutes}:{formattedSeconds}</Text>
            </Text>
          </View>
          <View style={{
            alignItems: 'center',
            marginVertical: 45,
          }}>
            <TouchableOpacity style={styles.verify} onPress={() => handleVerifyClick(verificationCode)}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendAgain} onPress={handleSendAgainClick}>
              <Text style={{ color: '#9FA5C0', fontWeight: '700' }}>Send Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  timer: {
    alignItems: 'center',
  },
  verify: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1FCC79',
    width: '95%',
    height: 60,
    marginVertical: 5,
    borderRadius: 40,
  },
  sendAgain: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    width: '95%',
    height: 60,
    marginVertical: 5,
    borderRadius: 40,
    borderWidth: 1,
  }
});

export default EmailConfirmation;