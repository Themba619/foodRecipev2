// Libraries
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {firestore} from '../firebase/config';
import { collection, addDoc, doc, setDoc} from 'firebase/firestore';

// Components
import { CustomFooter } from '../components/CustomFooter';
import { CustomInput } from '../components/CustomInput';
import { CustomBtn } from '../components/CustomBtn';
import { EmailConfirmation } from './EmailConfirmation';

// vector icons 
import { Entypo } from '@expo/vector-icons';


// Firebase config
import  authObj  from '../firebase/config';

const Signup = ({ navigation }) => {

    const auth = authObj
    const [googleUid, setGoogleUid] = useState(null); // State to store Google UID

    function handleGoogleSignIn(uid) {
        setGoogleUid(uid);
        // console.log("google uid from footer: ", googleUid);
    }
    
    // States
    const [fullName, setFullName] = useState('');
    const [email, setEmail ] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');

    // Validation conditional rendering
    const [isNameValid, setIsNameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPwdValid, setIsPwdValid] = useState(true);
    const [isPwdMatch, setIsPwdMatch] = useState(true);
    const [isPwdVisible, setIsPwdVisible] = useState(true);
    const [isTextSecure, setIsTextSecure] = useState(false);

    

    function navigateToSignIn(){
        navigation.navigate('LoginScreen');
    }

     // hide password / show password
     function handlePasswordVisibility() {
        setIsPwdVisible( (currentValue) => {
            return !currentValue;
        });
        setIsTextSecure( (currentState) => {
            return !currentState;
        })
    }


    // Asynchronously fetch the userUid from Firebase Authentication
    const fetchUserUid = async() => {
        try {
          const user = auth.currentUser;
          if (user) {
            // const userUid = user.uid;
            console.log("Sign up screen uid: ",user.uid);
            return user.uid;
          } else {
            // console.log('User is not authenticated.');
            return null;
          }
        } catch (error) {
          console.log('Error fetching user UID:', error);
          return null; // Return null on error
        }
    };

    const fetchGoogleUid = async () => {
        try {
          // Fetch the Google UID using your authentication method (e.g., Firebase).
          // Example: const googleUid = await getGoogleUid();
          // Update the state with the Google UID.
          setGoogleUid(googleUid);
        } catch (error) {
          console.error('Error fetching Google UID:', error);
        }
    };

    function handleGoogleSignIn(uid) {
        setGoogleUid(uid);
        // You can also fetch the Google UID here
        fetchGoogleUid();
        BMIScreen(uid);
        console.log("uid from handleGoogleSignIn func ", uid)
    }

    async function BMIScreen(uid) {
        // Ensure that googleUid is available
        if (uid) {
            navigation.navigate('BMIScreen', { googleUid: uid });
            console.log("passed to the BMI screen: ", uid);
        } else {
            console.error('Cannot retrieve the Google UID at this time.'); // Handle the error appropriately
        }
    }
    
      

    // async
    async function navigateToConfirmEmail() {

        const emailString = email.toString();

        setIsNameValid(true);
        setIsEmailValid(true);
        setIsPwdValid(true);
        setIsPwdMatch(true);
        if(fullName.length === 0){
            setIsNameValid(false);
            return;
        }
        if(emailString.length === 0 || !emailString.match(/^(.+)@(.+)$/)){
            setIsEmailValid(false);
            return;
        }
        if(password.length === 0 || password.length < 6){
            setIsPwdValid(false);
            return;
        }
        if(password !== confirmPwd){
            setIsPwdMatch(false);
            // ReloadInstructions;
            return;
        }

        try{
            await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log("Data sent user created: ", user);
                const userUid = fetchUserUid();

                // Create a reference to the user's document using their UID
                const userRef = doc(firestore, 'users', user.uid);
                
                // Data to store in the user's document
                const userData = {
                    fullName: fullName,
                };

                // Set the user's full name in the document
                setDoc(userRef, userData);
            if (userUid) {
                navigation.navigate('EmailConfirmationScreen', { email, userUid });
            }
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Error information not sent");
                // ERROR  Error code:  undefined
                console.error("Error code: ", error.code);
                // ERROR  Error message:  Cannot read property '_getRecaptchaConfig' of undefined
                console.error("Error message: ",errorMessage);
            });
        } catch(error){
            console.log("Error, user signup with email: ", error);
        }

        // try{
        //     const userNameRef = collection(firestore, 'users', userUid._j, 'userNames');
        //     const docRef = await addDoc(userNameRef, NameData);
        //     console.log('Document written with ID: ', docRef.id);
        // }catch(error){
        //     console.log(error);
        // }
        
        setEmail("");
        setFullName("");
        setConfirmPwd("");
        setPassword("");
    }

    return(
        <SafeAreaProvider>
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.txt1}>Create an account</Text>
                        <Text style={styles.txt2}>Lets help you set up your account</Text>
                        <Text style={styles.txt2}>It wont take long</Text>
                    </View>
                    <View style={styles.body}>
                        <CustomInput 
                            name = "Full name"
                            placeholder = "Enter Name Here"
                            value = {fullName}
                            setValue = {setFullName}
                        />
                        {!isNameValid && <Text style={{
                            color: 'red',
                            fontSize: 13,
                        }}>Input required</Text>}
                        <CustomInput 
                            name = "Email"
                            placeholder = "Enter Email Here"
                            value = {email}
                            setValue = {setEmail}
                        />
                        {!isEmailValid && email.length > 0 && <Text style={{
                            color: 'red',
                            fontSize: 13,
                        }}>Invalid email input</Text>}
                        <CustomInput 
                            name = "Create Password"
                            placeholder = "Enter Password Here"
                            value = {password}
                            setValue = {setPassword}
                            secureTextEntry = {isTextSecure}
                        />
                        {!isPwdValid && password.length > 0 && <Text style={{
                            color: 'red',
                            fontSize: 13,
                        }}>Password length must not be less than 6 characters</Text>}
                        <CustomInput 
                            name = "Confirm Password"
                            placeholder = "Confirm Password Here"
                            value = {confirmPwd}
                            setValue = {setConfirmPwd}
                            secureTextEntry = {isTextSecure}
                        />
                        {!isPwdMatch && confirmPwd > 0 && <Text style={{
                            color: 'red',
                            fontSize: 13,
                        }}>Passwords must match</Text>}
                        <View style={styles.btnContainer}>
                            <CustomBtn 
                                name = "Sign-up" 
                                navigateTo={navigateToConfirmEmail}
                            />
                        </View>
                        <TouchableOpacity style={styles.pwdIconShow} onPress={handlePasswordVisibility}>
                            {
                                isPwdVisible ? 
                                <Entypo name="eye" size={30} color="black" /> :
                                <Entypo name="eye-with-line" size={30} color="black" />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pwdIcon2Show} onPress={handlePasswordVisibility}>
                            {
                                isPwdVisible ? 
                                <Entypo name="eye" size={30} color="black" /> :
                                <Entypo name="eye-with-line" size={30} color="black" />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.footer}>
                        <CustomFooter 
                            name = "Sign-in"
                            accountStatus="Already Have a Account"
                            navigateFunction = {navigateToSignIn}
                            navigation = {navigation}
                            navigateTo = {BMIScreen}
                            onGoogleSignIn={handleGoogleSignIn}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        margin: 20
        // alignItems: 'center',
    },
    header: {
        // backgroundColor: 'red',
        // height: 30,
    },
    body: {
        // flex: 3,
        height: 500,
        justifyContent: 'space-evenly',
    },
    footer: {
        flex: 1
    },
    txt1: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    txt2: {
        fontSize: 11,
    },
    btnContainer: {
        alignItems: 'center'
    },
    pwdIconShow: {
        position: 'absolute',
        top: 250,
        left: 270
    },
    pwdIcon2Show: {
        position: 'absolute',
        top: 345,
        left: 270
    }
});

export default Signup;