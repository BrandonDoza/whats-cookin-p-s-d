import { expect } from 'chai';
import { findRecipeIngredients , getRecipeData, getIngredientsData, getRecipeInstructions, filterRecipeTag, filterRecipeName, estimatedCostInCents } from '../src/recipes';
import {ingredients, recipes} from './mock-data'

describe('getRecipeData', () => {
  it('Should be a function', () => {
    expect(getRecipeData).to.be.a('function');
  });
  it('Should return a array of objects indentical  to the referenced data',()=>{
    const recipeData = getRecipeData()
    expect(recipeData).to.deep.equal(recipes)
  });
})
describe('getIngredientsData', () => {
  it('Should be a function', () => {
    expect(getIngredientsData).to.be.a('function');
  });
  it('Should return a array of objects indentical  to the referenced data',()=>{
    const ingredientsData = getIngredientsData()
    expect(ingredientsData).to.deep.equal(ingredients)
  });
})
describe('filterRecipeTag', () => {
  it('Should be a function', () => {
    expect(filterRecipeTag).to.be.a('function');
  });
  it('Should return an array of recipes that match a given tag',()=>{
    const recipeData = getRecipeData();
    const tag = 'lunch'
    const filteredRecipes = filterRecipeTag(tag,recipeData);
    const toCompare = recipes[2]
    expect(filteredRecipes).to.deep.equal(toCompare) 
  });
})
describe('filterRecipeName', () => {
  it('Should be a function', () => {
    expect(filterRecipeName).to.be.a('function');
  });
  it('Should return a recipe when given a name',()=>{
    const recipeData = getRecipeData();
    const name = 'Pancakes';
    const searchResult = filterRecipeName(name, recipeData);
    const pancakes = recipeData[0];
    expect(searchResult).to.deep.equal(pancakes);
  });
  it('should notify the user if a name is not found', () => {
    const recipeData = getRecipeData();
    const name = 'Hamburgers';
    const filteredRecipes = filterRecipeName(name, recipeData);
    expect(filteredRecipes).to.equal(null)
  })
})
describe('getRecipeInstructions', () => {
  it('Should be a function', () => {
    expect(getRecipeInstructions).to.be.a('function');
  });
  it('Should return a array of instructions objects from selected recipe',()=>{
    const recipeData = getRecipeData();
    const recipe = recipeData[0];
    const recipeInstructions = getRecipeInstructions(recipe);
    expect(recipeInstructions).to.deep.equal(recipe["instructions"]);
  });
})
describe('estimatedCostInCents', () => {
  it('Should be a function', () => {
    expect(estimatedCostInCents).to.be.a('function');
  });
  it('Should take in a recipe object and ingredients list and return a cost in cents',()=>{
    const pancakes = recipes[0]
    const ingredientList = [ingredients[0],ingredients[1],ingredients[2],ingredients[3]]
    const totalCost = estimatedCostInCents(pancakes,ingredientList);
    expect(totalCost).to.equal(951)
  })
})
describe('Recipe', () => {
  it('Should be a function', () => {
    expect(findRecipeIngredients).to.be.a('function');
  });
  it('Should take in a recipe object and an ingredients object array, and return an array of matches', ()=>{
    const recipeData = getRecipeData();
    const recipe = recipeData[0];
    const ingredientsData = getIngredientsData()
    const ingredientList = [ingredients[0],ingredients[1],ingredients[2],ingredients[3]]
    const ingredientsByName = findRecipeIngredients(recipe,ingredientsData);
    expect(ingredientsByName).to.deep.equal(ingredientList);
  });
})
