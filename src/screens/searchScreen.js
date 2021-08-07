import React, {useState,useEffect,useContext} from "react";
import { StyleSheet, View,Image, TouchableOpacity,TouchableWithoutFeedback, Text,TextInput,Dimensions,StatusBar,ActivityIndicator,FlatList } from "react-native";
import {Context as RecipeContext} from "../context/recipes";
import Card from "../components/Card";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Ionicons } from '@expo/vector-icons';

const {width,height} = Dimensions.get("window");

const searchScreen = ({navigation}) => {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [recipes,setRecipes] = useState("");
    const [search,setSearch] = useState("");
    const [searching,setSearching] = useState("");
    const {getRecipesbyTitle} = useContext(RecipeContext);

    const shadowStyle = {
      shadowColor: "#000",
      shadowOffset: {
          width: 1,
          height: 1,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,

      elevation: 5,
    };

    const loadFonts = () => {
        return Font.loadAsync({
            "alata-regular": require("../../assets/fonts/Alata-Regular.ttf"),
            "oregano-regular":require("../../assets/fonts/Oregano-Regular.ttf")
        });
    }

    const newGet = async() =>{
      const newrecipes = await getRecipesbyTitle(search);
      console.log(newrecipes);
      setRecipes(newrecipes);
      setSearching(false);
    }

    const handleSearch = () =>{
      if(search){
        setSearching(true);
        newGet();
        
      }
    }
    useEffect(()=>{
      if(!search){
        setRecipes(null)
      }
    },[search])

    if(!fontLoaded){    
        return (
            <AppLoading
            startAsync={loadFonts}
            onFinish={() => setFontLoaded(true)}
            onError={(err) => console.log(err)}
            />
        );
    }


  if(searching){
    return(
      <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
        <ActivityIndicator color="#fabd05" size="large"/>
      </View>
    )
  }

  if(recipes){
    return(
      <View style={styles.container}>
        <View style={{marginTop:StatusBar.currentHeight,height:height*0.1,alignItems:"center",justifyContent:"center",backgroundColor:"#fabd05",flexDirection:"row"}}>
            <TextInput onChangeText={setSearch} value={search} style={styles.input} placeholder="Buscar..."/>
            <TouchableWithoutFeedback onPress={handleSearch}>
                <View style={[shadowStyle,{marginLeft:5,width:width*0.12,height:width*0.12,borderRadius:50,alignItems:"center",backgroundColor:'#fabd05'}]}>
                    <Ionicons name="search" color="white" size={width*0.08} style={{marginTop:height*0.007}} />
                </View>
            </TouchableWithoutFeedback>    
        </View>
        <FlatList
          data={recipes}
          keyExtractor={(item)=>item.id}
          renderItem={({item}) => {
              return(
                  
                      <Card item={item}/>  
                  
              )
              }
          }
      />

      </View>
    )
  }

  return (
    <View style={styles.container}>
        <View style={{marginTop:StatusBar.currentHeight,height:height*0.1,alignItems:"center",justifyContent:"center",backgroundColor:"#fabd05",flexDirection:"row"}}>
            <TextInput onChangeText={setSearch} value={search} style={styles.input} placeholder="Buscar..."/>
            <TouchableWithoutFeedback onPress={handleSearch}>
                <View style={[shadowStyle,{marginLeft:5,width:width*0.12,height:width*0.12,borderRadius:50,alignItems:"center",backgroundColor:'#fabd05'}]}>
                    <Ionicons name="search" color="white" size={width*0.08} style={{marginTop:height*0.007}} />
                </View>
            </TouchableWithoutFeedback>   
        </View>
        
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('category',{categoria:"Desayuno"})}}>
            <Image source={require('../../assets/project/desayuno.jpeg')} style={styles.img} resizeMode="cover"/>
            <Text style={styles.textoCategories}>Desayuno</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLeft} onPress={()=>{navigation.navigate('category',{categoria:"Ensaladas"})}} >
            <Image source={require('../../assets/project/ensaladas.jpeg')} style={styles.img} resizeMode="cover"/>
          <Text style={styles.textoCategories}>Ensaladas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button4} onPress={()=>{navigation.navigate('category',{categoria:"Bebidas"})}}>
        <Image source={require('../../assets/project/bebidas.jpeg')} style={styles.img} resizeMode="cover"/>
            <Text style={styles.textoCategories}>Bebidas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLeft} onPress={()=>{navigation.navigate('category',{categoria:"Postres"})}}>
        <Image source={require('../../assets/project/postres.jpeg')} style={styles.img} resizeMode="cover"/>
            <Text style={styles.textoCategories}>Postres</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button5} onPress={()=>{navigation.navigate('category',{categoria:"Mariscos"})}}>
        <Image source={require('../../assets/project/mariscos.jpeg')} style={styles.img} resizeMode="cover"/>

          <Text style={styles.textoCategories}>Mariscos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLeft} onPress={()=>{navigation.navigate('category',{categoria:"Pasta"})}}>
        <Image source={require('../../assets/project/pastas.jpeg')} style={styles.img} resizeMode="cover"/>

          <Text style={styles.textoCategories}>Pasta</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button7} onPress={()=>{navigation.navigate('category',{categoria:"Snacks"})}}>
        <Image source={require('../../assets/project/snacks.jpeg')} style={styles.img} resizeMode="cover"/>

          <Text style={styles.textoCategories}>Snacks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLeft} onPress={()=>{navigation.navigate('category',{categoria:"Fitness"})}}>
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
    input:{
      height: height*0.06,
      width: width*0.75,
      color:"#000", 
      backgroundColor: "rgba(242,242,242,1)",
      fontSize:15,
      borderRadius:5,
      paddingLeft: 20,
      paddingRight: 20,
      alignContent:"center",
      alignItems: "center",
    },
    passwordIcon: {
        position:"absolute",
       
        borderRadius:50,
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
  
  buttonLeft: {
    borderRadius:20,
    width: 158,
    height: 99,
    backgroundColor: "rgba(250,189,5,1)",
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
