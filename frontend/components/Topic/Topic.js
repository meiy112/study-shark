import { useState, useEffect, createContext, useContext } from "react";

import { View, FlatList, ScrollView, StyleSheet, Modal } from "react-native";
import { Text, Appbar, Divider, Chip, IconButton } from "react-native-paper"
import { SelectList } from 'react-native-dropdown-select-list'
import { LinearGradient } from "expo-linear-gradient";
import StudyMaterialCard from "./StudyMatCard";
import Settings from "./TopicSettings";
import colors from "../../constants/Colors";
import PageContext from "../../context/PageContext";
import AuthContext from "../../context/AuthContext";
import ColorContext from "../../context/TopicColorContext";
import NotifyContext from "../../context/NotifyContext";
import { topicApi } from "../../api/TopicApi";

const { active, inactive, background, primary, shadow, line, grey } = colors;
const NavigationContext = createContext();




export default function Topic({ route, navigation }) {
  const [topic, setTopic] = useState({topicId: "", title: "", description: "", isOwner: false});
  const [studyMaterial, setStudyMaterial] = useState([]);
  const [tags, setTags] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [sortBy, setSortBy] = useState("lastOpened"); // for sorting studymaterial, either lastOpened or alphabetical
  const [filter, setFilter] = useState("None"); // for filtering studymaterial by type
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  const { token } = useContext(AuthContext);
  const { lastUpdateTime, triggerRerender } = useContext(NotifyContext); // used to force other pages to refresh on delete

  // LOAD DATA------------------------------------
  // fetch topic data
   useEffect(() => {
    async function fetchTopic() {
      try {
        const data = await topicApi.getGeneralInfo(token, route.params.id);
        setTopic(data);
      } catch (e) {
        console.log("Topic: " + e.message);
      }
    }
    fetchTopic();
   }, [token, lastUpdateTime]);

   // fetch tags data
   useEffect(() => {
    async function fetchTags() {
      try {
        const data = await topicApi.getTags(token, route.params.id);
        setTags(data);
      } catch (e) {
        console.log("Topic: " + e.message);
      }
    }
    fetchTags();
   }, [token, lastUpdateTime]);

   // fetch studymaterial data
   useEffect(() => {
    async function fetchStudyMat() {
      try {
        const data = await topicApi.getFilteredSortedStudymaterial(token, route.params.id, filter, sortBy);
        setStudyMaterial(data);
      } catch (e) {
        console.log("Topic: " + e.message);
      }
    }
    fetchStudyMat();
   }, [token, filter, sortBy, lastUpdateTime]);

    // END LOAD DATA ----------------------------------------------

    // HANDLERS ------------------------------
   function handleSort() {
    if (sortBy === "lastOpened") {
      setSortBy("alphabetical");
    } else {
      setSortBy("lastOpened");
    }
   }

   function handleFilter(selected) {
    if (selected === "Quizzes") {
      setFilter("Quiz");
    } else {
      setFilter(selected);
    }
   }

   function handleDelete(studyMaterial) {
    console.log("deleting " + studyMaterial.title);

    async function deleteStudyMaterial() {
      try {
        await topicApi.deleteStudyMaterial(token, route.params.id, studyMaterial.title);
        setStudyMaterial(studyMaterials => studyMaterials.filter(item => item.title !== studyMaterial.title));
        console.log("deleted " + studyMaterial.title);
        triggerRerender();
      } catch (e) {
        console.log("Topic: " + e.message);
      }
    }
    deleteStudyMaterial();
   }

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

   // END HANDLERS -----------------------

  return (
    <>
    <ColorContext.Provider value={{color: route.params.color}}>
      <NavigationContext.Provider value = {{route: route, navigation: navigation}}>
        <View>
          {/* Header */}
          <Header topic={topic} setTopic={setTopic} setSettingsModalVisible={setSettingsModalVisible} />
          <Divider />

          <ScrollView style={{backgroundColor: background}} stickyHeaderIndices={[1]}>
            {/* Description + tags */}
            <Info topic={topic} tags={tags} />

            {/* Sort, search, delete */}
            <SortAndEdit handleSort={handleSort} handleFilter={handleFilter} toggleEdit={toggleEdit} isOwner={topic.isOwner}/>

            {/* Body */}
            <StudyMaterialList studyMaterial={studyMaterial} topicId={topic.id} handleDelete={handleDelete} isEditing={isEditing} />
          </ScrollView>
        </View>
      </NavigationContext.Provider>
    </ColorContext.Provider>

    {/* Settings Modal */}
    <Modal
    animationType="slide"
    visible={settingsModalVisible}
    onRequestClose={() => {
      setSettingsModalVisible(!modalVisible);
    }}>
      <Settings 
        closeSettings={() => setSettingsModalVisible(false)} 
        id={topic.id} navigation={navigation} 
        lastPage={route.params.prevScreen}
        isOwner={topic.isOwner}
      />
    </Modal>
    </>
  );
}

// HEADER: everything above description
function Header({ topic, setSettingsModalVisible }) {
  const { setPage } = useContext(PageContext);
  const { navigation, route } = useContext(NavigationContext);
  const color = route.params.color; // topic colours

  function handleBackButtonPress() {
    navigation.goBack(); 
    setPage(route.params.prevScreen)
  }

  function handleSettinsPress() {
    setSettingsModalVisible(true);
  }

  return (
    <View>
      <Appbar.Header style={{backgroundColor: color.primary}}>
        <Appbar.BackAction color="white" onPress={handleBackButtonPress} />
        <Appbar.Content title={topic.title} color="white" titleStyle={styles.topicTitle}/>
        <Appbar.Action icon="cog-outline" color="white" onPress={handleSettinsPress}></Appbar.Action>
      </Appbar.Header>
      <Divider style={{ height: 0.7, backgroundColor: "#444444" }} />
    </View>
  );
}

// DESCRIPTION + TAGS
function Info({ topic, tags }) {
  const { color } = useContext(ColorContext);
  return (
    <LinearGradient
    colors={[color.primary, color.gradient]} 
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 0.7 }}
    style={styles.descriptionContainer}
  >
      <View style={{...styles.descriptionContainer, padding: 15 }}>
        {/* START: Description */}
        <Text style={styles.descriptionTitle} variant="titleSmall">Description</Text>
        <Text style={styles.descriptionText} variant="bodySmall">{topic.description}</Text>
        {/* END: Description */}
        {/* START: Tags */}
        <Tags tags={tags}/>
      </View>
    </LinearGradient>
  );
}

// TAGS
function Tags({ tags }) {
  const renderTag = (tag) => {
      return (
        <View style={{marginBottom: 10}}>
          <Chip
            style={{
              backgroundColor: tag.color,
              marginRight: 10,
            }}
            textStyle={{color: "white", fontFamily: 'mon-m'}}
          >
            {tag.name}
          </Chip>
        </View>
      );
    }

  return (
    <View>
      <FlatList
        horizontal
        data={tags}
        keyExtractor={(tag) => tag.name}
        renderItem={({ item }) => renderTag(item)}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

function SortAndEdit({ handleSort, handleFilter, toggleEdit, isOwner }) {
  const [selected, setSelected] = useState("None"); // dropdown list selection

  const dropdownData = [
    {key: 'None', value: 'All'},
    {key: 'Notes', value: 'Notes'},
    {key: 'Quizzes', value: 'Quizzes'},
    {key: 'Flashcards', value: 'Flashcards'},
  ];

  return (
    <View style={styles.sortAndEditContainer}>
      {/* START: Dropdown */}
      <View style={styles.selectList}>
        <SelectList
          setSelected={setSelected}
          onSelect={() => handleFilter(selected)}
          data={dropdownData}
          placeholder="Misc (3)"
          search={false}
          boxStyles={styles.selectListBox}
          dropdownStyles={styles.dropdownStyles}
        />
      </View>
      {/* END: Dropdown */}
      {/* START: sort + edit */}
      <View style={{flexDirection: 'row'}}>
        <IconButton 
          style={{borderRadius: 5, marginRight: isOwner? 8 : 15}} 
          containerColor={colors.grey} 
          mode="contained" 
          icon="sort" 
          color="000" 
          size={25} 
          onPress={handleSort} 
        />
        {isOwner && // hides edit button if not owner
        <IconButton 
          style={{borderRadius: 5, marginRight: 15}}
          containerColor={colors.grey} 
          mode="contained" 
          icon="pencil" 
          color="000" 
          size={25} 
          onPress={toggleEdit} 
        />
        }
      </View>
      {/* END: sort + edit */}
    </View>
  );
}

// STUDY MATERIAL CONTAINTER
function StudyMaterialList({ studyMaterial, topicId, handleDelete, isEditing }) {
  const studyMaterialComponents = studyMaterial.map((item) => {
    return (
      <StudyMaterialCard
        studyMaterial={item}
        topicId={topicId}
        handleDelete={handleDelete}
        isEditing={isEditing}
        key={item.title}
      />
    );
  });
    return (
      <View style={styles.studyMatContainer}> 
        {studyMaterialComponents}
      </View>
    )
}

// CSS
const styles = StyleSheet.create({
  topicTitle: {
    fontWeight: '600',
    fontSize: 20,
    fontFamily: 'mon-sb'
  },
  descriptionTitle: {
    color: 'white', 
    fontFamily: 'mon-sb',
  },
  descriptionContainer: {
    borderBottomRightRadius: 20, 
    borderBottomLeftRadius: 20,
  },
  descriptionText: {
    padding:10, 
    marginBottom:15, 
    color: 'white', 
    fontFamily: 'mon-m',
  },
  sortAndEditContainer: {
    flexDirection: 'row', 
    padding: 5, 
    justifyContent: "flex-end", 
    zIndex: 2, 
    position: "sticky", 
    top: 0, 
    backgroundColor: '#F8FAFF'
  },
  selectList : {
    position: 'absolute', 
    top: 10, 
    left: 13,
  },
  selectListBox: {
    borderWidth: 0, 
    paddingRight: 50, 
    backgroundColor: colors.grey, 
    borderRadius: 15,
  },
  dropdownStyles: {
    borderWidth: 0, 
    backgroundColor: colors.grey,
  },
  studyMatContainer: {
    flexDirection: 'row', 
    flexWrap: "wrap", 
    marginBottom: 200, 
    padding: 8,
  },
});
