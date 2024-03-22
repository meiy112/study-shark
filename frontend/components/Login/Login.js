import * as React from 'react';
import { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import AuthContext from '../../context/AuthContext';


// login modal
export default function Login( {setModalVisible} ) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { userLogin, token } = useContext(AuthContext);

  // login
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
      console.log(token);
      if (!token) {
        setErrorMessage(data.message);
        console.log(data.message);
        return;
      }

      userLogin(token);
      
      console.log("Logged in successfully");
      setErrorMessage("")
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Error: " + data.message)
    }
  }

  // signup
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
      console.log(token);
      if (!token) {
        setErrorMessage("Error: " + data.message);
        console.log(data.message);
        return;
      }

      userLogin(token);
      
      console.log("Signed up successfully");
      setErrorMessage("")
    } catch (error) {
      console.error("Error Signing up:", error);
    }
  }


  return(
    <View  >
      {/* Close button */}
      <View style={{padding: 10}}>
        <IconButton icon="window-close" size={25} onPress={() => {setModalVisible(false)}} />
      </View>

      {/* Text inputs and login/signup button */}
      <View style={styles.contentContainer}>
        <TextInput 
          style={styles.textInput}
          value={username}
          onChangeText={username => setUsername(username)}
          placeholder="Username"
          autoCapitalize='none'
          />
        <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={password => setPassword(password)}
        placeholder="Password"
        autoCapitalize='none'
      />
      <Button onPress={handleSignUp}>Sign up</Button>
      <Button onPress={handleLogin}>Login</Button>
      <Text>{token? token : ""}</Text>
      <Text style={{color: 'red'}}>{errorMessage}</Text>
      </View>
    </View>
  );
}


// CSS :D
const styles = StyleSheet.create({
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 5,
    width: 260,
  },
  contentContainer: { 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150
  }
});