// tee hee hi there
// we can go here from Home and Profile

import { View, Text } from "react-native"
import { Button } from "react-native-paper"
import { useContext } from 'react'
import PageContext from "../../context/PageContext";


export default function Achievement({ route, navigation }) {
  const { setPage } = useContext(PageContext);

  return (
    <View style={{justifyContent: "center", alignContent: "center", flex: 1}}>
      <Text style={{ textAlign: 'center' }}>Achievement - Outside.js</Text>
      <Button onPress={() => {navigation.goBack(); setPage(route.params.prevScreen)}}>uwu</Button>
    </View>
  );
}