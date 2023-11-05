import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import PostNavigator from "../navigation/postsNavigators";
import auth from "@react-native-firebase/auth";
import { firestore } from "../firebase/config";
import { doc, getDoc } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
// import {PostDetailsScreen} from "./PostDetailsScreen";


import authObj from "../firebase/config";

const ProfileScreen = ({ navigation }) => {

  

  const [userData, setUserData] = useState({
    name: "Loading...",
    bmi: "Loading...",
  });

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const userUid = authObj.currentUser.uid;
      console.log("from profile screen", userUid);
  
      // Reference to the user document
      const userDocRef = doc(firestore, "users", userUid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const name = userData.fullName; // Use the correct field name for the user's name
        console.log(name);
        setUserData({
          name: name,
          bmi: "Loading..."
        })
        
  
        // Reference to the latest BMI record (assuming it's the first one in the array)
        // const latestBMIRecordRef = doc(userDocRef, "bmiRecords", userData.bmiRecords[0]);
        // const latestBMIRecordSnap = await getDoc(latestBMIRecordRef);
        // setUserData({
        //   name: name,
        //   bmi: "Loading..."
        // })
      }
      //   if (latestBMIRecordSnap.exists()) {
      //     const latestBMIRecordData = latestBMIRecordSnap.data();
      //     const bmi = latestBMIRecordData.bmi;
  
      //     setUserData({
      //       name: name,
      //       // bmi: bmi,
      //     });
      //   } else {
      //     console.log("No BMI records found");
      //   }
      // } else {
      //   console.log("User data not found");
      // }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };
  
  
  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);
  
  

  // Function to sign out the user
  async function signOutUser() {
    if (auth) {
      try {
        await auth().signOut();
        // The user is now signed out.
        console.log("User signed out successfully.");
        navigation.navigate("LoginScreen");
      } catch (error) {
        // Handle any errors that may occur during the sign-out process.
        console.log("Error signing out:", error);
      }
    } else if (authObj) {
      try {
        authObj.currentUser.signOut();
        console.log("User signed out successfully.");
        navigation.navigate("LoginScreen");
      } catch (error) {
        console.log("Error signing out: ", error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <View style={styles.nextTo}>
          <Text style={styles.username}>Profile</Text>
          {/*<TouchableOpacity >
            <Text>Settings</Text>
        </TouchableOpacity>*/}
        </View>
        <Image
          source={{
            uri: "https://www.escoffier.edu/wp-content/uploads/2022/03/Chef-in-uniform-posing-for-a-photo-in-a-kitchen-1400.jpg",
          }}
          style={styles.profileImage}
        />

        <View style={styles.followCounts}>
          <Text style={styles.followText}>Recipe: 2</Text>
          <Text style={styles.followText}>Followers: 100</Text>
          <Text style={styles.followText}>Following: 50</Text>
        </View>
      </View>

      <Text style={styles.username}>{userData.name}</Text>
      <Text style={styles.bio}>BMI</Text>

      <View style={styles.profileActions}>
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={{ color: "white" }}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <PostNavigator />

      <TouchableOpacity
        style={styles.newContentButton}
        onPress={() => navigation.navigate("PostContent")}
      >
        <Text style={{ color: "white" }}>New Content</Text>
      </TouchableOpacity>
      <View style={styles.btns}>
        <TouchableOpacity style={styles.logoutBtn} onPress={signOutUser}>
          <Text style={{ color: "white", fontSize: 15 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  profileInfo: {
    alignItems: "center",
    marginBottom: 20,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },

  bio: {
    fontSize: 16,
    color: "gray",
    marginTop: 5,
  },

  profileActions: {
    flexDirection: "row",
    marginTop: 10,
  },

  editProfileButton: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 5,
    marginRight: 5,
    padding: 5,
  },

  // settingsButton: {
  //   backgroundColor: 'lightgreen',
  //   alignItems: 'right',
  //   padding: 5,
  //   borderRadius: 5,
  //   position: 'absolute',
  //   left: 10
  // },

  followCounts: {
    flexDirection: "row",
    marginTop: 10,
  },

  followText: {
    marginRight: 20,
    fontSize: 15,
    fontWeight: "bold",
  },

  newContentButton: {
    backgroundColor: "green",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },

  nextTo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  btns: {
    flexDirection: "row",
    position: "absolute",
    left: 290,
    top: 250,
    // paddingHorizontal: 10
  },
  logoutBtn: {
    marginRight: 10,
    backgroundColor: "green",
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  // DeleteBtn: {
  //   backgroundColor: "green",
  //   height: 40,
  //   width: 160,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
});

export default ProfileScreen;
