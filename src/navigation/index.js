import React,{useEffect,useContext} from "react";
import homeScreen from "../screens/homeScreen";
import recipeScreen from "../screens/recipeScreen";
import userRecipesScreen from "../screens/usersRecipesScreen";
import myRecipesScreen from "../screens/myRecipesScreen";
import addRecipeScreen from "../screens/addRecipesScreen";
import loginScreen from "../screens/loginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Context as AuthContext } from "../context/AuthContext";
import * as SplashScreen from "expo-splash-screen";

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
      <Stack.Screen 
      name="addrecipe"
      component={addRecipeScreen}
      options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}
  
function MyTabs(){
    return(  
        
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStack} options={{tabBarIcon:({color,size})=>(<Ionicons name="home-sharp" size={size} color={color} />)}} />
            <Tab.Screen name="Publicadas" component={userRecipesScreen} options={{tabBarIcon:({color,size})=>(<Ionicons name="newspaper-outline" size={size} color={color} />)}} />
            <Tab.Screen name="Mis Recetas" component={myRecipesStack} options={{tabBarIcon:({color,size})=>(<Ionicons name="book-outline" size={size} color={color} />)}} />
        </Tab.Navigator>
        
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
                </Stack.Navigator>
              )
              :(
                <Stack.Navigator>
                  <Stack.Screen 
                      name="App"
                      component={MyTabs}
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