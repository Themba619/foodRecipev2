import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const NotificationsScreen = () => {

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Welcome to My Recipe', read: false },
    { id: 2, text: 'John Smith commented on your post', read: true },
    { id: 3, text: 'John Smith updated his profile picture', read: true },
    { id: 4, text: 'Eddie Jameson posted a new recipe', read: false },
    { id: 5, text: 'Donny Frank commented on your post', read: true },
    { id: 6, text: 'Johnny Chapman Smith commented on your post', read: false },
    { id: 7, text: 'Dude Smith commented on your post', read: false }
  ]);

  const handleNotificationPress = (notification) => {
   
    console.log('Notification clicked:', notification.text);
   
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.notification,
              {
                backgroundColor: item.read ? '#EAEAEA' : 'white', 
              },
            ]}
            onPress={() => handleNotificationPress(item)}
          >
            <Text
              style={[
                styles.notificationText,
                {
                  fontWeight: item.read ? 'normal' : 'bold',
                },
              ]}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  notification: {
    marginVertical: 5,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  notificationText: {
    fontSize: 16,
  
  },
});

export default NotificationsScreen;