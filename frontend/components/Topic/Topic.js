import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, ScrollView, Modal, TouchableOpacity, Button} from "react-native";
import { Text, Appbar, Divider, Chip, Icon, Menu, IconButton, Dialog, Portal} from "react-native-paper"
import { SelectList } from 'react-native-dropdown-select-list'
import { LinearGradient } from "expo-linear-gradient";
import * as SplashScreen from "expo-splash-screen";


// -------- FAKE DATA - TO BE REPLACED WITH API CALLS ----------
const fakeTags = [ // sorry the colors r ugly
  {name: "waves", color: '#5F2EB3'},
  {name: "fluid dynamics", color: '#519dFF'}, 
  {name: "electromagnetism", color: '#0096F3'}, 
  {name: "kinematics", color: '#009F89'},
  {name: "Energy", color: '#A84A5B'}];
const fakeStudyMaterial = [
  {title: "Wave Interference", type: "Notes", lastOpened: new Date()},
  {title: "Simple Harmonic Motion", type: "Flashcards", lastOpened: new Date()},
  {title: "Standing Waves", type: "Quiz", lastOpened: new Date()},
  {title: "1", type: "Notes", lastOpened: new Date()},
  {title: "2", type: "Flashcards", lastOpened: new Date()},
  {title: "3", type: "Notes", lastOpened: new Date()},
  {title: "4", type: "Quiz", lastOpened: new Date()}
];
const fakeMostUsedTag = { name: "Physics", color: "#5F2EB3" };
//--------------------------------------------------------


export default function Topic({ route, navigation }) {
  const [topic, setTopic] = useState({topicId: "", title: "", description: ""});
  const [studyMaterial, setStudyMaterial] = useState([]);
  const [tags, setTags] = useState([]);
  const [mostUsedTag, setMostUsedTags] = useState({name: "", color: "#FFFFFFFF"});
  const [isEditing, setIsEditing] = useState(false);

   useEffect(() => {
    async function load() {
      await SplashScreen.preventAutoHideAsync();
    }
    load();

    // TODO: api call to populate topic, tags and studymaterial
    setStudyMaterial(fakeStudyMaterial);
    setMostUsedTags(fakeMostUsedTag);
    console.log("Fetching data for topic with id: " + route.params.id);

    async function fetchData() {
      try {
        const topicResponse = await fetch("/topic/" + route.params.id + "/general-info");
        const topic = await topicResponse.json();
        setTopic(topic.topic);

        const tagsResponse = await fetch("/topic/" + route.params.id + "/tags");
        const tags = await tagsResponse.json();
        setTags(tags.tags);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
   }, []);

   if (!topic.id || studyMaterial.length === 0 || tags.length === 0) {
    // prevent page from rendering before fonts are loaded
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

   function handleSort() {
    // TODO
    console.log("called handleSort");
   }

   function handleFilter(selected) {
    // TODO
    console.log("called handleFilter: " + selected);
   }

   function handleDelete(studyMaterial) {
    // TODO
    console.log("deleting " + studyMaterial.title);
   }

   function toggleEdit() {
    setIsEditing(!isEditing);
   }

  return (
    <View>
      <Header topic={topic} color={mostUsedTag.color} navigation={navigation} />
      <Divider />
      <ScrollView style={{backgroundColor: '#F8FAFF'}} stickyHeaderIndices={[1]}>
        <Info topic={topic} tags={tags} mostUsedTag={mostUsedTag} />
        <SortAndEdit handleSort={handleSort} handleFilter={handleFilter} toggleEdit={toggleEdit}/>
        <StudyMaterial studyMaterial={studyMaterial} topicId={topic.id} mostUsedTag={mostUsedTag} handleDelete={handleDelete} isEditing={isEditing} />
      </ScrollView>
    </View>
  );
}

function Header({ topic, color, navigation }) {
  return(
    <View>
      <Appbar.Header style={{backgroundColor: color}}>
        <Appbar.BackAction color="#FFFFFF" onPress={() => navigation.goBack()} />
        <Appbar.Content title={topic.title} color="#FFFFFF" titleStyle={{fontWeight: '600', fontSize: 20, fontFamily: 'mon-sb'}}/>
        <Appbar.Action icon="cog-outline" color="#FFFFFF" onPress={() => navigation.navigate("Settings")}></Appbar.Action>
      </Appbar.Header>
      <Divider style={{height: 0.7, backgroundColor: '#444444'}}/>
    </View>
  );
}

function Info({ topic, tags, mostUsedTag }) {
  return (
    <LinearGradient
    colors={[mostUsedTag.color, '#2B005A']} // TODO: HARDCODED VALUE
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
    style={{borderBottomRightRadius: 20, borderBottomLeftRadius: 20}}
  >
      <View style={{padding: 15, borderBottomEndRadius: 20, borderBottomLeftRadius: 20}}>
        <Text style={{color: 'white', fontFamily: 'mon-sb'}} variant="titleSmall">Description</Text>
        <Text style={{padding:10, marginBottom:15, color: 'white', fontFamily: 'mon-m'}} variant="bodySmall">{topic.description}</Text>
        <Tags tags={tags} mostUsedTag={mostUsedTag}/>
      </View>
  </LinearGradient>

  )
}

function Tags({ tags, mostUsedTag }) {
  let sortedTags = [mostUsedTag];
  for (const tag of tags) {
    if (tag.name !== mostUsedTag.name) {
      sortedTags.push(tag);
    }
  }

  const renderTag = (tag) => {
      return (
        <View style={{marginBottom: 10}}>
          <Chip
            key={tag.name}
            style={{
              backgroundColor: tag.name === mostUsedTag.name? 'transparent' : tag.color,
              borderColor: tag.name === mostUsedTag.name? 'white' : tag.color,
              borderWidth: 2,
              marginRight: 8,
            }}
            textStyle={{color: "#FFFFFF", fontFamily: 'mon-m'}}
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
        data={sortedTags}
        keyExtractor={(tag) => tag.name}
        renderItem={({ item }) => renderTag(item)}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

function SortAndEdit({ handleSort, handleFilter, toggleEdit }) {
  const [selected, setSelected] = useState("None");

  const dropdownData = [
    {key: 'Misc', value: 'Misc (3)'},
    {key: 'Notes', value: 'Notes'},
    {key: 'Quizzes', value: 'Quizzes'},
    {key: 'Flashcard', value: 'Flashcard'},
  ];

  return (
    <View style={{flexDirection: 'row', padding: 5, justifyContent: "flex-end", zIndex: 2, position: "sticky", top: 0, backgroundColor: '#F8FAFF'}}>
      <View style={{position: 'absolute', top: 10, left: 13 }}>
        <SelectList
          setSelected={setSelected}
          onSelect={() => handleFilter(selected)}
          data={dropdownData}
          placeholder="Misc (3)"
          search={false}
          boxStyles={{borderWidth: 0, paddingRight: 50, backgroundColor: "#E4E9F5", borderRadius: 15}}
          dropdownStyles={{borderWidth: 0, backgroundColor: "#E4E9F5"}}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <IconButton style={{borderRadius: 5, marginRight: 8}} containerColor="#E4E9F5" mode="contained" icon="sort" color="000" size={25} onPress={handleSort} />
        <IconButton style={{borderRadius: 5, marginRight: 15}} containerColor="#E4E9F5" mode="contained" icon="pencil" color="000" size={25} onPress={toggleEdit} />
      </View>
    </View>
    
  );
}

function StudyMaterial({ studyMaterial, topicId, mostUsedTag, handleDelete, isEditing }) {
  const studyMaterialComponents = studyMaterial.map((item) => {
    return <StudyMaterialCard studyMaterial={item} topicId={topicId} mostUsedTag={mostUsedTag} handleDelete={handleDelete} isEditing={isEditing} key={item.title} />
  });

    return (
      <View style={{flexDirection: 'row', flexWrap: "wrap", marginBottom: 180, padding: 8}}> 
        {studyMaterialComponents}
      </View>
    )
}

function StudyMaterialCard({ studyMaterial, topicId, mostUsedTag, handleDelete, isEditing }) {
  const [numItems, setNumItems] = useState(0);

  const iconMap = {
    "Notes": "note-text-outline",
    "Quiz": "comment-question-outline",
    "Flashcards": "card-multiple-outline"
  }

  const studyMaterialTitle = studyMaterial.title.length >= 17? studyMaterial.title.substring(0, 14) + "...": studyMaterial.title;

  useEffect(() => {
    // TODO: api call to set numItems
    setNumItems(10);
  }, []);

  function onPress() {
    // TODO: navigate to this studynote
    console.log(`navigating to ${studyMaterial.title} of ${topicId}`);
  }

  return (
    <View style={{width: "45%", padding:15, paddingTop: 0, margin: 8, backgroundColor: '#FFFFFF', borderRadius: 20, shadowColor: 'black', shadowOpacity: 0.1, shadowRadius: 5}}>
      <TouchableOpacity onPress={onPress} disabled={isEditing}>
        <CardHeader studyMaterial={studyMaterial} mostUsedTag={mostUsedTag} handleDelete={handleDelete} isEditing={isEditing}/>
        <View style={{alignItems: 'center'}}>
          <Icon source={iconMap[studyMaterial.type]} size={60}/>
        </View>
        <View style={{marginTop: 15, marginBottom: 5}}>
          <Text style={{fontSize: 14, fontFamily: 'mon-m'}}>{studyMaterialTitle}</Text>
          <View style={{marginTop: 6}}>
            <Text style={{fontSize: 10, color: '#414141', fontFamily: 'mon-l'}}>{studyMaterial.lastOpened.toDateString()}</Text>
          </View>
        </View>
        <CardFooter studyNoteType={studyMaterial.type} numItems={numItems} mostUsedTag={mostUsedTag}/>
      </TouchableOpacity>
    </View>
  );
}

function CardHeader({ studyMaterial, mostUsedTag, handleDelete, isEditing }) {
  const [isVisible, setIsVisible] = useState(false);
  
  const showDialog = () => setIsVisible(true);
  const hideDialog = () => setIsVisible(false);

  return (
    <View style={{display:"flex", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
      <View style={{marginTop: 13, marginBottom: 13}}>
        <View style={{backgroundColor: mostUsedTag.color, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 10}}>
          <Text style={{color: '#FFFFFF', fontSize: 10, fontFamily: 'mon-m'}}>{studyMaterial.type.toUpperCase()}</Text>
        </View>
      </View>
      {isEditing && <IconButton style={{marginRight: -8}} icon="close" color="000" size={18} onPress={showDialog}/>}
      <Portal>
        <Dialog visible={isVisible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text style={{fontFamily: "mon-m"}} variant="bodyMedium">Are you sure you want to delete "{studyMaterial.title}" ?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <TouchableOpacity onPress={hideDialog} style={{marginRight: 30}}>
              <Text>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {handleDelete(studyMaterial); hideDialog()}}>
              <Text>Yes</Text>
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}

function CardFooter({ studyNoteType, numItems, mostUsedTag }) {
  let footerText = {
    "Notes": "Pages",
    "Quiz": "Questions",
    "Flashcards": "Cards"
  }
    
  return (
    <View style={{flexDirection: "row", marginTop: 5, alignItems: "center"}}>
      <Text style={{height: 28, width: 28, padding: 5, borderColor: mostUsedTag.color, borderWidth: 1.5, borderRadius: 14, marginRight: 10, textAlign: "center", lineHeight: 15.5, fontFamily: 'mon-m'}}>{numItems}</Text>
      <Text style={{fontFamily: 'mon-m', fontSize:13}}>{footerText[studyNoteType]}</Text>
    </View>
  )
}