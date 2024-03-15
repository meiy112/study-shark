import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
  Easing,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../constants/Colors";

const { buttonDark, buttonLight, primary } = colors;

const NavBarAddButton = ({ onPress }) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const animateButton = () => {
    Animated.timing(scaleValue, {
      toValue: 0.9,
      duration: 50,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => {
        animateButton();
        onPress();
      }}
      activeOpacity={1}
    >
      <TouchableOpacity style={styles.buttonOutline}></TouchableOpacity>
      <Animated.View style={[{ transform: [{ scale: scaleValue }] }]}>
        <LinearGradient
          colors={[buttonDark, buttonLight]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          <View style={styles.innerButton}>
            <MaterialIcons name="add" size={40} color={primary} />
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 83,
    height: 83,
    borderRadius: 20,
    top: -30,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    width: 70,
    height: 70,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  innerButton: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  buttonOutline: {
    width: 83,
    height: 83,
    borderRadius: 20,
    backgroundColor: primary,
    opacity: 0.5,
    position: "absolute",
  },
});

export default NavBarAddButton;
