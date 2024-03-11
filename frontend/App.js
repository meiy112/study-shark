import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './components/Home/Home';
import Explore from './components/Explore/Explore';
import Groups from './components/Groups/Groups';
import Profile from './components/Profile/Profile';


const Tab = createBottomTabNavigator();

export default function App() {
  // code for testing pls ignore
  // const [data, setData] = useState({});


  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await fetch("http://192.168.86.21:3000/messages/");
  //       const resData = await res.json();
  //       setData(resData);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: 'Home',
            }}
          />
          <Tab.Screen
            name="Explore"
            component={Explore}
            options={{
              tabBarLabel: 'Explore',
            }}
          />
          <Tab.Screen
            name="Groups"
            component={Groups}
            options={{
              tabBarLabel: 'Groups',
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
            }}
          />
      </Tab.Navigator>
      </NavigationContainer>
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
