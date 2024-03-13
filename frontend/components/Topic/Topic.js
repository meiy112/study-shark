import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, ScrollView} from "react-native";
import { Text, Appbar, Divider, Chip, Icon, Surface, IconButton } from "react-native-paper"
import { SelectList } from 'react-native-dropdown-select-list'

// -------- FAKE DATA - TO BE REPLACED WITH API CALLS ----------
let fakeTopic = {
  title: "Phys901", 
  description: "With hearts racing like runaway loops, their hands brushed as Backend" 
  + " passed the requested data from the database to Frontend. "
  + " In that instant, amidst the binary buzz, they shared a shy but sweet kiss."
}
let fakeTags = [ // sorry the colors r ugly
  {name: "waves", color: '#3f53'},
  {name: "fluid dynamics", color: '#519dFF'}, 
  {name: "electromagnetism", color: '#96F3'}, 
  {name: "kinematics", color: '#9F89'}];
let fakeStudyMaterial = [
  {title: "Wave Interference", type: "Notes", lastOpened: new Date()},
  {title: "Simple Harmonic Motion", type: "Cards", lastOpened: new Date()},
  {title: "1", type: "Quiz", lastOpened: new Date()},
  {title: "2", type: "Quiz", lastOpened: new Date()},
  {title: "3", type: "Card", lastOpened: new Date()},
  {title: "4", type: "Notes", lastOpened: new Date()},
  {title: "5", type: "Quiz", lastOpened: new Date()}
];


export default function Topic({id}) {
  const [topic, setTopic] = useState({title: "", description: ""});
  const [studyMaterial, setStudyMaterial] = useState([]);
  const [tags, setTags] = useState([]);

   useEffect(() => {
      // TODO: api call to populate topic, tags and studymaterial
      setTopic(fakeTopic);
      setStudyMaterial(fakeStudyMaterial);
      setTags(fakeTags);
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
      <Header topic={topic} />
      <Divider />
      <ScrollView>
        <Info topic={topic} tags={tags} />
        <Content studyMaterial={studyMaterial} topicId={topic.id} onSort={onSort} onFilter={onFilter} onEdit={onEdit}/>
      </ScrollView>
    </View>
  );
}

function Header({ topic }) {
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
    </View>
  );
}

function Info({ topic, tags }) {
  return (
    <View style={{padding: 15}}>
      <Text variant="titleSmall">Description</Text>
      <Text style={{padding:8, marginBottom:10}} variant="bodySmall">{topic.description}</Text>
      <Tags tags={tags} />
    </View>
  )
}

function Tags({ tags }) {
  const renderTag = (tag) => {
      return (
        <Chip
          key={tag.name}
          style={{
            backgroundColor: tag.color, // TODO: Change color based on item.colour
            marginRight: 8,
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

function Content({ studyMaterial, topicId, onSort, onFilter, onEdit }) {
  return (
    <View>
      <SortAndEdit onSort={onSort} onFilter={onFilter} onEdit={onEdit} />
      <StudyMaterial studyMaterial={studyMaterial} topicId={topicId} />
    </View>
  )
  
}

function SortAndEdit({ onSort, onFilter, onEdit }) {
  const dropdownData = [
    {key: '0', value: 'None'},
    {key: '1', value: 'Notes'},
    {key: '2', value: 'Quizzes'},
    {key: '3', value: 'Flashcard'},
  ];

  return (
    <View style={{flexDirection: 'row', margin: 10}}>
      <SelectList
        setSelected={() => {}}
        onSelect={(val) => onFilter(val)}
        data={dropdownData}
        search={false}
      />
      <IconButton containerColor="#E4E9F5" mode="contained" icon="sort" color="000" size={20} onPress={onSort} />
      <IconButton containerColor="#E4E9F5" mode="contained" icon="pencil" color="000" size={20} onPress={onEdit} />
    </View>
    
  );
}

function StudyMaterial({ studyMaterial, topicId }) {
  const studyMaterialComponents = studyMaterial.map((item) => {
    if (item.type === "Notes") {
      return <NoteCard notes={item} topicId={topicId} key = {item.title}/>
    } else if (item.type === "Quiz") {
      return <QuizCard quiz={item} topicId={topicId} key = {item.title}/>
    } else {
      return <FlashCardSetCard flashcards={item} topicId={topicId} key = {item.title}/>
    }
  });

    return (
      <View style={{flexDirection: 'row', flexWrap: "wrap", margin: 15, marginBottom: 180, padding: 8}}> 
        {studyMaterialComponents}
      </View>
    )
}

function NoteCard({ notes, topicId }) {
  const [numItems, setNumItems] = useState(0);

  useEffect(() => {
    // TODO: api call to set numItems
    setNumItems(10);
  }, []);

  return (
    <View style={{width: "50%", padding:10, borderColor: 'black'}} elevation={4}>
      <CardHeader studyNoteType={"NOTES"}/>
      <View style={{alignItems: 'center'}}>
        <Icon source="note-text-outline" size={60}/>
      </View>
      <View>
        <Text>{notes.title}</Text>
        <Text>{notes.lastOpened.toDateString()}</Text>
      </View>
      <CardFooter studyNoteType="notes" numItems={numItems} />
    </View>
  );
}

function QuizCard({ quiz, topicId }) {
  const [numItems, setNumItems] = useState(0);

  useEffect(() => {
    // TODO: api call to set numItems
    setNumItems(19);
  }, []);

  return (
    <View style={{width: "50%", padding:10}}>
      <CardHeader studyNoteType={"QUIZ"}/>
      <View style={{alignItems: 'center'}}>
        <Icon source="comment-question-outline" size={60}/>
      </View>
      <View>
        <Text>{quiz.title}</Text>
        <Text>{quiz.lastOpened.toDateString()}</Text>
      </View>
      <CardFooter studyNoteType="quiz" numItems={numItems} />
    </View>
  );
}

function FlashCardSetCard({ flashcards, topicId }) {
  const [numItems, setNumItems] = useState(0);

  useEffect(() => {
    // TODO: api call to set numItems
    setNumItems(4);
  }, []);

  return (
    <View style={{width: "50%", padding:10}}>
      <CardHeader studyNoteType={"FLASHCARDS"}/>
      <View style={{alignItems: 'center'}}>
        <Icon source="card-multiple-outline" size={60}/>
      </View>
      <View>
        <Text>{flashcards.title}</Text>
        <Text>{flashcards.lastOpened.toDateString()}</Text>
      </View>
      <CardFooter studyNoteType="flashcards" numItems={numItems} />
    </View>
  );
}

function CardHeader({ studyNoteType }) {
  return (
    <View style={{flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
      <Text style={{paddingRight: 20}}>{studyNoteType}</Text>
      <IconButton icon="dots-horizontal" color="000" size={18} />
    </View>
  )
}

function CardFooter({ studyNoteType, numItems }) {
  let footerText = {
    "notes": "Pages",
    "quiz": "Questions",
    "flashcards": "Cards"
  }
    
  return (
    <View style={{flexDirection: "row", marginTop: 5}}>
      <Text >{numItems}</Text>
      <Text>{footerText[studyNoteType]}</Text>
    </View>
  )
}