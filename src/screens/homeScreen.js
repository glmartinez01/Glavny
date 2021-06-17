import React,{useState,useEffect} from 'react';
import { StyleSheet, View,ActivityIndicator,ScrollView,Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {Text,Header} from "react-native-elements";
import getEnvVars from "../../environment";
import {backend} from "../api/backend";
import Carousel from '../components/Carousel';
import Box from '../components/Box';

const {apiKeyS} = getEnvVars();
const { width, height } = Dimensions.get('window')

const homeScreen = ({navigation}) =>{

    const [recipes,setRecipes] = useState(null);

    const fetchRecipes = async () => {
        const data = await backend.get(`?apiKey=${apiKeyS}&number=5`);
        setRecipes(data.data.results);
    };

    useEffect(()=>{

        fetchRecipes();

    },[])

    if(!recipes){
        return(
            <View style={styles.container}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <Header
            statusBarProps={{backgroundColor:"#fabd05"}}
            containerStyle={{backgroundColor:"#fabd05"}}
            centerComponent={{ text: 'Glavny', style: { color: '#fff',fontWeight:'bold',fontSize:20 } }}
            rightComponent={<AntDesign name="user" size={30} color="white" />}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text h3 style={{marginLeft:width*0.03}}>Deberias Probar...</Text>
                    <Carousel data={recipes} navigation={navigation}/>
                </View>
                <View style={[styles.section,{alignItems:'center'}]}>
                    <Text h3>Recientemente Publicadas</Text>
                    <View style={{flexDirection:'row'}}>
                        <Box title={"Receta 1"} backgroundClr={'#fabd05'}/>
                        <Box title={"Receta 2"} backgroundClr={'#fabd05'}/>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    section:{
       marginTop:height*0.05
    },
    sectionFun:{
        height:height*0.46,
        backgroundColor:"#FDE49B",
        borderTopRightRadius:50,
        borderTopLeftRadius:50,
        alignItems:'center',
        justifyContent:'center'
    }
});


export default homeScreen;