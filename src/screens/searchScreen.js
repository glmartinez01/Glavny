import React, {useState} from "react";
import { StyleSheet, View,Image, TouchableOpacity, Text,TextInput,Dimensions,StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Icon from "react-native-vector-icons/FontAwesome";

const {width,height} = Dimensions.get("window");

const searchScreen = () => {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [search,setSearch] = useState("");
    const loadFonts = () => {
        return Font.loadAsync({
            "alata-regular": require("../../assets/fonts/Alata-Regular.ttf"),
        });
    }
    if(!fontLoaded){    
        return (
            <AppLoading
            startAsync={loadFonts}
            onFinish={() => setFontLoaded(true)}
            onError={(err) => console.log(err)}
            />
        );
    }
  return (
    <View style={styles.container}>
        <View style={{backgroundColor:"#fabd05"}}>
        <View style={styles.inputView}>
                <TextInput  
                    style={styles.inputText}
                    placeholder="Search..." 
                    
                    onChangeText={setSearch}
                />
                <Icon
                    name="search"
                    style={styles.passwordIcon}
                    size={width*0.06}
                    color="rgba(206,206,210,1)"
                    
                />
            </View>
        </View>
        
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
            <Image source={require('../../assets/project/desayuno.jpeg')} style={styles.img} resizeMode="cover"/>
            <Text style={styles.textoCategories}>Desayuno</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
            <Image source={require('../../assets/project/ensaladas.jpeg')} style={styles.img} resizeMode="cover"/>
          <Text style={styles.textoCategories}>Ensaladas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button4}>
        <Image source={require('../../assets/project/bebidas.jpeg')} style={styles.img} resizeMode="cover"/>
            <Text style={styles.textoCategories}>Bebidas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button3}>
        <Image source={require('../../assets/project/postres.jpeg')} style={styles.img} resizeMode="cover"/>
            <Text style={styles.textoCategories}>Postres</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button5}>
        <Image source={require('../../assets/project/mariscos.jpeg')} style={styles.img} resizeMode="cover"/>

          <Text style={styles.textoCategories}>Mariscos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button6}>
        <Image source={require('../../assets/project/pastas.jpeg')} style={styles.img} resizeMode="cover"/>

          <Text style={styles.textoCategories}>Pasta</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button7}>
        <Image source={require('../../assets/project/snacks.jpeg')} style={styles.img} resizeMode="cover"/>

          <Text style={styles.textoCategories}>Snacks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button8}>
        <Image source={require('../../assets/project/fitness.jpeg')} style={styles.img} resizeMode="cover"/>

          <Text style={styles.textoCategories}>Fitness</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputView:{
    marginTop:StatusBar.currentHeight+5,
    width:"97%",
    backgroundColor:"rgba(242,242,242,1)",
    alignSelf:"center",
    borderRadius:20,
    height:height*0.065,
    justifyContent:"center",
    padding:20,
    marginBottom:10
    },
    inputText:{
        height:50,
        color:"black"
    },
    passwordIcon: {
        position:"absolute",
        top: height*0.015,
        right:width*0.05,
    },
    img:{
        width: 158,
        height: 99,
        borderRadius:20,
        opacity:1
    },
  button: {
    borderRadius:20,
    width: 158,
    height: 99,
    backgroundColor: "rgba(250,189,5,1)"
  },
  
  button2: {
    borderRadius:20,
    width: 158,
    height: 99,
    backgroundColor: "rgba(209,240,117,1)",
    marginLeft: 26
  },
  textoCategories: {
    fontFamily: "alata-regular",
    padding:2,
    borderRadius:5,
    backgroundColor:"rgba(0,0,0,0.5)",
    fontWeight:"bold",
    color: "rgba(253,255,242,1)",
    position:"absolute",
    marginTop: 20,
    marginLeft: 17
  },
  buttonRow: {
    height: 99,
    flexDirection: "row",
    marginTop: 20,
    marginLeft: width*0.027,
    marginRight: width*0.25
  },
  button4: {
    borderRadius:20,
    width: 158,
    height: 99,
    backgroundColor: "rgba(250,189,5,1)"
  },
  bebidas: {
    fontFamily: "alata-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 17,
    marginLeft: 17
  },
  button3: {
    borderRadius:20,
    width: 158,
    height: 99,
    backgroundColor: "rgba(250,189,5,1)",
    marginLeft: 26
  },
  postres: {
    fontFamily: "alata-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 17,
    marginLeft: 11
  },
  button4Row: {
    height: 99,
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 10,
    marginRight: 19
  },
  button5: {
    borderRadius:20,
    width: 158,
    height: 99,
    backgroundColor: "rgba(250,189,5,1)"
  },
  mariscos: {
    fontFamily: "alata-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 19,
    marginLeft: 17
  },
  button6: {
    borderRadius:20,
    width: 158,
    height: 99,
    backgroundColor: "rgba(250,189,5,1)",
    marginLeft: 26
  },
  pasta: {
    fontFamily: "alata-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 19,
    marginLeft: 11
  },
  button5Row: {
    height: 99,
    flexDirection: "row",
    marginTop: 31,
    marginLeft: 10,
    marginRight: 19
  },
  button7: {
    borderRadius:20,
    width: 158,
    height: 99,
    backgroundColor: "rgba(250,189,5,1)",
    marginTop: -1
  },
  snacks: {
    fontFamily: "alata-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 17,
    marginLeft: 19
  },
  button8: {
    borderRadius:20,
    width: 158,
    height: 99,
    backgroundColor: "rgba(250,189,5,1)",
    marginLeft: 26,
    marginTop: -1
  },
  fitness: {
    fontFamily: "alata-regular",
    color: "rgba(255,255,255,1)",
    marginTop: 17,
    marginLeft: 12
  },
  button7Row: {
    height: 99,
    flexDirection: "row",
    marginTop: 26,
    marginLeft: 10,
    marginRight: 19
  }
});

export default searchScreen;
