import { useState, useContext, useEffect } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { adminApi } from "../../api/AdminApi";
import AuthContext from "../../context/AuthContext";

export default function TableViewer() {
  const [records, setRecords] = useState([]);
  const [tableName, setTableName] = useState("");
  const [attrString, setAttrString] = useState("")
  const [attrList, setAttrList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useContext(AuthContext);

  function handleSubmit() {
    async function fetchTables() {
      try {
        // check for invalid chars
        const regex = /^[0-9a-zA-Z><="',]*$/;
        if (!regex.test(tableName) || !regex.test(attrString)) {
          throw new Error("No special characters allowed");
        }

        // split string into array
        const attrAsArray = attrString.split(",")
        setAttrList(attrAsArray);

        // fetch data
        const data = await adminApi.getTables(token, tableName, attrList);
        setRecords(data);
        setErrorMessage("");
      } catch (e) {
        setErrorMessage(e.message);
        console.log(e.message);
      }
    }
    fetchTables();
  }


  return (
    <View style={{margin: 20, marginTop: 40}}>
      <Text style={{fontSize: 25}}>Table Viewer</Text>

      <Text>Please enter the table name that you wish to view:</Text>
      <TextInput 
      style={{borderColor: 'black', borderWidth: 1}}
      value={tableName}
      onChangeText={val => setTableName(val)}
      autoCapitalize='none'
      ></TextInput>

      <Text>Please enter the attributes you want to view, seperated by commas:</Text>
      <TextInput 
      style={{borderColor: 'black', borderWidth: 1}}
      value={attrString}
      onChangeText={val => setAttrString(val)}
      autoCapitalize='none'
      ></TextInput>

      <Text style={{color: 'red'}}>{errorMessage}</Text>
      <Button title="Find Table" onPress={handleSubmit} />

    <Table records={records} attrs={attrList}/>
    </View>
  );
}

function Table({ records, attrs }) {
  return (
    <View style={{marginTop: 10, marginBottom: 10}}>
      <TableHeader attrs={attrs} />
      <TableBody records={records}/>
    </View>
  )
}

function TableHeader({ attrs }) {

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

function TableBody({ records }) {
  return (
    <View>
      {
        records.map((record, index) => (
          <TableRow record={record} key={index} />
        ))
      }
    </View>
  );
}

function TableRow({ record }) {
  return (
    <View style={{flexDirection: 'row'}} >
    {
      Object.values(record).map((val, index) => (
        <View key={index} style={{ flex: 1, borderColor: 'black', borderWidth: 1, alignItems: 'center' }}>
          <Text style={{fontWeight: 200}}>{val}</Text>
        </View>
      ))
    }
  </View>
  );
}