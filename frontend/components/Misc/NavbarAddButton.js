import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const NavBarAddButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.addButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={["#2B005A", "#5C00C0"]} // Define your gradient colors here
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <View style={styles.innerButton}>
          <MaterialIcons name="add" size={40} color="white" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 70,
    height: 70,
    borderRadius: 20,
    top: -30,
    zIndex: 1,
    alignSelf: "center",
  },
  gradient: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  innerButton: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
});

export default NavBarAddButton;
