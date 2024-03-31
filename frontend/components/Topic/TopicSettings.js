import { useState, useEffect, createContext, useContext } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Button, IconButton, Text, Switch } from "react-native-paper";
import * as appColors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import AuthContext from "../../context/AuthContext";
import { topicApi } from "../../api/TopicApi";
import { colorApi } from "../../api/ColorApi";


const { active, inactive, background, primary, shadow, line, grey } = appColors.default;

const TopicContext = createContext();

export default function Settings({ closeSettings, id }) {
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
  });
  const [colors, setColors] = useState([]);
  const color = colors.find((item) => item.name === topic.color);
  const { token } = useContext(AuthContext);

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
   }, [token]);


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
        await topicApi.updateTopic(token, id, {
          title: topic.title,
          isPublic: topic.isPublic,
          description: topic.description,
          color: topic.color,
        });
      } catch (e) {
        console.log("Topic Settings: " + e.message);
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
   }

  // END HANDLERS ------------------------------------

  return(
    <LinearGradient
    colors={color? [color.gradient, color.primary] : ['white', 'white']} 
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 0.11 }}
  >
      <TopicContext.Provider value={{topic, setTopic}}>
        <View>
          <Header closeSettings={closeSettings} colors={colors} />
          <Body updateTopic={updateTopic} deleteTopic={deleteTopic} />
        </View>
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
            )
          })
        }
      </View>
    </View>
  );
}

function Body({ updateTopic, deleteTopic }) {
  const {topic, setTopic} = useContext(TopicContext);
  return (
    <View style={{backgroundColor: grey, padding: 15, borderTopLeftRadius: 15, borderTopRightRadius: 15, paddingBottom: 400}}>
      <OwnerDisplay />
      <GeneralInfo />
      <Privacy />
      <View style={{paddingVertical: 20, paddingHorizontal: 60}}>
        <Button style={{marginBottom: 10}} buttonColor="#444444" mode="contained" onPress={updateTopic} >Save Changes</Button>
        <Button buttonColor="#444444" mode="contained" onPress={deleteTopic} >Delete Topic</Button>
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
      <TextInput style={{fontWeight: '100', fontSize: 14, fontFamily: 'mon-sb', marginVertical: 10}} value={title} onChangeText={(val) => handleEditTitle(val)} />
    </View>
    <View>
      <Text style={{fontWeight: '100', fontSize: 14, fontFamily: 'mon-m'}}>Description:</Text>
      <View style={{padding: 10}}>
        <TextInput value={description} onChangeText={(val) => handleEditDescription(val)} />
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
    setIsPublic(!isPublic);
    setTopic(newTopic);
  }

  return (
    <View style={{flexDirection: "row", backgroundColor: 'white', borderRadius: 10, alignItems: "center", padding: 8, marginTop: 15, marginBottom: 15}}>
      <IconButton icon={topic.isPublic? "eye-outline" : "eye-off-outline"} />
      <View style={{marginRight: 20}}>
        <Text>{topic.isPublic? "PUBLIC" : "PRIVATE"}</Text>
        <Text>{topic.isPublic? "Other users can see this topic" : "This topic is hidden from others"}</Text>
      </View>
      <Switch color="#444444" value={isPublic} onValueChange={handlePrivacyChange} />
    </View>
  );
}