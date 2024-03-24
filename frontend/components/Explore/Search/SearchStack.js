import React, { useState } from "react";
import { Modal, View } from "react-native";
import SearchScreen from "./SearchScreen";

const SearchStack = ({ isVisible, onClose, searchInput }) => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const closeModal = () => {
    setSearchResults([]); // Reset search results
    onClose();
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View>
        <SearchScreen
          isVisible={true} // Always visible
          onClose={closeModal}
          searchInput={searchInput}
          onSearch={handleSearchResults}
        />
        {/* If search results are present, show NewSearchModal */}
        {searchResults.length > 0 && (
          <SearchStack
            isVisible={true} // Always visible
            onClose={closeModal}
            searchInput={searchInput}
          />
        )}
      </View>
    </Modal>
  );
};

export default SearchStack;
