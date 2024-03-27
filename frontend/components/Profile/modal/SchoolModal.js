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
import schoolsData from "../data/schoolData";

// this is a custom dropdown with search function where i couldnt figure out how to get the positining to work >:( (so it just wasn't used)

const { active, inactive, background, primary, shadow, line } = colors;

const SchoolModal = ({ changeSchool, isVisible, hideModal }) => {
  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      transparent={true}
      style={{ flex: 1 }}
    >
      <TouchableOpacity
        onPress={() => hideModal()}
        style={styles.modalBackDrop}
        activeOpacity={1}
      ></TouchableOpacity>
      <View style={[styles.modalContainer, styles.shadow]}>
        <TextInput style={styles.searchBar} />
        <Options changeSchool={changeSchool} hideModal={hideModal} />
      </View>
    </Modal>
  );
};

// Scrolling List of options
const Options = ({ changeSchool, hideModal }) => {
  const renderItem = ({ item }) => {
    return (
      <ListOptions
        schoolName={item}
        changeSchool={changeSchool}
        hideModal={hideModal}
      />
    );
  };

  return (
    <View style={{ paddingVertical: 10 }}>
      <FlatList data={schoolsData} renderItem={renderItem} />
    </View>
  );
};

// Single Option component
const ListOptions = ({ schoolName, changeSchool, hideModal }) => {
  const [isSelected, toggleSelected] = useState(false);

  const handleOnPress = () => {
    changeSchool(schoolName);
    toggleSelected(!isSelected);
    hideModal();
  };

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={[
        isSelected
          ? { backgroundColor: primary }
          : { backgroundColor: "ffffff" },
        { marginVertical: 10 },
      ]}
    >
      <Text
        style={[
          isSelected ? { color: primary } : { color: "#000000" },
          { fontFamily: "mon", fontSize: 12, opacity: 0.8 },
        ]}
      >
        {schoolName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  modalContainer: {
    height: 300,
    width: 250,
    backgroundColor: primary,
    alignSelf: "center",
    padding: 20,
    marginLeft: 40,
    borderRadius: 5,
    position: "absolute",
    left: 40,
    top: 250,
    overflow: "hidden",
  },
  modalBackDrop: {
    flex: 1,
  },
  searchBar: {
    backgroundColor: background,
    height: 30,
    borderRadius: 30,
    marginBottom: 10,
  },
});

export default SchoolModal;
