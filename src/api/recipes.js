import { firebase } from "../firebase";


export async function getRecipes(){
    const recipesList = [];
    const recipes = await firebase.firestore().collection("recetas").get();

    recipes.forEach((doc)=>{
      const recpItem = doc.data();
      recpItem.id = doc.id;
      recipesList.push(recpItem);
    })

    return recipesList;
}

export async function getRecipesbyId(id){
  const recipesList = [];
  const recipes = await firebase.firestore().collection("recetas").where("userID","==",id).get();

  recipes.forEach((doc)=>{
    const recpItem = doc.data();
    recipesList.push(recpItem);
  })

  return recipesList;
}

export function addRecipe(recipe){
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    recipe.fecha = createdAt;
    const recipesRef = firebase.firestore().collection("recetas");
    recipesRef
        .doc(recipe.id)
        .set(recipe)
        .then((snapshot) => {
          console.log(snapshot);
        })
        .catch((error) => {
          console.log(error);
        });
}

export async function uploadRecipe(uri,recipe) {

  const url = [];

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

    
    const fileName = uri.substring(uri.lastIndexOf("/")+1);
    const storageRef = firebase.storage().ref(`recetas/${fileName}`);
    storageRef.put(blob)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          // console.log("snapshot: " + snapshot.state);
          // console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

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
              addRecipe(recipe);
            })
        }
      )
  } else {
    console.log("Skipping image upload");
  }

}