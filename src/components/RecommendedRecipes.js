import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import { firestore } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { collection, query, orderBy, limit, getDocs, where } from "firebase/firestore";

import authObj from "../firebase/config";

const API_KEY = '5ec053ef39eb4b1497f106c1265424ee';

const RecommendedRecipes = ({ navigation }) => {

  const auth = authObj;

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  const [userDataBmi, setUserDataBmi] = useState("");
  const [firstRender, setFirstRender] = useState(true);
  const [age, setAge] = useState('');
  const [minCalories, setMinCalories] = useState(0);
  const [maxCalories, setMaxCalories] = useState(1500);
  const [recipes, setRecipes] = useState([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  const handleBookmark = async (item) => {
    try {
      if (!bookmarks.includes(item.id)) {
        console.log("Selected recipe ID:", item.id); // Log the ID of the selected recipe
        setBookmarks([...bookmarks, item.id]);
  
        const userUid = auth.currentUser.uid;
        const bookmarksCollection = collection(firestore, "users", userUid, "bookmarks");
  
        // Check if the recipe is already bookmarked
        const querySnapshot = await getDocs(query(bookmarksCollection, where("recipeId", "==", item.id)));
  
        if (querySnapshot.empty) {
          // If not already bookmarked, add it to Firestore
          await addDoc(bookmarksCollection, {
            recipeId: item.id,
          });
        }
      }
      setIsDrawerVisible(false); // Close the drawer when the bookmark button is pressed
    } catch (error) {
      console.error('Error saving bookmark to Firestore:', error);
    }
  };
  

  const fetchUserData = async () => {
    try {
      const userUid = auth.currentUser.uid;
      console.log("Fetch bmi from the home screen", userUid);
  
      // Reference to the user document
      const userDocRef = doc(firestore, "users", userUid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        console.log("userDocSnap.data is: ", userData);
        const name = userData.fullName;
  
        // Reference to the BMI records sub-collection
        const bmiRecordsRef = collection(userDocRef, "bmiRecords");
  
        // Query the BMI records collection to get the latest record
        const q = query(bmiRecordsRef, orderBy("timestamp", "desc"), limit(1));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          // Retrieve the latest BMI record
          const latestBMIRecordData = querySnapshot.docs[0].data();
          const bmi = latestBMIRecordData.bmi;
  
          setUserDataBmi({
            name: name,
            bmi: bmi,
          });
          console.log("BMI data: ", bmi);
          if (firstRender) {
            setAge(bmi);
            setFirstRender(false);
          }
        } else {
          console.log("No BMI records found");
        }
      } else {
        console.log("User data not found");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const handleSearch = () => {
    if (age < 18) {
      setMinCalories(500);
      setMaxCalories(10000);
    } else if (age === 18 || age < 25) {
      setMinCalories(250);
      setMaxCalories(500);
    } else {
      setMinCalories(0);
      setMaxCalories(250);
    }

    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&minCalories=${minCalories}&maxCalories=${maxCalories}`
    )
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.results);
      })
      .catch((error) => {
        console.error('Error fetching recipes', error);
      });
  };

  const showDishDetails = (item) => {
    fetch(
      `https://api.spoonacular.com/recipes/${item.id}/information?apiKey=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSelectedDish(data); // Ensure that data contains the necessary information, including 'id'
        setIsDrawerVisible(true);
      })
      .catch((error) => {
        console.error('Error fetching recipe details', error);
      });
  };
  

  const renderRecipeItem = ({ item }) => {
    return(
    <TouchableOpacity style={styles.dishContainer} onPress={() => showDishDetails(item)}>
      <Image source={{ uri: item.image }} style={styles.dishImage} />
      <Text style={styles.dishName}>{item.title}</Text>
    </TouchableOpacity>
  )}
  

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
        onChangeText={(text) => setAge(text)}
        value={age}
        keyboardType="numeric"
        placeholder="Enter your BMI"
      />
      <Button title="Search Recipes" onPress={handleSearch} />

      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />

      <Modal visible={isDrawerVisible} animationType="slide">
        <ScrollView>
        <View style={styles.drawerContainer}>
          {selectedDish && (
            <View>
              <Text style={styles.dishName}>{selectedDish.title}</Text>
              <Text style={styles.drawerSectionTitle}>Description:</Text>
              <Text>{selectedDish.summary}</Text>

              <Text style={styles.drawerSectionTitle}>Bookmarked by {selectedDish.bookmarkCount} people</Text>

              <Text style={styles.drawerSectionTitle}>Ingredients:</Text>
              {selectedDish.extendedIngredients.map((ingredient, index) => (
                <Text key={index}>{ingredient.original}</Text>
              ))}

              <Text style={styles.drawerSectionTitle}>Steps to Make:</Text>
              {selectedDish.analyzedInstructions[0].steps.map((step, index) => (
                <Text key={index}>{step.step}</Text>
              ))}
            </View>
          )}

        <TouchableOpacity style={styles.closeButton} onPress={handleBookmark}>
            <Text style={styles.closeButtonText}>Bookmark Recipe</Text>
        </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={() => setIsDrawerVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  dishContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    padding: 10,
  },
  dishImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  dishName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  drawerSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  closeButton: {
    backgroundColor: 'gray',
    padding: 12,
    alignItems: 'center',
    margin: 10,
  },
  closeButtonText: {
    color: 'white',
  },
});

export default RecommendedRecipes;