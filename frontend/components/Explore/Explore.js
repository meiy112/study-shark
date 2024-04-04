import { Text } from "react-native-paper";
import colors from "../../constants/Colors";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import TopicExplore from "./ListingComponents/TopicExplore";
import MaterialExplore from "./ListingComponents/MaterialExplore";
import { useScrollToTop } from "@react-navigation/native";
import { useRef, useState, useEffect, useContext, createContext } from "react";
import SearchScreen from "./Search/SearchScreen";
import PageContext from "../../context/PageContext";
import AuthContext from "../../context/AuthContext";
import { topicApi } from "../../api/TopicApi";

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
} = colors;
const NavContext = createContext();

// Achievement Button beside Search
function AchievementButton() {
  const navigation = useContext(NavContext);
  const { setPage } = useContext(PageContext);

  const handlePress = () => {
    setPage("Achievement");
    navigation.navigate("Achievement", { prevScreen: "Explore" });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Ionicons name="planet-outline" color={active} size={28} />
    </TouchableOpacity>
  );
}

// Search Button
function SearchButton({ handleSearchPress }) {
  return (
    <TouchableOpacity onPress={handleSearchPress}>
      <MaterialCommunityIcons name="magnify" color={"#000000"} size={28} />
    </TouchableOpacity>
  );
}

// DEFAULT PAGE
export default function Explore({ navigation }) {
  // search screen modal
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [topics, setTopics] = useState([]);
  const [subject, setSubject] = useState(""); // subject to filter by
  const { token } = useContext(AuthContext); // jwt token

  // LOAD DATA------------------------------------
  // fetch topics
  useEffect(() => {
    async function fetchTopics() {
      try {
        const data = await topicApi.getFeaturedTopics(token, subject);
        setTopics(data);
      } catch (e) {
        console.log("Explore page: " + e.message);
      }
    }
    fetchTopics();
  }, [token, subject]);
  // END LOAD DATA ----------------------------------------------

  // HANDLERS ------------------------
  const handleSearchPress = () => {
    setSearchVisible(true);
  };
  const handleCloseSearch = () => {
    setSearchVisible(false);
  };

  function handleSubjectPress(subjectTitle) {
    if (subjectTitle === subject) {
      setSubject("");
    } else {
      setSubject(subjectTitle);
    }
  }
  // END HANDLERS --------------------

  return (
    <NavContext.Provider value={navigation}>
      <SafeAreaView
        style={{
          backgroundColor: primary,
          flex: 1,
          zIndex: 3,
        }}
      >
        <View style={{ flex: 1, backgroundColor: background }}>
          <Header handleSearchPress={handleSearchPress} />
          <ExploreFeed
            handleSubjectPress={handleSubjectPress}
            topics={topics}
            navigation={navigation}
            token={token}
            subject={subject}
          />
        </View>
        <SearchScreen isVisible={isSearchVisible} onClose={handleCloseSearch} />
      </SafeAreaView>
    </NavContext.Provider>
  );
}

// header with search bar and "Explore"
const Header = ({ handleSearchPress }) => {
  return (
    <View style={styles.shadow}>
      <View style={[styles.headerContainer]}>
        <Text style={styles.title}>Explore</Text>
        <View style={styles.buttonContainer}>
          <SearchButton handleSearchPress={handleSearchPress} />
          <AchievementButton />
        </View>
      </View>
    </View>
  );
};

// feed under header
const ExploreFeed = ({
  handleSubjectPress,
  topics,
  navigation,
  token,
  subject,
}) => {
  // scrolls to top when explore button in navbar or scrollToTop button is pressed
  const ref = useRef();
  const scrollToTop = () => {
    ref.current.scrollTo({ y: 0, animated: true });
  };
  useScrollToTop(ref);

  return (
    <ScrollView style={styles.feedContainer} ref={ref}>
      {/*subjects*/}
      <SubjectList handleSubjectPress={handleSubjectPress} />
      {/*hot topics*/}
      <HotTopics topics={topics} navigation={navigation} token={token} />
      {/*featured material*/}
      {/*<ShowMaterialButton showMaterials={showMaterials} />*/}
      <FeaturedMaterial
        navigation={navigation}
        token={token}
        subject={subject}
      />
      {/*----------------------Scroll To Top Button------------------------*/}
      <TouchableOpacity
        onPress={scrollToTop}
        style={{
          width: "100%",
          alignItems: "center",
          marginBottom: 50,
          marginTop: 5,
        }}
      >
        <View
          style={{ backgroundColor: "#E4E9F5", width: "100%", height: 1 }}
        />
        <MaterialCommunityIcons name="chevron-up" opacity={0.6} size={24} />
        <Text style={{ fontFamily: "mon-m", fontSize: 12, opacity: 0.6 }}>
          RETURN TO TOP
        </Text>
      </TouchableOpacity>
      {/*----------------------Scroll To Top Button------------------------*/}
    </ScrollView>
  );
};

// List of subjects
const SubjectList = ({ handleSubjectPress }) => {
  return (
    <View
      style={[styles.subjectsContainer, styles.feedComponenent, styles.scroll]}
    >
      <ScrollView
        horizontal
        contentContainerStyle={{}}
        showsHorizontalScrollIndicator={false}
      >
        <SubjectItem
          title="SCIENCE"
          iconName="bulb-outline"
          handleSubjectPress={handleSubjectPress}
        />
        <SubjectItem
          title="LANG"
          secondLine="UAGE"
          iconName="language-outline"
          handleSubjectPress={handleSubjectPress}
        />
        <SubjectItem
          title="MATH"
          secondLine="EMATICS"
          iconName="calculator-outline"
          handleSubjectPress={handleSubjectPress}
        />
        <SubjectItem
          title="CREATIVE"
          secondLine="ARTS"
          iconName="color-palette-outline"
          handleSubjectPress={handleSubjectPress}
        />
        <SubjectItem
          title="WEATHER"
          iconName="cloudy-night-outline"
          handleSubjectPress={handleSubjectPress}
        />
        <SubjectItem
          title="GAM"
          secondLine="BLING"
          iconName="dice-outline"
          handleSubjectPress={handleSubjectPress}
        />
        <SubjectItem
          title="LIT"
          secondLine="ERATURE"
          iconName="library-outline"
          handleSubjectPress={handleSubjectPress}
        />
      </ScrollView>
    </View>
  );
};

// Subject component in subject list (title = first line, secondLine = second line)
const SubjectItem = ({ title, iconName, secondLine, handleSubjectPress }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        handleSubjectPress(title);
      }}
    >
      <View style={[styles.subjectContainer, styles.shadow]}>
        <Ionicons name={iconName} size={32} color={"#304046"} />
        <View style={{ justifyContent: "center", height: 30, width: "100%" }}>
          <Text style={{ fontFamily: "mon-sb", fontSize: 12, opacity: 0.8 }}>
            {title}
          </Text>
          {secondLine && (
            <Text style={{ fontFamily: "mon-sb", fontSize: 12, opacity: 0.8 }}>
              {secondLine}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Hot Topics
const HotTopics = ({ topics, navigation, token }) => {
  const [isLikesShown, setIsLikesShown] = useState(false);
  const [listData, setListData] = useState([]);
  const [avgLikes, setAvgLikes] = useState({});

  useEffect(() => {
    const updatedListData = topics.map((item, index) => {
      console.log("tee hee updating hot topics");
      const topicId = item.id;
      const numLikes = avgLikes[topicId];
      return (
        <TopicExplore
          key={index}
          id={item.id}
          title={item.title}
          date={item.date}
          numNotes={item.numNotes}
          numCards={item.numCards}
          numQuizzes={item.numQuizzes}
          color={item.color}
          navigation={navigation}
          isLikesShown={isLikesShown}
          numLikes={numLikes}
        />
      );
    });
    setListData(updatedListData);
  }, [isLikesShown, topics]);

  const toggleLikesShown = async () => {
    await getLikes();
    setIsLikesShown(!isLikesShown);
  };

  const getLikes = async () => {
    try {
      const data = await topicApi.getAverageLikes(token);
      console.log("HAHAHA (got likes)");
      setAvgLikes(data);
    } catch (e) {
      console.log("Explore page: " + e.message);
    }
  };

  return (
    <View
      style={[styles.hotTopicsContainer, styles.feedComponenent, styles.shadow]}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={[
            styles.title,
            { paddingBottom: 9, paddingLeft: 25, paddingTop: 8 },
          ]}
        >
          Hot Topics
        </Text>
        <TouchableOpacity
          style={[styles.viewButton, { marginRight: 10, height: 30 }]}
          onPress={toggleLikesShown}
        >
          <Text style={styles.buttonText}>
            {isLikesShown ? "Hide Likes" : "Show Likes"}
          </Text>
        </TouchableOpacity>
      </View>
      {/*-----------------------Topics go in here----------------------*/}
      <ScrollView
        horizontal
        contentContainerStyle={styles.scroll}
        showsHorizontalScrollIndicator={false}
      >
        {listData}
      </ScrollView>
      {/*--------------------------------------------------------------*/}
    </View>
  );
};

// Featured Material
const FeaturedMaterial = ({ navigation, token, subject }) => {
  const [isMaterialShowed, setIsMaterialShowed] = useState(false);
  const [loadedStudyMaterial, setLoadedStudyMaterial] = useState([]);

  const handleOnPress = async () => {
    await fetchStudyMaterial();
    setIsMaterialShowed(true);
  };

  // fetch study mats when handleOnPress is called
  const fetchStudyMaterial = async () => {
    try {
      const data = await topicApi.getFeaturedStudyMaterial(token, subject);
      console.log("HAHA (study mats got fetched)");
      setLoadedStudyMaterial(data);
    } catch (e) {
      console.log("Explore page: " + e.message);
    }
  };

  return (
    <View
      style={[
        styles.featuredMaterialContainer,
        styles.feedComponenent,
        styles.shadow,
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            paddingBottom: 9,
            paddingLeft: 25,
            paddingTop: 15,
            paddingBottom: 15,
          },
        ]}
      >
        Featured Material
      </Text>
      {/*-----------------------StudyMats go in here----------------------*/}
      {isMaterialShowed ? (
        <ScrollView
          horizontal
          contentContainerStyle={styles.scroll}
          showsHorizontalScrollIndicator={false}
        >
          {loadedStudyMaterial.map((item, index) => (
            <MaterialExplore
              key={index}
              title={item.title}
              type={item.type}
              date={item.date}
              color={item.color}
              count={item.numComponents}
              topicTitle={item.topicTitle}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.viewButtonContainer}>
          <TouchableOpacity style={styles.viewButton} onPress={handleOnPress}>
            <Text style={styles.buttonText}>VIEW</Text>
          </TouchableOpacity>
        </View>
      )}
      {/*----------------------------------------------------------------*/}
    </View>
  );
};

// I SURE DO LOVE ME SOME CSS
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
    height: 75,
    backgroundColor: primary,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingTop: 5,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: "#171717",
    fontFamily: "mon-sb",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 75,
  },
  feedContainer: {
    flex: 1,
  },
  subjectsContainer: {
    height: 130,
    width: "100%",
  },
  subjectContainer: {
    width: 93,
    height: 111,
    backgroundColor: primary,
    borderRadius: 15,
    paddingTop: 22,
    paddingBottom: 15,
    paddingLeft: 15,
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  hotTopicsContainer: {
    height: 311,
    backgroundColor: primary,
    width: "100%",
    paddingTop: 20,
  },
  scroll: {
    paddingHorizontal: 10,
  },
  feedComponenent: {
    paddingTop: 10,
  },
  featuredMaterialContainer: {
    height: 311,
    width: "100%",
    paddingTop: 20,
  },
  viewButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: 80,
  },
  viewButton: {
    backgroundColor: greyIcon,
    height: 41,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "mon-sb",
    fontSize: 12,
  },
});
