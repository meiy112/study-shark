import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import colors from "../../constants/Colors";

const { active, inactive, background, primary, shadow, line } = colors;

const Topic = (props) => {
  <TouchableOpacity>
    <LinearGradient
      colors={["#5F2EB3", "#29144D"]}
      style={styles.gradient}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    ></LinearGradient>
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
  container: {
    width: 170,
    height: 243,
  },
});

export default Topic;
