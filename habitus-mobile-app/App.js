import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth } from './firebase';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from "./src/assets/colors";

import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import CreateGoalScreen from './src/screens/create/CreateGoalScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import CreateMilestoneScreen from './src/screens/create/CreateMilestone';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import CameraScreen from './src/screens/camera/CameraScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [signedIn, setSignedIn] = useState(true);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });
  const Tab = createMaterialBottomTabNavigator();

  return (
    <PaperProvider>
      <NavigationContainer>
        {signedIn ?
          (<Tab.Navigator initialRouteName="Home" screenOptions={{
            tabBarActiveTintColor: '#e91e63',
          }}>

            <Tab.Screen
              name="home"
              options={{
                tabBarLabel: "home",
                tabBarIcon: "home"
              }}
              component={HomeScreen} />
            <Tab.Screen
              name="camera"
              options={{
                tabBarLabel: "camera",
                tabBarIcon: "camera"
              }}
              component={CameraScreen} />
            <Tab.Screen name="milestone" component={CreateMilestoneScreen} />
            <Tab.Screen name="create-goal-screen" component={CreateGoalScreen} />

          </Tab.Navigator>) : (<Stack.Navigator
            mode="card"
            screenOptions={{
            }}
          >
            {/* <Stack.Screen
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
            /> */}
            {/* <Stack.Screen
              name="createGoal"
              component={CreateGoalScreen}
              options={{
                title: 'Create a Goal',
                headerStyle: {
                  backgroundColor: "#E9C273",
                },
                headerTintColor: '#fff',
              }}
            /> */}
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
          </Stack.Navigator>)

        }
      </NavigationContainer>
      {/* <NavigationContainer>
        {signedIn
          ? (
            <>
              <StatusBar style="light" />

              <Stack.Navigator
                mode="card"
                screenOptions={{

                }}
              >
               

                {/* <Stack.Screen
                  name="homescreen"
                  component={HomeScreen}
                  options={{
                    title: 'Home',
                    headerStyle: {
                      backgroundColor: '#29434e',
                      borderBottomColor: '#29434e',
                    },
                    headerTintColor: '#fff',
                  }}
                /> */}
      {/* <Stack.Screen
                  name="milestone"
                  component={CreateMilestoneScreen}
                  options={{
                    title: 'Create a Milestone',
                    headerStyle: {
                      backgroundColor: '#29434e',
                      borderBottomColor: '#29434e',
                    },
                    headerTintColor: '#fff',
                  }}
                />*/}
      {/* <Stack.Screen
                  name="create-goal-screen"
                  component={CreateGoalScreen}
                  options={{
                    title: 'Create a Goal',
                    headerStyle: {
                      backgroundColor: '#29434e',
                      borderBottomColor: '#29434e',
                    },
                    headerTintColor: '#fff',
                  }}
                /> */}
      {/* <Stack.Screen
                  name="camera-screen"
                  component={CreateGoalScreen}
                  options={{
                    title: 'Create a Goal',
                    headerStyle: {
                      backgroundColor: '#29434e',
                      borderBottomColor: '#29434e',
                    },
                    headerTintColor: '#fff',
                  }}
                /> */}

      {/* </Stack.Navigator>
            </>
          ) : (
    <>
      <StatusBar style="light" />
      <Stack.Navigator
        mode="card"
        screenOptions={{
        }}
      >
        <Stack.Screen
          name="signIn"
          component={LoginScreen}
          options={{
            title: 'Sign in',
            headerStyle: {
              backgroundColor: '#29434e',
              borderBottomColor: '#29434e',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="register"
          component={RegisterScreen}
          options={{
            title: 'Register',
            headerStyle: {
              backgroundColor: '#29434e',
              borderBottomColor: '#29434e',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </>
  )
}
      </NavigationContainer > * /} */}
    </PaperProvider >

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
