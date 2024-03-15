import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../constants/Colors";
import ColorStyle from "../Misc/ColorStyle";

const { active, inactive, background, primary, shadow, line } = colors;
let colorStyle;

// TOPICLISTING: (title, isPublic, date, numNotes, numCards, numQuizzes, color)
// displayed on home screen, click in to go to Topic page
const TopicListing = (props) => {
  const { title, isPublic, date, numNotes, numCards, numQuizzes, color } =
    props;
  // assign color set
  colorStyle = new ColorStyle(color);
  return (
    <TouchableOpacity style={styles.container} activeOpacity={1}>
      {/*gradient underneath*/}
      <LinearGradient
        colors={[colorStyle.primary, colorStyle.gradient]}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      ></LinearGradient>
      {/*HEADER*/}
      <Header title={title} isPublic={isPublic} date={date} />
      {/*STUDY MATERIAL DATA*/}
      <StudyData
        numNotes={numNotes}
        numCards={numCards}
        numQuizzes={numQuizzes}
      />
    </TouchableOpacity>
  );
};

// everything above the container with # StudyMaterial
function Header({ title, isPublic, date }) {
  return (
    <View style={styles.header}>
      {/*PRIVACY ICON*/}
      <MaterialCommunityIcons
        name={isPublic ? "earth" : "earth-off"}
        style={styles.privacyIcon}
        size={20}
      />
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
function StudyData({ numNotes, numCards, numQuizzes }) {
  return (
    <View style={styles.studyDataContainer}>
      <StudyDataEntry number={numNotes} name="Study Notes" />
      <StudyDataEntry number={numCards} name="Flashcards" />
      <StudyDataEntry number={numQuizzes} name="Quizzes" />
    </View>
  );
}

// {num} + Study Material Name
function StudyDataEntry({ number, name }) {
  return (
    <View style={styles.studyDataEntryContainer}>
      {/*Number + Circle*/}
      <View
        style={[styles.numberCircle, { backgroundColor: colorStyle.circle }]}
      >
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

// OMIGOD IS THAT CSS I LOVE CSS
const styles = StyleSheet.create({
  container: {
    width: 170,
    height: 243,
    flex: 1,
    margin: 5,
  },
  gradient: {
    width: 170,
    height: 243,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  header: {
    height: 114,
    width: 170,
    flex: 1,
    padding: 15,
  },
  // container with title + date
  titleDate: {
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
  },
  privacyIcon: {
    color: primary,
    alignSelf: "baseline",
  },
  studyDataContainer: {
    width: 170,
    height: 129,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    padding: 17,
    justifyContent: "space-between",
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
});

export default TopicListing;
