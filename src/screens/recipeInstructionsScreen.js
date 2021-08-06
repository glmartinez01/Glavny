import React,{useEffect,useContext, useState} from "react";
import {View,Image,TouchableOpacity,StatusBar,ActivityIndicator,FlatList,AsyncStorage,Linking} from "react-native";
import { Text,Header } from "react-native-elements";
import getEnvVars from "../../environment";
import Icon from "react-native-vector-icons/FontAwesome";


const {apiKeyS} = getEnvVars();


const recipeInstructionsScreen = ({navigation,route}) =>{

    const [instructions,setInstructions] = useState(null);
    // const [newinstructions,setnewInstructions] = useState(null);
    const {currentRecipe,recipeInfo,instrucciones} = route.params;

    const fetchInstructions = async () =>{
        if(instrucciones == undefined){
            const vari = recipeInfo.analyzedInstructions ? recipeInfo.analyzedInstructions : null;
            setInstructions(vari.length > 0  ? vari[0].steps : null);
            console.log(vari);
        }else{
            setInstructions(instrucciones);
            console.log(instrucciones);
        }
        
    }

    useEffect(()=>{
        fetchInstructions();
    },[])

    if(!instructions){
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        )
    }


    return(

        <View style={{flex:1}}>
            
                <Header backgroundColor="#FFCC33" leftComponent={<TouchableOpacity style={{
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
                </TouchableOpacity>}
                    centerComponent={<Text h4 style={{color:"#fff"}}>Instrucciones:</Text>}
                />
           {instrucciones == undefined ?
             <FlatList
             data={instructions}
             keyExtractor={(item,index)=>{ `${item.number}`}}
             renderItem={({item})=>(
                 <View style={{flexDirection:'row',paddingHorizontal:10,marginVertical:5}}>
                     <View style={{alignItems:'center',justifyContent:'center',height:50,width:50,borderRadius:50,backgroundColor:"#FCD55F"}}>
                         <Text style={{color:"#FFFAEB",fontWeight:"bold",fontSize:18}}>{ item.number}</Text>
                     </View>
                     <View style={{flex:1,paddingHorizontal:20,justifyContent:'center'}}>
                         <Text style={{fontSize:16,fontWeight:'bold'}}>{item.step}</Text>
                     </View>
                 </View>
             )}
            />
           :
           <FlatList
           data={instructions}
           keyExtractor={(item)=>{`${item.id}`}}
           renderItem={({item})=>(
               <View style={{flexDirection:'row',paddingHorizontal:10,marginVertical:5}}>
                   <View key={item.id} style={{alignItems:'center',justifyContent:'center',height:50,width:50,borderRadius:50,backgroundColor:"#FCD55F"}}>
                       <Text style={{color:"#FFFAEB",fontWeight:"bold",fontSize:18}}>{item.id}</Text>
                   </View>
                   <View style={{flex:1,paddingHorizontal:20,justifyContent:'center'}}>
                       <Text style={{fontSize:16,fontWeight:'bold'}}>{item.step}</Text>
                   </View>
               </View>
           )}
       />
           
           }
           
        </View>

    )

}


export default recipeInstructionsScreen;