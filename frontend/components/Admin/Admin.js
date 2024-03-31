import { useState, useContext, useEffect } from "react";
import { ScrollView, Button } from "react-native";
import TopicManager from "./TopicManager";
import TableViewer from "./TableViewer";
import AuthContext from "../../context/AuthContext";

export default function Admin() {
  const { userLogout } = useContext(AuthContext);

  return (
    <ScrollView style={{marginBottom: 60}}>
      <TopicManager />
      <TableViewer />
      <Button onPress={userLogout} title="Log out" />
    </ScrollView>
  );
}