import React,{useEffect, useState} from "react";
import { View,Text,FlatList,TextInput,StatusBar,StyleSheet,ActivityIndicator,Dimensions } from "react-native";
import Card from "../components/Card";
import { SearchBar } from "react-native-elements";
import {getRecipes} from "../api/recipes";
import Icon from "react-native-vector-icons/FontAwesome";
const {width,height} = Dimensions.get("window");


const userRecipesScreen = () =>{

    const [recipes, setRecipes] = useState(null);
    const [search,setSearch] = useState("");

    const newGet = async() =>{
        const newrecipes = await getRecipes();
        console.log(newrecipes);
        setRecipes(newrecipes);
    }

    useEffect(()=>{
        newGet();
    },[])

    if(!recipes){
        return(
            <View style={styles.activity}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput  
                    style={styles.inputText}
                    placeholder="Search..." 
                    placeholderTextColor="#aaa"
                    onChangeText={setSearch}
                />
                <Icon
                    name="search"
                    style={styles.passwordIcon}
                    size={width*0.06}
                    color="grey"
                    
                />
            </View>
            <TextInput style={{marginLeft:20}}/>
            <FlatList
                data={recipes}
                keyExtractor={(item)=>item.id}
                renderItem={({item}) => {
                    return(
                        <View>
                            <Card item={item}/>  
                        </View>
                    )
                    }
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        marginTop:StatusBar.currentHeight+5,
        backgroundColor:"#fff"
    },
    activity:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    inputView:{
        width:"97%",
        backgroundColor:"#fafafa",
        borderRadius:20,
        height:height*0.065,
        justifyContent:"center",
        padding:20
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
})


export default userRecipesScreen;