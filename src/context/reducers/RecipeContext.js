import { initial } from "lodash";
import React,{useReducer,createContext} from "react";
// import { recipeReducer } from "./reducers/recipeReducer";

export const RecipeContext = createContext();

const initialState = {
    uploading:false,
    uploaded:false,
    shouldRefresh:false
};
  

export const recipeReducer = (state, action) => {
    switch (action.type) {
      case "uploading":
        return { ...state, uploading: action.payload };
      case "uploaded":
        return{...state,uploaded: action.payload,shouldRefresh:true};
      default:
        return state;
    }
};

const RecipeProvider = (props) =>{

    const [recipes,dispatch] = useReducer(recipeReducer,initialState);
    return(
        <RecipeContext.Provider value={{recipes,dispatch}}>
            {props.children}
        </RecipeContext.Provider>
    )    
};

export default RecipeProvider;