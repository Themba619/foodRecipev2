import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/profileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeScreen') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'BookmarksScreen') {
              iconName = focused ? 'bookmarks' : 'bookmarks-outline';
            } else if (route.name === 'NotificationsScreen') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'ProfileScreen') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        // screenOptions={{}}
        tabBarOptions={{
          activeTintColor: 'green',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="BookmarksScreen" component={BookmarksScreen} />
        <Tab.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      </Tab.Navigator>
  );
};

export default BottomTab;
