import { useState, useContext, useEffect } from "react";
import { Text, View } from "react-native";
import TopicManager from "./TopicManager";
import TableViewer from "./TableViewer";

export default function Admin() {
  return (
    <View>
      <TopicManager />
      <TableViewer />
    </View>
  );
}