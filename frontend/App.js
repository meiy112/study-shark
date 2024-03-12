import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './components/Home/Home';
import Explore from './components/Explore/Explore';
import Groups from './components/Groups/Groups';
import Profile from './components/Profile/Profile';
import NavBarAddButton from './components/Misc/NavbarAddButton';

import Topic from './components/Topic/Topic';


const Tab = createBottomTabNavigator();

export default function App() {
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
            name="Add"
            component={NavBarAddButton}
            options={{
              tabBarLabel: '',
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
      <Topic />
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
