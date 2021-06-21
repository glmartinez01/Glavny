import React from "react";
import { View,Text } from "react-native";
import FabButton from "../components/FabButton";
import Icon from "react-native-vector-icons/FontAwesome";


const myRecipesScreen = ({navigation}) =>{
    return(
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <FabButton style={{bottom:80,right:60}} addRecipe={()=>{navigation.navigate('addrecipe')}}/>
        </View>
    );
}

export default myRecipesScreen;