import React,{useEffect,useContext} from "react";
import homeScreen from "../screens/homeScreen";
import recipeScreen from "../screens/recipeScreen";
import fbaseRecipeScreen from "../screens/fbaseRecipeScreen";
import userRecipesScreen from "../screens/usersRecipesScreen";
import myRecipesScreen from "../screens/myRecipesScreen";
import searchScreen from "../screens/searchScreen";
import addrecipe from "../screens/add2";
import recipeInstructionsScreen from "../screens/recipeInstructionsScreen";
import loginScreen from "../screens/loginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Context as AuthContext } from "../context/AuthContext";
import * as SplashScreen from "expo-splash-screen";
import CameraScreen from "../screens/cameraScreen";
import SignUp from "../screens/signup";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const NStack = createStackNavigator();


function HomeStack(){
    return(
      <Stack.Navigator>
        <Stack.Screen 
        name="Home"
        component={homeScreen}
        options={{headerShown:false}}/>
        <Stack.Screen 
        name="recipe"
        component={recipeScreen}
        options={{headerShown:false}}/>
        
      </Stack.Navigator>
    )
}

function myRecipesStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen 
      name="myrecipes"
      component={myRecipesScreen}
      options={{headerShown:false}}/>
      
      
      
    </Stack.Navigator>
  )
}

function searchStack(){
  return(
    <Stack.Navigator>
    <Stack.Screen name="search" component={searchScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
  
}
  
function MyTabs(){
    return(  
        
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStack} options={{tabBarIcon:({color,size})=>(<Ionicons name="home-sharp" size={size} color={color} />)}} />
            <Tab.Screen name="Search" component={searchStack} options={{tabBarIcon:({color,size})=>(<Ionicons name="search" size={size} color={color} />)}} />
            <Tab.Screen name="Mis Recetas" component={myRecipesStack} options={{tabBarIcon:({color,size})=>(<Ionicons name="book-outline" size={size} color={color} />)}} />
        </Tab.Navigator>
        
    )
}

function finalStack(){
  return(
  
    <Stack.Navigator>
      <Stack.Screen name="hometabs" component={MyTabs} options={{headerShown:false}}/>
      <Stack.Screen name="fbaseRecipeScreen" component={fbaseRecipeScreen} options={{headerShown:false}}/>
      <Stack.Screen 
      name="camera"
      component={CameraScreen}
      options={{headerShown:false}}/>
      <Stack.Screen name="addrecipe" component={addrecipe} options={{headerShown:false}}/>
      <Stack.Screen 
        name="recipeinstructions"
        component={recipeInstructionsScreen}
        options={{headerShown:false}}/>
      <Stack.Screen name="category" component={userRecipesScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

const Navigation = ()=>{
    const { state, persistLogin } = useContext(AuthContext);

    useEffect(() => {
        persistLogin();
    }, []);

    // Prevenir que se oculte la pantalla de splash
    SplashScreen.preventAutoHideAsync();

    if (!state.loading) SplashScreen.hideAsync();


    return(
        <NavigationContainer>
            {!state.loading && (
              <>

              {!state.loggedIn ? (
                <Stack.Navigator>
                  <Stack.Screen 
                    name="Log"
                    component={loginScreen}
                    options={{
                    animationEnabled: false,
                    headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="signup"
                    component={SignUp}
                    options={{
                    animationEnabled: false,
                    headerShown: false
                    }}
                />
                </Stack.Navigator>
              )
              :(
                <Stack.Navigator>
                  <Stack.Screen 
                      name="App"
                      component={finalStack}
                      options={{
                      animationEnabled: false,
                      headerShown: false
                      }}
                  />
                </Stack.Navigator>
              )}

              </>
            )}
        </NavigationContainer>
    )
}

export default Navigation;