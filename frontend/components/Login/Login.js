import * as React from 'react';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJWT] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin() {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      const token = data.token; // jwt access token
      if (!token) {
        setErrorMessage(data.message);
        console.log(data.message);
        return;
      }

      // Store the token in async storage
      await AsyncStorage.setItem('jwtToken', token);
      
      console.log("Logged in successfully");
      // console.log(await AsyncStorage.getItem('jwtToken'));
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Error: " + data.message)
    }
  }

  async function handleSignUp() {
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      const token = data.token; // jwt access token
      if (!token) {
        setErrorMessage("Error: " + data.message);
        console.log(data.message);
        return;
      }

      // Store the token in async storage
      await AsyncStorage.setItem('jwtToken', token);
      
      console.log("Signed up successfully");
    } catch (error) {
      console.error("Error Signing up:", error);
    }
  }

  async function toggleJWT() {
    const jwtToken = await AsyncStorage.getItem("jwtToken");
    setJWT(jwt.length > 0 ? "" : jwtToken);
  }

  return(
    <View>
      <TextInput 
        label="Username"
        value={username}
        onChangeText={username => setUsername(username)}
        />
      <TextInput
      label="password"
      value={password}
      onChangeText={password => setPassword(password)}
    />
    <Button onPress={handleSignUp}>Sign up</Button>
    <Button onPress={handleLogin}>Login</Button>
    <Button onPress={toggleJWT}>Does smth</Button>
    <Text>{jwt}</Text>
    <Text>{errorMessage}</Text>
    </View>
  );
}