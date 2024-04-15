//<><>functions<><>
function getRecipeData(recipes) {
  return recipes;
}

function getIngredientsData(ingredients) {
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

function findCurrency(currencyName, currencies) {
  let match = currencies.find((currency) => {
    return currency.name === currencyName;
  });
  return match;
}

function getCurrencyConversion(currency, costinUSDCents) {
  if (!currency || !costinUSDCents) {
    return "Error: missing parameter";
  }
  const fractionalCurrencyUnit = costinUSDCents * currency.conversionRate;
  const wholeCurrencyUnit = Math.trunc(fractionalCurrencyUnit) / 100;
  return wholeCurrencyUnit;
}

export {
  getRecipeData,
  getIngredientsData,
  getRecipeInstructions,
  estimatedCostInCents,
  filterRecipeName,
  filterRecipeTag,
  findRecipeIngredients,
  getTagsFromData,
  getCurrencyConversion,
  findCurrency,
};
