import { useState, useContext } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

import AuthContext from '../../context/AuthContext';
import UserUnauthenticatedPage from "../Login/UsedUnauthenticatedPage";

export default function Groups() {
  const { token } = useContext(AuthContext); // jwt token


  return (
    token? // conditionally renders pages based on if user is logged in
    // Hi! put all your code for Groups inside this view! 
    <View style={{display: "flex", flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>Groups - Outside.js</Text>
    </View>
    :
    <UserUnauthenticatedPage action={"join Groups"} />
  );
}