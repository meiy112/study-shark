import suggestions from "./data/suggestions";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { View, Text, FlatList, StyleSheet } from "react-native";
import colors from "../../../constants/Colors";

const { lightIcon } = colors;

// the search results suggestions
const SuggestionContainer = ({ searchText }) => {
  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <FlatList
      contentContainerStyle={{ marginHorizontal: 26, marginVertical: 15 }}
      data={filteredSuggestions}
      renderItem={({ item }) => (
        <SuggestionString suggestion={item} searchText={searchText} />
      )}
      ListHeaderComponent={() => (
        <Text
          style={{
            opacity: 0.6,
            fontFamily: "mon-m",
            fontSize: 12,
            marginBottom: 7,
          }}
        >
          Suggested Searches
        </Text>
      )}
      ListFooterComponent={() => <View style={{ height: 70, width: "100%" }} />}
    />
  );
};

// suggestions in Suggested Searches
const SuggestionString = ({ suggestion, searchText }) => {
  // split text for the highlight
  const index = suggestion.toLowerCase().indexOf(searchText.toLowerCase());
  const beforeText = suggestion.slice(0, index);
  const afterText = suggestion.slice(index + searchText.length);
  const inputtedText = suggestion.slice(index, index + searchText.length);

  return (
    <View style={{ flexDirection: "row", marginTop: 15 }}>
      <MaterialCommunityIcons name="magnify" color={lightIcon} size={14} />
      <Text
        style={[{ fontFamily: "mon", marginLeft: 7 }, styles.suggestionFont]}
      >
        {beforeText}
      </Text>
      <Text style={[{ fontFamily: "mon-sb" }, styles.suggestionFont]}>
        {inputtedText}
      </Text>
      <Text style={[{ fontFamily: "mon" }, styles.suggestionFont]}>
        {afterText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  suggestionFont: {
    fontSize: 14,
    color: { lightIcon },
  },
});

export default SuggestionContainer;