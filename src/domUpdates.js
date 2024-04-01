
import { getDataArray } from "./apiCalls"
import { filterRecipeName, filterRecipeTag, getRecipeData, getTagsFromData } from "./recipes"
import { dataModel, updateRecipeDataModel } from "./scripts"

//NOTE: Your DOM manipulation will occur in this file

const landingPage = document.querySelector('.page-load')
const mainPage = document.querySelector('.main')
const navBar = document.querySelector('.after-load-side-bar-display')
const navBarTags = document.querySelector('.after-tag-click-sidebar-display')
const defaultMain = document.querySelector('.after-load-main-view')
const searchMain = document.querySelector('.after-tag-search-view')
const recipeView = document.querySelector('.recipe-view')
const recipesDisplay = document.querySelector('.recipes-display')
const searchField = document.querySelector('.search-input')
const tagSection = document.querySelector('.tags-section')
const searchButton = document.getElementById('search-button')
const favsButton = document.getElementById('favs-button')
const searchButtonTag = document.getElementById('search-button-for-tags-view')
// const submitButton = document.getElementById('submit-button')
const backButton = document.getElementById('back-button')

document.addEventListener('DOMContentLoaded', function(){

 setTimeout(()=>{
    hideElements([landingPage])
    showElements([mainPage])
 },1500)
});
searchMain.addEventListener('click', (event) =>{
  const element = event.target.parentElement.id;
  if(element){
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
  showElements([navBarTags, searchField, backButton])
});
// submitButton.addEventListener('click',()=>{
//   let searchInput = searchField.value
//   const filteredTags = filterTagsOnSubmit(searchInput)
//   populateTags(filteredTags)
//   searchField.value = ''
// });
searchField.addEventListener('input', () => {
  let recipes = getRecipeData()
  let recipesToLower = recipes.map((recipe) => {
    return { ...recipe, name: recipe.name.toLowerCase() }
  })
  let searchInput = searchField.value
  let searchInputLower = searchInput.toLowerCase()
  let searchResult = filterRecipeName(searchInputLower, recipesToLower)
  console.log('search', searchResult)
  updateRecipeDataModel(searchResult) 
  searchResult = renderSearchResults(searchResult)
    populateSearchResults(searchResult)
    hideElements([defaultMain, recipeView])
    showElements([searchMain])
    // searchField.value = ''
})
favsButton.addEventListener('click', ()=>{
  hideElements([defaultMain,recipeView])
  showElements([searchMain])
});
// searchMain.addEventListener('click', (event)=>{
//   let element = event.target;
//   console.log(element.innerText)
//   //set the clicked element as a parameter for some navigation target

// })
backButton.addEventListener('click', () => {
  hideElements([navBarTags, searchField, backButton, searchMain, recipeView])
  showElements([searchButtonTag, navBar, defaultMain])
})

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

function filterTagsOnSubmit(input, allTags = dataModel.tags) {
  let filteredTags = allTags.filter((tag) => {
    return input === tag
  })
  .map((element) => {
    element = `<li>
    <button>${element}</button>
    </li>`
    return element
  })
  console.log('hello', filteredTags)
  return filteredTags
}
//Here is an example function just to demonstrate one way you can export/import between the two js files. You'll want to delete this once you get your own code going.
// const displayRecipes = () => {
//   console.log(`Displaying recipes now`)
// }


// export {
//   displayRecipes,
// }