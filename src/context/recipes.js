import { firebase } from "../firebase";
import recipeDataContext from "./recipeDataContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "uploading":
      return { ...state, uploading: action.payload };
    case "uploaded":
      return{...state,uploaded: action.payload};
    case "deleting":
      return { ...state, deleting: action.payload };
    case "deleted":
      return{...state,deleted: action.payload};
    case "refresh":
      return{...state,shouldRefreshHome:action.payload.shouldRefreshHome
              ,shouldRefreshUserRecipes:action.payload.shouldRefreshUserRecipes};
    default:
      return state;
  }
};

const getRecipes = (dispatch) => async() =>{
    const recipesList = [];
    const recipes = await firebase.firestore().collection("recetas").orderBy("fecha","desc").limit(5).get();

    recipes.forEach((doc)=>{
      const recpItem = doc.data();
      recpItem.id = doc.id;
      recipesList.push(recpItem);
    })

    return recipesList;
}

const getRecipesbyId = (dispatch) => async(id) =>{
  const recipesList = [];
  const recipes = await firebase.firestore().collection("recetas").where("userID","==",id).get();

  recipes.forEach((doc)=>{
    const recpItem = doc.data();
    recipesList.push(recpItem);
  })

  return recipesList;
}

const getRecipesbyTitle = (dispatch) => async(titulo) =>{
  const recipesList = [];
  const recipes = await firebase.firestore().collection("recetas").orderBy('titulo').startAt(titulo).endAt(titulo+'\uf8ff').limit(20).get();

  recipes.forEach((doc)=>{
    const recpItem = doc.data();
    recipesList.push(recpItem);
  })

  return recipesList;
}

const getRecipesbyCategory = (dispatch) => async(categoria) =>{
  const recipesList = [];
  const recipes = await firebase.firestore().collection("recetas").where("categoria","==",categoria).limit(20).get();

  recipes.forEach((doc)=>{
    const recpItem = doc.data();
    recipesList.push(recpItem);
  })

  return recipesList;
}

const deleteRecipe =(dispatch)=>(recipe)=> {
  dispatch({type:"deleting",payload:true});
  firebase.firestore()
    .collection('recetas')
    .doc(recipe.id).delete()
    .then(() => {
      dispatch({type:"deleting",payload:false})
      dispatch({type:"deleted",payload:true})
      dispatch({type:"refresh",payload:{shouldRefreshHome:true,shouldRefreshUserRecipes:true}})
    })
    .catch((error) => console.log(error));
}

const setUpload = (dispatch) => async(current) =>{
    dispatch({type:"uploaded",payload:current})
}

const setDelete = (dispatch) => async(current) =>{
  dispatch({type:"deleted",payload:current})
}

const uploadRecipe = (dispatch) => async(uri,recipe,shouldUploadImage) =>{

  const url = [];
  //console.log(recipe);

  if(shouldUploadImage){
    if (uri) {

      const blob = await new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.onload = function(){
          resolve(xhr.response);
        }
        xhr.onerror = function(){
          reject(new TypeError("Network request failed"));
        }
        xhr.responseType = "blob";
        xhr.open("GET",uri,true);
        xhr.send(null);
      });
  
      dispatch({type:"uploading",payload:true});
  
      const fileName = uri.substring(uri.lastIndexOf("/")+1);
      const storageRef = firebase.storage().ref(`recetas/${fileName}`);
      storageRef.put(blob)
        .on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          snapshot => {
            console.log("snapshot: " + snapshot.state);
            console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              console.log("Success");
            }
          },
          error => {
           // unsubscribe();
            console.log("image upload error: " + error.toString());
          },
          () => {
            storageRef.getDownloadURL()
              .then((downloadUrl) => {
                console.log("File available at: " + downloadUrl);
                recipe.imagen = downloadUrl;
                blob.close();
                const createdAt = firebase.firestore.FieldValue.serverTimestamp();
                recipe.fecha = createdAt;
                const recipeRef = firebase.firestore().collection("recetas");
                recipeRef
                    .doc(recipe.id)
                    .set(recipe)
                    .then(() => {
                      dispatch({type:"uploading",payload:false})
                      dispatch({type:"uploaded",payload:true})
                      dispatch({type:"refresh",payload:{shouldRefreshHome:true,shouldRefreshUserRecipes:true}}) 
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                        })
                    }
        )
    } else {
      console.log("Skipping image upload");
    }
  }else{
    dispatch({type:"uploading",payload:true});
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    recipe.fecha = createdAt;
    const recipeRef = firebase.firestore().collection("recetas");
    recipeRef
        .doc(recipe.id)
        .set(recipe)
        .then(() => {
          dispatch({type:"uploading",payload:false})
          dispatch({type:"uploaded",payload:true})
          dispatch({type:"refresh",payload:{shouldRefreshHome:true,shouldRefreshUserRecipes:true}}) 
        })
        .catch((error) => {
          console.log(error);
        });
  }
  

}

export const { Provider, Context } = recipeDataContext(
  reducer,
  {
    setDelete,
    setUpload,
    uploadRecipe,
    getRecipes,
    getRecipesbyId,
    getRecipesbyTitle,
    getRecipesbyCategory,
    deleteRecipe
  },
  {
    deleted:false,
    deleting:false,
    uploading:false,
    uploaded:false,
    shouldRefreshHome:false,
    shouldRefreshUserRecipes:false
  }
);