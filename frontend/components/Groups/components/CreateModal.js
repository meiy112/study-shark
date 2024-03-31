import React, { useState, useContext } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import colors from "../../../constants/Colors";

const {
  active,
  inactive,
  background,
  primary,
  shadow,
  line,
  grey,
  title,
  greyIcon,
} = colors;

const CreateModal = ({ isVisible, hideModal }) => {
  const joinGroup = () => {
    // TODO
  };

  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      transparent={true}
      style={{ flex: 1 }}
    >
      {/*Translucent Background*/}
      <TouchableOpacity
        onPress={() => hideModal()}
        style={[styles.modalBackDrop, styles.shadow]}
        activeOpacity={1}
      ></TouchableOpacity>
      {/*Actual Modal Popup*/}
      <JoinScreen joinGroup={joinGroup} />
    </Modal>
  );
};

const JoinScreen = ({ joinGroup }) => {
  return (
    <View style={[styles.modalContainer, styles.shadow]}>
      <Text style={styles.titleText}>ENTER CODE:</Text>
      <TextInput style={styles.textInput} />
      <View style={{ paddingTop: 10 }}>
        <TouchableOpacity onPress={joinGroup} style={styles.button}>
          <Text style={[styles.titleText, { color: "#FFFFFF" }]}>JOIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: shadow,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  modalContainer: {
    height: 179,
    width: 239,
    backgroundColor: primary,
    alignSelf: "center",
    padding: 20,
    marginLeft: 40,
    borderRadius: 30,
    position: "absolute",
    top: 230,
    justifyContent: "space-between",
    padding: 30,
    paddingBottom: 20,
    zIndex: 5,
  },
  modalBackDrop: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.60)",
  },
  textInput: {
    width: 191,
    height: 49,
    backgroundColor: grey,
    borderRadius: 30,
    alignSelf: "center",
    paddingHorizontal: 20,
    fontFamily: "mon",
    fontSize: 15,
    color: title,
  },
  titleText: {
    fontSize: 12,
    fontFamily: "mon-sb",
    opacity: 0.8,
  },
  button: {
    height: 41,
    paddingHorizontal: 15,
    backgroundColor: greyIcon,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 95,
  },
  createContainer: {
    width: 124,
    height: 64,
    backgroundColor: grey,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "absolute",
    alignItems: "center",
    paddingTop: 20,
    top: -115,
    zIndex: 0,
    alignSelf: "center",
    left: -4,
  },
});

export default CreateModal;
