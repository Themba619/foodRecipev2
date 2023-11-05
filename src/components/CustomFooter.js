import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import {firestore} from '../firebase/config';
import { collection, addDoc, doc, setDoc} from 'firebase/firestore';
import auth from "@react-native-firebase/auth";
import "expo-dev-client";

GoogleSignin.configure({
  webClientId:
    "469853786927-mlqt2ajq7f31csipvcb5kutvbvguo052.apps.googleusercontent.com",
});

export const CustomFooter = ({
  name,
  navigateFunction,
  accountStatus,
  navigateTo,
  onGoogleSignIn
}) => {
  const [user, setUser] = useState();

  // Function to clear the Google Sign-In cache
  async function clearGoogleSignInCache() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // The cache is now cleared, and the user will be prompted to select an account again.
      console.log("Google Sign-In cache cleared.");
    } catch (error) {
      console.log(
        "Error clearing Google Sign-In cache, no cache to clear:",
        error
      );
    }
  }

  // Google Option function
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await clearGoogleSignInCache();
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
    .then((userCredential) => {
      // Extract the Google UID from the user object
      const user = userCredential.user;
      const googleUid = user.uid;
      console.log("This is your Google UID: ", user);
      
      const displayName = user.displayName;
      console.log("Name is: ",displayName);
      if (displayName) {
        // Save the displayName to Firestore
        const userRef = doc(firestore, 'users', googleUid);
        const userData = {
          displayName: displayName,
        };
        setDoc(userRef, userData);
      }
      // Navigate to the BMI screen and pass the UID
        navigateTo(googleUid);
        onGoogleSignIn(googleUid);
      })
      .catch((error) => {
        console.log(error);
      });

      // try{
      //   const userDisplayName =user_sign_in.displayName;
      //   console.log("Display name of user: ", userDisplayName);
      //   if (userDisplayName) {
      //     const userRef = doc(firestore, 'users', uid);
      //     const userData = {
      //       displayName: displayName, // Store the display name
      //     };
      // }
      //   setDoc(userRef, userData);
      // }catch(error){
      //   console.log(error)
      // }
  }

  // Function to sign out the user
  async function signOutUser() {
    try {
      await auth().signOut();
      // The user is now signed out.
      console.log("User signed out successfully.");
    } catch (error) {
      // Handle any errors that may occur during the sign-out process.
      console.log("Error signing out:", error);
    }
  }

  return (
    <View>
      <View style={styles.or}>
        <Text style={styles.line}>-</Text>
        <Text style={styles.ortxt}>Or Sign in With</Text>
        <Text style={styles.line}>-</Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity
          style={styles.iconsContainer}
          onPress={onGoogleButtonPress}
        >
          <Image 
          style={{width: 200, height: 50}}
          source = {{uri: "https://onymos.com/wp-content/uploads/2020/10/google-signin-button-1024x260.png"}}
        />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.dontHaveAccount}>{accountStatus}</Text>
        <TouchableOpacity onPress={navigateFunction}>
          <Text style={styles.signup}>{name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  or: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    marginHorizontal: 5,
    width: 50,
    height: 1,
    backgroundColor: "#D9D9D9",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  iconsContainer: {
    paddingHorizontal: 15,
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "95%",
    marginTop: 5,
    // backgroundColor: 'red'
  },
  dontHaveAccount: {
    fontSize: 11,
    // paddingHorizontal: 5,
  },
  signup: {
    fontSize: 11,
    color: "#FF9C00",
    position: "relative",
    // right: 25
  },
});
