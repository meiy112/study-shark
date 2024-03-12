import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text, Appbar, Divider, Chip, Button } from "react-native-paper"
import { SelectList } from 'react-native-dropdown-select-list'

export default function Topic({id}) {
  const [topic, setTopic] = useState({
    title: "Title", // TODO: change to empty string
    description: "this is a decription", // TODO: change to empty string
    lastOpened: new Date(),
   });
   const [studyMaterial, setStudyMaterial] = useState([]);
   const [tags, setTags] = useState([{name: "waves"}, {name: "fluid dynamics"}, {name: "electromagnetism"}, {name: "kinematics"}]);

   useEffect(() => {
      // TODO: api call to populate topic, tags and studymaterial
   }, []);

   function onSort() {
    // TODO
    console.log("called onSort");
   }

   function onFilter() {
    // TODO
    console.log("called on filter");
   }

   function onEdit() {
    // TODO
    console.log("called on edit");
   }

  return (
    <View>
      <Header topic={topic} tags={tags} />
      <Content studyMaterial={studyMaterial} onSort={onSort} onFilter={onFilter} onEdit={onEdit}/>
    </View>
  );
}

function Header({ topic, tags }) {
  function handleBackButtonPress() {
    // TODO: navigate to Home page
  }

  return(
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleBackButtonPress} />
        <Appbar.Content title={topic.title} />
        <Appbar.Action icon="cog-outline"></Appbar.Action>
      </Appbar.Header>
      <Divider />
      <Text variant="titleSmall">Description</Text>
      <Text variant="bodySmall">{topic.description}</Text>
      <Tags tags={tags} />
    </View>
  );
}

// tags is {name: "name", colour: "colour"}
function Tags({ tags }) {
  const renderTag = (tag) => {
      return (
        <Chip
          key={tag.name}
          style={{
            backgroundColor: '#2196F3', // TODO: Change color based on item.colour
            margin: 4,
          }}
        >
          {tag.name}
        </Chip>
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

function Content({ studyMaterial, onSort, onFilter, onEdit }) {
  return (
    <View>
      <SortAndEdit onSort={onSort} onFilter={onFilter} onEdit={onEdit} />
      <StudyNotes studyMaterial={studyMaterial} />
    </View>
  )
  
}

function SortAndEdit({ onSort, onFilter, onEdit }) {
  const [selected, setSelected] = useState('');

  const dropdownData = [
    {key: '1', value: 'Notes'},
    {key: '2', value: 'Quizzes'},
    {key: '3', value: 'Flashcard'},
  ];

  return (
    <View>
      <SelectList
        setSelected={() => {}}
        onSelect={(val) => onFilter(val)}
        data={dropdownData}
        search={false}
      />
      <Button icon="sort" mode="contained" onPress={onSort} />
      <Button icon="pencil" mode="contained" onPress={onEdit} />
    </View>
    
  );
}

function StudyNotes({ studyMaterial }) {

  


}