import React,{useEffect, useState,useContext} from "react";
import { View,FlatList,StatusBar,ActivityIndicator,Dimensions } from "react-native";
import { Text,Header } from "react-native-elements";
import FabButton from "../components/FabButton";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Context as AuthContext } from "../context/AuthContext";
import {Context as RecipeContext} from "../context/recipes";
import Recetas from "../components/Recetas";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

const { width, height } = Dimensions.get('window')

const myRecipesScreen = ({navigation}) =>{

    const [recipes,setRecipes] = useState(null);
    const [refresh,setRefresh] = useState(false);
    const [fontLoaded, setFontLoaded] = useState(false);

    const {state} = useContext(AuthContext);
    const {recipesState,getRecipesbyId,dispatch} = useContext(RecipeContext);
    

    const newGet = async() =>{
        const newrecipes = await getRecipesbyId(state.user.id);
       // console.log(newrecipes);
        setRecipes(newrecipes);
    }

    const loadFonts = () => {
        return Font.loadAsync({
            "oregano-regular":require("../../assets/fonts/Oregano-Regular.ttf")
        });
    }


    useEffect(() => {
        //console.log(recipesState);
        if(recipesState.shouldRefreshUserRecipes){
            newGet();
            dispatch({type:"refresh",
                    payload:{shouldRefreshHome:recipesState.shouldRefreshHome,
                            shouldRefreshUserRecipes:false}})
            //console.log(recipesState);
        }
        
    }, [recipesState]);

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
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        )
    }

    if(recipes.length < 1){
        return(
            <View style={{flex:1,alignItems:"center",marginTop:10}}>
                <Header rightComponent={<MaterialCommunityIcons name="chef-hat" size={30} color="white" />} 
                        statusBarProps={{backgroundColor:"#fabd05"}}
                        containerStyle={{backgroundColor:"#fabd05"}}
                        centerComponent={<Text style={{color:"white",fontFamily:"oregano-regular",fontSize:30}}>Chef {state.user.short}</Text>}/>
                <Text h4 style={{textAlign:"center",marginTop:'50%'}}>¡No tienes recetas agrega una usando el menu!</Text>
                <FabButton style={{bottom:80,right:60}} addRecipe={()=>{navigation.navigate('addrecipe',{id:state.user.id,username:state.user.name})}}/>
            </View>
            
        )
    }
    
    return(
        <View style={{flex:1,marginTop:10}}>
            <Header rightComponent={<MaterialCommunityIcons name="chef-hat" size={30} color="white" />} 
                    statusBarProps={{backgroundColor:"#fabd05"}}
                    containerStyle={{backgroundColor:"#fabd05"}}
                    centerComponent={<Text style={{color:"white",fontFamily:"oregano-regular",fontSize:30}}>Chef {state.user.short}</Text>}/>

            <View style={{marginTop:10}}>
                <FlatList
                    data={recipes}
                    keyExtractor={(item)=>item.id}
                    numColumns={2}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        marginBottom: 15,
                      }}
                    renderItem={({item}) => {
                        return(
                            
                            <View style={{width:'50%',marginTop:5}}>
                                <Recetas title={item.titulo} accion={()=>{navigation.navigate('fbaseRecipeScreen',{recipeInfo:item})}} image={{uri:item.imagen}}/>
                            </View>
                        )
                        }
                    }
                /> 
            </View>
            <FabButton style={{bottom:80,right:60}} addRecipe={()=>{navigation.navigate('addrecipe',{id:state.user.id,username:state.user.name})}}/>
        </View>
    );
}

export default myRecipesScreen;