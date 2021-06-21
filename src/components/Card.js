import React from "react";
import {StyleSheet,Image,TouchableOpacity,View,Dimensions } from "react-native";
import {Text} from "react-native-elements";
// import {ScrollView} from "react-native-gesture-handler";

const {width,height} = Dimensions.get("window");

function Card({item,onPress}){
  return(
    
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <Image  source={{uri:item.imagen}}
                    resizeMode="cover"
                    style={styles.img}
                    />
            <View style={styles.details}>
                <Text h4 style={{flex:1}}>{item.titulo}</Text>
                <Text style={{color:"#aaa",fontStyle:"italic"}}>Autor: {item.publicado_por}</Text>
            </View>
        
        </TouchableOpacity>


  );
}



const styles = StyleSheet.create({

    container:{
        flexDirection:"row",
        alignItems:"center",
        padding:width*0.015,
        borderRadius:20,
        backgroundColor:"#fafafa",
    },
    img:{
        width:100,
        height:100,
        borderRadius:20
    },
    details:{
        width:"68%",
        paddingHorizontal:20
    }
    
});


export default Card;