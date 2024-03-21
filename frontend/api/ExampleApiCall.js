import { useContext } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

import AuthContext from '../../context/AuthContext';


// THIS HAS NO ACTUAL USE, IT IS AN EXAMPLE SO I DONT FORGET WHEN I ACTUALLY CODE IT IN THE FUTURE
export default function Example() {
  const { userLogin, userLogout, token } = useContext(AuthContext);

  // Function to make an authenticated API call
  async function fetchAuthenticatedData() {
    try {
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
          console.log(response.status);
          console.log('Authenticated data:', data);
        } catch (e) {
          console.error("error: " + e);
        }

    } catch (error) {
      console.error('Error fetching authenticated data:', error);
    }
  }

  return (
    <View style={{display: "flex", flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>{token}</Text>
      <Button onPress={fetchAuthenticatedData}>fetch data</Button>
    </View>
  );
}