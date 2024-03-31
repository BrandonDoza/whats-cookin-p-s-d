
import { getDataArray } from "./apiCalls"
import { filterRecipeTag, findRecipeIngredients, getRecipeInstructions, getTagsFromData} from "./recipes"
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
const data = getDataArray()
let currentUser = document.querySelector(".current-user")
//let user = data[0].users.name

document.addEventListener('DOMContentLoaded', function(){
  setTimeout(()=>{
    getRandomUser(data)
    hideElements([landingPage])
    showElements([mainPage])
 },300)
});
searchMain.addEventListener('click', (event) =>{
  
  const element = event.target.parentElement.id;
  if(element){
    let ingredientList = data[1].ingredients
    console.log('hello', dataModel.currentRecipes[element])
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
    let recipes = data[2].recipes
    let searchResult = filterRecipeTag(selectedTag, recipes)
    console.log(searchResult)
    updateRecipeDataModel(searchResult)
    searchResult = renderSearchResults(searchResult)
    populateSearchResults(searchResult)
    hideElements([defaultMain, recipeView])
    showElements([searchMain])
  }
});
searchButton.addEventListener('click',()=>{
  let recipes = data[2].recipes
  let tags = getTagsFromData(recipes)
  tags = renderFilterTags(tags)
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

function renderFilterTags(search){
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

let getRandomIndex = (array) =>{
    return Math.floor(Math.random() * array.length)
}

function getRandomUser(data){
  let user = data[0].users
  let randomIndex = getRandomIndex(user)
  let  randomUser = user[randomIndex]
     console.log('random',randomUser)
  currentUser.innerHTML = randomUser.name
}