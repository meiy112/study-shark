import { useState, useContext } from 'react';
import { View } from "react-native"
import { Text, Button } from "react-native-paper";
import AuthContext from '../../context/AuthContext';

import UserUnauthenticatedPage from '../Login/UsedUnauthenticatedPage';

export default function Profile() {
  const { token, userLogout } = useContext(AuthContext); // jwt token + logout function

  return (
    token? // conditionally renders pages based on if user is logged in
    // Hi! put all your code for Groups inside this view! 
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile - Outside.js</Text>
      <Button onPress={() => {userLogout(); console.log("logging out")}}>Logout</Button>
    </View>
    :
    <UserUnauthenticatedPage action={"get started!"} />
  );


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