import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import React, {useState} from 'react';
import { sendPasswordResetEmail } from "firebase/auth";

// Screens
import authObj from "../firebase/config"

const PasswordRecovery = ({navigation}) => {

    const auth = authObj;

    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);

    function goBack(){
        navigation.goBack()
    }

    async function sendCode(){
        if(email.length === 0 || !email.match(/^(.+)@(.+)$/)){
            setIsEmailValid(false);
            return;
        }else{
            setIsEmailValid(true);
        }
        try {
            await sendPasswordResetEmail(auth, email);
            // Password reset email sent!
            Alert.alert('Email Sent', 'Please check your emails', [
                {
                    text: 'Ok',
                    onPress: () => console.log('Ok Pressed'),
                },
            ]);
            setEmail("");
        } catch (error) {
            console.log(`Error: ${error.code}, ${error.message}`);
        }
    }

  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.root}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={25} color="black" style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}/>
            </TouchableOpacity>
            <View style={styles.txtContainer}>
                <Text style={{
                    fontSize: 22, 
                    fontWeight: '700', 
                    color: '#3E5481',
                    marginBottom: 10,
                }}>Password recovery code</Text>
                <Text style={{
                    color: '#9FA5C0',
                    fontSize: 15,
                }}>Enter your email to recover your password</Text>
            </View>
            <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 50,
                }}>
                <MaterialIcons name="attach-email" size={24} color="black" style={styles.icon}/>
                <TextInput
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingLeft: 40,
                        backgroundColor: '#fff',
                        opacity: 0.5,
                        height: 65,
                        width: '95%',
                        borderWidth: 1,
                        borderRadius: 40,
                        color: '#000',
                        
                    }}
                    placeholder='JohnDoe@gmail.com'
                    value = {email}
                    onChangeText={setEmail}
                />
            </View>
            {!isEmailValid && email.length > 0 &&<Text style={{
                color: 'red',
                marginTop: 15,
                marginHorizontal: 25,
                fontSize: 20
            }}>Invalid input</Text>}
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={styles.btn} onPress={sendCode}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 15,
                        fontWeight: '700',
                    }}>Send Code</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 50,
    },

    txtContainer: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        position: 'absolute',
        right: 325,
        top: 22,
        alignItems: 'flex-start',

    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 60,
        backgroundColor: '#1FCC79',
        height: 65,
        borderRadius: 40,
        width: '95%'
    }
})

export default PasswordRecovery;