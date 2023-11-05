import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Posts from '../components/postProfile';
import Videos from '../components/videosProfile';

const Tab = createMaterialTopTabNavigator();

const PostNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Posts" component={Posts} />
      <Tab.Screen name="Videos" component={Videos} />
    </Tab.Navigator>
  );
};

export default PostNavigator;
