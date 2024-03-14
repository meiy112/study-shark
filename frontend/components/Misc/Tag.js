import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";

const Tag = (props) => {
  const { title } = props;
  const [isSelected, setIsSelected] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;

  const switchTagHandler = () => {
    setIsSelected(!isSelected);
    // To fade between states when you press on each tag
    Animated.timing(animationValue, {
      toValue: isSelected ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const backgroundColorInterpolation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#5F2EB3", "#FFFFFF"],
  });

  return (
    <TouchableOpacity
      onPress={switchTagHandler}
      style={[
        styles.tag,
        isSelected ? styles.selected : styles.unselected,
        { backgroundColor: backgroundColorInterpolation },
      ]}
      activeOpacity={1}
    >
      <Text
        style={{
          fontFamily: "mon-m",
          fontSize: 14,
          color: isSelected ? "#5F2EB3" : "#FFFFFF",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 3,
  },
  selected: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#5F2EB3",
  },
  unselected: {
    backgroundColor: "#5F2EB3",
    borderWidth: 2,
    borderColor: "#5F2EB3",
  },
});

export default Tag;
