import React, { useState, useContext, useEffect, } from "react";
import { TouchableOpacity, View, StyleSheet, Text, Modal, TextInput } from "react-native";
import colors from "../../constants/Colors";
import PageContext from "../../context/PageContext"
import { Button, IconButton } from "react-native-paper";
import AuthContext from "../../context/AuthContext";
import NotifyContext from "../../context/NotifyContext";
import { topicApi } from "../../api/TopicApi";
import { studyMaterialApi } from "../../api/StudyMaterialApi";
import { colorApi } from "../../api/ColorApi";
import { LinearGradient } from "expo-linear-gradient";

const { active, inactive, background, primary, shadow, line } = colors;

// check valid inputs
function checkValidInput(str) {
  const regex = /^[0-9a-zA-Z]*$/;
  if (!regex.test(str)) {
    throw new Error("Only 0-9 and alphabetical characters are allowed");
  }

  if (str.length === 0) {
    throw new Error("Field cannot be empty");
  }

  if (str.length > 30) {
    throw new Error("field can be max 30 characters")
  }
}

const AddModal = (props) => {
  const [isVisible, setIsVisible] = useState(true);
  const { page, topicId } = useContext(PageContext);

  const hideModal = () => {
    // for fade out animation (cuz it doesn't work automatically????)
    setIsVisible(false);
    setTimeout(() => {
      props.hideModal();
    }, 300);
  };

  return (
    <Modal animationType="fade" visible={isVisible} transparent={true}>
      <TouchableOpacity
        onPress={() => hideModal()}
        style={styles.modalBackDrop}
        activeOpacity={1}
      ></TouchableOpacity>
      <View style={[styles.centeredView]}>
        <View style={[styles.addModal, styles.shadow]}>
          {/*conditionally render different add modals*/}
          {page === "Topic" && <AddStudyMaterial topicId={topicId} />}
          {page === "Groups" && <AddGroup /> }
          {(page === "Home" || page === "Profile" || page === "Explore") && <AddTopic />}
          {/*the triangle under the rectangle part of the modal*/}
          <View style={styles.triangle}></View>
        </View>
      </View>
    </Modal>
  );
};

function AddStudyMaterial({ topicId }) {
  // TODO
  const [checkBox, setCheckBox] = useState("");
  const [inputText, setInputText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [color, setColor] = useState({primary: "white", gradient: "white", circle: "white"});
  const { token } = useContext(AuthContext);
  const { triggerRerender } = useContext(NotifyContext);
  const names = ["Quiz", "Notes", "Flashcards"];


  function handleButtonPress() {
    async function addStudyMaterial() {
      try {
        checkValidInput(inputText);
        await studyMaterialApi.addStudyMaterial(token, inputText, checkBox, topicId);
        setSuccessMessage("Study Material added successfully!");
        setErrorMessage("")
      } catch (error) {
        setErrorMessage(error.message);
        setSuccessMessage("");
      }
    }
    addStudyMaterial();
    triggerRerender();
  }
  
  useEffect(() => {
    async function fetchColor() {
      try {
        const data = await topicApi.getSettingsTopic(token, topicId);
        const colors = await colorApi.getColors(token);
        const topicColor = colors.find((item) => data.color === item.name);
        console.log(topicColor);
        setColor(topicColor)
      } catch (e) {
        console.log("Studymat Add modal: " + e.message);
      }
    }
    fetchColor();
   }, [token]);

  // ()=>console.log("checkBox = " + checkBox + ", inputText = " + inputText)
  return(
    <View>
      <Text>Add Study Material</Text>
      <Text style={{marginBottom: -10}}>Type:</Text>
      <CheckBoxList checkBox={checkBox} names={names} handleClick={setCheckBox}/>
      <Text style={{marginTop: 15, marginBottom: -20}}>Title:</Text>
      <TextInput value={inputText} 
                 onChangeText={(text) => setInputText(text)}
                 style={{color:'black', marginTop: 20, marginBottom: 10}}
                 placeholder="Enter title here:">
      </TextInput>
      <GradientButton onPress={() => handleButtonPress()}
                      title="Add Study Material"
                      color = {color}
                      >
      </GradientButton>
      {successMessage.length !== 0 ? 
        <Text style={{color: 'green', marginTop: 5, marginBottom: -20}}>{successMessage}</Text> : 
        <Text style={{color: 'red', marginTop: 5, marginBottom: -20}}>{errorMessage}</Text>}
    </View>
  )
}

function GradientButton({onPress, title, color}) {
  return (
    <TouchableOpacity onPress={onPress} style={{}}>
      <LinearGradient
        colors={[color.primary, color.gradient]} 
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.7 }}
        style={{padding: 15, borderRadius: 10}}
      >
        <Text style={{color: 'white'}}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}
// linear-gradient('to right', '#5F2EB3', '#29144D', '#3D1E73)
function CheckBoxList({ checkBox, handleClick, names}) {
  return (
    <View>
      {names.map((name, index) => {
        return(
          <View key={index}>
            {
              <View style={{flexDirection:'row', alignItems:'center', marginBottom:-25}}>
                <IconButton icon={name === checkBox ? "checkbox-outline" : "checkbox-blank-outline"} 
                            onPress={() => handleClick(name)}/>
                <Text>{name}</Text>
              </View>
            }
          </View>
      )})}
    </View>
  )
}

function AddGroup() {
  // TODO
  return(
    <View>
      <Text>Add group</Text>
    </View>
  )
}

function AddTopic() {
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { token } = useContext(AuthContext);
  const { triggerRerender } = useContext(NotifyContext);

  function handleAdd() {
    async function addTopic() {
      try {
        checkValidInput(input);
        await topicApi.addTopic(token, input);
        setSuccessMessage("Topic added successfully!");
        setErrorMessage("")
      } catch (e) {
        setErrorMessage(e.message);
        setSuccessMessage("");
      }
    }
    addTopic();
    triggerRerender();
  }

  return(
    <View style={{alignItems: "center"}}>
      <Text style={styles.modalTitle}>Add topic</Text>
      <View>
        <Text>Title:</Text>
        <TextInput style={styles.textInput} value={input} onChangeText={(val) => setInput(val)}></TextInput>
        <Text style={{color: 'red'}}>{errorMessage}</Text>
        <Text style={{color: 'green'}}>{successMessage}</Text>
      </View>
      <Button onPress={handleAdd}>Add Topic</Button>
    </View>
  )
}

// CSS

const styles = StyleSheet.create({
  modalBackDrop: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.60)",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
  addModal: {
    backgroundColor: primary,
    width: 250,
    height: 300,
    borderRadius: 10,
    bottom: 135,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
    padding: 15,
  },
  shadow: {
    shadowColor: shadow,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 5,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: primary,
    position: "absolute",
    bottom: -15,
    transform: [{ rotate: "180deg" }],
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 5,
    width: 200,
  },
  modalTitle: {
    fontSize: 20, 
    fontWeight: 500, 
    marginBottom: 20
  }, 
  button: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  gradient: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    alignItems: 'center'
  },
  buttonBox: {
    borderRadius: 20
  },
  linearGradient: {
    justifyContent: 'center'
  }, 
});

export default AddModal;
