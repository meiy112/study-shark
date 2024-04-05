import { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import AuthContext from "../../context/AuthContext";
import UserUnauthenticatedPage from "../Login/UsedUnauthenticatedPage";
import colors from "../../constants/Colors.js";
import GroupListing from "./components/GroupListing.js";
import memberData from "./data/groupData.js";
import InviteModal from "./components/InviteModal.js";
import CreateModal from "./components/CreateModal.js";
import { groupApi } from "../../api/GroupApi.js";
import { userApi } from "../../api/UserApi.js";

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

export default function Groups({ navigation }) {
  const { token } = useContext(AuthContext); // jwt token

  const [isJoinVisible, setIsJoinVisible] = useState(false);
  const [joinCode, setJoinCode] = useState("hi");
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [groups, setGroups] = useState(false);

  const showJoinModal = (currentCode) => {
    setIsJoinVisible(true);
    setJoinCode(currentCode);
  };
  const hideJoinModal = () => {
    setIsJoinVisible(false);
  };

  const showCreateModal = () => {
    setIsCreateVisible(true);
  };

  const hideCreateModal = () => {
    setIsCreateVisible(false);
  };

  // LOAD DATA------------------------------------
  // fetch groups
  useEffect(() => {
    async function fetchGroups() {
      try {
        const user = await userApi.getUser(token);
        const data = await groupApi.getGroups(token);
        console.log("fetched groups! tee hee uwu");
        setGroups(data);
        console.log(data);
      } catch (e) {
        console.log("Groups page: " + e.message);
      }
    }
    fetchGroups();
  }, [token, navigation]);
  // END LOAD DATA ----------------------------------------------

  return token ? ( // conditionally renders pages based on if user is logged in
    <SafeAreaView style={{ flex: 1, backgroundColor: primary }}>
      <View style={{ backgroundColor: background, flex: 1 }}>
        <Header showCreateModal={showCreateModal} />
        <ListingsContainer
          groups={groups}
          showModal={showJoinModal}
          navigation={navigation}
        />
        <InviteModal
          isVisible={isJoinVisible}
          hideModal={hideJoinModal}
          joinCode={joinCode}
        />
        <CreateModal isVisible={isCreateVisible} hideModal={hideCreateModal} />
      </View>
    </SafeAreaView>
  ) : (
    <UserUnauthenticatedPage action={"join Groups"} />
  );
}

// Header
const Header = ({ showCreateModal }) => {
  return (
    <View>
      <View style={[styles.headerContainer, styles.shadow]}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="plus" size={24} opacity={0} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Groups</Text>
        <TouchableOpacity onPress={showCreateModal}>
          <MaterialCommunityIcons name="plus" size={24} color={active} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Group Listings
const ListingsContainer = ({ showModal, navigation, groups }) => {
  return (
    <FlatList
      data={groups}
      renderItem={({ item, index }) => (
        <GroupListing
          group={item}
          showModal={showModal}
          navigation={navigation}
          memberData={memberData[index % 2]}
        />
      )}
      contentContainerStyle={styles.flatListContainer}
      ListHeaderComponent={() => (
        <View style={{ marginTop: 20, marginBottom: 10, width: 340 }}>
          <Text style={{ fontFamily: "mon-sb", fontSize: 12, opacity: 0.8 }}>
            TOTAL: {groups.length}
          </Text>
        </View>
      )}
    />
  );
};

// are you css? Because you give me my style
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
    height: 78,
    width: "100%",
    backgroundColor: primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    zIndex: 2,
    paddingHorizontal: 32,
  },
  headerTitle: {
    fontFamily: "mon-sb",
    fontSize: 16,
    color: title,
  },
  buttonContainer: {
    height: 100,
    width: 140,
    backgroundColor: primary,
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 10,
    alignSelf: "flex-end",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    position: "absolute",
    top: 20,
    right: 10,
  },
  buttonText: {
    color: title,
    fontFamily: "mon",
    fontSize: 15,
  },
  flatListContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    padding: 5,
  },
});
