//NOTE: Data model and non-dom manipulating logic will live in this file.

import './styles.css'
import apiCalls from './apiCalls'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import ingredientsData from './data/ingredients'
// Below are examples of how you can import functions from either the recipes or domUpdates files.
import { findRecipeIngredients, getTagsFromData} from './recipes';
import { displayRecipes } from './domUpdates'

export var dataModel = {
    currentRecipes : [],
    currentUser: {},
    currentRecipe: {}
};
export function updateRecipeDataModel(searchResult){
    dataModel.currentRecipes = searchResult
  }
  