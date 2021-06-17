import React from "react";
import {StyleSheet,View,Text,ScrollView } from "react-native";
// import {ScrollView} from "react-native-gesture-handler";

function Card(props){
  return(
    <View style={styles.card}>
        <View style ={styles.cardContent}>
            {props.children}
        </View>
    </View>
  );
}



const styles = StyleSheet.create({

    card:{
        borderRadius:6,
        elevation:3,
        backgroundColor:"#ffff",
        shadowOffset:{width:1, height:1}, 
        shadowColor: "#333",
        shadowOpacity:0.3,
        shadowRadius:2,
        marginHorizontal:4,
        marginVertical:6
    },
    cardContent: {
        marginHorizontal:0,
        marginVertical:0,

    },
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
    
});


export default Card;