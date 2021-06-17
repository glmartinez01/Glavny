import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import homeScreen from './src/screens/homeScreen';
import recipeScreen from './src/screens/recipeScreen';
import userRecipesScreen from './src/screens/usersRecipesScreen';
import myRecipesScreen from './src/screens/myRecipesScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


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

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} options={{tabBarIcon:({color,size})=>(<Ionicons name="home-sharp" size={size} color={color} />)}} />
        <Tab.Screen name="Publicadas" component={userRecipesScreen} options={{tabBarIcon:({color,size})=>(<Ionicons name="newspaper-outline" size={size} color={color} />)}} />
        <Tab.Screen name="Mis Recetas" component={myRecipesScreen} options={{tabBarIcon:({color,size})=>(<Ionicons name="book-outline" size={size} color={color} />)}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


