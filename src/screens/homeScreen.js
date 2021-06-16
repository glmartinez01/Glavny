import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const homeScreen = () =>{
    return(
        <View style={styles.container}>
            <Text>New App</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:"center",
        justifyContent:"center"
    }
});


export default homeScreen;