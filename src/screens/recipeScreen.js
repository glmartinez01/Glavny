import React,{useState,useEffect} from 'react';
import {View,Text} from "react-native";


const recipeScreen = ({route}) =>{

    const {id} = route.params;
    
    return(

        <View style={{flex:1,alignItems:'center',justifyContent:"center"}}>
            <Text>{id}</Text>
        </View>

    );

}


export default recipeScreen;