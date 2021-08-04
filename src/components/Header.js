import React,{useContext} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//import Logo from "./HeaderLogo.js";
//import { ThemeContext } from "../theme";

const {width, height} = Dimensions.get("window");

export default function Header({accion}) {

  //const {theme, ContextStyles} = useContext(ThemeContext);

//   const back = () => {
//     navigation.pop();
//   }
  
  
  return (
    <View style={{flexDirection:"row",backgroundColor:"#fabd05",marginTop:StatusBar.currentHeight}}>
        <View style={{alignItems:'center',justifyContent:'center',height:50,width:50,borderRadius:5}}>
        <TouchableOpacity style={{height:50,width:50,borderRadius:5,marginLeft:10}} onPress={()=> navigation.goBack()}>
            <Ionicons name="ios-arrow-back" size={35} color="white"/>
        </TouchableOpacity>
        </View>
        <View style={{flex:1,justifyContent:'center'}}/>
        <View style={{alignItems:'flex-end',justifyContent:'center',marginRight:10,marginTop:5}}>
            <TouchableOpacity style={{height:50,width:50,borderRadius:5}} onPress={accion}>
                <Icon name="cloud-upload" size={35} color="white"/> 
            </TouchableOpacity> 
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: width,
    height: height,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize:  width*0.05,
    letterSpacing: 1,
  },
  icon: {
    position: 'absolute',
    left: 16,
  }
});

