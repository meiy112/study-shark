import React, { useRef, useState, useEffect, useContext } from "react";
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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Tag from "../../components/Misc/Tag";
import colors from "../../constants/Colors";
import TopicListing from "./TopicListing";
import { useScrollToTop } from "@react-navigation/native";
import AuthContext from '../../context/AuthContext';
import PageContext from "../../context/PageContext";
import UserUnauthenticatedPage from "../Login/UsedUnauthenticatedPage";

import { tagApi } from "../../api/TagApi";
import { topicApi } from "../../api/TopicApi";

const { active, inactive, background, primary, shadow, line, grey } = colors;

// Achievement Button beside "My Topics"
function AchievementButton({ size, navigation }) {
  const { setPage } = useContext(PageContext);

  const handlePress = () => {
    setPage("Achievement");
    navigation.navigate("Achievement", {prevScreen: "Home"});
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Ionicons name="planet-outline" color={active} size={28} />
    </TouchableOpacity>
  );
}

// THE HOME PAGE
export default function Home({ navigation }) {
  const [tags, setTags] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filterList, setFilterList] = useState([]); // list of tags to filter by
  const [sortBy, setSortBy] = useState("lastOpened");
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useContext(AuthContext); // jwt token

  // LOAD DATA------------------------------------
  // fetch tags
  useEffect(() => {
    async function fetchTags() {
      try {
        const data = await tagApi.getTags(token);
        setTags(data);
      } catch (e) {
        console.log("Home page: " + e.message);
      }
    }
    fetchTags();
  }, [token]);

  // fetch topics
  useEffect(() => {
    async function fetchTopic() {
      try {
          const data = await topicApi.getHomePageTopics(token, filterList, sortBy, searchQuery);
          setTopics(data);
        } catch (e) {
          console.log("Home page: " + e.message);
        }
      } 
    fetchTopic();
  }, [token, filterList, sortBy, searchQuery]); // TODO: implement filter, search, sort
  // END LOAD DATA ----------------------------------------------

  // SEARCH / FILTER / SORT HANDLERS -----------------------------------
  // handle search
  function handleSearch(query) {
    setSearchQuery(query.nativeEvent.text);
  }

  // handle sort
  function handleSort() {
    if (sortBy === "lastOpened") {
      setSortBy("alphabetical");
    } else {
      setSortBy("lastOpened");
    }
  }

  // handle filter: callback function for Tag that updates the filterList
  function handleSelectedTagChange(tag, isSelected) {
    if (isSelected) {
      setFilterList([...filterList, tag]);
    } else {
      setFilterList(filterList.filter(item => item.name !== tag.name));
    }
  }
  // END SEARCH / FILTER / SORT HANDLERS -------------------------------

  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  return (
    token?
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: background, flex: 1 }}>
        <Header navigation={navigation} tags={tags} handleSelectedTagChange={handleSelectedTagChange}/>
        <SearchFilter scrollOffsetY={scrollOffsetY} handleSearch={handleSearch} handleSort={handleSort} />
        <TopicList
          scrollOffsetY={scrollOffsetY}
          navigation={navigation}
          topics={topics}
        />
      </View>
    </SafeAreaView>
    :
    <UserUnauthenticatedPage action={"create Topics"}/>
  );
}

// Header (everything above the search bar)
function Header({ navigation, tags, handleSelectedTagChange }) {
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
        <AchievementButton navigation={navigation} />
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
      {tags !== undefined && tags.map((tag, index) => (
          <Tag key={index} title={tag.name} color={tag.color} callback={handleSelectedTagChange} />
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
const SearchFilter = ({ scrollOffsetY, handleSearch, handleSort }) => {
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
      {/*fake searchbar*/}
      <View style={[styles.searchBar, styles.shadow]}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.paperBar}
          placeholderTextColor={"#9FA3BE"}
          onSubmitEditing={handleSearch}
          inputStyle={{
            fontSize: 16,
            fontFamily: "mon",
            alignSelf: "center",
          }}
        />
      </View>
      {/*real searchbar*/}
      <TouchableHighlight style={[styles.filterButton]} onPress={handleSort}>
        <MaterialCommunityIcons name="tune" size={24} color={inactive} />
      </TouchableHighlight>
    </Animated.View>
  );
};

// topics listings underneath the search bar
const TopicList = ({ scrollOffsetY, navigation, topics }) => {
  const ref = useRef();
  useScrollToTop(ref);
  return (
    <FlatList
      ref={ref}
      scrollEventThrottle={5}
      showsVerticalScrollIndicator={false}
      data={topics}
      style={styles.listingContainer}
      numColumns={2}
      renderItem={({ item }) => (
        <TopicListing
          id={item.id}
          title={item.title}
          isPublic={item.isPublic}
          date={item.date}
          numNotes={item.numNotes}
          numCards={item.numCards}
          numQuizzes={item.numQuizzes}
          color={item.color}
          navigation={navigation}
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
    backgroundColor: primary,
    justifyContent: "center",
    borderRadius: 20,
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
    marginHorizontal: 6,
  },
});
