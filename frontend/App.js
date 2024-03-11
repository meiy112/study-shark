import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios'
import { PaperProvider } from 'react-native-paper'

import { UserApi } from './api/UserApi';
import { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState({});


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://192.168.86.21:3000/messages/");
        const resData = await res.json();
        setData(resData);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text>Hello</Text>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
