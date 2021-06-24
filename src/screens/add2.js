import React, { useState } from "react";
import { TouchableOpacity,Modal } from "react-native";
import { View,StyleSheet,Text,TextInput,FlatList,ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Swipeable } from "react-native-gesture-handler";

const RenderRight = (progress,dragX) =>{
    return(
        <View style={{flexDirection:"row",height:50,width:"30%",backgroundColor:"#EA4235",alignItems:"center",justifyContent:"center"}}>
            <Text style={{color:"#fff",fontWeight:"600"}}>Borrar </Text>
            <Icon name="trash" color="#fff" size={15}/>
        </View>
    )
}

const addrecipe = () =>{
    const [arrayingredients,setArrayIngredients] = useState([]);
    const [quantity,setQuantity] = useState("")
    const [ingredient,setIngredient] = useState("");
    const [open,setOpen] = useState(false);

    const openModal = () =>{
        setOpen(true)
    }

    
    function removeIngredient(item){
        let x = null;
        if(arrayingredients.includes(item)){
            for( var i = 0; i < arrayingredients.length; i++){ 

              if ( arrayingredients[i].id === item.id) { 
                   x = arrayingredients.filter(items=> items !== item)
              }
            }
        }
        setArrayIngredients(x);
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
        console.log(arrayingredients);
        setOpen(false);
    };

    

    return(
        <ScrollView style={styles.container}>
            <View style={{height:300,backgroundColor:"#fabd05"}}/>
            {/* Overview */}
            <Text style={{paddingHorizontal:15,marginTop:10,color:"#8F8F8F"}}>OVERVIEW</Text>
            <View style={styles.section}>
                <View style={styles.card}>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <TextInput
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
                <View style={styles.card}>
                    <View style={{alignItems:'center',justifyContent:'center',height:50,width:50}}>
                        <Icon name="plus" size={15} color="green"/>
                    </View>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{fontSize:16,color:"green"}}>Agregar</Text>
                    </View>
                </View>
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
        borderWidth:0.5
    }
})

export default addrecipe;