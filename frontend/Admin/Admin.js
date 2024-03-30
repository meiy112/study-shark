import { useState, useContext, useEffect } from "react";
import { Text, View } from "react-native";
import TopicManager from "./TopicManager";

export default function Admin() {
  return (
    <View>
      <TopicManager />
    </View>
  );
}