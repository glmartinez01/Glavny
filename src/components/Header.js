import React,{useContext} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//import Logo from "./HeaderLogo.js";
//import { ThemeContext } from "../theme";

const {width, height} = Dimensions.get("window");

export default function Header({leftComponent,centerComponent,rightComponent}) {

  //const {theme, ContextStyles} = useContext(ThemeContext);

//   const back = () => {
//     navigation.pop();
//   }
  
  
  return (
    <View style={styles.header}>
        <View style={{alignItems:'center',justifyContent:'center',height:50,width:50,borderRadius:5,backgroundColor:"#fafafa"}}>
            {leftComponent}
        </View>
      
      <View style={{flex:1,paddingHorizontal:20,justifyContent:'center'}}>
        {centerComponent}
      </View>
      <View style={{alignItems:'flex-end',justifyContent:'center'}}>
        {rightComponent}
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

