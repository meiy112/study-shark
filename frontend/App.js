import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { PaperProvider } from 'react-native-paper'
import {
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
  } from "@expo/vector-icons";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './components/Home/Home';
import Explore from './components/Explore/Explore';
import Groups from './components/Groups/Groups';
import Profile from './components/Profile/Profile';
import NavBarAddButton from './components/Misc/NavbarAddButton';
import AddModal from './components/Misc/AddModal';

import Topic from './components/Topic/Topic';


const Tab = createBottomTabNavigator();

function CustomTabBarIcon({ name, color, size, focused }) {
    return (
      <React.Fragment>
        <View style={{position: 'absolute', top: 0, backgroundColor: '#6138B8', width: 32, height: focused ? 3 : 0 }} />
        <MaterialCommunityIcons name={name} color={color} size={size} />
      </React.Fragment>
    );
  }

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          showLabel: false,
          tabBarStyle: {
            position: 'absolute',
            elevation: 0,
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: 90,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: '3%',
            ...styles.shadow,
        },
          tabBarActiveTintColor: '#6138B8',
          tabBarInactiveTintColor: '#A8A8A8',
          tabBarIndicatorStyle: { backgroundColor: '#6138B8', height: 5 },
        })}
      >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
                tabBarLabel: '',
                tabBarIcon: ({ color, size, focused }) => (
                  <CustomTabBarIcon name="home-outline" color={color} size={32} focused={focused} />
                ),
              }}
          />
          <Tab.Screen
            name="Explore"
            component={Explore}
            options={{
                tabBarLabel: '',
                tabBarIcon: ({ color, size, focused }) => (
                  <CustomTabBarIcon name="compass" color={color} size={32} focused={focused} style={{ marginLeft: -10 }} />
                ),
              }}
          />
          <Tab.Screen
            name="Add"
            component={AddModal}
            options={{
                tabBarLabel: '',
                tabBarButton: ( props ) => (
                  <NavBarAddButton {...props}/>
                ),
              }}
          />
          <Tab.Screen
            name="Groups"
            component={Groups}
            options={{
                tabBarLabel: '',
                tabBarIcon: ({ color, size, focused }) => (
                  <CustomTabBarIcon name="account-group-outline" color={color} size={32} focused={focused} style={{ marginRight: -100 }} />
                ),
              }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
                tabBarLabel: '',
                tabBarIcon: ({ color, size, focused }) => (
                  <CustomTabBarIcon name="account-outline" color={color} size={32} focused={focused} />
                ),
              }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <Topic />
    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#300164',
    shadowOffset: {
        width: 0,
        height: -3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5
  }
});
