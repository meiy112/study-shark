import { useState, useContext, useEffect } from "react";
import { Text, View, TextInput } from "react-native";
import { adminApi } from "../../api/AdminApi";
import AuthContext from "../../context/AuthContext";

export default function TopicManager() {
  const [topics, setTopics] = useState([]);
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {token} = useContext(AuthContext);

  // fetch topics data
  function handleSubmit() {
    async function fetchTopics() {
      try {
        // fetch data
        const data = await adminApi.getTopics(token, query);
        setTopics(data);
        setErrorMessage("");
      } catch (e) {
        console.log("AdminTopic: " + e.message);
        setErrorMessage(e.message);
      }
    }
    fetchTopics();
   }

  return (
    <View style={{margin: 20, marginTop: 40}}>
      <Text style={{fontSize: 25}}>Topic Manager</Text>
      <Text>Enter a string of conditions connected with 'AND' or 'OR'.</Text>
      <Text>Attributes to use in the conditions: id, username, title, isPublic, description. </Text>
      <TextInput 
      keyboardType={'ascii-capable'}
      style={{borderColor: 'black', borderWidth: 1}}
      value={query}
      onChangeText={query => setQuery(query)}
      onSubmitEditing={handleSubmit}
      autoCapitalize='none'
      ></TextInput>
      <Text style={{color: 'red'}}>{errorMessage}</Text>
      <TopicsTable topics={topics} />
    </View>
  );
}

function TopicsTable({ topics }) {
  return (
    <View style={{marginTop: 10, marginBottom: 10}}>
      <Text>Topics:</Text>
      <TableHeader />
      <TableBody topics={topics}/>
    </View>
  )
}

function TableHeader() {
  const attrs = ['id', 'username', 'title'];

  return (
    <View style={{flexDirection: 'row'}} >
    {
      attrs.map((attr, index) => (
        <View key={index} style={{ flex: 1, borderColor: 'black', borderWidth: 1, alignItems: 'center' }}>
          <Text style={{fontWeight: 600}}>{attr}</Text>
        </View>
      ))
    }
  </View>
  )
}

function TableBody({ topics }) {
  return (
    <View>
      {
        topics.map((topic, index) => (
          <TableRow topic={topic} key={index} />
        ))
      }
    </View>
  );
}

function TableRow({ topic }) {
  return (
    <View style={{flexDirection: 'row'}} >
    {
      Object.values(topic).map((val, index) => (
        <View key={index} style={{ flex: 1, borderColor: 'black', borderWidth: 1, alignItems: 'center' }}>
          <Text style={{fontWeight: 200}}>{val}</Text>
        </View>
      ))
    }
  </View>
  );
}