import { useState, useEffect, createContext, useContext } from "react";
import { View, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Button, IconButton, Text, Switch } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

import * as appColors from "../../constants/Colors";
import AuthContext from "../../context/AuthContext";
import PageContext from "../../context/PageContext";
import NotifyContext from "../../context/NotifyContext";
import { topicApi } from "../../api/TopicApi";
import { colorApi } from "../../api/ColorApi";


const { active, inactive, background, primary, shadow, line, grey } = appColors.default;

const TopicContext = createContext();

// Topic Settings Page
export default function Settings({ closeSettings, id, navigation, lastPage, isOwner }) {
  const [topic, setTopic] = useState({
    title: "",
    description: "",
    creationDate: "",
    tags: [],
    isPublic: true,
    owner: {
      name: "",
      points: 0,
    },
    color: "",
    creationDateMs: 1712161189026,
    lastOpenedDateMs: 1711161181026,
  });
  const [trigger, setTrigger] = useState(1); // used to force page to refresh after updating name
  const [colors, setColors] = useState([]); // all colors in db
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { token } = useContext(AuthContext); // jwt token
  const { setPage } = useContext(PageContext); // used to keep track of pages/navigation on deleting a topic
  const { triggerRerender } = useContext(NotifyContext); // force rerender on other pages

  const color = colors.find((item) => item.name === topic.color); // get color of current topic

  // LOAD DATA------------------------------------
  // fetch topic
  useEffect(() => {
    async function fetchTopic() {
      try {
        const data = await topicApi.getSettingsTopic(token, id);
        setTopic(data);
      } catch (e) {
        console.log("Topic Settings: " + e.message);
      }
    }
    fetchTopic();
   }, [token, trigger]);


   // fetch colors
  useEffect(() => {
    async function fetchColors() {
      try {
        const data = await colorApi.getColors(token);
        setColors(data);
      } catch (e) {
        console.log("Topic Settings: " + e.message);
      }
    }
    fetchColors();
   }, [token]);
  // END LOAD DATA------------------------------------

  // HANDLERS ----------------------------------------
   // updates topic
   function updateTopic() {
    async function update() {
      try {
        // validate inputs
        validateInput(topic.title);
        validateInput(topic.title);
        validateInput(topic.description);
        validateInput(topic.owner.name);
        validateDate(topic.creationDateMs);
        validateDate(topic.lastOpenedDateMs);

        // call api
        await topicApi.updateTopic(token, id, {
          title: topic.title,
          isPublic: topic.isPublic,
          description: topic.description,
          color: topic.color,
          username: topic.owner.name,
          creationDateMs: topic.creationDateMs,
          lastOpenedDateMs: topic.lastOpenedDateMs,
        });

        setSuccessMessage("Changes Saved!");
        setErrorMessage("");
        setTrigger(trigger + 1); // forces owner info to rerender on update
        triggerRerender(); // rerenders other pages
      } catch (e) {
        console.log("Topic Settings: " + e.message);
        setErrorMessage(e.message)
        setSuccessMessage("");
      }
    }
    update();
   }

   // deletes a topic
   function deleteTopic() {
    async function delTopic() {
      try {
        await topicApi.deleteTopic(token, id);
      } catch (e) {
        console.log("Topic Settings: " + e.message);
      }
    }
    delTopic();
    triggerRerender(); // refresh other pages
    setPage(lastPage); // set this page as last visited page
    closeSettings(); // close modal
    navigation.goBack(); // navigate to last page
   }

   // validates string inputs to prevent SQLi
   function validateInput(str) {
      const regex = /^[0-9a-zA-Z _-]*$/;
      if (!regex.test(str)) {
        throw new Error("No special characters allowed except _-")
      }
   }

   // validate date inputs
   function validateDate(input) {
    if (!Number.isInteger(input) || input < 0) {
      throw new Error("Invalid date format");
    }
   }

  // END HANDLERS ------------------------------------

  return(
    <LinearGradient
    colors={color? [color.gradient, color.primary] : ['white', 'white']} 
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 0.15 }}
  >
      <TopicContext.Provider value={{topic, setTopic, isOwner}}>
        <ScrollView>
          <View>
            {/* Header */}
            <Header 
              closeSettings={closeSettings} 
              colors={colors}
            />
          </View>
          <View>
            {/* Body */}
            <Body 
              updateTopic={updateTopic} 
              deleteTopic={deleteTopic} 
              successMessage={successMessage} 
              errorMessage={errorMessage} 
            />
          </View>
        </ScrollView>
      </TopicContext.Provider>
    </LinearGradient>
  );
}

// Header
function Header({ closeSettings, colors }) {
  const { topic } = useContext(TopicContext);

  // find current color
  const color = colors.find((item) => item.name === topic.color);

  return (
    <View>
      {/* Cose button, title, date */}
      <IconButton style={{margin: 5}} onPress={closeSettings} icon="close" iconColor="white"/>
      <View style={{flexDirection: "column", alignItems: 'center'}}>
        <Text style={styles.title}>Topic Settings</Text>
        <Text style={styles.date}>Created: {topic.creationDate}</Text>
      </View>
      {/* Color selection */}
      <ColorList colors={colors} />
    </View>
  );
}

// Color selection list
function ColorList({ colors }) {
  const {topic, setTopic} = useContext(TopicContext);

  // sets new color
  function handleColorChange(color) {
    const newTopic = { ...topic, color: color };
    setTopic(newTopic);
  }

  return (
    <View style={styles.colorListContainer}>
      <Text style={styles.colorTitle}>THEME</Text>
      <View style={{flexDirection: "row", margin: 10}}>
        {
          colors.map((color, index) => {
            if (color.name !== "default") { // filter out default color
              return (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => handleColorChange(color.name)}
                >
                  <View style={{...styles.colorSelect, backgroundColor: color.primary}}><Text style={styles.colorSelectionX}>
                    {color.name === topic.color? "X": ""}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          })
        }
      </View>
    </View>
  );
}

// Body
function Body({ updateTopic, deleteTopic, successMessage, errorMessage }) {
  const { isOwner } = useContext(TopicContext);
  return (
    <View style={styles.bodyContainer}>
      <OwnerDisplay />
      <GeneralInfo />
      <Privacy />
      <Dates />
      <TransferOwner />

      

      {/* update + delete button */}
      <View style={styles.buttonsContainer}>
      { isOwner && 
        (
          <View>
            <Button 
              style={{marginBottom: 10}} 
              buttonColor="#444444" 
              mode="contained" 
              onPress={updateTopic} 
            >Save Changes</Button>

            <Button 
              buttonColor="#444444" 
              mode="contained" 
              onPress={deleteTopic}
            >Delete Topic</Button>
          </View>
        )
      }
        {/* Error + success messages */}
        <Text style={{color: 'green'}}>{successMessage}</Text>
        <Text style={{color: 'red'}}>{errorMessage}</Text>
      </View>
    </View>
  );
}

// Owner display
function OwnerDisplay() {
  const { topic } = useContext(TopicContext);

  return (
    <View style={styles.ownerDisplayContainer}>
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <Text style={{fontSize: 15, fontFamily: 'mon-sb'}} >Owner: </Text>
        <Text style={{fontSize: 15, fontFamily: 'mon-m'}}>{topic.owner.name}</Text>
      </View>
      <Text style={{fontSize: 12, fontFamily: 'mon-l'}}>EXP: {topic.owner.points}</Text>
    </View>
  );
}

// General info
function GeneralInfo() {
  const {topic, setTopic} = useContext(TopicContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // useEffect is here because the topic is not loaded on first render
  useEffect(() => {
    setDescription(topic.description);
    setTitle(topic.title);
  }, [topic]);  

  // handle edit title
  function handleEditTitle(val) {
    const newTopic = { ...topic, title: val };
    setTitle(val);
    setTopic(newTopic);
  }

  // handle edit description
  function handleEditDescription(val) {
    const newTopic = { ...topic, description: val };
    setDescription(val);
    setTopic(newTopic);
  }

  return (
  <View style={styles.generalInfoContainer}>
    {/* Title */}
    <View>
      <Text style={styles.subheading}>Title:</Text>
      <TextInput 
        style={{...styles.textInput, marginRight: 12}} 
        value={title} 
        onChangeText={(val) => handleEditTitle(val)} 
      />
    </View>

    {/* Desctiption */}
    <View style={{marginTop: 10}}>
      <Text style={styles.subheading}>Description:</Text>
      <View style={{padding: 5, paddingHorizontal: 12}}>
        <TextInput 
          multiline 
          style={styles.textInput} 
          value={description} 
          onChangeText={(val) => handleEditDescription(val)} 
          />
      </View>
    </View>
  </View>
  );
}

// privacy
function Privacy() {
  const {topic, setTopic} = useContext(TopicContext);
  const [isPublic, setIsPublic] = useState(true);

  // useEffect is here because the topic is not loaded on first render
  useEffect(() => {
    setIsPublic(topic.isPublic);
  }, [topic]);  

  // handle toggle switch
  function handlePrivacyChange() {
    let newTopic = topic;
    newTopic.isPublic = !isPublic;
    setIsPublic(!isPublic);
    setTopic(newTopic);
  }

  return (
    <View style={styles.privacyContainer}>
      <IconButton 
        icon={topic.isPublic? "eye-outline" : "eye-off-outline"} 
      />
      <View style={{marginRight: 20}}>
        <Text style={styles.subheading} >
          {topic.isPublic? "PUBLIC" : "PRIVATE"}
        </Text>
        <Text style={{fontSize: 13, fontFamily: 'mon-l'}}>
          {topic.isPublic? "Other users can see this topic" : "This topic is hidden from others"}
        </Text>
      </View>
      <Switch 
        color="#444444" 
        value={isPublic}
        onValueChange={handlePrivacyChange} 
      />
    </View>
  );
}

// dates - im so sorry the code is here is so demented it looks like someone puked on my page
function Dates() {
  const {topic, setTopic} = useContext(TopicContext);
  const [creationDate, setCreationDate] = useState(0); // date in ms
  const [lastOpenedDate, setLastOpenedDate] = useState(0); // date in ms
  const [creationDateStr, setCreationDateStr] = useState(""); // date as string
  const [lastOpenedDateStr, setLastOpenedDateStr] = useState(""); // date as string

  useEffect(() => {
    setCreationDate(topic.creationDateMs);
    setLastOpenedDate(topic.lastOpenedDateMs)
    setCreationDateStr((new Date(topic.creationDateMs)).toDateString());
    setLastOpenedDateStr((new Date(topic.lastOpenedDateMs)).toDateString());
  }, []);

  // handle creation date change
  function handleChangeCreationDate(newDate) {
    let creationDateNum = Number(newDate);
    console.log(newDate);

    // if date is invalid, do nothing
    if (isNaN(creationDateNum) || creationDateNum > 99999999999999 || creationDateNum < 99999999) {
      return;
    }
    creationDateNum = Math.floor(creationDateNum);
    setCreationDate(creationDateNum);
    setCreationDateStr((new Date(creationDateNum)).toDateString())

    // set new date in topic
    const newTopic = { ...topic, creationDateMs: creationDateNum };
    setTopic(newTopic);
  }

  // if date is invalid, do nothing
  function handleChangeLastOpenedDate(newDate) {
    let lastOpenedDateNum = Number(newDate);

    // check if date is valid
    if (isNaN(lastOpenedDateNum) || lastOpenedDateNum > 99999999999999 || lastOpenedDateNum < 99999999) {
      return;
    }
    lastOpenedDateNum = Math.floor(lastOpenedDateNum);
    setLastOpenedDate(lastOpenedDateNum);
    setLastOpenedDateStr((new Date(lastOpenedDateNum)).toDateString())

    // set new date in topic
    const newTopic = { ...topic, lastOpenedDateMs: lastOpenedDateNum };
    setTopic(newTopic);
  }

  return (
    <View style={styles.datesContainer}>
      {/* Created */}
      <Text style={styles.subheading}>Date Created:</Text>
      <Text style={{fontSize: 11, fontFamily: 'mon-l'}}>{creationDateStr}</Text>
      <TextInput 
        style={styles.textInput} 
        value={creationDate.toString()} 
        onChangeText={(val) => handleChangeCreationDate(val)} 
      />
      {/* Last opened */}
      <Text style={{...styles.subheading, marginTop: 10}}>Date Last Opened:</Text>
      <Text style={{fontSize: 11, fontFamily: 'mon-l'}}>{lastOpenedDateStr}</Text>
      <TextInput 
        style={styles.textInput} 
        value={lastOpenedDate.toString()} 
        onChangeText={(val) => handleChangeLastOpenedDate(val)} 
      />
    </View>
  )
}

// transfer Owner
function TransferOwner() {
  const {topic, setTopic} = useContext(TopicContext);
  const [owner, setOwner] = useState("");

  useEffect(() => {
    setOwner(topic.owner.name);
  });

  // handle edit owner
  function handleEditOwner(newOwner) {
    const newTopic = {...topic, owner: {name: newOwner, points: 0}}
    setOwner(newOwner)
    setTopic(newTopic);
  }

  return (
    <View style={styles.transferOwnerContainer}>
      <Text style={styles.subheading}>Transfer Ownership to:</Text>
      <TextInput 
        style={{...styles.textInput, marginBottom: 10, marginTop: 5}}
        value={owner}
        onChangeText={(val) => handleEditOwner(val)} 
      />
    </View>
  )
}

// CSS
styles = StyleSheet.create( {
  title: {
    fontWeight: '600', 
    fontSize: 16, 
    fontFamily: 'mon-sb', 
    color:'white', 
    paddingBottom: 5,
  },
  date: {
    fontWeight: '100', 
    fontSize: 11, 
    fontFamily: 'mon-l', 
    color:'white',
  },
  colorListContainer: {
    flexDirection: "column", 
    margin: 20,
  },
  colorTitle: {
    fontWeight: '300', 
    fontSize: 11, 
    fontFamily: 'mon-sb', 
    color:'white',
  },
  colorSelect: {
    height: 32, 
    width: 32, 
    padding: 5,  
    borderWidth: 2, 
    borderRadius: 16, 
    marginRight: 10, 
    borderColor: "white",
  },
  colorSelectionX: {
    color: "white", 
    textAlign: "center", 
    fontFamily: 'mon-m',
  },
  bodyContainer: {
    backgroundColor: grey, 
    padding: 15, 
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15, 
    paddingBottom: 20,
  },
  buttonsContainer: {
    paddingVertical: 10, 
    display: 'flex', 
    alignItems:'center',
  },
  ownerDisplayContainer: {
    flexDirection: "column", 
    backgroundColor: 'white', 
    borderRadius: 10, 
    padding: 14, 
    marginTop: 5,
  },
  generalInfoContainer: {
    flexDirection: "column", 
    backgroundColor: 'white', 
    borderRadius: 10, 
    padding: 14, 
    marginTop: 15,
  },
  textInput: {
    fontSize: 13, 
    fontFamily: 'mon-l', 
    borderBottomColor: 'grey', 
    borderBottomWidth: 0.5,
  },
  privacyContainer: {
    flexDirection: "row", 
    backgroundColor: 'white', 
    borderRadius: 10, 
    alignItems: "center", 
    padding: 8, 
    marginTop: 15,
  },
  datesContainer: {
    flexDirection: "column", 
    backgroundColor: 'white', 
    borderRadius: 10, 
    padding: 14, 
    marginTop: 15,
  },
  transferOwnerContainer: {
    flexDirection: "column", 
    backgroundColor: 'white', 
    borderRadius: 10, 
    padding: 10, 
    marginTop: 15, 
    marginBottom: 15,
  },
  subheading: {
    fontSize: 14, 
    fontFamily: 'mon-m',
  }
})