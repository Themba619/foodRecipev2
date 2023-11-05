import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboarding from '../screens/OnBoarding.jsx';
import LoginScreen from '../screens/Login.jsx';
import SignupScreen from '../screens/Signup.jsx';
import PasswordRecoveryScreen from '../screens/PasswordRecovery.jsx';
import ProfileScreen from '../screens/profileScreen';
import PostContent from '../screens/postContent';
import PostContent2 from '../screens/postContent2';
import BottomTabNavigator from './bottom-tab-navigator';
import EmailConfirmationScreen from '../screens/EmailConfirmation.jsx';
import BMICalculatorScreen from '../screens/BMICalculatorScreen.js';
import EditProfileScreen from '../screens/EditProfileScreen.js';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Onboarding" component={Onboarding}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="SignupScreen" component={SignupScreen}/>
        <Stack.Screen name="PasswordRecoveryScreen" component={PasswordRecoveryScreen}/>
        <Stack.Screen name="EmailConfirmationScreen" component={EmailConfirmationScreen}/>
        <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="PostContent" component={PostContent} />
        <Stack.Screen name="PostContent2" component={PostContent2} />
        <Stack.Screen name="BMIScreen" component={BMICalculatorScreen}/>
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;