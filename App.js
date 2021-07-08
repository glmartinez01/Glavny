import React from 'react';
import Navigation from "./src/navigation";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as RecipeProvider } from './src/context/recipes';
import LongTimers from "./src/utils/LongTimers";



export default function App() {
  LongTimers();
  return (
      <AuthProvider>
        <RecipeProvider>
          <Navigation/>
        </RecipeProvider>
      </AuthProvider>
  );
}


