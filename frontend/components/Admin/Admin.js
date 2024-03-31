import { useState, useContext, useEffect } from "react";
import { ScrollView } from "react-native";
import TopicManager from "./TopicManager";
import TableViewer from "./TableViewer";

export default function Admin() {
  return (
    <ScrollView>
      <TopicManager />
      <TableViewer />
    </ScrollView>
  );
}