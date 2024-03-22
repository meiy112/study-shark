import { View, Text, FlatList, StyleSheet } from "react-native";
import colors from "../../../constants/Colors";
import results from "./data/results";
import TopicExplore from "../ListingComponents/TopicExplore";
import MaterialExplore from "../ListingComponents/MaterialExplore";

const { active, inactive, background, primary, shadow, line, title } = colors;

// the search results suggestions
const ResultsContainer = ({ searchInput }) => {
  return (
    <View style={{ marginHorizontal: 6, flex: 1 }}>
      <FlatList
        data={results}
        numColumns={2}
        renderItem={({ item }) => (
          <TopicExplore
            title={item.title}
            date={item.date}
            numNotes={item.numNotes}
            numCards={item.numCards}
            numQuizzes={item.numQuizzes}
            color={item.color}
          />
        )}
        ListHeaderComponent={() => (
          <View
            style={{ marginHorizontal: 20, marginTop: 23, marginBottom: 14 }}
          >
            {/*----------------------- Heading Text with search info -----------------------*/}
            <Text
              style={{
                fontSize: 16,
                fontFamily: "mon-sb",
                color: title,
                marginBottom: 7,
              }}
            >
              Results for "{searchInput}"
            </Text>
            <Text style={{ fontSize: 12, fontFamily: "mon-m", opacity: 0.6 }}>
              Showing 1000 results
            </Text>
            {/*----------------------------------------------------------------------------*/}
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{ width: "100%", height: 100 }} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  suggestionFont: {
    fontSize: 14,
    color: "#333333",
  },
});

export default ResultsContainer;
