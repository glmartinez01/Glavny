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

export function uploadImage(uri) {

  const url = null;

  if (uri) {
    const fileName = uri.substring(uri.lastIndexOf("/")+1);

    var storageRef = firebase.storage().ref(`recetas/${fileName}`);

    storageRef.putFile(uri)
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
              url = downloadUrl;
            })
        }
      )
  } else {
    console.log("Skipping image upload");
  }

  return url;
}