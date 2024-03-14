import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Searchbar, Text } from "react-native-paper";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Tag from "../../components/Misc/Tag";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/Colors";

const { active, inactive, background, primary, shadow, line, grey } = colors;

// Achievement button
function AchievementButton({ size }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Achievements");
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <MaterialCommunityIcons name="medal-outline" color={active} size={28} />
    </TouchableOpacity>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: background, flex: 1 }}>
        {/*START: THE HEADER*/}
        <View style={[styles.header, styles.shadow]}>
          {/* START: My Topics + AchievementButton*/}
          <View style={styles.title}>
            <MaterialCommunityIcons
              name="medal-outline"
              color={primary}
              size={24}
            />
            <Text style={{ fontFamily: "mon-sb", fontSize: 16 }}>
              My Topics
            </Text>
            <AchievementButton />
          </View>
          {/* END: My Topics + AchievementButton*/}
          <View style={styles.line}></View>
          {/*START: TAGSLIST*/}
          <ScrollView
            horizontal
            contentContainerStyle={styles.tagsContainer}
            showsHorizontalScrollIndicator={false}
          >
            <Tag title="Physics" />
            <Tag title="Chemistry" />
            <Tag title="Math" />
            <Tag title="Biology" />
            <Tag title="Showering" />
            <Tag title="Waves" />
            <Tag title="Shark" />
          </ScrollView>
          {/*END: TAGSLIST*/}
        </View>
        {/*END: THE HEADER*/}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.paperBar}
              placeholderTextColor={"#9FA3BE"}
              inputStyle={{
                fontSize: 16,
                fontFamily: "mon",
                alignSelf: "center",
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary,
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
    justifyContent: "center",
  },
  searchBar: {
    width: 296,
    height: 49,
    backgroundColor: grey,
    justifyContent: "center",
    borderRadius: 5,
  },
  paperBar: {
    backgroundColor: "transparent",
    width: "95%",
    height: 50,
    alignSelf: "center",
    fontColor: "#9FA3BE",
    fontSize: 16,
  },
});
