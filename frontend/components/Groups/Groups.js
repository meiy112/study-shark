import { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Groups() {
  const [token, setToken] = useState("");

  async function setJWT() {
    const jwt = await AsyncStorage.getItem("jwtToken");
    setToken(jwt);
    console.log(jwt)
  }


  // Function to make an authenticated API call
  async function fetchAuthenticatedData() {
    try {
      const token = await AsyncStorage.getItem('jwtToken');

      if (token) {
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        try {
          // Make the authenticated API call
          const response = await fetch('http://localhost:3000/tag', {
            method: 'GET',
            headers: headers,
          });

          const data = await response.json();
          console.log('Authenticated data:', data);
        } catch (e) {
          console.error("error: " + e);
        }

      } else {
        console.error('Authentication token not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching authenticated data:', error);
    }
  }

  return (
    <View style={{display: "flex", flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>{token}</Text>
      <Button onPress={setJWT}>Show Token</Button>
      <Button onPress={fetchAuthenticatedData}>fetch data</Button>
    </View>
  );
}