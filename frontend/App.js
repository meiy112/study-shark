import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios'
import { PaperProvider } from 'react-native-paper'

import { UserApi } from './api/UserApi';
import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Topic from './components/Topic/Topic';
import Settings from './components/Topic/Settings';


const Tab = createBottomTabNavigator();

export default function App() {
  // code for testing pls ignore
  // const [data, setData] = useState({});


  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await fetch("http://192.168.86.21:3000/messages/");
  //       const resData = await res.json();
  //       setData(resData);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
          <Tab.Screen
            name="Topic"
            component={Topic}
            options={{
              tabBarLabel: 'Topic',
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarLabel: 'Settings',
            }}
          />
      </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
    
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
