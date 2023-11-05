import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const API_KEY = '5ec053ef39eb4b1497f106c1265424ee';

const BookmarkPage = ({ bookmarks }) => {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);

  useEffect(() => {
    const fetchBookmarkedRecipes = async () => {
      if (bookmarks && bookmarks.length > 0) {
        const promises = bookmarks.map(async (id) => {
          const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
          const data = await response.json();
          return data;
        });
        const recipes = await Promise.all(promises);
        setBookmarkedRecipes(recipes);
      }
    };

    fetchBookmarkedRecipes();
  }, [bookmarks]);

  const renderBookmarkedItem = ({ item }) => (
    <View style={styles.dishContainer}>
      <Image source={{ uri: item.image }} style={styles.dishImage} />
      <Text style={styles.dishName}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmarked Recipes</Text>
      <FlatList
        data={bookmarkedRecipes}
        renderItem={renderBookmarkedItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
});

export default BookmarkPage;