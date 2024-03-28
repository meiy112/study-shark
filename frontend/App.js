import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { PaperProvider } from "react-native-paper";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./components/Home/Home";
import Groups from "./components/Groups/Groups";
import Profile from "./components/Profile/Profile";
import NavBarAddButton from "./components/Misc/NavbarAddButton";
import AddModal from "./components/Misc/AddModal";
import colors from "./constants/Colors";

import Screens from "./navigation/Screens";
import { startServer, stopServer } from "./api/MockServer";
import { AuthProvider } from "./context/AuthContext";
import PageContext from "./context/PageContext";

const { active, inactive, background, primary, shadow } = colors;

const Tab = createBottomTabNavigator();

function CustomTabBarIcon({ name, color, size, focused }) {
  return (
    <React.Fragment>
      <View
        style={{
          position: "absolute",
          top: 0,
          backgroundColor: "#4E42DA",
          width: 32,
          height: focused ? 3 : 0,
        }}
      />
      <MaterialCommunityIcons name={name} color={color} size={size} />
    </React.Fragment>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    mon: require("../frontend/assets/fonts/Montserrat-Regular.ttf"),
    "mon-m": require("../frontend/assets/fonts/Montserrat-Medium.ttf"),
    "mon-sb": require("../frontend/assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-l": require("../frontend/assets/fonts/Montserrat-Light.ttf"),
  });
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState("Home"); 
  const [topicId, setTopicId] = useState(null); // set to curr topic id when inside of Topic.js

  const pageContextValue = {page, setPage, topicId, setTopicId}

  useEffect(() => {
    // initial screen that displays while the application is loading
    async function load() {
      await SplashScreen.preventAutoHideAsync();
    }
    load();

    // starts mirage server
    // comment out this line to switch to real server
    // startServer();
    return () => { // cleanup, shuts down server
      stopServer();
    }
  }, []);

  if (!fontsLoaded) {
    // prevent page from rendering before fonts are loaded
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <PaperProvider>
      <AuthProvider>
        <PageContext.Provider value={pageContextValue}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerShown: false,
                showLabel: false,
                tabBarStyle: {
                  elevation: 0,
                  backgroundColor: background,
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  height: 90,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: "3%",
                  ...styles.shadow,
                },
                tabBarActiveTintColor: active,
                tabBarInactiveTintColor: inactive,
                tabBarIndicatorStyle: { backgroundColor: active, height: 5 },
              })}
            >
              <Tab.Screen
                name="HomeScreen"
                component={Screens.home}
                listeners={({ navigation, route }) => ({
                  tabPress: (event) => {
                    setPage("Home");
                    // Navigate to the stack's first screen
                    navigation.navigate(route.name, {
                      screen: 'Home', 
                    });
                  },
                })}
                options={{
                  tabBarLabel: "",
                  tabBarIcon: ({ color, size, focused }) => (
                    <CustomTabBarIcon
                      name="home-variant-outline"
                      color={color}
                      size={32}
                      focused={focused}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="ExploreScreen"
                component={Screens.explore}
                listeners={({ navigation, route }) => ({
                  tabPress: (event) => {
                    setPage("Explore");
                    // Navigate to the stack's first screen
                    navigation.navigate(route.name, {
                      screen: 'Explore', 
                    });
                  },
                })}
                options={{
                  tabBarLabel: "",
                  tabBarIcon: ({ color, size, focused }) => (
                    <CustomTabBarIcon
                      name="compass-outline"
                      color={color}
                      size={32}
                      focused={focused}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Add"
                component={Home}
                listeners={({ navigation }) => ({
                  tabPress: (event) => {
                    event.preventDefault(); // Prevent default action
                    setShowModal(true);
                  },
                })}
                options={{
                  tabBarLabel: "",
                  tabBarButton: (props) => (
                    <View style={{ width: 105 }}>
                      <NavBarAddButton {...props} />
                    </View>
                  ),
                }}
              />
              <Tab.Screen
                name="Groups"
                component={Groups}
                listeners={({ navigation, route }) => ({
                  tabPress: (event) => {
                    setPage("Group");
                    // Navigate to the stack's first screen
                    navigation.navigate(route.name, {
                      screen: 'Group', 
                    });
                  },
                })}
                options={{
                  tabBarLabel: "",
                  tabBarIcon: ({ color, size, focused }) => (
                    <CustomTabBarIcon
                      name="account-group-outline"
                      color={color}
                      size={32}
                      focused={focused}
                      style={{ marginRight: 100 }}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Profile"
                component={Profile}
                listeners={({ navigation, route }) => ({
                  tabPress: (event) => {
                    setPage("Profile");
                    // Navigate to the stack's first screen
                    navigation.navigate(route.name, {
                      screen: 'Profile', 
                    });
                  },
                })}
                options={{
                  tabBarLabel: "",
                  tabBarIcon: ({ color, size, focused }) => (
                    <CustomTabBarIcon
                      name="account-circle-outline"
                      color={color}
                      size={32}
                      focused={focused}
                    />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
          {showModal ? <AddModal hideModal={() => setShowModal(false)} /> : null}
        </PageContext.Provider>
      </AuthProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: shadow,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
});
