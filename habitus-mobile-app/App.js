import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth } from './firebase';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from "./src/assets/colors";
import Icon from 'react-native-vector-icons/FontAwesome';

import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import CreateGoalScreen from './src/screens/create/CreateGoalScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import CreateMilestoneScreen from './src/screens/create/CreateMilestone';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraScreen from './src/screens/camera/CameraScreen';
import tw from 'twrnc';

const Stack = createNativeStackNavigator();

export default function App() {
  const [signedIn, setSignedIn] = useState(true);
  const [userID, setUserId] = useState();
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUserId(user.getIdToken());
      console.log(user.getIdToken())
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });
  const Tab = createBottomTabNavigator();

  function HomeTabs() {
    return <Tab.Navigator initialRouteName="Home"
      screenOptions={() => ({
        tabBarActiveTintColor: 'black',

        headerShown: false,
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: '#FFF7EE',
          position: 'absolute',
          borderTopWidth: 0,
        },
      })}

    >

      <Tab.Screen
        name="homepage"
        options={{
          tabBarLabel: "home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={32} />
          ),
        }}
        component={HomeScreen} />
      <Tab.Screen
        name="camera"
        options={{
          tabBarLabel: "camera",
          tabBarIcon: ({ color, size }) => (
            <Icon name="camera" color={color} size={28} />
          ),
        }}
        component={CameraScreen} />
      <Tab.Screen name="milestone" component={CreateMilestoneScreen} />
      <Tab.Screen name="create-goal-screen" component={CreateGoalScreen} />

    </ Tab.Navigator>
  }
  return (
    <PaperProvider>
      <NavigationContainer>
        {signedIn ?
          HomeTabs() : (<Stack.Navigator
            mode="card"
            screenOptions={{
            }}
          >
            <Stack.Screen
              name="signIn"
              component={LoginScreen}
              options={{
                title: '',
                headerStyle: {
                  backgroundColor: '#D78F41',
                },
              }}
            />
            <Stack.Screen
              name="register"
              component={RegisterScreen}
              options={{
                title: 'Create an Account',
                headerStyle: {
                  backgroundColor: "#5C82DC",
                },
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="createGoal"
              component={CreateGoalScreen}
              options={{
                title: 'Create a Goal',
                headerStyle: {
                  backgroundColor: "#E9C273",
                },
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="createMilestone"
              component={CreateMilestoneScreen}
              options={{
                title: 'Create a Milestone',
                headerStyle: {
                  backgroundColor: "#E9C273",
                },
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="home"
              component={HomeTabs}
              options={{ headerLeft: (props) => null, headerShown: false }}
            />
          </Stack.Navigator>)
        }
      </NavigationContainer>

    </PaperProvider >

  );
}