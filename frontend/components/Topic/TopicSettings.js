import { useContext } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Settings({ topic }) {
  return(
    <View>
      <Text>Topic Settings - Inside.js</Text>
      <Button onPress={() => navigation.goBack()}>Go back</Button>
    </View>
  );
}