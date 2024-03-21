import { useState } from "react";
import { View, Modal } from "react-native";
import { Button, Text } from "react-native-paper";
import Login from "./Login";

// this is the page that shows when a user is  not logged in, and it prompts them to log in.
// the action prop is a string, for example "join Groups, get started!, create Topics"
export default function UserUnauthenticatedPage({ action }) {
  const [modalVisible, setModalVisible] = useState(false);

  function handleLogin() {
    setModalVisible(true);
  }

  return (
    <>
      {/* Page content */}
      <View style={{display: "flex", flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>Log in to {action}</Text>
        <Button onPress={handleLogin}>Log in</Button>
      </View>

      {/* Login Modal */}
      <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
        <Login setModalVisible={setModalVisible}/>
      </Modal>
    </>
  );
}