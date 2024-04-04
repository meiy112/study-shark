import { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Touchable,
  Image,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import Tag from "../Misc/Tag.js";
import MaterialExplore from "../Explore/ListingComponents/MaterialExplore.js";

import colors from "../../constants/Colors.js";

const {
  active,
  inactive,
  background,
  primary,
  shadow,
  line,
  grey,
  title,
  greyIcon,
  lightIcon,
} = colors;

// ------------------------------- fake data -------------------------------
const members = [
  { name: "Mustard", pfp: require("../../assets/images/misc/lindy.jpg") },
  { name: "Almond", pfp: require("../../assets/images/misc/jayee.jpg") },
  {
    name: "Dio Italiano",
    pfp: require("../../assets/images/misc/majjie.jpg"),
  },
  {
    name: "Sigmund",
    pfp: require("../../assets/images/misc/freud.jpg"),
  },
  {
    name: "Expo Go",
    pfp: require("../../assets/images/misc/rice.jpeg"),
  },
];

const tags = [
  { name: "Criss", color: "#FF7A8B" },
  { name: "Cross", color: "#9D3CA1" },
  { name: "Apple", color: "#22B0D2" },
  { name: "Sauce", color: "#399CFF" },
  { name: "Yum", color: "#5F2EB3" },
];

let purple = {
    name: "purple",
    primary: "#5F2EB3",
    gradient: "#29144D",
    circle: "#3D1E73",
  },
  pink = {
    name: "pink",
    primary: "#F5878D",
    gradient: "#B9568C",
    circle: "#B9568C",
  },
  blue = {
    name: "blue",
    primary: "#22B0D2",
    gradient: "#1455CE",
    circle: "#1455CE",
  };

const materials = [
  {
    title: "Standing Waves",
    type: "quiz",
    date: "November 9, 1989",
    color: purple,
    count: 19,
    topicTitle: "Phys901",
  },

  {
    title: "Stereochemistry",
    type: "notes",
    date: "April 1, 2024",
    color: pink,
    count: 21,
    topicTitle: "Chem123",
  },

  {
    title: "Space Meditation",
    type: "flashcards",
    date: "April 1, 2024",
    color: blue,
    count: 8,
    topicTitle: "Astrology101",
  },
  {
    title: "Big Bird",
    type: "notes",
    date: "August 2, 2022",
    color: blue,
    count: 14,
    topicTitle: "Astrology101",
  },
];
// ------------------------------------------------------------------------

export default function Group({ navigation, group }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: primary }}>
      <View style={{ backgroundColor: background, flex: 1 }}>
        <Header navigation={navigation} />
        <SortAndFilter />
        <MaterialList />
      </View>
    </SafeAreaView>
  );
}

const Header = ({ navigation }) => {
  const displayedMembers = members.slice(0, 8);
  const remainingMembersLength = members.slice(8).length;

  return (
    <View style={[styles.headerContainer, styles.shadow]}>
      {/*START: Back Button, Title, Settings Button*/}
      <View style={styles.headerTop}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back-outline" size={24} color={lightIcon} />
        </TouchableOpacity>
        <Text style={{ fontFamily: "mon-sb", fontSize: 17, color: title }}>
          Jaywalkers
        </Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={25} color={active} />
        </TouchableOpacity>
      </View>
      {/*END: Back Button, Title, Settings Button*/}
      {/*Line*/}
      <View style={styles.line} />
      {/*----------------------------- START: Members Container -----------------------------*/}
      <Text style={styles.membersTitle}>MEMBERS</Text>
      <View style={styles.membersContainer}>
        <MaterialCommunityIcons
          name="account-multiple-outline"
          size={30}
          style={{ marginRight: 7, marginTop: -1 }}
        />
        {/*Render members*/}
        {displayedMembers.map((member, index) => (
          <Image
            key={index}
            source={member.pfp}
            style={styles.profilePicture}
          />
        ))}
        {/*Render # of remaining members if > 0 left*/}
        {remainingMembersLength > 0 ? (
          <View style={[styles.numContainer, styles.profilePicture]}>
            <Text
              style={{ fontFamily: "mon-sb", color: primary, fontSize: 11 }}
            >
              {remainingMembersLength}+
            </Text>
          </View>
        ) : null}
      </View>
      {/*----------------------------END: Members Container----------------------------------*/}
      {/*START: Tags list*/}
      <ScrollView
        horizontal
        contentContainerStyle={styles.tagsContainer}
        showsHorizontalScrollIndicator={false}
      >
        {tags.map((tag, index) => (
          <Tag key={index} title={tag.name} color={tag.color} />
        ))}
      </ScrollView>
      {/*END: Tags list*/}
    </View>
  );
};

// study material listings
const MaterialList = () => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={materials}
      style={styles.listingContainer}
      numColumns={2}
      renderItem={({ item }) => (
        <MaterialExplore
          title={item.title}
          type={item.type}
          date={item.date}
          color={item.color}
          count={item.count}
          topicTitle={item.topicTitle}
        />
      )}
      ListFooterComponent={<View style={{ height: 50 }} />}
    />
  );
};

// Filter and Sort Options
function SortAndFilter() {
  const [selected, setSelected] = useState("None");

  const dropdownData = [
    { key: "All", value: "All (4)" },
    { key: "Notes", value: "Notes" },
    { key: "Quizzes", value: "Quizzes" },
    { key: "Flashcard", value: "Flashcard" },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        padding: 5,
        justifyContent: "flex-end",
        zIndex: 2,
        position: "sticky",
        top: 0,
      }}
    >
      <View style={{ position: "absolute", top: 10, left: 13 }}>
        <SelectList
          setSelected={setSelected}
          data={dropdownData}
          placeholder="All (4)"
          search={false}
          boxStyles={[
            {
              borderWidth: 0,
              paddingRight: 50,
              backgroundColor: "#FFFFFF",
              borderRadius: 15,
            },
            styles.shadow,
          ]}
          dropdownStyles={{ borderWidth: 0, backgroundColor: "#E4E9F5" }}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <IconButton
          style={{ borderRadius: 5, marginRight: 8 }}
          containerColor="#E4E9F5"
          mode="contained"
          icon="sort"
          color="000"
          size={25}
        />
      </View>
    </View>
  );
}

// are you css? Because you give me my style
const styles = StyleSheet.create({
  shadow: {
    shadowColor: shadow,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 5,
  },
  headerContainer: {
    width: "100%",
    backgroundColor: primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  profilePicture: {
    borderRadius: 50,
    height: 27,
    width: 27,
    marginRight: 4,
  },
  numContainer: {
    backgroundColor: greyIcon,
    alignItems: "center",
    justifyContent: "center",
  },
  membersContainer: {
    flexDirection: "row",
    padding: 10,
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: title,
    borderStyle: "dashed",
  },
  membersTitle: {
    fontFamily: "mon-sb",
    fontSize: 12,
    opacity: 0.8,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  listingContainer: {
    flex: 1,
    paddingTop: 15,
  },
});
