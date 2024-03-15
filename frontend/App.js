import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
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
import Explore from "./components/Explore/Explore";
import Groups from "./components/Groups/Groups";
import Profile from "./components/Profile/Profile";
import NavBarAddButton from "./components/Misc/NavbarAddButton";
import AddModal from "./components/Misc/AddModal";
import colors from "./constants/Colors";

import Screens from "./screens/Screens";

const { active, inactive, background, primary, shadow } = colors;

import MockServer from "./api/MockServer";

const Tab = createBottomTabNavigator();

function CustomTabBarIcon({ name, color, size, focused }) {
  return (
    <React.Fragment>
      <View
        style={{
          position: "absolute",
          top: 0,
          backgroundColor: "#6138B8",
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

  useEffect(() => {
    // initial screen that displays while the application is loading
    async function load() {
      await SplashScreen.preventAutoHideAsync();
    }
    load();
  }, []);

  if (!fontsLoaded) {
    // prevent page from rendering before fonts are loaded
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <PaperProvider>
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
            name="Explore"
            component={Explore}
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
