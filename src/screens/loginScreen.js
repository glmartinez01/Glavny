import React,{useState,useContext,useEffect} from "react";
import {View,StyleSheet,TextInput,Text,TouchableOpacity,Dimensions} from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import Icon from "react-native-vector-icons/FontAwesome";
import  Alert  from "../components/Alert";

const {width,height} = Dimensions.get("window");

const loginScreen = ({ navigation }) =>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [hidePass,setHidePass] = useState(true);
    const [error,setError] = useState("");

    const { state, signin, clearErrorMessage } = useContext(AuthContext);

    useEffect(() => {
        if (state.errorMessage) clearErrorMessage();
    }, []);
    
    useEffect(() => {
        if (state.errorMessage) setError(state.errorMessage);
    }, [state.errorMessage]);

    const handleSignin = () => {
        signin(email,password);
    };

    return(
        <View style={styles.container}>
            {error ? <Alert type="error" title={error} /> : null}
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
                    style={[styles.inputText,{paddingRight:"15%"}]}
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
            <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                <Text style={styles.signupText}>¿No tienes una cuenta? Registrate.</Text>
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
        fontSize:width*0.075,
        color:"white",
        marginBottom:height*0.03
    },
    inputView:{
        width:"80%",
        backgroundColor:"#FDE59B",
        borderRadius:width*0.5,
        height: height*0.07,
        width: width*0.7,
        marginBottom:height*0.015,
        justifyContent:"center",
        padding:height*0.02
    },
    passwordIcon: {
        position:"absolute",
        top: height*0.015,
        right:width*0.05,
    },
    inputText:{
        fontSize: width*0.04,
        color:"black"
    },
    forgot:{
        color:"white",
        fontSize:width*0.035
    },
    loginBtn:{
        width:width*0.7,
        height: height*0.06,
        backgroundColor:"#fb5b5a",
        borderRadius:width*0.5,
        alignItems:"center",
        justifyContent:"center",
        marginTop:height*0.04,
        marginBottom:height*0.01
    },
    loginText:{
        color:"white",
        fontSize: width*0.04,
    },
    signupText:{
        color:"white",
        fontSize:width*0.035
    }
})


export default loginScreen;