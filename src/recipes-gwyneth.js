function findRecipeIngredients(recipe, ingredients) {
  const results = recipe["ingredients"].map((ingredient) => {
    let match = ingredients.find(({ id }) => id === ingredient["id"]);
    if (!match) {
      return match;
    }
  });
  return results;
}

export { findRecipeIngredients };
