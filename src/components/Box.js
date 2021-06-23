import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Dimensions, Image, View } from "react-native";
import {Text} from "react-native-elements";

const { width, height } = Dimensions.get("screen");

const Box = ({title, image, accion, style,backgroundClr }) => {
  let estilo = style == 0 ? styles.caja : (style == 1 ? styles.genres : (style == 2 ? styles.artist : (style == 3 ? styles.artistPhoto : styles.caja)))
  return (
    <View style={{alignItems:"center"}}>
    <TouchableOpacity onPress={accion}>
      <View style={[estilo,backgroundClr?{backgroundColor:backgroundClr}:null]}>
        <Image style={ styles.img} source={image}/>
      </View>
    </TouchableOpacity>
    {style == 3 ? null :<Text style={styles.texto} numberOfLines={1}>{title}</Text>}
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
  genres:{
    height: width*0.32,
    width: width*0.32,
    marginLeft: 5,
    justifyContent: "center",
    alignContent: "center",
    overflow: "hidden"
  },
  artist:{
    height: width*0.45,
    width: width*0.45,
    resizeMode:"contain",
    marginTop:10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignContent: "center",
    overflow: "hidden"
  },
  artistPhoto:{
    height: height*0.25,
    width: width*0.25,
    marginTop:0,
    marginLeft: 5,
    marginRight: 5,
    marginBottom:0,
    justifyContent: "center",
    alignContent: "center",
    overflow: "hidden"
  },
  texto:{
    color:'#000',
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