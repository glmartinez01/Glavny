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