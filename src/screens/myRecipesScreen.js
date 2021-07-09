import React,{useEffect, useState,useContext} from "react";
import { View,FlatList,StatusBar,ActivityIndicator,Dimensions } from "react-native";
import { Text } from "react-native-elements";
import FabButton from "../components/FabButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { Context as AuthContext } from "../context/AuthContext";
import {Context as RecipeContext} from "../context/recipes";
import Recetas from "../components/Recetas";

const { width, height } = Dimensions.get('window')

const myRecipesScreen = ({navigation}) =>{

    const [recipes,setRecipes] = useState(null);
    const [refresh,setRefresh] = useState(false);
    // const [update,setUpdate] = useState(false);
    const {state} = useContext(AuthContext);
    const {recipesState,getRecipesbyId,dispatch} = useContext(RecipeContext);
    

    const newGet = async() =>{
        const newrecipes = await getRecipesbyId(state.user.id);
       // console.log(newrecipes);
        setRecipes(newrecipes);
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

    if(!recipes){
        return(
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        )
    }
    
    return(
        <View style={{flex:1,marginTop:StatusBar.currentHeight+5,}}>
            <View >
                {recipes.length !=0 ? (<View>
                    <Text h4 style={{marginLeft:10}}>Tus Recetas, {state.user.name}</Text>
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
                            <View style={{margin:'4%'}}>
                                <Recetas title={item.titulo} image={{uri:item.imagen}}/>
                            </View>
                        )
                        }
                    }
                />
                </View>)
                :
                (<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text h4 style={{textAlign:"center"}}>¡No tienes recetas agrega una usando el menu!</Text>
                </View>)}
            </View>
            <FabButton style={{bottom:80,right:60}} addRecipe={()=>{navigation.navigate('addrecipe',{id:state.user.id,username:state.user.name})}}/>
        </View>
    );
}

export default myRecipesScreen;