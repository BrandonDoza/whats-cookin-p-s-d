import { use } from "chai";
import { filterRecipeName, filterRecipeTag } from "./recipes";

const createUser = (name, id, recipesToCook) => {
    let user = {
     name,
     id, 
        recipesToCook
    }
    return user
} 

const addRecipeToCook = (recipe, user) =>{
    user.recipesToCook.push(recipe)

    return user
};
function removeRecipeToCook (recipe, user){
    let toRemove = user.recipesToCook.findIndex(element => element.name === recipe.name);
    console.log (toRemove);
    user.recipesToCook.splice(toRemove, 1);
    return user;
};

const filterUserRecipesByTag = (tag, user) => {
    const result = [filterRecipeTag(tag, user.recipesToCook)];
    return result;
};

const filterUserRecipesByName = (name, user) => {
    console.log(user)
    const result = [filterRecipeName(name, user.recipesToCook)]
    return result

};

export{
    createUser,
    addRecipeToCook,
    removeRecipeToCook,
    filterUserRecipesByTag,
    filterUserRecipesByName
};