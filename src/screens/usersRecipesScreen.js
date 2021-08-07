import React,{useEffect, useState,useContext} from "react";
import { View,FlatList,TouchableOpacity,StatusBar,StyleSheet,ActivityIndicator,Dimensions,RefreshControl } from "react-native";
import { Text,Header } from "react-native-elements";
import Card from "../components/Card";
import { SearchBar } from "react-native-elements";
import {Context as RecipeContext} from "../context/recipes";
import Icon from "react-native-vector-icons/FontAwesome";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
const {width,height} = Dimensions.get("window");


const userRecipesScreen = ({navigation,route}) =>{

    const [recipes, setRecipes] = useState(null);
    const [search,setSearch] = useState("");
    const [fontLoaded, setFontLoaded] = useState(false);
    const [refreshing,setRefreshing] = useState(false);
    const {getRecipesbyCategory} = useContext(RecipeContext);
    const {categoria} = route.params;

    const newGet = async() =>{
        const newrecipes = await getRecipesbyCategory(categoria);
        //console.log(newrecipes);
        setRecipes(newrecipes);
    }

    const onRefresh = () =>{
        setRefreshing(true);
        newGet();
        setRefreshing(false);
    }
    const loadFonts = () => {
        return Font.loadAsync({
            "oregano-regular":require("../../assets/fonts/Oregano-Regular.ttf")
        });
    }

    useEffect(()=>{
        newGet();
    },[])

    if(!fontLoaded){    
        return (
            <AppLoading
            startAsync={loadFonts}
            onFinish={() => setFontLoaded(true)}
            onError={(err) => console.log(err)}
            />
        );
    }

    if(!recipes){
        return(
            <View style={styles.activity}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <Header
                backgroundColor="#fabd05"
                leftComponent={
                    <TouchableOpacity style={{
                        alignItems:'center',
                        justifyContent:'center',
                        height:35,
                        width:35,
                        borderRadius:18,
                        borderWidth:1,
                        borderColor:"#F5F6FB",
                        backgroundColor:'rgba(2, 2, 2, 0.5)'
                    }} onPress={()=>{navigation.goBack()}}>
                        <Icon name="angle-left" size={30} color="#F5F6FB" style={{marginRight:2}}/>
                    </TouchableOpacity>
                }
                centerComponent={<Text style={{color:"white",fontFamily:"oregano-regular",fontSize:30}}>{categoria}</Text>}
            />
            <FlatList
                data={recipes}
                keyExtractor={(item)=>item.id}
                ListEmptyComponent={
                    <View style={{alignSelf:"center",marginTop:'50%'}}>
                        <Text style={{fontSize:20,fontWeight:"bold"}}>No hay recetas para esta categoria.</Text>
                        <Text style={{fontSize:20,fontWeight:"bold"}}>¡Puedes colaborar agregando una!</Text>
                    </View>
                }
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                renderItem={({item}) => {
                    return(
                        <View>
                            <Card onPress={()=>{navigation.navigate('fbaseRecipeScreen',{recipeInfo:item})}} item={item}/>  
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
        justifyContent:"center",
        marginTop:10,
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
})


export default userRecipesScreen;