import { Text } from "react-native-paper";
import colors from "../../constants/Colors";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import TopicExplore from "./TopicExplore";
import MaterialExplore from "./MaterialExplore";
import { useScrollToTop } from "@react-navigation/native";
import { useRef } from "react";

const { active, inactive, background, primary, shadow, line, grey } = colors;

// Achievement Button beside Search
function AchievementButton({ navigation }) {
  // const navigation = useNavigation(); // I commented this out to set up navigation

  const handlePress = () => {
    navigation.navigate("Achievement");
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Ionicons name="planet-outline" color={active} size={28} />
    </TouchableOpacity>
  );
}

// Search Button
function SearchButton({ navigation }) {
  // const navigation = useNavigation(); // I commented this out to set up navigation

  const handlePress = () => {
    navigation.navigate("Search");
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <MaterialCommunityIcons name="magnify" color={"#000000"} size={28} />
    </TouchableOpacity>
  );
}

// DEFAULT PAGE
export default function Explore() {
  return (
    <SafeAreaView
      style={{
        backgroundColor: primary,
        flex: 1,
        zIndex: 3,
      }}
    >
      <View style={{ flex: 1, backgroundColor: background }}>
        <Header />
        <ExploreFeed />
      </View>
    </SafeAreaView>
  );
}

// header with search bar and "Explore"
const Header = () => {
  return (
    <View style={[styles.headerContainer, styles.shadow]}>
      <Text style={styles.title}>Explore</Text>
      <View style={styles.buttonContainer}>
        <SearchButton />
        <AchievementButton />
      </View>
    </View>
  );
};

// feed under header
const ExploreFeed = () => {
  // scroll to top button stuff
  const ref = useRef();
  const scrollToTop = () => {
    ref.current.scrollTo({ y: 0, animated: true });
  };
  useScrollToTop(ref);

  return (
    <ScrollView style={styles.feedContainer} ref={ref}>
      <SubjectList />
      <HotTopics />
      <FeaturedMaterial />
      {/*START: Scroll To Top Button*/}
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
      {/*END: Scroll To Top Button*/}
    </ScrollView>
  );
};

// List of subjects
const SubjectList = () => {
  return (
    <View
      style={[styles.subjectsContainer, styles.feedComponenent, styles.scroll]}
    >
      <ScrollView
        horizontal
        contentContainerStyle={{}}
        showsHorizontalScrollIndicator={false}
      >
        <SubjectItem title="SCIENCE" iconName="bulb-outline" />
        <SubjectItem
          title="LANG"
          secondLine="UAGE"
          iconName="language-outline"
        />
        <SubjectItem
          title="MATH"
          secondLine="EMATICS"
          iconName="calculator-outline"
        />
        <SubjectItem
          title="CREATIVE"
          secondLine="ARTS"
          iconName="color-palette-outline"
        />
        <SubjectItem title="WEATHER" iconName="cloudy-night-outline" />
        <SubjectItem title="GAM" secondLine="BLING" iconName="dice-outline" />
        <SubjectItem
          title="LIT"
          secondLine="ERATURE"
          iconName="library-outline"
        />
      </ScrollView>
    </View>
  );
};

// Subject component in subject list
const SubjectItem = ({ title, iconName, secondLine }) => {
  return (
    <TouchableOpacity>
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
const HotTopics = () => {
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
  return (
    <View
      style={[styles.hotTopicsContainer, styles.feedComponenent, styles.shadow]}
    >
      <Text
        style={[
          styles.title,
          { paddingBottom: 9, paddingLeft: 25, paddingTop: 8 },
        ]}
      >
        Hot Topics
      </Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scroll}
        showsHorizontalScrollIndicator={false}
      >
        <TopicExplore
          title="Phys901"
          date="March 19, 2024"
          numNotes={3}
          numCards={5}
          numQuizzes={2}
          color={purple}
        />
        <TopicExplore
          title="Chem123"
          date="March 23, 2024"
          numNotes={21}
          numCards={7}
          numQuizzes={11}
          color={pink}
        />
        <TopicExplore
          title="Beep Boop"
          date="i hate math"
          numNotes={29}
          numCards={45}
          numQuizzes={22}
          color={blue}
        />
        <TopicExplore
          title="How to be emo"
          date="September 10, 2020"
          numNotes={0}
          numCards={69}
          numQuizzes={69}
          color={purple}
        />
      </ScrollView>
    </View>
  );
};

// Featured Material
const FeaturedMaterial = () => {
  // reason why they're inside each function and not outside is because primary is already defined in colors
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
      <ScrollView
        horizontal
        contentContainerStyle={styles.scroll}
        showsHorizontalScrollIndicator={false}
      >
        <MaterialExplore
          title="Standing Waves"
          type="quiz"
          date="November 9, 1989"
          color={purple}
          count={19}
          topicTitle="Phys901"
        />
        <MaterialExplore
          title="Stereochemistry"
          type="notes"
          date="April 1, 2024"
          color={pink}
          count={21}
          topicTitle="Chem123"
        />
        <MaterialExplore
          title="Space Meditation"
          type="flashcards"
          date="April 1, 2024"
          color={blue}
          count={8}
          topicTitle="Astrology101"
        />
      </ScrollView>
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
    height: 80,
    backgroundColor: primary,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingTop: 7,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
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
});
