// tee hee hi there
// we can go here from Home and Profile

import { View, Text } from "react-native"
import { Button } from "react-native-paper"


export default function Achievement({ navigation }) {
  return (
    <View style={{justifyContent: "center", alignContent: "center", flex: 1}}>
      <Text style={{ textAlign: 'center' }}>Achievement - Outside.js</Text>
      <Button onPress={() => navigation.goBack()}>uwu</Button>
    </View>
  );
}