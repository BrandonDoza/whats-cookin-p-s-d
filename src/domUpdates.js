
import { getDataArray } from "./apiCalls"
import { filterRecipeTag, getRecipeData, getTagsFromData } from "./recipes"
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
searchMain.addEventListener('click', (event)=>{
  let element = event.target;
  console.log(element.innerText)
  //set the clicked element as a parameter for some navigation target
  hideElements([searchMain])
  showElements([recipeView])
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
  let toPrint = recipes.map(element => {  
    element = `<div>
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
//Here is an example function just to demonstrate one way you can export/import between the two js files. You'll want to delete this once you get your own code going.
// const displayRecipes = () => {
//   console.log(`Displaying recipes now`)
// }


// export {
//   displayRecipes,
// }