//Here is an example demonstrating logic separated that can be imported into the scripts and test files. Feel free to update this later! 
import{recipes, ingredients} from '../test/mock-data';

function getRecipeData(){
  return recipes;
};
function getIngredientsData(){
  return ingredients;
};
function getRecipeInstructions(recipe){
  return recipe["instructions"];
}
function findRecipeIngredients(recipe, ingredients){
  const results = recipe['ingredients'].map((element) =>{
      let match = ingredients.find(({id}) => id === element['id'])
      if (match !== undefined){
          return match
      };
  });
  return results
  };

function estimatedCostInCents(recipe, ingredientList) {
  const total = recipe.ingredients.reduce((acc, ingredient) => {
      const matchingIngredient = ingredientList.find((item) => {
          return item.id === ingredient.id
      })
      acc += matchingIngredient.estimatedCostInCents * ingredient.quantity.amount;
      return acc
  }, 0)
  return total
}
const filterRecipeTag = (tag,recipeData) => { 
  let filterRecipes = recipeData.filter((recipe) => {
     return recipe['tags'].includes(tag);
  });
  let filteredRecipes = filterRecipes.reduce((acc, recipes) =>{
      acc = recipes
      return acc
  }, {})
  return filteredRecipes
}

const filterRecipeName = (name, recipeData) => {
let findRecipe = recipeData.find((recipe) => {
  return recipe['name'].includes(name)
});
return findRecipe
}
export {getRecipeData,
  getIngredientsData,
  getRecipeInstructions, 
  estimatedCostInCents, 
  filterRecipeName, 
  filterRecipeTag,
  findRecipeIngredients};
