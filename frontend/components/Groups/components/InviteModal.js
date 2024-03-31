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

const { active, inactive, background, primary, shadow, line, grey, title } =
  colors;

const InviteModal = ({ isVisible, hideModal, joinCode }) => {
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
      <View style={[styles.modalContainer, styles.shadow]}>
        <Text style={{ fontFamily: "mon-sb", fontSize: 12, opacity: 0.8 }}>
          JOIN CODE:
        </Text>
        <View style={styles.joinCodeContainer}>
          <Text style={{ fontFamily: "mon", fontSize: 15, color: title }}>
            {joinCode}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: shadow,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
  modalContainer: {
    height: 141,
    width: 239,
    backgroundColor: primary,
    alignSelf: "center",
    padding: 20,
    marginLeft: 40,
    borderRadius: 30,
    position: "absolute",
    top: 260,
    overflow: "hidden",
    justifyContent: "space-between",
    padding: 30,
  },
  modalBackDrop: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.60)",
  },
  joinCodeContainer: {
    height: 49,
    width: 191,
    backgroundColor: grey,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default InviteModal;
