// PostDetailsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PostDetailsScreen = ({ route, navigation }) => {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{post.description}</Text>
      <Text style={styles.ingredientTitle}>Ingredients:</Text>
      <Text style={styles.ingredients}>
        {post.ingredients.map((ingredient, index) => (
          `${index + 1}. ${ingredient.name}: ${ingredient.quantity} ${ingredient.unit}\n`
        ))}
      </Text>
      {/* Add steps here */}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  description: {
    fontSize: 16,
  },
  ingredientTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  ingredients: {
    fontSize: 16,
  },
  // Add styles for steps if needed
  closeButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default PostDetailsScreen;
