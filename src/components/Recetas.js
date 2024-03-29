import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Dimensions, Image, View } from "react-native";
import {Text} from "react-native-elements";

const { width, height } = Dimensions.get("screen");

const Recetas = ({title, image, accion, backgroundClr }) => {
  
  return (
    <View style={{alignItems:"center"}}>
    <TouchableOpacity onPress={accion}>
      <View style={[styles.caja,backgroundClr?{backgroundColor:backgroundClr}:null]}>
        <Image style={ styles.img} source={image}/>
          
          <Text style={styles.texto}>{title}</Text>
          
        
      </View>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  caja:{
    height: width*0.4,
    width: width*0.4,
    margin:0,
    borderRadius:5,
    overflow: "hidden",
    position: 'relative',
    shadowColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,

  },
  texto:{
    backgroundColor:'rgba(0,0,0,0.7)',
    height:height*0.5,
    width:width*0.5,
    color:'#fff',
    padding: width*0.02,
    paddingTop:height*0.01,
    fontSize:width*0.04,
    position: "absolute",
    top: '65%'
  },
  img:{
    width: "100%",
    height: "100%",

  }
});

export default Recetas;