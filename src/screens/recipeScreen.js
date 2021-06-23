import React,{useState,useEffect, useRef} from 'react';
import {View,Animated,Image,TouchableOpacity,StatusBar,ActivityIndicator,FlatList,AsyncStorage} from "react-native";
import { Text } from 'react-native-elements';
import getEnvVars from "../../environment";
import CreatorCard from '../components/CreatorCard';
import Icon from "react-native-vector-icons/FontAwesome";


const {apiKeyS} = getEnvVars();
const headerHeight = 350;

const recipeScreen = ({navigation,route}) =>{

    const {currentRecipe} = route.params;
    const [recipeInfo,setRecipeInfo] = useState(null);
    const [instructions,setInstructions] = useState(null);
    const scrollY = useRef(new Animated.Value(0)).current;

    const fecthInfo = async () => {
        const recipeInfo = await AsyncStorage.getItem(`recipeinfo${currentRecipe.id}`);
        if(recipeInfo == null){
            const endpoint = `https://api.spoonacular.com/recipes/${currentRecipe.id}/information?apiKey=${apiKeyS}`;
      
            const response = await fetch(endpoint);
            const data = await response.json();
            
            await AsyncStorage.setItem(`recipeinfo${currentRecipe.id}`,JSON.stringify(data));
            setRecipeInfo(data);
        }else{
            setRecipeInfo(JSON.parse(recipeInfo));
        }
        
    };

    // const fetchInstructions = async () =>{
    //     const endpoint = `https://api.spoonacular.com/recipes/${currentRecipe.id}/analyzedInstructions?apiKey=${apiKeyS}`;

    //     const response = await fetch(endpoint);
    //     const data = await response.json();

    //     setInstructions(data[0].steps);
    //     console.log(instructions);
    // }

    function renderRecipeCardHeader(){
        return(
            <View style={{alignItems:'center',overflow:'hidden'}}>
                <Animated.Image resizeMode="contain" source={{uri:currentRecipe.image}}
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
                    <CreatorCard name={recipeInfo.creditsText}/>
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
            </View>
        )
    }

    useEffect(()=>{
        fecthInfo();
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
                data={recipeInfo.extendedIngredients}
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
                            <Image style={{height:40,width:40}} source={{uri:`https://spoonacular.com/cdn/ingredients_500x500/${item.image}`}}/>
                        </View>
                        <View style={{flex:1,paddingHorizontal:20,justifyContent:'center'}}>
                            <Text style={{fontSize:16,fontWeight:'bold'}}>{item.nameClean}</Text>
                        </View>
                        <View style={{alignItems:'flex-end',justifyContent:'center'}}>
                           <Text style={{fontSize:14,fontStyle:'italic'}}>{item.measures.metric.amount} {item.measures?.metric.unitShort}</Text> 
                        </View>
                    </View>
                )}
            />
            {renderHeaderBar()}
        </View>

    );

}


export default recipeScreen;