import React,{useState,useEffect, useRef,useContext} from 'react';
import {View,Animated,Image,TouchableOpacity,StatusBar,ActivityIndicator,FlatList,AsyncStorage} from "react-native";
import { Text } from 'react-native-elements';
import CreatorCard from '../components/CreatorCard';
import Icon from "react-native-vector-icons/FontAwesome";
import getEnvVars from "../../environment";
import { Linking } from 'react-native';
import { Context as AuthContext } from "../context/AuthContext";


const {apiKeyS} = getEnvVars();
const headerHeight = 350;

const fbaseRecipeScreen = ({navigation,route}) =>{

    const { state, signout } = useContext(AuthContext);

    const {recipeInfo,ejemplo} = route.params;
    // const [recipeInfo,setRecipeInfo] = useState(null);
    const [instructions,setInstructions] = useState(null);
    const scrollY = useRef(new Animated.Value(0)).current;


    const navigationlink = () =>{
        if(recipeInfo.instrucciones?.length > 0 ){
            navigation.navigate("recipeinstructions",{instrucciones:recipeInfo.instrucciones})
            //console.log(recipeInfo.instrucciones);
        }
    }

    function renderRecipeCardHeader(){
        return(
            <View style={{alignItems:'center',overflow:'hidden'}}>
                <Animated.Image resizeMode="cover" source={{uri:recipeInfo.imagen}}
                                style={{height:headerHeight,width:"200%",
                                        transform:[
                                            {
                                                translateY:scrollY.interpolate({
                                                    inputRange:[-headerHeight,0,headerHeight],
                                                    outputRange:[-headerHeight/2,0,headerHeight*0.75]
                                                    }
                                                )
                                            },
                                            {
                                                scale: scrollY.interpolate({
                                                    inputRange:[-headerHeight,0,headerHeight],
                                                    outputRange:[2,1,0.75]
                                                })
                                            }
                                        ]}}
                />
                <Animated.View style={{position:'absolute',bottom:10,left:30,right:30,height:80,
                                        transform:[
                                            {
                                                translateY:scrollY.interpolate({
                                                    inputRange:[0,170,250],
                                                    outputRange:[0,0,100],
                                                    extrapolate:'clamp'
                                                })
                                            }
                                        ]}}>
                    <CreatorCard name={recipeInfo.publicado_por} navigation={()=>{navigation.navigate("recipeinstructions",{instrucciones:recipeInfo.instrucciones})}}/>
                </Animated.View>
            </View>
        )
    }

    function renderHeaderBar(){
        return(
            <View style={{position:'absolute',top:0,left:0,right:0,height:90,flexDirection:'row',alignItems:'flex-end',justifyContent:"space-between",paddingHorizontal:24,paddingBottom:10}}>
                <Animated.View
                    style={{position:'absolute',top:0,left:0,right:0,bottom:0,backgroundColor:"#fabd05",
                            opacity:scrollY.interpolate({
                                inputRange:[headerHeight-100,headerHeight-70],
                                outputRange:[0,1]
                            })}}
                />
                <TouchableOpacity style={{
                    alignItems:'center',
                    justifyContent:'center',
                    height:35,
                    width:35,
                    borderRadius:18,
                    borderWidth:1,
                    borderColor:"#F5F6FB",
                    backgroundColor:'rgba(2, 2, 2, 0.5)'
                }} onPress={()=>{navigation.goBack()}}>
                    <Icon name="angle-left" size={30} color="#F5F6FB" style={{marginRight:2}}/>
                </TouchableOpacity>
                {recipeInfo.userID == state.user.id ? 
                    <TouchableOpacity style={{alignItems:'center',justifyContent:'center',height:35,width:35,
                    borderRadius:18,
                    borderWidth:1,
                    borderColor:"#F5F6FB",
                    backgroundColor:'rgba(2, 2, 2, 0.5)'}}
                    onPress={()=>{navigation.navigate('addrecipe',{recipeInfo:recipeInfo})}}>
                        <Icon name="edit" size={24} color="#F5F6FB" style={{marginLeft:3}}/>
                    </TouchableOpacity>
                :null}
                
            </View>
        )
    }

    useEffect(()=>{
        console.log(recipeInfo);
        //fetchInstructions();
    },[])
    
    if(!recipeInfo){
        return(
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        )
    }

    return(

        <View style={{flex:1,backgroundColor:"#fff"}}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Animated.FlatList
                data={recipeInfo.ingredientes}
                keyExtractor={(item)=>`${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {renderRecipeCardHeader()}
                    </View>
                    
                }
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    {nativeEvent: {contentOffset:{y:scrollY}}}
                ],{useNativeDriver:true})}
                renderItem={({item})=>(
                    <View style={{flexDirection:'row',paddingHorizontal:30,marginVertical:5}}>
                        <View style={{alignItems:'center',justifyContent:'center',height:50,width:50,borderRadius:5,backgroundColor:"#fafafa"}}>
                            <Image style={{height:40,width:40}} source={require('../../assets/project/ingredient.png')}/>
                        </View>
                        <View style={{flex:1,paddingHorizontal:20,justifyContent:'center'}}>
                            <Text style={{fontSize:16,fontWeight:'bold'}}>{item.name}</Text>
                        </View>
                        <View style={{alignItems:'flex-end',justifyContent:'center'}}>
                           <Text style={{fontSize:14,fontStyle:'italic'}}>{item.quantity}</Text> 
                        </View>
                    </View>
                )}
            />
            {renderHeaderBar()}
        </View>

    );

}


export default fbaseRecipeScreen;