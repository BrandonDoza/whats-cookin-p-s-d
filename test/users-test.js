import { expect } from "chai";
import {
  addRecipeToCook,
  removeRecipeToCook,
  filterUserRecipesByTag,
  filterUserRecipesByName,
} from "../src/users";
import { recipes } from "./mock-data";

describe("add recipe", () => {
  let user;

  beforeEach(() => {
    user = {
      name: "Saige O'Kon",
      id: 1,
      recipesToCook: [],
    };
})

    it("should be a function", () => {
      expect(addRecipeToCook).to.be.a("function");
    });
    it("should add a recipe to the users recipes to cook", () => {
      const recipe = recipes[0];
      const addRecipe = addRecipeToCook(recipe, user);
      expect(addRecipe).to.deep.equal({
        name: "Saige O'Kon",
        id: 1,
        recipesToCook: [recipe],
      });
    });
    it("should add another recipe", () => {
      const recipe1 = recipes[0];
      const recipe2 = recipes[1];
      const addRecipe = addRecipeToCook(recipe1, user);
      const addAnotherRecipe = addRecipeToCook(recipe2, addRecipe);
      expect(addAnotherRecipe).to.deep.equal({
        name: "Saige O'Kon",
        id: 1,
        recipesToCook: [recipe1, recipe2],
      });
    });
});

describe('remove recipe', () => {
    let user;

  beforeEach(() => {
    user = {
      name: "Saige O'Kon",
      id: 1,
      recipesToCook: [],
    };
})
    it('should be a function', () => {
        expect(removeRecipeToCook).to.be.a('function')
    })
    it('should remove a given recipe from the recipes to cook array', () => {
      const recipe = recipes[0];
      const addRecipe = addRecipeToCook(recipe, user);
      const removeRecipe = removeRecipeToCook(recipe, addRecipe);
      expect(removeRecipe).to.deep.equal({
        name: "Saige O'Kon",
        id: 1,
        recipesToCook: [],
      })
    })
    it('should be able to remove another recipe', () => {
        const recipe1 = recipes[0];
      const recipe2 = recipes[1];
      const addRecipe = addRecipeToCook(recipe1, user);
      const addAnotherRecipe = addRecipeToCook(recipe2, addRecipe);
      const removeRecipe = removeRecipeToCook(recipe1, addAnotherRecipe);
      const removeAnotherRecipe = removeRecipeToCook(recipe2, removeRecipe);
      expect(removeAnotherRecipe).to.deep.equal({
        name: "Saige O'Kon",
        id: 1,
        recipesToCook: [],
      })
    })
})
describe('filter users saved recipes by tag', () => {
    let user;

    beforeEach(() => {
      user = {
        name: "Saige O'Kon",
        id: 1,
        recipesToCook: [recipes[0], recipes[1], recipes[2]],
      };
  })
    it('should be a function', () => {
        expect(filterUserRecipesByTag).to.be.a('function')
    })
    it('should filter users recipes by a given tag', () => {
        const filteredRecipes = filterUserRecipesByTag('lunch', user);
        expect(filteredRecipes).to.deep.equal([recipes[2]])
    })
})

describe('filter by name', () => {
    let user;

    beforeEach(() => {
      user = {
        name: "Saige O'Kon",
        id: 1,
        recipesToCook: [recipes[0], recipes[1], recipes[2]],
      };
  })

    it('should be a function', () => {
        expect(filterUserRecipesByName).to.be.a('function')
    })
    it('should filter recipes by a given name', () => {
        const filteredRecipes = filterUserRecipesByName('Pancakes', user);
        expect(filteredRecipes).to.deep.equal([recipes[0]])
    })
})

