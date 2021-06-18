import React from 'react';
import Navigation from "./src/navigation";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import LongTimers from "./src/utils/LongTimers";



export default function App() {
  LongTimers();
  return (
      <AuthProvider>
        <Navigation/>
      </AuthProvider>
  );
}


