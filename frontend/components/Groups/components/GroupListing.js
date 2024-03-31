import { useState, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import colors from "../../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

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

export default function GroupListing({ group, showModal, navigation }) {
  const onGroupPress = () => {
    navigation.navigate("Group", { prevScreen: "Groups" });
  };

  return (
    <TouchableOpacity
      onPress={onGroupPress}
      style={[styles.container, styles.shadow]}
    >
      <Header
        numMats={group.numMats}
        title={group.title}
        members={group.members}
      />
      <InviteButton joinCode={group.joinCode} showModal={showModal} />
    </TouchableOpacity>
  );
}

const Header = ({ numMats, title, members }) => {
  return (
    <View>
      {/*Display Number of Study Materials*/}
      <Text
        style={{
          fontFamily: "mon",
          fontSize: 9,
          color: greyIcon,
          marginBottom: 3,
        }}
      >
        Materials: {numMats}
      </Text>
      {/*Display Title of Group*/}
      <Text
        style={{
          fontFamily: "mon-sb",
          fontSize: 15,
          color: colors.title,
          marginBottom: 6,
        }}
      >
        {title}
      </Text>
      {/*Display list of Members*/}
      <MemberList members={members} />
    </View>
  );
};

const MemberList = ({ members }) => {
  const displayedMembers = members.slice(0, 3);
  const remainingMembersLength = members.slice(3).length;
  return (
    <View style={{ flexDirection: "row" }}>
      {/*Render members*/}
      {displayedMembers.map((member, index) => (
        <Image key={index} source={member.pfp} style={styles.profilePicture} />
      ))}
      {/*Render # of remaining members if > 0 left*/}
      {remainingMembersLength > 0 ? (
        <View style={[styles.numContainer, styles.profilePicture]}>
          <Text style={{ fontFamily: "mon-sb", color: primary, fontSize: 11 }}>
            {remainingMembersLength}+
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const InviteButton = ({ joinCode, showModal }) => {
  const handleButtonPress = () => {
    showModal(joinCode);
  };

  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={handleButtonPress}
    >
      <Text
        style={{
          fontFamily: "mon-sb",
          color: "#FFFFFF",
          fontSize: 12,
          marginRight: 2,
        }}
      >
        INVITE
      </Text>
      <MaterialCommunityIcons
        name="bullhorn-outline"
        color="#FFFFFF"
        size={18}
      />
    </TouchableOpacity>
  );
};

// are you css? Because you make everything look better
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
  container: {
    height: 111,
    width: 360,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: primary,
    borderRadius: 30,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  profilePicture: {
    borderRadius: 50,
    height: 27,
    width: 27,
    marginRight: 2,
  },
  numContainer: {
    backgroundColor: greyIcon,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    height: 41,
    width: 105,
    borderRadius: 20,
    backgroundColor: active,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  modalContainer: {
    height: 300,
    width: 250,
    backgroundColor: primary,
    alignSelf: "center",
    padding: 20,
    marginLeft: 40,
    borderRadius: 5,
  },
  modalBackDrop: {
    flex: 1,
  },
});
