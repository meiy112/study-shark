import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../../constants/Colors";

const { active, inactive, background, primary, shadow, line } = colors;
// for the image icon
const imageMapping = {
  NOTES: require("../../../assets/images/notes.png"),
  FLASHCARDS: require("../../../assets/images/flashcards.png"),
  QUIZ: require("../../../assets/images/quiz.png"),
};

// MATERIALEXPLORE
// displayed on explore screen
const MaterialExplore = (props) => {
  const { type, title, date, color, count, topicTitle } = props;
  const capitalizedType = type.toUpperCase();
  const capitalizedTopicTitle = topicTitle.toUpperCase();

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
        {
          transform: [{ scale: scaleValue }],
          flex: 1,
          height: 229,
          width: 170,
          marginRight: 15,
        },
      ]}
      activeOpacity={1}
      onPress={() => {
        animateButton();
        handleClick();
      }}
    >
      <BackFolder color={color} topicTitle={capitalizedTopicTitle} />
      <NoteComponent
        color={color}
        type={capitalizedType}
        title={title}
        date={date}
        count={count}
      />
    </TouchableOpacity>
  );
};

// White Component on top of Folder
const NoteComponent = ({ color, type, title, date, count }) => {
  const imagePath = imageMapping[type];
  return (
    <View style={[styles.shadow, styles.container]}>
      {/*Tag of Study Material Type*/}
      <TypeTag color={color} type={type} />
      {/*Image Icon*/}
      <Image
        style={{ alignSelf: "center", marginTop: 13, marginBottom: 11 }}
        source={imagePath}
      />
      {/*Title and Date*/}
      <View>
        <Text style={{ fontFamily: "mon-sb", fontSize: 13, marginBottom: 3 }}>
          {title}
        </Text>
        <Text style={{ fontFamily: "mon", fontSize: 9 }}>{date}</Text>
      </View>
      {/*Circle with Count*/}
      <CountComponent color={color} count={count} type={type} />
    </View>
  );
};

// the little tag that shows the type (quiz, notes, etc)
const TypeTag = ({ color, type }) => {
  return (
    <View style={[styles.typeContainer, { backgroundColor: color.primary }]}>
      <Text style={{ fontFamily: "mon-m", fontSize: 9, color: primary }}>
        {type}
      </Text>
    </View>
  );
};

// making this a seperate component is the only way to render the borderRadius (idky)
const CountComponent = ({ color, count, type }) => {
  let countItem;
  if (type === "NOTES") {
    countItem = "Pages";
  } else if (type === "QUIZ") {
    countItem = "Questions";
  } else {
    countItem = "Cards";
  }
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}>
      <View style={[styles.numberCircle, { borderColor: color.primary }]}>
        <Text style={{ fontFamily: "mon-m", fontSize: 11 }}>{count}</Text>
      </View>
      <Text style={{ fontFamily: "mon-m", fontSize: 11, marginLeft: 5 }}>
        {countItem}
      </Text>
    </View>
  );
};

// the folder at the back of the white component
const BackFolder = ({ color, topicTitle }) => {
  return (
    <View style={styles.backFolder}>
      {/*top of folder*/}
      <View style={[styles.folderTop, { backgroundColor: color.primary }]}>
        <Text style={[styles.folderTitle]}>{topicTitle}</Text>
      </View>
      {/*gradient*/}
      <LinearGradient
        colors={[color.primary, color.gradient]}
        style={[styles.gradient]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      ></LinearGradient>
    </View>
  );
};

// hi y'all i wanna die... WAIT IS THAT CSS MY DEPRESSION HAS BEEN CURED
const styles = StyleSheet.create({
  container: {
    width: 155,
    height: 198,
    borderRadius: 15,
    margin: 5,
    backgroundColor: primary,
    marginTop: 26,
    padding: 15,
    position: "absolute",
    zIndex: 2,
  },
  gradient: {
    width: 150,
    height: 190,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 16,
    right: 0,
    position: "absolute",
  },
  typeContainer: {
    height: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    alignSelf: "flex-start",
  },
  numberCircle: {
    height: 27,
    width: 27,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  backFolder: {
    flex: 1,
  },
  folderTop: {
    right: 0,
    height: 36,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    alignItems: "center",
    justifiedContent: "flex-start",
    zIndex: 1,
    paddingHorizontal: 17,
    paddingTop: 7,
  },
  folderTitle: {
    color: primary,
    fontFamily: "mon-m",
    fontSize: 11,
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

export default MaterialExplore;
