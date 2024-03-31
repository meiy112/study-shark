import { useState, useContext, useRef } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  Image,
  Text,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import AuthContext from "../../context/AuthContext";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import PageContext from "../../context/PageContext";
import colors from "../../constants/Colors";
import UserUnauthenticatedPage from "../Login/UsedUnauthenticatedPage";
import schoolData from "./data/schoolData";

const { active, inactive, background, primary, shadow, grey } = colors;

// fake user data
const user = {
  username: "Expo Marker",
  pfp: require("../../assets/images/misc/rice.jpeg"),
  joined: "May 2024",
  exp: 1200,
  title: "BEGINNER",
  color: "#22B0D2",
  school: "University of British Columbia",
  email: "Expomarkerexpogo@gmail.com",
  totalMat: 21,
  totalTopics: 12,
  totalGroups: 11,
  totalAchievements: 5,
};

// fake achievements
const achievements = [
  require("../../assets/images/achievements/croissant_achievement.png"),
  require("../../assets/images/achievements/croissant_achievement.png"),
  require("../../assets/images/achievements/croissant_achievement.png"),
  require("../../assets/images/achievements/croissant_achievement.png"),
  require("../../assets/images/achievements/croissant_achievement.png"),
];

// update email in database
const updateEmail = ({ email }) => {
  // TODO: update user's email with email arg
};

// update school in database
const updateSchool = ({ school }) => {
  // TODO: yk
};

// Logout Button
const LogoutButton = ({ handlePress }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ alignSelf: "flex-end", margin: 25, marginBottom: 15 }}
    >
      <Ionicons name="log-out-outline" color={active} size={24} />
    </TouchableOpacity>
  );
};

// PROFILE PAGE
export default function Profile() {
  const { token, userLogout } = useContext(AuthContext); // jwt token + logout function

  // log out
  const handleLogoutButton = () => {
    userLogout();
    console.log("logging out");
  };

  // navigate to achievements
  const handleSeeAllButtonClick = () => {
    // TODO: set navigation to achievements
  };

  return token ? ( // conditionally renders pages based on if user is logged in
    <ScrollView style={{ backgroundColor: primary }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/*Logout Button*/}
        <LogoutButton handlePress={handleLogoutButton} />
        {/*Profile Info*/}
        <ProfileInfo />
        {/*Email and School*/}
        <EmailSchoolContainer />
        {/*Numerical Data*/}
        <NumericalData />
        {/*Achievements*/}
        <AchievementsContainer
          handleSeeAllButtonClick={handleSeeAllButtonClick}
        />
      </SafeAreaView>
    </ScrollView>
  ) : (
    <UserUnauthenticatedPage action={"get started!"} />
  );

  return token ? ( // conditionally renders pages based on if user is logged in
    // Hi! put all your code for Groups inside this view!
    <View
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Groups - Outside.js</Text>
    </View>
  ) : (
    <UserUnauthenticatedPage action={"join Groups"} />
  );
}

// Container for Profile Picture and the Info beside it
const ProfileInfo = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      {/*Profile Picture*/}
      <ProfileIcon />
      {/*------------------------------- Info beside it -------------------------------*/}
      <View style={{ justifyContent: "space-between", marginLeft: 23 }}>
        {/*Username*/}
        <Text style={{ fontFamily: "mon-sb", fontSize: 18 }}>
          {user.username}
        </Text>
        <View
          style={{
            height: 36,
            justifyContent: "space-between",
            marginBottom: 3,
          }}
        >
          {/*Join Date*/}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="calendar-account-outline"
              style={{ opacity: 0.4, marginRight: 5 }}
              size={16}
            />
            <Text style={{ fontFamily: "mon-m", fontSize: 11, opacity: 0.6 }}>
              Joined {user.joined}
            </Text>
          </View>
          {/*Experience Points*/}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="star-four-points-outline"
              style={{ opacity: 0.4, marginRight: 5 }}
              size={16}
            />
            <Text style={{ fontFamily: "mon-m", fontSize: 11, opacity: 0.6 }}>
              {user.exp} EXP
            </Text>
          </View>
        </View>
        {/*Title*/}
        <View style={styles.userTitle}>
          <Text
            style={{
              fontFamily: "mon-m",
              fontSize: 9,
              color: primary,
            }}
          >
            {user.title}
          </Text>
        </View>
      </View>
    </View>
    //-----------------------------------------------------------------------------------
  );
};

// Profile Picture
const ProfileIcon = () => {
  return (
    <View style={{ width: 100, marginLeft: 28 }}>
      {/*The picture*/}
      <Image
        source={user.pfp}
        style={{
          width: 100,
          height: 100,
          borderRadius: 100,
        }}
      ></Image>
      {/*Edit Button*/}
      <TouchableOpacity style={styles.editButtonPfp}>
        <MaterialCommunityIcons name="pencil" color={primary} size={16} />
      </TouchableOpacity>
    </View>
  );
};

// Email and School Info
const EmailSchoolContainer = () => {
  const [email, setEmail] = useState(user.email);
  const [school, setSchool] = useState(user.school);
  const textInputRef = useRef(null);

  // when editing email
  const handleEditButtonPress = () => {
    setTimeout(() => {
      textInputRef.current.focus();
    }, 0);
  };

  // when not editing email
  const handleBlur = () => {
    updateEmail(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  return (
    <View style={[styles.shadow, styles.emailSchoolContainer, { zIndex: 2 }]}>
      {/*Really demented way of making the email be below the school in terms of z-index*/}
      {/*START: Email*/}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 0,
          position: "absolute",
          left: 40,
          bottom: 20,
        }}
      >
        {/*Email Icon*/}
        <Ionicons
          name="mail-outline"
          size={25}
          style={{ opacity: 0.6, marginLeft: -6, zIndex: 0 }}
        />
        {/*Email*/}
        <View
          style={{
            borderBottomColor: "rgba(0, 0, 0, 0.2)",
            borderBottomWidth: 1,
            width: 237,
            flexDirection: "row",
            justifyContent: "space-between",
            zIndex: 0,
            marginLeft: 11,
          }}
        >
          <TextInput
            ref={textInputRef}
            style={[styles.emailInput, { pointerEvents: "none" }]}
            value={email}
            onChangeText={handleEmailChange}
            onBlur={handleBlur}
          />
          {/*Open Select Button*/}
          <TouchableOpacity onPress={handleEditButtonPress}>
            <MaterialCommunityIcons
              name="pencil"
              size={15}
              style={{ opacity: 0.5, marginRight: 5 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/*END: Email*/}
      {/*START: University*/}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/*School Icon*/}
        <Ionicons
          name="school-outline"
          size={25}
          style={{ opacity: 0.6, marginLeft: 2 }}
        />
        {/*Select and Display School*/}
        <View style={{ position: "absolute", zIndex: 3, top: -7, left: 25 }}>
          <SelectList
            setSelected={(val) => setSchool(val)}
            onSelect={() => updateSchool(school)}
            data={schoolData}
            placeholder={school}
            arrowicon={
              <Ionicons
                name="chevron-down"
                size={15}
                style={{ opacity: 0.8, marginRight: 5 }}
              />
            }
            boxStyles={{ width: 270, borderWidth: 0 }}
            dropdownTextStyles={{
              fontFamily: "mon",
              fontSize: 12,
              opacity: 0.8,
            }}
            inputStyles={{ fontSize: 12, fontFamily: "mon-sb", opacity: 0.8 }}
            dropdownStyles={[
              { borderWidth: 0, backgroundColor: primary },
              styles.shadow,
            ]}
            searchicon={<View />}
            searchPlaceholder="Search School"
          />
        </View>
      </View>
      {/*END: University*/}
    </View>
  );
};

// Display number of Study Material, Topics, Groups
const NumericalData = () => {
  return (
    <View
      style={{
        //borderTopWidth: 1,
        //borderTopColor: grey,
        //marginTop: 28,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 111,
          justifyContent: "center",
        }}
      >
        {/*Study Material*/}
        <SingleData
          icon="documents-outline"
          data={user.totalMat}
          type="Study Material"
        />
        {/*Topics*/}
        <SingleData
          icon="folder-open-outline"
          data={user.totalTopics}
          type="Topics"
          dataStyle={{ marginRight: 60, marginLeft: 45 }}
        />
        {/*Groups*/}
        <SingleData
          icon="people-outline"
          data={user.totalGroups}
          type="Groups"
        />
      </View>
    </View>
  );
};

const SingleData = ({ icon, data, type, dataStyle }) => {
  return (
    <View style={dataStyle}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}
      >
        <Ionicons name={icon} size={30} color="#304046" />
        <Text style={styles.numContainer}>{data}</Text>
      </View>
      <Text style={{ fontFamily: "mon-m", fontSize: 11, opacity: 0.4 }}>
        {type}
      </Text>
    </View>
  );
};

// Achievements
const AchievementsContainer = (handleSeeAllButtonClick) => {
  return (
    <View style={[styles.achievementsContainer, styles.shadow]}>
      {/*------------------- START: My Achievements title and See all Button -------------------*/}
      <View
      //style={{ borderBottomWidth: 1, borderBottomColor: grey, height: 45 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 5,
          }}
        >
          {/*My Achievements title*/}
          <Text style={{ fontFamily: "mon-sb", fontSize: 16 }}>
            My Achievements
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onClick={handleSeeAllButtonClick}
          >
            {/*See all Button*/}
            <Text
              style={{
                fontSize: 11,
                opacity: 0.4,
                fontFamily: "mon-m",
                paddingRight: 3,
              }}
            >
              See all
            </Text>
            <MaterialCommunityIcons
              name="chevron-double-right"
              style={{ opacity: 0.4 }}
            />
          </TouchableOpacity>
        </View>
        {/*Total Achievements Data*/}
        <Text style={{ fontFamily: "mon-m", fontSize: 11, opacity: 0.4 }}>
          Total: {user.totalAchievements}
        </Text>
      </View>
      {/*--------------------------------------------------------------------------------------*/}
      {/*List of user's Achievements*/}
      <AchievementsList />
    </View>
  );
};

const AchievementsList = () => {
  return (
    <ScrollView contentContainerStyle={styles.achievementsScrollView}>
      {achievements.map((achievement, index) => (
        <Image
          key={index}
          source={achievement}
          style={styles.achievementImage}
        />
      ))}
    </ScrollView>
  );
};

// Is that...? IT IS! YIPPEEE!!
const styles = StyleSheet.create({
  shadow: {
    shadowColor: shadow,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.09,
    shadowRadius: 10,
    elevation: 5,
  },
  editButtonPfp: {
    backgroundColor: active,
    width: 30,
    height: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 0,
  },
  userTitle: {
    backgroundColor: user.color,
    width: 76,
    height: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  emailSchoolContainer: {
    marginTop: 25,
    width: 339,
    height: 103,
    backgroundColor: primary,
    borderRadius: 15,
    alignSelf: "center",
    paddingHorizontal: 31,
    paddingVertical: 19,
    justifyContent: "space-between",
  },
  emailInput: {
    fontSize: 11,
    fontFamily: "mon",
    opacity: 0.8,
    width: 189,
    backgroundColor: primary,
    height: 20,
    marginLeft: 7,
  },
  numContainer: {
    fontFamily: "mon-sb",
    fontSize: 22,
    paddingLeft: 6,
  },
  achievementsContainer: {
    backgroundColor: primary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "100%",
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
  achievementsScrollView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  achievementImage: {
    marginVertical: 5,
  },
});
