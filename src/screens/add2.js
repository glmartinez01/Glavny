import React, { useState,useContext, useEffect } from "react";
import { TouchableOpacity,Modal } from "react-native";
import { View,StyleSheet,TextInput,StatusBar,ScrollView,Dimensions,Image} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { Text } from "react-native-elements";
import {Context as RecipeContext} from "../context/recipes";
import { ActivityIndicator } from "react-native";

const {width, height} = Dimensions.get("window")

const RenderRight = (progress,dragX) =>{
    return(
        <View style={{flexDirection:"row",height:50,width:"30%",backgroundColor:"#EA4235",alignItems:"center",justifyContent:"center"}}>
            <Text style={{color:"#fff",fontWeight:"600"}}>Borrar </Text>
            <Icon name="trash" color="#fff" size={15}/>
        </View>
    )
}

const addrecipe = ({navigation,route}) =>{
    const [arrayingredients,setArrayIngredients] = useState([]);
    const [arrayinstructions,setArrayInstructions] = useState([]);
    const [quantity,setQuantity] = useState("")
    const [ingredient,setIngredient] = useState("");
    const [instruction,setInstruction] = useState("");
    const [open,setOpen] = useState(false);
    const [open2,setOpen2] = useState(false);
    const [image,setImage] = useState("");
    const [titulo,setTitulo] = useState("");
    const {username,id} = route.params

    // const {state} = useContext(AuthContext);
    const {state,setUpload,uploadRecipe} = useContext(RecipeContext);

    useEffect(()=>{
        if(state.uploaded){
            navigation.goBack();
            setUpload(false);
            console.log("uploaded");
        }
    },[state])


    const openModal = () =>{
        setOpen(true)
    }

    const openModal2 = () =>{
        setOpen2(true)
    }

    const onImageChange=({image})=>{
        setImage(image);
    }

    const handleVerify=()=>{
        if(arrayinstructions.length<1 || arrayingredients.length<1 || image == "" || titulo == ""){
            alert("Favor ingrese todos los datos necesarios: Foto de la Receta, Titulo, Instrucciones e Ingredientes");
        }else{
            handleUpload();
        }
    }

    const handleUpload = async() =>{
        let date = new Date();
        let rid = 'recp' + date.getTime();
        const recipe = {
            id:rid,
            publicado_por:username,
            titulo:titulo,
            ingredientes:arrayingredients,
            instrucciones:arrayinstructions,
            userID:id
        }
       uploadRecipe(image,recipe);
    }

    
    function removeIngredient(item){
        let x = null;
        if(arrayingredients.includes(item)){
            x = arrayingredients.filter(items=> items !== item)
            for (let index = 0; index < x.length; index++) {
                x[index].id = index+1;
            }
        }
        setArrayIngredients(x);

        //console.log(arrayingredients);
    };

    function removeInstruction(item){
        let x = null;
        if(arrayinstructions.includes(item)){
            x = arrayinstructions.filter(items=> items !== item)
            for (let index = 0; index < x.length; index++) {
                x[index].id = index+1;
            }
        }
        setArrayInstructions(x);
        console.log(arrayinstructions);
    };

    const addIngredient = ()=> {
        let lastid = 0
        for( var i = 0; i < arrayingredients.length; i++){ 
            lastid = arrayingredients[i].id;
        }
        
        const item = {
            id:lastid+1,
            name:ingredient,
            quantity:quantity
        };
        arrayingredients.push(item);

        // setIngredients(arrayingredients);
       // console.log(arrayingredients);
        setOpen(false);
    };

    const addInstruction = ()=> {
        let lastid = 0;
        for( var i = 0; i < arrayinstructions.length; i++){ 
            lastid = arrayinstructions[i].id;
        }
        
        const item = {
            id:lastid+1,
            step:instruction,
        };
        arrayinstructions.push(item);

        setOpen2(false);
    };

    if(state.uploading){
        return(
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <ActivityIndicator size="large" color="#fabd05" />
                <Text h4>Uploading...</Text> 
            </View>
        ) 
    }

    return(
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={{flexDirection:"row",backgroundColor:"#fabd05",marginTop:StatusBar.currentHeight}}>
                <View style={{alignItems:'center',justifyContent:'center',height:50,width:50,borderRadius:5}}>
                <TouchableOpacity style={{height:50,width:50,borderRadius:5,marginLeft:10}} onPress={()=> navigation.goBack()}>
                    <Ionicons name="ios-arrow-back" size={35} color="white"/>
                </TouchableOpacity>
                </View>
                <View style={{flex:1,justifyContent:'center'}}/>
                <View style={{alignItems:'flex-end',justifyContent:'center',marginRight:10,marginTop:5}}>
                    <TouchableOpacity style={{height:50,width:50,borderRadius:5}} onPress={handleVerify}>
                        <Icon name="cloud-upload" size={35} color="white"/> 
                    </TouchableOpacity> 
                </View>
            </View>
                
            <View style={{height:300,backgroundColor:"#fabd05",alignItems:"center",justifyContent:"center"}}>
                {image ? <Image resizeMode="cover" style={{height:300,width:"100%"}} source={{uri:image}}/> :null}
                <Icon name="camera" size={24} onPress={()=>{navigation.navigate("camera",{onImageChange})}} color="white" style={{position:"absolute"}}/>  
            </View>
            {/* <Ionicons name="arrow-back" size={width*0.09} color="white" onPress={() => {navigation.pop()}} style={{position:"absolute", left:'3%', top:'5%'}}/> */}
            {/* Overview */}
            <Text style={{paddingHorizontal:15,marginTop:10,color:"#8F8F8F"}}>OVERVIEW</Text>
            <View style={styles.section}>
                <View style={styles.card}>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <TextInput
                            onChangeText={setTitulo}
                            placeholderTextColor="#000"
                            placeholder="Titulo de la Receta"
                            style={{fontSize:16}}
                        />
                    </View>
                    <View style={{alignItems:'flex-end',justifyContent:'center'}}>
                        <Text style={{fontSize:14,fontStyle:'italic',color:"#aaa"}}>Requerido</Text> 
                    </View>
                </View>
            </View>
            <Text style={{paddingHorizontal:15,marginTop:10,color:"#8F8F8F"}}>INGREDIENTS</Text>
            <View style={styles.section}>
                {arrayingredients.map((element,key)=>(
                        <Swipeable overshootRight={false} onSwipeableRightOpen={()=>{removeIngredient(element)}} renderRightActions={RenderRight} key={key}>
                            <View style={styles.card} >
                                <View style={{flex:1,justifyContent:'center'}}>
                                    <Text style={{fontSize:16}}>{element.name}</Text>
                                </View>
                                <View style={{alignItems:'flex-end',justifyContent:'center'}}>
                                    <Text style={{fontSize:14,fontStyle:'italic',color:"#aaa"}}>{element.quantity}</Text> 
                                </View>
                            </View>
                        </Swipeable>
                    )

                )}
                <TouchableOpacity onPress={openModal}>
                    <View style={styles.card}>
                        <View style={{alignItems:'center',justifyContent:'center',height:50,width:50}}>
                            <Icon name="plus" size={15} color="green"/>
                        </View>
                        <View style={{flex:1,justifyContent:'center'}}>
                            <Text style={{fontSize:16,color:"green"}}>Agregar</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={{paddingHorizontal:15,marginTop:10,color:"#8F8F8F"}}>INSTRUCTIONS - STEPS</Text>
            <View style={styles.section}>
                {arrayinstructions.map((element,key)=>(
                        <Swipeable overshootRight={false} onSwipeableRightOpen={()=>{removeInstruction(element)}} renderRightActions={RenderRight} key={key}>
                            <View style={styles.card} >
                                <View style={{alignItems:'center',justifyContent:'center',height:30,width:30,borderRadius:50,backgroundColor:"#fabd05"}}>
                                    <Text style={{fontSize:16,color:"white"}}>{element.id}</Text>
                                </View>
                                <View style={{flex:1,justifyContent:'center',paddingHorizontal:20,width:"70%"}}>
                                    <Text style={{fontSize:16}}>{element.step}</Text>
                                </View>
                            </View>
                        </Swipeable>
                    )

                )}
                <TouchableOpacity onPress={openModal2}>
                <View style={styles.card}>
                    <View style={{alignItems:'center',justifyContent:'center',height:50,width:50}}>
                        <Icon name="plus" size={15} color="green"/>
                    </View>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{fontSize:16,color:"green"}}>Agregar</Text>
                    </View>
                </View>
                </TouchableOpacity>
            </View>

            <Modal animationType="fade" transparent={true} visible={open}>
                <View style={{backgroundColor:"#000000aa", flex:1, justifyContent:"center", alignItems:"center"}}>
                    <View style={{backgroundColor:"#fff", height:180, width:'90%', borderRadius:10}}>
                        <Icon name="chevron-left" size={25} color="black" style={{position:'absolute', zIndex:2,margin:5,padding:15}} onPress={()=>setOpen(false)} />
                        <Icon name="plus" size={25} style={{position:'absolute', zIndex:2,marginLeft:'82%', margin:5,padding:15}} onPress={addIngredient} color="black" />
                        <Text style={{alignSelf:"center", fontSize:20, marginTop:20}}>Agregar Ingrediente</Text>
                        <View style={{backgroundColor:'#fff',marginLeft:10,marginRight:10,flex:1,justifyContent:"center",alignItems:"center"}}>
                            <TextInput placeholder="Nombre" onChangeText={setIngredient} placeholderTextColor={'rgba(0,0,0,0.5)'} style={{width:"60%",color:'#000', borderBottomWidth:3}}/>
                        </View>
                        <View style={{backgroundColor:'#fff',marginLeft:10,marginRight:10,flex:1,justifyContent:"center",alignItems:"center"}}>
                            <TextInput placeholder="Cantidad" onChangeText={setQuantity} placeholderTextColor={'rgba(0,0,0,0.5)'} style={{width:"60%",color:'#000', borderBottomWidth:3}}/>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal animationType="fade" transparent={true} visible={open2}>
                <View style={{backgroundColor:"#000000aa", flex:1, justifyContent:"center", alignItems:"center"}}>
                    <View style={{backgroundColor:"#fff", height:300, width:'90%', borderRadius:10}}>
                        <Icon name="chevron-left" size={25} color="black" style={{position:'absolute', zIndex:2,margin:5,padding:15}} onPress={()=>setOpen2(false)} />
                        <Icon name="plus" size={25} style={{position:'absolute', zIndex:2,marginLeft:'82%', margin:5,padding:15}} onPress={addInstruction} color="black" />
                        <Text style={{alignSelf:"center", fontSize:20, marginTop:20}}>Agregar Instruccion</Text>
                        <View style={{backgroundColor:'#fff',height:height*0.2,marginHorizontal:10,marginVertical:20,flex:1,justifyContent:"center",alignItems:"center"}}>
                            <TextInput multiline placeholder="Escriba detalladamente..." onChangeText={setInstruction} placeholderTextColor={'rgba(0,0,0,0.5)'} style={{width:"70%",color:'#000',height:height*0.25,borderWidth:1,borderColor:"#CDCBD0",padding:5}}/>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#F5F5F5"
    },
    section:{
      marginVertical:10  
    },
    card:{
        backgroundColor:"#fff",
        height:50,
        flexDirection:'row',
        paddingHorizontal:15,
        borderColor:"#CDCBD0",
        borderWidth:0.5,
        justifyContent:"center",alignItems:"center"
    }
})

export default addrecipe;