import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Dimensions, Image, View } from "react-native";
import {Text} from "react-native-elements";

const { width, height } = Dimensions.get("screen");

const Box = ({title, image, accion, backgroundClr }) => {
  
  return (
    <View style={{alignItems:"center"}}>
    <TouchableOpacity onPress={accion}>
      <View style={[styles.caja,backgroundClr?{backgroundColor:backgroundClr}:null]}>
        <Image style={ styles.img} source={image}/>
      </View>
    </TouchableOpacity>
    <View style={{width:width*0.35,justifyContent:"center"}}>
    <Text style={styles.texto}>{title}</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  caja:{
    height: height*0.14,
    width: width*0.32,
    margin:10,
    marginRight:5,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius:30
  },
  texto:{
    color:'#000',
    textAlign:"center",
    padding:5,
    fontSize:width*0.04,
    fontWeight:"bold"
  },
  img:{
    width: "100%",
    height: "100%",
    borderRadius:10,

  }
});

export default Box;