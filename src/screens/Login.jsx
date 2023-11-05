// Libraries
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { 
    signInWithEmailAndPassword,
    signInWithCredential, 
    FacebookAuthProvider
} from 'firebase/auth';
import 'expo-dev-client';

// vector icons 
import { Entypo } from '@expo/vector-icons';


// Component
import { CustomInput } from '../components/CustomInput';
import { CustomBtn } from '../components/CustomBtn';
import { CustomFooter } from '../components/CustomFooter';

// Firebase config
import  authObj  from '../firebase/config';
// import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

const Login = ({navigation}) => {

    const auth = authObj;

    // useStates
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPwdValid, setIsPwdValid] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isPwdVisible, setIsPwdVisible] = useState(true);
    const [isTextSecure, setIsTextSecure] = useState(false);
    const [user, setUser] = useState();



    // Function to navigate to Sign-up SCREEN
    function navigateToSignUp(){
        navigation.navigate('SignupScreen');
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

    function navigateToHome() {
        navigation.navigate("BottomTabNavigator");
    }

    // Function to handle the Sign-in button click
    async function homeScreenNavigate() {
        // Reset error messages initially
        setIsEmailValid(true);
        setIsPwdValid(true);

        // Perform validation
        if (email.length === 0 || !email.match(/^(.+)@(.+)$/)) {
            setIsEmailValid(false);
            return; // Validation failed
        }
        if (password.length === 0 || password.length < 6) {
            setIsPwdValid(false);
            return; // Validation failed
        }

        // Connect to db
        try{
            await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(`The account: ${user.email}, has been signed in`);
                navigation.navigate('BottomTabNavigator');
                // ...
            })
        }catch(error){
            console.log(`Failed to sign in: ${user}`)
            console.log("Error code: ", error.code);
            console.log("Error Message: ", error.message);
            Alert.alert('Invalid email or password', 'Please check your information and try again', [
                {
                  text: 'Ok',
                  onPress: () => console.log('Ok Pressed'),
                },
            ]);
        }
        setEmail("");
        setPassword("");
    }   
    

    // Sign in via Facebook
    async function facebookSignIn(){
       try{
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            if (result.isCancelled){
                throw new Error('user cancelled login')
            }
            const data = await AccessToken.getCurrentAccessToken();
            if(!data){
                throw new Error('Something went wrong obtainingaccess token');
            }
            const credential = FacebookAuthProvider.credential(data.accessToken);
            const user  = await signInWithCredential(auth, credential);
            console.log(user);
       }catch(error){
        console.log(error.code);
        console.log(error.message);
       }
    }

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>   
                <View style={styles.header}>
                    <Text style={styles.headerTxt1}>Hello,</Text>
                    <Text style={styles.headerTxt2}>Welcome Back!</Text>
                </View >
                <View style={styles.body}>
                    <CustomInput 
                        name = 'Email'
                        placeholder = 'Enter Email Here'
                        value = {email}
                        setValue = {setEmail}
                    />
                    {!isEmailValid && email.length > 0 && <Text style={{
                        color: 'red',
                        position: 'absolute',
                        top: 110
                    }}>Invalid email format</Text>}
                    <CustomInput 
                        name = 'Password'
                        placeholder = 'Enter Password Here'
                        value = {password}
                        setValue = {setPassword}
                        secureTextEntry = {isTextSecure}
                    />
                    {!isPwdValid && password.length > 0 &&<Text style={{
                        color: 'red',
                        position: 'absolute',
                        top: 210
                    }}>Password must be more than 6 characters</Text>}
                    <TouchableOpacity style={styles.pwdIconShow} onPress={handlePasswordVisibility}>
                    {
                        isPwdVisible ? 
                        <Entypo name="eye" size={30} color="black"  style={{}}/> :
                        <Entypo name="eye-with-line" size={30} color="black" />
                    }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("PasswordRecoveryScreen")}>
                        <Text style={styles.forgotPasswrd}>Forgot Password ?</Text>
                    </TouchableOpacity>
                    
                    <CustomBtn 
                        name = "Sign-in"
                        navigateTo={homeScreenNavigate}
                        disabled={isFormValid}
                    />
                </View>
                <View style={styles.footer}>
                    <CustomFooter 
                        name = "Sign-up"
                        accountStatus= "Don't Have a Account"
                        navigateFunction = {navigateToSignUp}
                        facebookSignInFunc = {facebookSignIn}
                        navigation = {navigation}
                        navigateTo = {navigateToHome}
                    />
                </View>
                {/* <TouchableOpacity style={styles.pwdIconHide}>
                    <Entypo name="eye-with-line" size={24} color="black" />
                </TouchableOpacity> */}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9FBFC',
    },
    // -----------------------------------------------Page css-------------------------------------------
    header: {
        marginVertical: 50,
        width: 300,
        justifyContent: 'center',
    },
    body: {
        height: 400,
        width: 300,
        // backgroundColor: 'red',
        justifyContent: 'space-evenly',
    },
    footer: {
        flex: 1
    },
    // -----------------------------------------------Header css-------------------------------------------
    headerTxt1: {
        // fontFamily: 'Poppins',
        fontSize: 35,
        fontWeight: 'bold',
    },
    headerTxt2: {
        fontSize: 25,
    },
    // -----------------------------------------------Body css-------------------------------------------
    forgotPasswrd: {
        color: '#FF9C00'
    },
    errorMsg: {
        color: 'red',
        position: 'absolute',
        top: 110
    },
    pwdIconShow: {
        alignItems: 'flex-end',
        position: 'absolute',
        left: 250,
        top: 170,
    }
});

export default Login;