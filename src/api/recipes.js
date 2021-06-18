import { firebase } from "../firebase";


export function getRecipes(){
    const recipes = firebase.firestore().collection("recipes");
    return recipes;
}

export function addRecipe(recipe){
    const recipesRef = firebase.firestore().collection("recipes");
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