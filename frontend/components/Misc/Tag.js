import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";

// TAG: pls pass in the title color, and callback fn for each instance
const Tag = (props) => {
  const { title, color, callback } = props;
  const [isSelected, setIsSelected] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;

  // ---------------------- ANIMATION THINGS ------------------------
  const switchTagHandler = () => {
    if (callback) {
      callback({name: title, color: color}, !isSelected);
    }
    setIsSelected(!isSelected);
    Animated.timing(animationValue, {
      toValue: isSelected ? 0 : 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const backgroundColorInterpolation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [color, "#FFFFFF"],
  });
  // ----------------------------------------------------------------

  // THE DEFAULT TAG
  return (
    //START: The background
    <TouchableOpacity
      onPress={switchTagHandler}
      style={[
        styles.tag,
        {
          borderColor: color,
          backgroundColor: isSelected ? "#FFFFFF" : color,
          backgroundColor: backgroundColorInterpolation,
        },
      ]}
      activeOpacity={1}
    >
      {/*START: The title*/}
      <Text
        style={{
          fontFamily: "mon-m",
          fontSize: 14,
          color: isSelected ? color : "#FFFFFF",
        }}
      >
        {title}
      </Text>
      {/*END: The title*/}
    </TouchableOpacity>
    // END: The background
  );
};

// HELL YEA CSS
const styles = StyleSheet.create({
  tag: {
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 3,
    borderWidth: 2,
  },
});

export default Tag;
