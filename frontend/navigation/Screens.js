import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../components/Home/Home";
import Topic from "../components/Topic/Topic";
import Settings from "../components/Topic/TopicSettings";
import Achievement from "../components/Achievements/Achievements";
import Group from "../components/Group/Group";

import Explore from "../components/Explore/Explore";
import Groups from "../components/Groups/Groups";
import Profile from "../components/Profile/Profile";
import NavBarAddButton from "../components/Misc/NavbarAddButton";

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Achievement"
        component={Achievement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Topic"
        component={Topic}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function ExploreScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Explore"
        component={Explore}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Achievement"
        component={Achievement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Topic"
        component={Topic}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function GroupScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Group"
        component={Group}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Groups"
        component={Groups}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function ProfileScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Achievement"
        component={Achievement}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default {
  home: HomeScreen,
  explore: ExploreScreen,
  group: GroupScreen,
  profile: ProfileScreen,
};
