import React, { useContext, useState } from "react";
import { StyleSheet, View,TextInput } from "react-native";
import { Header,Text } from "react-native-elements";
//import { Caption, IconButton, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";



const CreateNote = ({ navigation }) => {
  
  const [title, setTitle] = useState("");
  const [timestamp, setTimestamp] = useState(Date.now());
  const [content, setContent] = useState("");

  const handleSaveNote = () => {
    if (!title) {
      setTitle("New note");
      createNote("New note", content, timestamp, state.user.id);
    } else createNote(title, content, timestamp, state.user.id);

    navigation.navigate("Home");
  };

  const goback = () =>{
      navigation.goBack();
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.iconBar}>
        <Icon
          icon="chevron-left"
          color={"black"}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Icon
          icon="check-circle-outline"
          color={"black"}
          onPress={handleSaveNote}
        />
      </View> */}
        <Header
        statusBarProps={{backgroundColor:"#fabd05"}}
        containerStyle={{backgroundColor:"#fabd05"}}
        leftComponent={{ icon: 'chevron-left', color: '#fff',size:40, onPress:()=>{navigation.goBack()} }}
        rightComponent={{icon: 'add', color:"#fff", size:40 }}
        />
      <TextInput
        mode="flat"
        placeholder="Titulo de la Receta"
        style={styles.titleInput}
        value={title}
        onChangeText={setTitle}
      />
     
      <TextInput
        multiline
        style={styles.contentInput}
        textAlignVertical="top"
        value={content}
        onChangeText={setContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleInput: {
    margin:10,
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "#fff",
  },
  contentInput: {
    flex: 1,
    margin:10,
    backgroundColor: "#fff",
    borderBottomWidth: 0,
  },
  iconBar: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default CreateNote;
