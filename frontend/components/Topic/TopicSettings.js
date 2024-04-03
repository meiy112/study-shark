import { useState, useEffect, createContext, useContext } from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Button, IconButton, Text, Switch } from "react-native-paper";
import * as appColors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import AuthContext from "../../context/AuthContext";
import PageContext from "../../context/PageContext";
import { topicApi } from "../../api/TopicApi";
import { colorApi } from "../../api/ColorApi";
import NotifyContext from "../../context/NotifyContext";


const { active, inactive, background, primary, shadow, line, grey } = appColors.default;

const TopicContext = createContext();

export default function Settings({ closeSettings, id, navigation, lastPage }) {
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
  const [trigger, setTrigger] = useState(1); // used to force page to refresh after update
  const [colors, setColors] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const color = colors.find((item) => item.name === topic.color);
  const { token } = useContext(AuthContext);
  const { setPage } = useContext(PageContext);
  const { triggerRerender } = useContext(NotifyContext);

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
   function updateTopic() {
    async function update() {
      try {
        validateInput(topic.title);
        validateInput(topic.title);
        validateInput(topic.description);
        validateInput(topic.owner.name);
        validateDate(topic.creationDateMs);
        validateDate(topic.lastOpenedDateMs);

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
        setTrigger(trigger + 1);
        triggerRerender();
      } catch (e) {
        console.log("Topic Settings: " + e.message);
        setErrorMessage(e.message)
        setSuccessMessage("");
      }
    }
    update();
   }

   function deleteTopic() {
    async function delTopic() {
      try {
        await topicApi.deleteTopic(token, id);
      } catch (e) {
        console.log("Topic Settings: " + e.message);
      }
    }
    delTopic();
    triggerRerender();
    setPage(lastPage);
    closeSettings();
    navigation.goBack(); 
   }

   function validateInput(str) {
      const regex = /^[0-9a-zA-Z _-]*$/;
      if (!regex.test(str)) {
        throw new Error("No special characters allowed except _-")
      }
   }

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
      <TopicContext.Provider value={{topic, setTopic}}>
        <ScrollView>
          <View>
            <Header closeSettings={closeSettings} colors={colors} />
          </View>
          <View>
            <Body updateTopic={updateTopic} deleteTopic={deleteTopic} successMessage={successMessage} errorMessage={errorMessage} />
          </View>
        </ScrollView>
      </TopicContext.Provider>
    </LinearGradient>
  );
}

function Header({ closeSettings, colors }) {
  const {topic, setTopic} = useContext(TopicContext);

  const color = colors.find((item) => item.name === topic.color);

  return (
    <View>
      <IconButton style={{margin: 5}} onPress={closeSettings} icon="close" iconColor="white"/>
        <View style={{flexDirection: "column", alignItems: 'center'}}>
          <Text style={{fontWeight: '600', fontSize: 16, fontFamily: 'mon-sb', color:'white', paddingBottom: 5}}>Topic Settings</Text>
          <Text style={{fontWeight: '100', fontSize: 11, fontFamily: 'mon-l', color:'white'}}>Created: {topic.creationDate}</Text>
      </View>
      <ColorList colors={colors} />
    </View>
  );
}

function ColorList({ colors }) {
  const {topic, setTopic} = useContext(TopicContext);

  function handleColorChange(color) {
    const newTopic = { ...topic, color: color };
    setTopic(newTopic);
  }

  return (
    <View style={{flexDirection: "column", margin: 20}}>
      <Text style={{fontWeight: '300', fontSize: 11, fontFamily: 'mon-sb', color:'white'}}>THEME</Text>
      <View style={{flexDirection: "row", margin: 10}}>
        {
          colors.map((color, index) => {
            if (color.name !== "default") {
              return (
                <TouchableOpacity key={index} onPress={() => handleColorChange(color.name)}>
                  <View style={{
                    height: 32, 
                    width: 32, 
                    padding: 5,  
                    borderWidth: 2, 
                    borderRadius: 16, 
                    marginRight: 10, 
                    borderColor: "white",
                    backgroundColor: color.primary
                  }}><Text style={{color: "white", textAlign: "center", fontFamily: 'mon-m',}}>
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

function Body({ updateTopic, deleteTopic, successMessage, errorMessage }) {
  const {topic, setTopic} = useContext(TopicContext);
  return (
    <View style={{backgroundColor: grey, padding: 15, borderTopLeftRadius: 15, borderTopRightRadius: 15, paddingBottom: 20}}>
      <OwnerDisplay />
      <GeneralInfo />
      <Privacy />
      <Dates />
      <TransferOwner />
      <View style={{paddingVertical: 10, display: 'flex', alignItems:'center'}}>
        <Button style={{marginBottom: 10}} buttonColor="#444444" mode="contained" onPress={updateTopic} >Save Changes</Button>
        <Button buttonColor="#444444" mode="contained" onPress={deleteTopic} >Delete Topic</Button>
        <Text style={{color: 'green'}}>{successMessage}</Text>
        <Text style={{color: 'red'}}>{errorMessage}</Text>
      </View>
    </View>
  );
}

function OwnerDisplay() {
  const {topic, setTopic} = useContext(TopicContext);

  return (
    <View style={{flexDirection: "column", backgroundColor: 'white', borderRadius: 10, padding: 14, marginTop: 5}}>
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <Text style={{fontWeight: '300', fontSize: 15, fontFamily: 'mon-sb'}} >Owner: </Text>
        <Text style={{fontWeight: '100', fontSize: 15, fontFamily: 'mon-m'}}>{topic.owner.name}</Text>
      </View>
      <Text style={{fontWeight: '100', fontSize: 12, fontFamily: 'mon-l'}}>EXP: {topic.owner.points}</Text>
    </View>
  );
}

function GeneralInfo() {
  const {topic, setTopic} = useContext(TopicContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // useEffect is here because the topic is not loaded on first render
  useEffect(() => {
    setDescription(topic.description);
    setTitle(topic.title);
  }, [topic]);  

  // TODO: regex check
  function handleEditTitle(val) {
    const newTopic = { ...topic, title: val };
    setTitle(val);
    setTopic(newTopic);
  }

  // TODO: regex check
  function handleEditDescription(val) {
    const newTopic = { ...topic, description: val };
    setDescription(val);
    setTopic(newTopic);
  }

  return (
  <View style={{flexDirection: "column", backgroundColor: 'white', borderRadius: 10, padding: 14, marginTop: 15}}>
    <View>
      <Text style={{fontWeight: '100', fontSize: 14, fontFamily: 'mon-m'}}>Title:</Text>
      <TextInput style={{fontWeight: '100', fontSize: 14, fontFamily: 'mon-sb', marginVertical: 10, borderBottomColor: 'grey', borderBottomWidth: 0.5, marginRight: 12}} value={title} onChangeText={(val) => handleEditTitle(val)} />
    </View>
    <View style={{marginTop: 10}}>
      <Text style={{fontWeight: '100', fontSize: 14, fontFamily: 'mon-m'}}>Description:</Text>
      <View style={{padding: 5, paddingHorizontal: 12}}>
        <TextInput multiline style={{fontWeight: '100', fontSize: 13, fontFamily: 'mon-l', borderBottomColor: 'grey', borderBottomWidth: 0.5}} value={description} onChangeText={(val) => handleEditDescription(val)} />
      </View>
    </View>
  </View>
  );
}

function Privacy() {
  const {topic, setTopic} = useContext(TopicContext);
  const [isPublic, setIsPublic] = useState(true);

  // useEffect is here because the topic is not loaded on first render
  useEffect(() => {
    setIsPublic(topic.isPublic);
  }, [topic]);  

  function handlePrivacyChange() {
    let newTopic = topic;
    newTopic.isPublic = !isPublic;
    // let newTopic = {...topic, "isPublic": isPublic};
    setIsPublic(!isPublic);
    setTopic(newTopic);
  }

  return (
    <View style={{flexDirection: "row", backgroundColor: 'white', borderRadius: 10, alignItems: "center", padding: 8, marginTop: 15}}>
      <IconButton icon={topic.isPublic? "eye-outline" : "eye-off-outline"} />
      <View style={{marginRight: 20}}>
        <Text style={{fontWeight: '100', fontSize: 14, fontFamily: 'mon-m'}} >{topic.isPublic? "PUBLIC" : "PRIVATE"}</Text>
        <Text style={{fontWeight: '100', fontSize: 13, fontFamily: 'mon-l'}}>{topic.isPublic? "Other users can see this topic" : "This topic is hidden from others"}</Text>
      </View>
      <Switch color="#444444" value={isPublic} onValueChange={handlePrivacyChange} />
    </View>
  );
}

function Dates() {
  const {topic, setTopic} = useContext(TopicContext);
  const [creationDate, setCreationDate] = useState(0);
  const [lastOpenedDate, setLastOpenedDate] = useState(0);
  const [creationDateStr, setCreationDateStr] = useState("");
  const [lastOpenedDateStr, setLastOpenedDateStr] = useState("");

  useEffect(() => {
    setCreationDate(topic.creationDateMs);
    setLastOpenedDate(topic.lastOpenedDateMs)
    setCreationDateStr((new Date(topic.creationDateMs)).toDateString());
    setLastOpenedDateStr((new Date(topic.lastOpenedDateMs)).toDateString());
  }, []);

  function handleChangeCreationDate(newDate) {
    let creationDateNum = Number(newDate);
    if (isNaN(creationDateNum) || creationDateNum > 9999999999999) {
      return;
    }
    creationDateNum = Math.floor(creationDateNum);
    setCreationDate(creationDateNum);
    setCreationDateStr((new Date(creationDateNum)).toDateString())

    const newTopic = { ...topic, creationDateMs: creationDateNum };
    setTopic(newTopic);
  }

  function handleChangeLastOpenedDate(newDate) {
    let lastOpenedDateNum = Number(newDate);
    if (isNaN(lastOpenedDateNum)) {
      return;
    }
    lastOpenedDateNum = Math.floor(lastOpenedDateNum);
    setLastOpenedDate(lastOpenedDateNum);
    setLastOpenedDateStr((new Date(lastOpenedDateNum)).toDateString())

    const newTopic = { ...topic, lastOpenedDateMs: lastOpenedDateNum };
    setTopic(newTopic);
  }

  return (
    <View style={{flexDirection: "column", backgroundColor: 'white', borderRadius: 10, padding: 14, marginTop: 15}}>
      <Text style={{fontWeight: '100', fontSize: 14, fontFamily: 'mon-m'}}>Date Last Opened:</Text>
      <Text style={{fontWeight: '100', fontSize: 11, fontFamily: 'mon-l'}}>{creationDateStr}</Text>
      <TextInput style={{fontWeight: '100', fontSize: 13, fontFamily: 'mon-l', borderBottomColor: 'grey', borderBottomWidth: 0.5, marginBottom: 10}} value={creationDate.toString()} onChangeText={(val) => handleChangeCreationDate(val)} />
      <Text style={{fontWeight: '100', fontSize: 14, fontFamily: 'mon-m'}}>Date Created:</Text>
      <Text style={{fontWeight: '100', fontSize: 11, fontFamily: 'mon-l'}}>{lastOpenedDateStr}</Text>
      <TextInput style={{fontWeight: '100', fontSize: 13, fontFamily: 'mon-l', borderBottomColor: 'grey', borderBottomWidth: 0.5, marginBottom: 10}} value={lastOpenedDate.toString()} onChangeText={(val) => handleChangeLastOpenedDate(val)} />
    </View>
  )
}

function TransferOwner() {
  const {topic, setTopic} = useContext(TopicContext);
  const [owner, setOwner] = useState("");

  useEffect(() => {
    setOwner(topic.owner.name);
  });

  function handleEditOwner(newOwner) {
    const newTopic = {...topic, owner: {name: newOwner, points: 0}}
    setOwner(newOwner)
    setTopic(newTopic);
  }

  return (
    <View style={{flexDirection: "column", backgroundColor: 'white', borderRadius: 10, padding: 8, marginTop: 15, marginBottom: 15}}>
      <Text style={{fontWeight: '100', fontSize: 14, fontFamily: 'mon-m'}}>Transfer Ownership to:</Text>
      <TextInput style={{fontWeight: '100', fontSize: 13, fontFamily: 'mon-l', borderBottomColor: 'grey', borderBottomWidth: 0.5, marginBottom: 10, marginTop: 5}} value={owner} onChangeText={(val) => handleEditOwner(val)} />
    </View>
  )
}