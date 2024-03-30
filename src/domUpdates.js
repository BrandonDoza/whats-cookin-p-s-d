
import { getDataArray } from "./apiCalls"
import ingredientsData from "./data/ingredients"
import { filterRecipeTag, findRecipeIngredients, getIngredientsData, getRecipeData, getRecipeInstructions} from "./recipes"
import { dataModel, updateRecipeDataModel } from "./scripts"

//NOTE: Your DOM manipulation will occur in this file

const landingPage = document.querySelector('.page-load')
const mainPage = document.querySelector('.main')
const navBar = document.querySelector('.after-load-side-bar-display')
const navBarTags = document.querySelector('.after-tag-click-sidebar-display')
const defaultMain = document.querySelector('.after-load-main-view')
const searchMain = document.querySelector('.after-tag-search-view')
const recipeView = document.querySelector('.recipe-view')
const searchField = document.querySelector('.search-input')
const tagSection = document.querySelector('.tags-section')
const searchButton = document.getElementById('search-button')
const favsButton = document.getElementById('favs-button')
const searchButtonTag = document.getElementById('search-button-for-tags-view')
const submitButton = document.getElementById('submit-button')

document.addEventListener('DOMContentLoaded', function(){

 setTimeout(()=>{
    hideElements([landingPage])
    showElements([mainPage])
 },30)
});
searchMain.addEventListener('click', (event) =>{
  const element = event.target.parentElement.id;
  if(element){
    let ingredientList = getIngredientsData()
    renderRecipePage(dataModel.currentRecipes[element], ingredientList)
    hideElements([searchMain])
    showElements([recipeView])
  }
  
})
tagSection.addEventListener('click', (event) =>{
  const element = event.target
  console.log(element)
  if(!element.classList.contains('tags-section')){
    const selectedTag = element.innerText
    let recipes = getRecipeData()
    let searchResult = filterRecipeTag(selectedTag, recipes)
    updateRecipeDataModel(searchResult)
    searchResult = renderSearchResults(searchResult)
    populateSearchResults(searchResult)
    hideElements([defaultMain, recipeView])
    showElements([searchMain])
  }
});
searchButton.addEventListener('click',()=>{
  const tags = renderFilterTags()
  populateTags(tags)
  hideElements([searchButtonTag, navBar])
  showElements([navBarTags, searchField, submitButton])
});
submitButton.addEventListener('click',()=>{
});
favsButton.addEventListener('click', ()=>{
  hideElements([defaultMain,recipeView])
  showElements([searchMain])
});


function hideElements(elementArray){
  elementArray.forEach(element => {
    console.log(element)
    element.classList.add('hidden')
  });
};
function showElements(elementArray){
  elementArray.forEach(element => {
    element.classList.remove('hidden')
  });
};


function populateSearchResults(searchResult){
  searchMain.innerHTML = ''
  searchResult.forEach(element => {
    searchMain.innerHTML += element
  });
};

function renderSearchResults(recipes){
  let toPrint = recipes.map((element, i) => {  
    element = `<div id = ${i}>
            <img src="${element.image}" alt="${element.name}" />
            <p>${element.name}</p>
      </div>`;
    return element
  });
  return toPrint
};


function populateTags(tags){
  tagSection.innerHTML = ''
  tags.forEach(tag =>{
    tagSection.innerHTML+= tag
  });
    
};

function renderFilterTags(search = dataModel.tags){
  let toPrint = search.map(element => {
    element = `<li>
    <button>${element}</button>
    </li>`
    return element
  });
  return toPrint
};
function renderRecipePage(recipe, ingredientList){
  recipeView.innerHTML = ''
  let ingredientsString = ''
  let ingredientsStrings = findRecipeIngredients(recipe,ingredientList)
  
    ingredientsStrings.forEach((ingredient, i) => {
    ingredientsString+=`
      <li>${ingredient.name}: ${recipe["ingredients"][i].quantity.amount} ${recipe["ingredients"][i].quantity.unit}</li>` 
  });
  let instructionsString = ''
  let instructionsStrings = getRecipeInstructions(recipe)
    instructionsStrings.forEach(instruction => {
    instructionsString+=`
      <li>${instruction.instruction}</li>`
  });
  console.log(ingredientsString, instructionsString)
  
  recipeView.innerHTML+= `<h1 class="recipe-name">${recipe.name}</h1>
  <img class="recipe-image" src="${recipe.image}" alt="recipe-photo">
  <div>
  <h2 class="ingredients-label">Ingredients</h2>
  <ul class="lists-display">
  ${ingredientsString}
  </ul>
  </div>
  <div>
  <h2 class="directions-label">Directions</h2>
  <ol class="lists-display">
  ${instructionsString}
  </ol>
  </div>`
  };
