import firebase from "firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import getEnvVars from "../../environment";

const {
  apiKeyF,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} = getEnvVars();

// Valores de la configuración de Firebase
const firebaseConfig = {
  apiKey:apiKeyF,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

// Iniciarlizar firebase si no existe una instancia ejecutándose
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export { firebase };
