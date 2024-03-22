import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  // sets token value if user is already logged in on application start
  useEffect(() => {
    async function fetchToken() {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
      } catch (e) {
        console.error("error fetching jwt token from async storage");
      }
    } 
    fetchToken();
  }, []);

  // retrieves token from async storage. if token does not exist, will return null
  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      return storedToken;
    } catch (e) {
      console.error('Error getting token:', e);
    }
  }

  // check if user is authenticated (if token exists in asyncStorage)
  const isAuthenticated = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (!storedToken) {
        return false;
      }
      return true;
    } catch (e) {
      console.error('Error getting token:', e);
      return false;
    }
  }

  // sets token to async storage and state
  const userLogin = async (token) => {
    await AsyncStorage.setItem('token', token);
    setToken(token);
  }

  // removes token from async storage and state
  const userLogout = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
  }

  const contextValue = {
    token,
    getToken,
    isAuthenticated,
    userLogin,
    userLogout,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext; // go like { token, userLogin, etc } = useContext(AuthContext) to use
export { AuthProvider }; // to be wrapped around app to provide auth context to the entire app
