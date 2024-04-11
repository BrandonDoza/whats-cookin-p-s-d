import { recipes } from "../test/mock-data";
import { getRecipeData, getIngredientsData } from "./recipes";

const filterRecipeTag = (tag, recipeData) => {
  let filterRecipes = recipeData.filter((recipe) => {
    return recipe["tags"].includes(tag);
  });
  let filteredRecipes = filterRecipes.reduce((acc, recipes) => {
    acc = recipes;
    return acc;
  }, {});
  console.log(filteredRecipes);
  return filteredRecipes;
};

const filterRecipeName = (name, recipeData) => {
  let findRecipe = recipeData.find((recipe) => {
    return recipe["name"].includes(name);
  });
  return findRecipe;
};

export { filterRecipeTag, filterRecipeName };
