import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  FlatList,
  Animated,
} from "react-native";
import { Searchbar, Text } from "react-native-paper";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Tag from "../../components/Misc/Tag";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/Colors";
import TopicListing from "./TopicListing";

const { active, inactive, background, primary, shadow, line, grey } = colors;

// ---------------------- DATA ------------------------
const TopicDATA = [
  {
    title: "Phys901",
    isPublic: true,
    date: "March 19, 2024",
    numNotes: 3,
    numCards: 5,
    numQuizzes: 2,
    color: "purple",
  },
  {
    title: "Chem123",
    isPublic: false,
    date: "March 23, 2024",
    numNotes: 21,
    numCards: 7,
    numQuizzes: 11,
    color: "pink",
  },
  {
    title: "Math049",
    isPublic: false,
    date: "April 9, 2049",
    numNotes: 49,
    numCards: 49,
    numQuizzes: 49,
    color: "blue",
  },
  {
    title: "Cpsc304",
    isPublic: true,
    date: "March 14, 2024",
    numNotes: 11,
    numCards: 210,
    numQuizzes: 3,
  },
  {
    title: "Hello World",
    isPublic: false,
    date: "January 29, 2025",
    numNotes: 23,
    numCards: 10,
    numQuizzes: 78,
  },
  {
    title: "How to swim",
    isPublic: false,
    date: "tee hee im not a date",
    numNotes: 34,
    numCards: 3,
    numQuizzes: 5,
  },
  {
    title: "Bible Studies",
    isPublic: true,
    date: "December 25, 5 BC",
    numNotes: 5,
    numCards: 3,
    numQuizzes: 13,
  },
];

const TagDATA = [
  { title: "Physics", color: "#5F2EB3" },
  { title: "Chemistry", color: "#FF7A8B" },
  { title: "Math", color: "#22B0D2" },
  { title: "Biology", color: "#399CFF" },
  { title: "Waves", color: "#9D3CA1" },
  { title: "Showering", color: "#5F2EB3" },
];
// -----------------------------------------------------

// Achievement Button beside "My Topics"
function AchievementButton({ size }) {
  const navigation = useNavigation();

  const handlePress = () => {
    // TODO
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <MaterialCommunityIcons name="medal-outline" color={active} size={28} />
    </TouchableOpacity>
  );
}

// THE HOME PAGE
export default function Home() {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: background, flex: 1 }}>
        <Header />
        <SearchFilter scrollOffsetY={scrollOffsetY} />
        <TopicList scrollOffsetY={scrollOffsetY} />
      </View>
    </SafeAreaView>
  );
}

// Header (everything above the search bar)
function Header() {
  return (
    <View style={[styles.header, styles.shadow]}>
      {/* START: My Topics + AchievementButton*/}
      <View style={styles.title}>
        <MaterialCommunityIcons
          name="medal-outline"
          color={primary}
          size={24}
        />
        <Text style={{ fontFamily: "mon-sb", fontSize: 16 }}>My Topics</Text>
        <AchievementButton />
      </View>
      {/* END: My Topics + AchievementButton*/}
      {/*a cute lil line uwu*/}
      <View style={styles.line}></View>
      {/*START: TAGSLIST*/}
      <ScrollView
        horizontal
        contentContainerStyle={styles.tagsContainer}
        showsHorizontalScrollIndicator={false}
      >
        {TagDATA.map((tag, index) => (
          <Tag key={index} title={tag.title} color={tag.color} />
        ))}
      </ScrollView>
      {/*END: TAGSLIST*/}
    </View>
  );
}

const Search_Max_Height = 70;
const Search_Min_Height = 0;
const Scroll_Distance = Search_Max_Height - Search_Min_Height;

// The search bar and filter button
const SearchFilter = ({ scrollOffsetY }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const animatedSearchHeight = scrollOffsetY.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Search_Max_Height, Search_Min_Height],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.searchContainer,
        { height: animatedSearchHeight, overflow: "hidden" },
      ]}
    >
      <View style={styles.searchBar}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.paperBar}
          placeholderTextColor={"#9FA3BE"}
          inputStyle={{
            fontSize: 16,
            fontFamily: "mon",
            alignSelf: "center",
          }}
        />
      </View>
      <TouchableHighlight style={[styles.filterButton]}>
        <MaterialCommunityIcons name="tune" size={24} color={inactive} />
      </TouchableHighlight>
    </Animated.View>
  );
};

// topics listings underneath the search bar
const TopicList = ({ scrollOffsetY }) => {
  return (
    <FlatList
      scrollEventThrottle={5}
      showsVerticalScrollIndicator={false}
      data={TopicDATA}
      style={styles.listingContainer}
      numColumns={2}
      renderItem={({ item }) => (
        <TopicListing
          title={item.title}
          isPublic={item.isPublic}
          date={item.date}
          numNotes={item.numNotes}
          numCards={item.numCards}
          numQuizzes={item.numQuizzes}
          color={item.color}
        />
      )}
      ListFooterComponent={<View style={{ height: 50 }} />}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
        { useNativeDriver: false }
      )}
    />
  );
};

// its time for some CSS HELL YEA
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary,
    alignItems: "center",
  },
  header: {
    backgroundColor: primary,
    height: 135,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 25,
    paddingHorizontal: 32,
  },
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
  line: {
    borderBottomWidth: 1,
    borderBottomColor: grey,
    marginTop: 20,
  },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  // the fake searchbar background
  searchBar: {
    width: "84%",
    height: 49,
    backgroundColor: grey,
    justifyContent: "center",
    borderRadius: 5,
  },
  // the real searchbar component
  paperBar: {
    backgroundColor: "transparent",
    width: "100%",
    height: 49,
    alignSelf: "center",
    fontColor: "#9FA3BE",
    fontSize: 16,
  },
  filterButton: {
    width: 49,
    height: 49,
    backgroundColor: grey,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  listingContainer: {
    flex: 1,
    margin: 6,
    marginTop: 0,
  },
});
