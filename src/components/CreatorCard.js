import React,{useContext} from "react";
import { View,Platform,StyleSheet,Text,Image,TouchableOpacity } from "react-native";
import {BlurView} from "expo-blur";
import Icon from "react-native-vector-icons/FontAwesome";


export default CreatorCard = ({name,image,navigation}) =>{
    return(
        
        <View style={{flex:1}}>
                <BlurView intensity={95} style={[StyleSheet.absoluteFill,{borderRadius:10}]} tint="dark"/>
                <View style={{flex:1,flexDirection:"row",alignItems:"center"}}>
                    <View style={{width:40,height:40,borderRadius:20,marginLeft:5}}>
                        <Image style={{width:40,height:40}} source={image ? image : require('../../assets/project/forks.png')}/>
                    </View>
                    <View style={{flex:1,marginHorizontal:20}}>
                        <Text style={{color:"#aaa",fontSize:14,fontStyle:"italic"}}>Receta hecha por:</Text>
                        <Text style={{color:"#fff",fontSize:16,fontWeight:"bold"}}>{name}</Text>
                    </View>
                    <View style={{alignItems:"flex-end",marginRight:20}}>
                        <TouchableOpacity onPress={navigation} style={{borderRadius:10,borderColor:"#fff",borderWidth:1,width:30,height:30,alignItems:"center"}}>
                        <Icon name="arrow-right" size={25} color="#fff"/>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
        
    )
}