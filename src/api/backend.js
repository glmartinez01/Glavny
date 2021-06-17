import axios from "axios";
import { processColor } from "react-native";
import getEnvVars from "../../environment";

const {apiBaseUrl} = getEnvVars();


export const backend = axios.create({
    baseURL:apiBaseUrl
});