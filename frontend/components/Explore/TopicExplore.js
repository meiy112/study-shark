import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../constants/Colors";

const { active, inactive, background, primary, shadow, line } = colors;

// TOPICLISTING: (title, isPublic, date, numNotes, numCards, numQuizzes, color)
// displayed on home screen, click in to go to Topic page
const TopicExplore = (props) => {
  const { title, date, numNotes, numCards, numQuizzes, color } = props;

  const [scaleValue] = useState(new Animated.Value(1));

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
    // TODO
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
      <Header title={title} date={date} />
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
function Header({ title, date }) {
  return (
    <View style={styles.header}>
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
    height: 114,
    width: 170,
    flex: 1,
    padding: 15,
    marginTop: 20,
    alignSelf: "center",
  },
  // container with title + date
  titleDate: {
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
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
