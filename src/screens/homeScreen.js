import React,{useState,useEffect,useContext} from 'react';
import { StyleSheet, View,ActivityIndicator,ScrollView,Dimensions,AsyncStorage,FlatList,RefreshControl } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {Text,Header} from "react-native-elements";
import getEnvVars from "../../environment";
import {Context as RecipeContext} from "../context/recipes";
import {backend} from "../api/backend";
import Carousel from '../components/Carousel';
import Box from '../components/Box';
import { Context as AuthContext } from "../context/AuthContext";

const {apiKeyS} = getEnvVars();
const { width, height } = Dimensions.get('window')

const homeScreen = ({navigation}) =>{

    const [recipes,setRecipes] = useState(null);
    const [refreshing,setRefreshing] = useState(false);
    const [urecipes,setURecipes] = useState(null);
    const { state, signout } = useContext(AuthContext);
    const {getRecipes} = useContext(RecipeContext);

    const onRefresh = () =>{
        setRefreshing(true);
        newGet();
        setRefreshing(false);
    }

    const fetchRecipes = async () => {
        const recipesArray = await AsyncStorage.getItem(`recipesArray`);
        if(recipesArray == null){
            const data = await backend.get(`?apiKey=${apiKeyS}&number=5`);
            await AsyncStorage.setItem("recipesArray",JSON.stringify(data.data.results));
            setRecipes(data.data.results);
        }else{
            setRecipes(JSON.parse(recipesArray));
            //console.log(JSON.parse(recipesArray));
        }  
    };

    const newGet = async() =>{
        const newrecipes = await getRecipes();
        console.log(newrecipes);
        setURecipes(newrecipes);
    }

    useEffect(()=>{

        fetchRecipes();
        newGet();
    },[])

    if(!recipes || !urecipes){
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
            rightComponent={<AntDesign name="user" size={30} color="white" onPress={()=>{signout()}} />}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text h4 style={{marginLeft:width*0.03}}>Hola, {state.user.name} Deberias Probar...</Text>
                    <Carousel data={recipes} navigation={navigation}/>
                </View>
                <View style={[styles.section]}>
                    <Text h4 style={{marginLeft:width*0.03}}>Recientemente Publicadas</Text>
                    <FlatList
                    data={urecipes}
                    keyExtractor={(item)=>item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => {
                        return(
                            <View style={{flexDirection:'row'}}>
                                <Box title={item.titulo} image={{uri:item.imagen}} backgroundClr={"#fabd05"}/>
                            </View>
                        )
                        }
                }
            />
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
       marginTop:height*0.02
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