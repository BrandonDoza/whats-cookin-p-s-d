import { ingredients, recipes } from "../test/mock-data";

function estimatedCostInCents(recipe, ingredientList) {
  const total = recipe.ingredients.reduce((cost, ingredient) => {
    const matchingIngredient = ingredientList.find((item) => {
      return item.id === ingredient.id;
    });
    cost +=
      matchingIngredient.estimatedCostInCents * ingredient.quantity.amount;
    return cost;
  }, 0);
  return total;
}

export { estimatedCostInCents };
