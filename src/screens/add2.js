import React, { useState,useContext, useEffect,useRef } from "react";
import { TouchableOpacity,Modal } from "react-native";
import { View,StyleSheet,TextInput,StatusBar,ScrollView,Dimensions,Image,Alert,Animated} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { State, Swipeable } from "react-native-gesture-handler";
import { Text } from "react-native-elements";
import {Context as RecipeContext} from "../context/recipes";
import {Context as AuthContext} from "../context/AuthContext";
import { ActivityIndicator } from "react-native";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';


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
    const [loading,setLoading] = useState(false); 
    const [quantity,setQuantity] = useState("")
    const [ingredient,setIngredient] = useState("");
    const [instruction,setInstruction] = useState("");
    const [categoria,setCategoria] = useState("");
    const [remaining,setRemaining] = useState(25);
    const [open,setOpen] = useState(false);
    const [open2,setOpen2] = useState(false);
    const [image,setImage] = useState("");
    const [titulo,setTitulo] = useState("");
    const {username,id,recipeInfo} = route.params;
    const scrollY = useRef(new Animated.Value(0)).current;
    const headerHeight = 350;

    const {state} = useContext(AuthContext);
    const {recipesState,setUpload,setDelete,uploadRecipe,deleteRecipe} = useContext(RecipeContext);

    const categories = [
        {label:"Elegir una categoria",value:""},
        {label:"Desayuno",value:"Desayuno"},
        {label:"Bebidas",value:"Bebidas"},
        {label:"Ensaladas y Vegetales",value:"Ensaladas"},
        {label:"Salsas y Aderezos",value:"Salsas"},
        {label:"Sopas y Caldos",value:"Sopas"},
        {label:"Arroz y legumbres",value:"Arroz"},
        {label:"Appetizer",value:"Appetizer"},
        {label:"Acompañamiento",value:"Acompañamiento"},
        {label:"Entradas",value:"Entradas"},
        {label:"Postres",value:"Postres"},
        {label:"Mariscos",value:"Mariscos"},
        {label:"Aves y Carnes",value:"Carnes"},
        {label:"Pasta",value:"Pasta"},
        {label:"Snacks",value:"Snacks"},
        {label:"Fitness",value:"Fitness"},
        {label:"Asiatica",value:"Asiatica"},
        {label:"Italiana",value:"Italiana"},
        {label:"Panes y Masas",value:"Panes"},
        {label:"Otros",value:"Otros"},
    ]

    useEffect(()=>{
        if(recipesState.uploaded){
            navigation.goBack();
            setUpload(false);
            console.log("uploaded");
        }
        if(recipesState.deleted){
            navigation.navigate('hometabs');
            setDelete(false);
        }
    },[recipesState])


    const openModal = () =>{
        setOpen(true)
    }

    const openModal2 = () =>{
        setOpen2(true)
    }

    const onImageChange=({image})=>{
        setImage(image);
    }

    async function pickImage(){
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }else{
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: false,
              aspect: [4, 3],
              base64:true,
              quality: 1,
            });
        
            console.log(result.uri);
        
            if (!result.cancelled) {
    
              try {
                  let message = 'data:image/png;base64, ' + result.base64;
                  //setImage(result.uri)
                  const resultado = result.uri;
                  setImage(resultado);
              } catch (error) {
                  console.log(error);
              }
            }
          } 
    }

    const handleVerify=()=>{
        if(arrayinstructions.length<1 || arrayingredients.length<1 || image == "" || titulo == "" || categoria == ""){
            alert("Favor ingrese todos los datos necesarios: Foto de la Receta, Titulo, Categoria, Instrucciones e Ingredientes");
        }else{
            handleUpload();
        }
    }


    function showAlert(){
        Alert.alert(
            "¿Esta seguro que quiere borrar la receta?","No hay vuelta atras.",
            [
                {text: "Cancelar",onPress: ()=>{console.log("Cancelado")}},
                {text: "Confirmar",onPress:()=>{deleteRecipe(recipeInfo)}}

            ]
        )
    }

    const handleUpload = async() =>{
        if(recipeInfo == undefined){
            let date = new Date();
            let rid = 'recp' + date.getTime();
            const recipe = {
                id:rid,
                publicado_por:username,
                titulo:titulo,
                ingredientes:arrayingredients,
                instrucciones:arrayinstructions,
                userID:id,
                categoria:categoria
            }
            uploadRecipe(image,recipe,true);
        }else{
            console.log('actualizar');
            if(recipeInfo.imagen != image){
                const recipe = {
                    id:recipeInfo.id,
                    publicado_por:recipeInfo.publicado_por,
                    titulo:titulo,
                    ingredientes:arrayingredients,
                    instrucciones:arrayinstructions,
                    userID:recipeInfo.userID,
                    categoria:categoria
                }
                uploadRecipe(image,recipe,true);
            }else{
                const recipe = {
                    id:recipeInfo.id,
                    publicado_por:recipeInfo.publicado_por,
                    titulo:titulo,
                    ingredientes:arrayingredients,
                    instrucciones:arrayinstructions,
                    userID:recipeInfo.userID,
                    categoria:categoria,
                    imagen:recipeInfo.imagen,
                }
                uploadRecipe(image,recipe,false);
            }
        }
        
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
        if(ingredient && quantity){
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

            setOpen(false);
        }
    };

    const addInstruction = ()=> {
        if(instruction){
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
        } 
    };

    const setVariables = ()=>{
        setArrayInstructions(recipeInfo.instrucciones);
        setArrayIngredients(recipeInfo.ingredientes);
        setTitulo(recipeInfo.titulo);
        setCategoria(recipeInfo.categoria);
        setImage(recipeInfo.imagen);
        setLoading(false);
    };

    const handleRemaining = ()=>{
        
        let currentremain = 25;
        currentremain = currentremain - titulo.length;
        setRemaining(currentremain);
    }

    useEffect(()=>{
        if(recipeInfo!=undefined){
            setLoading(true);
            setVariables();
        }
    },[]);

    useEffect(()=>{
        handleRemaining();
    },[titulo]);

    useEffect(()=>{
        console.log(categoria);
    },[categoria]);


    if(loading){
        return(
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <ActivityIndicator size="large" color="#fabd05" />
            </View>
        ) 
    }

    if(recipesState.uploading){
        return(
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <ActivityIndicator size="large" color="#fabd05" />
                <Text h4>Publicando...</Text> 
            </View>
        ) 
    }

    if(recipesState.deleting){
        return(
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <ActivityIndicator size="large" color="#fabd05" />
                <Text h4>Borrando...</Text> 
            </View>
        ) 
    }

    return(
        <View style={{flex:1}}>
            {/* Header */}
            <StatusBar backgroundColor="#fabd05"/>
            <View style={{height:90,alignItems:"flex-end",flexDirection:"row",backgroundColor:"#fabd05",
            justifyContent:"space-between",paddingHorizontal:24,paddingBottom:10}}>
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
                 
                    <TouchableOpacity style={{alignItems:'center',justifyContent:'center',height:35,width:35,
                    borderRadius:18,
                    borderWidth:1,
                    borderColor:"#F5F6FB",
                    backgroundColor:'rgba(2, 2, 2, 0.5)'}}
                    onPress={handleVerify}>
                        <Icon name="cloud-upload" size={22} color="#F5F6FB" style={{marginLeft:0}}/>
                    </TouchableOpacity>
            </View>
            <ScrollView style={styles.container}
            scrollEventThrottle={16}
            onScroll={(e)=>{
                scrollY.setValue(e.nativeEvent.contentOffset.y)
            }}
            >   
            <View style={{height:300,backgroundColor:"#fabd05",alignItems:"center",justifyContent:"center"}}>
                {image ? <Image resizeMode="cover" style={{height:300,width:"100%",opacity:0.7}} source={{uri:image}}/> :null}
                <View style={{flexDirection:"row",position:"absolute"}}>
                    <Icon name="camera" size={30} onPress={()=>{navigation.navigate("camera",{onImageChange})}} color="white"/>
                    <Text style={{fontSize:30,color:"white"}}> / </Text>
                    <Icon name="folder" size={30} color="white" onPress={pickImage}/>   
                </View>
            </View>
            {/* <Ionicons name="arrow-back" size={width*0.09} color="white" onPress={() => {navigation.pop()}} style={{position:"absolute", left:'3%', top:'5%'}}/> */}
            {/* Overview */}
            <Text style={{paddingHorizontal:15,marginTop:10,color:"#8F8F8F"}}>RESUMEN</Text>
            <View style={styles.section}>
                <View style={styles.card}>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <TextInput
                            maxLength={25}
                            onChangeText={setTitulo}
                            value={titulo}
                            placeholderTextColor="#aaa"
                            placeholder="Titulo de la Receta"
                            style={{fontSize:16}}
                        />
                    </View>
                    <View style={{alignItems:'flex-end',justifyContent:'center'}}>
                        <Text style={{fontSize:14,fontStyle:'italic',color:"#aaa"}}>{remaining} caracteres</Text> 
                    </View>
                </View>
            </View>
            <Text style={{paddingHorizontal:15,marginTop:10,color:"#8F8F8F"}}>CATEGORIA</Text>
            <View style={styles.section}>
                <View style={{alignItems:"center",borderColor:"#CDCBD0",borderWidth:0.5,backgroundColor:"#fff"}} >
                    <Picker
                    enabled={recipeInfo?.categoria ? false : true}
                    style={{width:"95%",color:recipeInfo?.categoria?"#aaa":"#000"}}
                    selectedValue={categoria}
                    onValueChange={(itemValue, itemIndex) =>
                        setCategoria(itemValue)
                    }>
                    {categories.map((element,key)=>(
                         <Picker.Item key={key} label={element.label} value={element.value}/>
                    ))}                    
                    </Picker>
                </View>
            </View>
            <Text style={{paddingHorizontal:15,marginTop:10,color:"#8F8F8F"}}>INGREDIENTES</Text>
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
            <Text style={{paddingHorizontal:15,marginTop:10,color:"#8F8F8F"}}>INSTRUCCIONES - PASOS</Text>
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
                {recipeInfo?.userID == state.user.id ?
                <TouchableOpacity style={styles.loginBtn} onPress={showAlert}>
                    <Text style={styles.loginText}>Borrar</Text>
                </TouchableOpacity>:null}
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
        </View>
        
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
    },
    loginBtn:{
        width:width*0.7,
        height: height*0.06,
        backgroundColor:"#fb5b5a",
        borderRadius:width*0.5,
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"center",
        marginTop:height*0.04,
        marginBottom:height*0.01
    },
    loginText:{
        alignSelf:"center",
        color:"white",
        fontSize: width*0.04,
    }
})

export default addrecipe;