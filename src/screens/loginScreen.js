import React,{useState,useContext} from "react";
import {View,StyleSheet,TextInput,Text,TouchableOpacity,Dimensions} from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import Icon from "react-native-vector-icons/FontAwesome";

const {width,height} = Dimensions.get("window");

const loginScreen = () =>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [hidePass,setHidePass] = useState(true);

    const { state, signin } = useContext(AuthContext);

    const handleSignin = () => {
        signin(email,password);
    };

    return(
        <View style={styles.container}>
            <Text style={styles.logo}>Glavny</Text>
            <View style={styles.inputView} >
                <TextInput  
                    style={styles.inputText}
                    placeholder="Email..." 
                    placeholderTextColor="#003f5c"
                    onChangeText={setEmail}/>
            </View>
            <View style={styles.inputView}>
                <TextInput  
                    style={styles.inputText}
                    placeholder="Password..." 
                    placeholderTextColor="#003f5c"
                    secureTextEntry={hidePass}
                    onChangeText={setPassword}/>
                <Icon
                    name={hidePass ? 'eye-slash' : 'eye'}
                    style={styles.passwordIcon}
                    size={width*0.07}
                    color="grey"
                    onPress={() => setHidePass(!hidePass)}
                />
            </View>
            <TouchableOpacity>
                <Text style={styles.forgot}>¿Olvide mi contraseña?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={handleSignin}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.loginText}>¿No tienes una cuenta? Registrate.</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fabd05',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"white",
        marginBottom:40
    },
    inputView:{
        width:"80%",
        backgroundColor:"#FDE59B",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    passwordIcon: {
        position:"absolute",
        top: height*0.015,
        right:width*0.05,
    },
    inputText:{
        height:50,
        color:"black"
    },
    forgot:{
        color:"white",
        fontSize:15
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    loginText:{
        color:"white",
        fontSize:15
    }
})


export default loginScreen;