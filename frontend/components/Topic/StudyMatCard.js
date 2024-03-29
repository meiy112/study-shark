import { useState, useContext } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Icon, IconButton, Dialog, Portal} from "react-native-paper"
import colors from "../../constants/Colors";
import ColorContext from "../../context/TopicColorContext";

// for the image icon
const imageMapping = {
  Notes: require("../../assets/images/mat_icons/notes.png"),
  Quiz: require("../../assets/images/mat_icons/flashcards.png"),
  Flashcards: require("../../assets/images/mat_icons/quiz.png"),
};


// STUDY MATERIAL CARD
export default function StudyMaterialCard({ studyMaterial, topicId, handleDelete, isEditing }) {
  // cut off title if its too long
  const studyMaterialTitle = studyMaterial.title.length >= 17? studyMaterial.title.substring(0, 14) + "...": studyMaterial.title;

  function onPress() {
    // TODO: navigate to this studynote
    console.log(`navigating to ${studyMaterial.title} of ${topicId}`);
  }

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={onPress} disabled={isEditing}>
        {/* START: CARD HEADER */}
        <CardHeader studyMaterial={studyMaterial} handleDelete={handleDelete} isEditing={isEditing}/>
        {/* END: CARD HEADER */}
        {/* START: ICON */}
        <View style={{alignItems: 'center'}}>
          <Icon source={imageMapping[studyMaterial.type]} size={60}/>
        </View>
        {/* END: ICON */}
        {/* START: TEXT */}
        <View style={{marginTop: 15, marginBottom: 5}}>
          <Text style={styles.studyMatTitle}>{studyMaterialTitle}</Text>
          <View style={{marginTop: 6}}>
            <Text style={styles.lastOpenedText}>{studyMaterial.lastOpened}</Text>
          </View>
        </View>
        {/* END: TEXT */}
        {/* START: FOOTER */}
        <CardFooter studyNoteType={studyMaterial.type} numItems={studyMaterial.numComponents} />
        {/* END: FOOTER */}
      </TouchableOpacity>
    </View>
  );
}

// STUDY MATERIAL CARD HEADER
function CardHeader({ studyMaterial, handleDelete, isEditing }) {
  const [isVisible, setIsVisible] = useState(false);
  
  const showDialog = () => setIsVisible(true);
  const hideDialog = () => setIsVisible(false);

  const { color } = useContext(ColorContext);

  return (
    <View style={styles.cardHeaderContainer}>
      {/* START: CARD HEADER */}
      <View style={{marginTop: 13, marginBottom: 13}}>
        <View style={{...styles.cardHeaderTextContainer, backgroundColor: color.primary}}>
          <Text style={styles.cardHeaderText}>{studyMaterial.type.toUpperCase()}</Text>
        </View>
      </View>
      {/* END: CARD HEADER */}
      {/* The delete button */}
      {isEditing && <IconButton style={{marginRight: -8}} icon="close" color="000" size={18} onPress={showDialog}/>}
      {/* START: DELETE STUDY MATERIAL DIALOGUE */}
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
      {/* END: DELETE STUDY MATERIAL DIALOGUE */}
    </View>
  )
}

// STUDY MATERIAL CARD FOOTER
function CardFooter({ studyNoteType, numItems }) {
  const { color } = useContext(ColorContext);
  const footerText = {
    "Notes": "Pages",
    "Quiz": "Questions",
    "Flashcards": "Cards"
  }
    
  return (
    <View style={styles.cardFooterContainer}>
      <Text style={{...styles.numberCircle, borderColor: color.circle}}>{numItems}</Text>
      <Text style={styles.footerText}>{footerText[studyNoteType]}</Text>
    </View>
  )
}

// CSS
const styles = StyleSheet.create({
  cardContainer: {
    width: "45%", 
    padding:15, 
    paddingTop: 0, 
    margin: 8, 
    backgroundColor: 'white', 
    borderRadius: 20, 
    shadowColor: 'black', 
    shadowOpacity: 0.1, 
    shadowRadius: 5,
  },
  studyMatTitle: {
    fontSize: 14, 
    fontFamily: 'mon-m',
  },
  lastOpenedText: {
    fontSize: 10, 
    color: '#414141', 
    fontFamily: 'mon-l',
  },
  cardHeaderContainer: {
    display:"flex", 
    flexDirection: "row", 
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  cardHeaderTextContainer: {
    paddingVertical: 4, 
    paddingHorizontal: 8,
     borderRadius: 10,
    },
  cardHeaderText: {
    color: 'white', 
    fontSize: 10, 
    fontFamily: 'mon-m',
  },
  cardFooterContainer: {
    flexDirection: "row", 
    marginTop: 5, 
    alignItems: "center",
  },
  numberCircle: {
    height: 28, 
    width: 28, 
    padding: 5,  
    borderWidth: 1.5, 
    borderRadius: 14, 
    marginRight: 10, 
    textAlign: "center", 
    lineHeight: 15.5, 
    fontFamily: 'mon-m',
  },
  footerText: {
    fontFamily: 'mon-m', 
    fontSize:13,
  },
});