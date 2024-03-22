import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Text,
  Animated,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import colors from "../../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import UntouchableTag from "../../Misc/UntouchableTag";
import SuggestionContainer from "./SuggestionContainer";
import ResultsContainer from "./ResultsContainer";

const { active, inactive, background, primary, shadow, line, lightIcon } =
  colors;

// color strings for the color attribute in tags
const pink = "#F5878D",
  blue = "#22B0D2",
  purple = "#5F2EB3";

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// the screen that pops up with search suggestions when you click on search icon in explore
const SearchScreen = ({ isVisible, onClose }) => {
  const searchInputRef = useRef(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Focus on the text input when the screen loads
    if (isVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isVisible]);

  const handleSearchInputChange = (text) => {
    setSearchText(text);
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.container}>
        {/*-------------------------START: header-------------------------*/}
        <View style={[styles.header, styles.shadow]}>
          {/*START: search bar and back button*/}
          <View style={styles.searchbarContainer}>
            {/*back button*/}
            <TouchableOpacity onPress={onClose} style={{ marginLeft: 5 }}>
              <MaterialCommunityIcons name="arrow-u-left-top" size={24} />
            </TouchableOpacity>
            {/*searchbar*/}
            <TextInput
              placeholder="Search"
              ref={searchInputRef}
              placeholderTextColor={"#9FA3BE"}
              style={{
                fontSize: 16,
                fontFamily: "mon",
                alignSelf: "center",
                marginLeft: 15,
                marginRight: 25,
              }}
              onChangeText={handleSearchInputChange}
            />
          </View>
          {/*END: search bar and back button*/}
          {/*Tags section*/}
          <TagFilter />
        </View>
        {/*-------------------------END: header-------------------------*/}
        {/*The stuff under the header*/}
        <SuggestionContainer searchText={searchText} />
        {/*<ResultsContainer searchInput={"Bubble Sort"} />*/}
      </View>
    </Modal>
  );
};

// the little filter by tags area in the header
const TagFilter = () => {
  const [expanded, setExpanded] = useState(false);
  const rotateValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [expanded]);

  const handleToggleExpand = () => {
    // for expanding the tags container
    setExpanded(!expanded);

    //rotate animation for expand button
    Animated.timing(rotateValue, {
      toValue: expanded ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // interpolation for rotate animation
  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={[styles.tagContainer]}>
      <Text style={styles.filterTagsTitle}>FILTER BY TAGS</Text>
      {/*------------------------Where the tags go-------------------------*/}
      <View
        style={[
          { flexDirection: "row", flexWrap: "wrap", overflow: "hidden" },
          !expanded && styles.collapsed,
        ]}
      >
        <TouchableOpacity style={styles.addTagsButton}>
          <MaterialCommunityIcons name="plus" size={20} color={lightIcon} />
        </TouchableOpacity>
        {/*NOTE: pls pass in 'style = {styles.tag}' for these tags (for their marginBottom)*/}
        <UntouchableTag
          title="Blasphemy"
          color={pink}
          isRemovable={true}
          style={styles.tag}
        />
        <UntouchableTag
          title="Physics"
          color={purple}
          isRemovable={true}
          style={styles.tag}
        />
        <UntouchableTag
          title="Carpentry"
          color={blue}
          isRemovable={true}
          style={styles.tag}
        />
        <UntouchableTag
          title="Alolamola"
          color={pink}
          isRemovable={true}
          style={styles.tag}
        />
        <UntouchableTag
          title="The Old Man"
          color={blue}
          isRemovable={true}
          style={styles.tag}
        />
        <UntouchableTag
          title="Dingleberry pie"
          color={purple}
          isRemovable={true}
          style={styles.tag}
        />
        <UntouchableTag
          title="Gluten"
          color={pink}
          isRemovable={true}
          style={styles.tag}
        />
      </View>
      {/*------------------------------------------------------------------*/}
      {/*expand button*/}
      <TouchableOpacity
        onPress={handleToggleExpand}
        style={[
          { alignSelf: "center", margin: 5 },
          { transform: [{ rotate }] },
        ]}
        activeOpacity={1}
      >
        <MaterialCommunityIcons
          name="chevron-down"
          size={24}
          color={"rgba(0, 0, 0, 0.6)"}
        />
      </TouchableOpacity>
    </View>
  );
};

// MY LIFE IS A MESS- omg hi css <3
const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  header: {
    backgroundColor: primary,
    minHeight: 172,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 25,
  },
  searchbarContainer: {
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    flexDirection: "row",
    marginTop: 40,
    paddingBottom: 10,
    width: "100%",
  },
  tagContainer: {
    paddingTop: 10,
  },
  collapsed: {
    maxHeight: 37,
  },
  filterTagsTitle: {
    fontSize: 12,
    fontFamily: "mon-sb",
    opacity: 0.8,
    marginVertical: 8,
  },
  addTagsButton: {
    width: 34,
    height: 34,
    borderWidth: 2,
    borderColor: "#414141",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 3,
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
  tag: {
    marginBottom: 6,
  },
});

export default SearchScreen;
