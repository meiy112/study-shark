import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../../constants/Colors";
import PageContext from "../../../context/PageContext";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const { active, inactive, background, primary, shadow, line } = colors;

// TOPICLISTING: (title, isPublic, date, numNotes, numCards, numQuizzes, color)
// displayed on home screen, click in to go to Topic page
const TopicExplore = (props) => {
  const {
    id,
    title,
    date,
    numNotes,
    numCards,
    numQuizzes,
    color,
    navigation,
    isLikesShown,
    numLikes,
  } = props;
  // Number of likes

  const [scaleValue] = useState(new Animated.Value(1));
  const { setPage, setTopicId } = useContext(PageContext);

  // ---------------------- ANIMATION THINGS ------------------------
  const animateButton = () => {
    Animated.timing(scaleValue, {
      toValue: 0.9,
      duration: 50,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });
  };
  // ----------------------------------------------------------------

  const handleClick = () => {
    setPage("Topic");
    setTopicId(id);
    navigation.navigate("Topic", {
      id: id,
      color: color,
      prevScreen: "Explore",
    });
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        styles.shadow,
        { transform: [{ scale: scaleValue }] },
      ]}
      activeOpacity={1}
      onPress={() => {
        animateButton();
        handleClick();
      }}
    >
      {/*gradient underneath*/}
      <LinearGradient
        colors={[color.primary, color.gradient]}
        style={[styles.gradient]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      ></LinearGradient>
      {/*HEADER*/}
      <Header
        title={title}
        date={date}
        isLikesShown={isLikesShown}
        numLikes={numLikes}
      />
      {/*STUDY MATERIAL DATA*/}
      <StudyData
        numNotes={numNotes}
        numCards={numCards}
        numQuizzes={numQuizzes}
        color={color}
      />
    </TouchableOpacity>
  );
};

// everything above the container with # StudyMaterial
function Header({ title, date, isLikesShown, numLikes }) {
  return (
    <View style={styles.header}>
      {/*Likes*/}
      <View style={{ alignSelf: "flex-start" }}>
        {isLikesShown ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="heart-outline" color={"#FFFFFF"} size={18} />
            <Text
              style={{
                color: primary,
                fontSize: 12,
                fontFamily: "mon-m",
                marginLeft: 3,
              }}
            >
              {numLikes}
            </Text>
          </View>
        ) : (
          <Ionicons name="heart-dislike-outline" color={"#FFFFFF"} size={18} />
        )}
      </View>
      <View style={styles.titleDate}>
        {/*DATE*/}
        <Text
          style={{
            fontFamily: "mon",
            fontSize: 10,
            color: primary,
            paddingBottom: 5,
          }}
        >
          {date}
        </Text>
        {/*TITLE*/}
        <Text style={{ fontFamily: "mon-sb", fontSize: 15, color: primary }}>
          {title}
        </Text>
      </View>
    </View>
  );
}

// the container showing the # of StudyMaterial
function StudyData({ numNotes, numCards, numQuizzes, color }) {
  return (
    <View style={styles.studyDataContainer}>
      <StudyDataEntry number={numNotes} name="Study Notes" color={color} />
      <StudyDataEntry number={numCards} name="Flashcards" color={color} />
      <StudyDataEntry number={numQuizzes} name="Quizzes" color={color} />
    </View>
  );
}

// {num} + Study Material Name
function StudyDataEntry({ number, name, color }) {
  return (
    <View style={styles.studyDataEntryContainer}>
      {/*Number + Circle*/}
      <View style={[styles.numberCircle, { backgroundColor: color.circle }]}>
        <Text style={{ fontFamily: "mon-sb", fontSize: 11, color: primary }}>
          {number}
        </Text>
      </View>
      {/*Study Material Name*/}
      <Text style={{ fontFamily: "mon-m", fontSize: 11, color: primary }}>
        {name}
      </Text>
    </View>
  );
}

// *gasp* h-hai css-senpai owo
const styles = StyleSheet.create({
  container: {
    width: 170,
    height: 243,
    flex: 1,
    borderRadius: 15,
    maxWidth: "50%",
    margin: 5,
    justifyContent: "center",
  },
  gradient: {
    width: 170,
    height: 243,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    alignSelf: "center",
  },
  header: {
    minHeight: 114,
    width: 170,
    flex: 1,
    padding: 15,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  // container with title + date
  titleDate: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  studyDataContainer: {
    width: 170,
    height: 129,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    padding: 17,
    justifyContent: "space-between",
    alignSelf: "center",
  },
  studyDataEntryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  // the circle around the number for each study material
  numberCircle: {
    height: 27,
    width: 27,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  shadow: {
    shadowColor: shadow,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
});

export default TopicExplore;
