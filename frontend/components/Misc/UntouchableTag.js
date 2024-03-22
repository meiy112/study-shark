import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// TAG: will only include the remove button if isRemovable is true
const UntouchableTag = ({ title, color, isRemovable, style }) => {
  const onDeleteButtonPress = () => {
    // TODO
    console.log("deleted tag! (not really)");
  };

  return (
    <View style={[styles.tag, { backgroundColor: color }, style]}>
      <Text style={{ fontFamily: "mon-sb", fontSize: 14, color: "#FFFFFF" }}>
        {title}
      </Text>
      {/*If isRemovable is false, return null instead of button*/}
      {isRemovable ? (
        <TouchableOpacity onPress={onDeleteButtonPress}>
          <MaterialCommunityIcons name="close" color="#FFFFFF" size={15} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

// me when css
const styles = StyleSheet.create({
  tag: {
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 3,
    flexDirection: "row",
  },
});

export default UntouchableTag;
