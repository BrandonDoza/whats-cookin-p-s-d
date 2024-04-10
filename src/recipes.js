import ingredientsData from "./data/ingredients";
import { recipeData } from "./data/recipes";
const recipes = recipeData;
const ingredients = ingredientsData;

// import { ingredients, recipes, users } from '../test/mock-data';

//<><>functions<><>
function getRecipeData() {
  return recipes;
}

function getIngredientsData() {
  return ingredients;
}

function getRecipeInstructions(recipe) {
  return recipe["instructions"];
}

function findRecipeIngredients(recipe, ingredients) {
  const results = recipe["ingredients"].map((element) => {
    let match = ingredients.find(({ id }) => id === element["id"]);
    if (match !== undefined) {
      return match;
    }
  });
  return results;
}

function estimatedCostInCents(recipe, ingredientList) {
  const total = recipe.ingredients.reduce((acc, ingredient) => {
    const matchingIngredient = ingredientList.find((item) => {
      return item.id === ingredient.id;
    });
    acc += matchingIngredient.estimatedCostInCents * ingredient.quantity.amount;
    return acc;
  }, 0);
  return total;
}

function getTagsFromData(recipes) {
  const tagsArray = [];
  let tags = recipes.map((recipe) => recipe.tags);
  tags.forEach((subArray) => {
    subArray.forEach((element) => {
      if (!tagsArray.includes(element)) {
        tagsArray.push(element);
      }
    });
  });
  return tagsArray;
}

const filterRecipeTag = (tag, recipeData) => {
  let filterRecipes = recipeData.filter((recipe) => {
    return recipe["tags"].includes(tag);
  });
  let filteredRecipes = filterRecipes.reduce((acc, recipes) => {
    acc = recipes;
    return acc;
  }, {});
  return filterRecipes;
};

const filterRecipeName = (name, recipeData) => {
  let findRecipe = recipeData.filter((recipe) => {
    return recipe["name"].includes(name);
  });
  return findRecipe;
};

export {
  getRecipeData,
  getIngredientsData,
  getRecipeInstructions,
  estimatedCostInCents,
  filterRecipeName,
  filterRecipeTag,
  findRecipeIngredients,
  getTagsFromData,
};
