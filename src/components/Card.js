import React from "react";
import {StyleSheet,Image,TouchableOpacity,View,Dimensions } from "react-native";
import {Text} from "react-native-elements";
// import {ScrollView} from "react-native-gesture-handler";

const {width,height} = Dimensions.get("window");

function Card({item,onPress}){
    const shadowStyle = {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      };

  return(
        <TouchableOpacity
            style={[styles.container,shadowStyle]}
            onPress={onPress}
        >
            <Image  source={{uri:item.imagen}}
                    resizeMode="cover"
                    style={styles.img}
                    />
            <View style={[styles.details]}>
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
        marginTop:5,
        marginBottom:5,
        padding:width*0.015,
        borderRadius:20,
        backgroundColor: "rgba(242,242,242,1)",
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