import { use } from "chai";
import { filterRecipeName, filterRecipeTag } from "./recipes";

//<><>functions<><>
const createUser = (name, id, recipesToCook) => {
  let user = {
    name,
    id,
    recipesToCook,
  };
  return user;
};

const addRecipeToCook = (recipe, user) => {
  if (!user.recipesToCook.includes(recipe)) {
    user.recipesToCook.push(recipe);
  }
  return user;
};

function removeRecipeToCook(recipe, user) {
  let toRemove = user.recipesToCook.findIndex(
    (element) => element.name === recipe.name
  );
  user.recipesToCook.splice(toRemove, 1);
  return user;
}

const filterUserRecipesByTag = (tag, user) => {
  const result = [filterRecipeTag(tag, user.recipesToCook)];
  return result;
};

const filterUserRecipesByName = (name, user) => {
  const result = filterRecipeName(name, user.recipesToCook);
  return result;
};

export {
  createUser,
  addRecipeToCook,
  removeRecipeToCook,
  filterUserRecipesByTag,
  filterUserRecipesByName,
};
