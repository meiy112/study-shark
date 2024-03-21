import { useContext } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import PageContext from "../../context/PageContext";

export default function Settings({ navigation, route }) {
  const { setPage } = useContext(PageContext)
  return(
    <View>
      <Text>Topic Settings - Inside.js</Text>
      <Button onPress={() => {navigation.goBack(); setPage(route.params.prevScreen)}}>Go back</Button>
    </View>
  );
}