import React, { useState, useContext } from "react";
import { TouchableOpacity, View, StyleSheet, Text, Modal } from "react-native";
import colors from "../../constants/Colors";
import PageContext from "../../context/PageContext"

const { active, inactive, background, primary, shadow, line } = colors;

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
          <Text style={{ fontFamily: "mon", fontSize: 12 }}>
            H-hi would you like to add something? Um, but only if you want to,
            I-I'm not forcing you or anything...
          </Text>
          <Text>
            Current page: {page}
          </Text>
          {page==="Topic" ? <Text>{topicId}</Text> : null}
          {/*the triangle under the rectangle part of the modal*/}
          <View style={styles.triangle}></View>
        </View>
      </View>
    </Modal>
  );
};

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
    width: 200,
    height: 150,
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
});

export default AddModal;
