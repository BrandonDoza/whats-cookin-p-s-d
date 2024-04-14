//NOTE: Data model and non-dom manipulating logic will live in this file.
import "./styles.css";
import apiCalls from "./apiCalls";
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
import ingredientsData from "./data/ingredients";
// Below are examples of how you can import functions from either the recipes or domUpdates files.
import { findRecipeIngredients, getTagsFromData } from "./recipes";
import { displayRecipes } from "./domUpdates";

export var dataModel = {
  currentRecipes: [],
  currentUser: {},
  currentRecipe: {},
  currentRecipeCost: 0,
};

export function updateRecipeDataModel(searchResult) {
  dataModel.currentRecipes = searchResult;
}

export const currencies = [
  {name: 'USD', conversionRate: 1.00},
  {name: 'CAD', conversionRate: 1.38},
  {name: 'GBP', conversionRate: 0.80},
  {name: 'CAD', conversionRate: 0.94},
  {name: 'SEK', conversionRate: 10.88},
  {name: 'JPY', conversionRate: 153.28},
  {name: 'CNY', conversionRate: 7.24},
  {name: 'AUD', conversionRate: 1.54},
  {name: 'INR', conversionRate: 83.61},
  {name: 'HTG', conversionRate: 132.27},
];

