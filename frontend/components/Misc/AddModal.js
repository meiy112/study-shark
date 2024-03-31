import React, { useState, useContext, } from "react";
import { TouchableOpacity, View, StyleSheet, Text, Modal, TextInput } from "react-native";
import colors from "../../constants/Colors";
import PageContext from "../../context/PageContext"
import { Button } from "react-native-paper";
import AuthContext from "../../context/AuthContext";
import { topicApi } from "../../api/TopicApi";

const { active, inactive, background, primary, shadow, line } = colors;

// check valid inputs
function checkValidInput(str) {
  const regex = /^[0-9a-zA-Z]*$/;
  if (!regex.test(str)) {
    throw new Error("Only 0-9 and alphabetical characters are allowed");
  }

  if (str.length === 0) {
    throw new Error("Field cannot be empty");
  }

  if (str.length > 30) {
    throw new Error("field can be max 30 characters")
  }
}

const AddModal = (props) => {
  const [isVisible, setIsVisible] = useState(true);
  const { page, topicId } = useContext(PageContext);

  const hideModal = () => {
    // for fade out animation (cuz it doesn't work automatically????)
    setIsVisible(false);
    setTimeout(() => {
      props.hideModal();
    }, 300);
  };

  return (
    <Modal animationType="fade" visible={isVisible} transparent={true}>
      <TouchableOpacity
        onPress={() => hideModal()}
        style={styles.modalBackDrop}
        activeOpacity={1}
      ></TouchableOpacity>
      <View style={[styles.centeredView]}>
        <View style={[styles.addModal, styles.shadow]}>
          {/*conditionally render different add modals*/}
          {page === "Topic" && <AddStudyMaterial topicId={topicId} />}
          {page === "Groups" && <AddGroup /> }
          {(page === "Home" || page === "Profile" || page === "Explore") && <AddTopic />}
          {/*the triangle under the rectangle part of the modal*/}
          <View style={styles.triangle}></View>
        </View>
      </View>
    </Modal>
  );
};

function AddStudyMaterial({ topicId }) {
  return(
    <View>
      <Text>Add study material</Text>
    </View>
  )
}

function AddGroup() {
  return(
    <View>
      <Text>Add group</Text>
    </View>
  )
}

function AddTopic() {
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { token } = useContext(AuthContext);

  function handleAdd() {
    async function addTopic() {
      try {
        checkValidInput(input);
        await topicApi.addTopic(token, input);
        setSuccessMessage("Topic added successfully!");
        setErrorMessage("")
      } catch (e) {
        setErrorMessage(e.message);
        setSuccessMessage("");
      }
    }
    addTopic();
  }

  return(
    <View style={{alignItems: "center"}}>
      <Text style={{fontSize: 20, fontWeight: 500, marginBottom: 20}}>Add topic</Text>
      <View>
        <Text>Title:</Text>
        <TextInput style={styles.textInput} value={input} onChangeText={(val) => setInput(val)}></TextInput>
        <Text style={{color: 'red'}}>{errorMessage}</Text>
        <Text style={{color: 'green'}}>{successMessage}</Text>
      </View>
      <Button onPress={handleAdd}>Add Topic</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  modalBackDrop: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.60)",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
  addModal: {
    backgroundColor: primary,
    width: 250,
    height: 300,
    borderRadius: 10,
    bottom: 135,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
    padding: 15,
  },
  shadow: {
    shadowColor: shadow,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 5,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: primary,
    position: "absolute",
    bottom: -15,
    transform: [{ rotate: "180deg" }],
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 5,
    width: 200,
  },
});

export default AddModal;
