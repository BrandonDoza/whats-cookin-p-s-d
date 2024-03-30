
import { getDataArray } from "./apiCalls"

//NOTE: Your DOM manipulation will occur in this file

const landingPage = document.querySelector('.page-load')
const mainPage = document.querySelector('.main')
const navBar = document.querySelector('.after-load-side-bar-display')
const navBarTags = document.querySelector('.after-tag-click-sidebar-display')
const defaultMain = document.querySelector('.after-load-main-view')
const searchMain = document.querySelector('.after-tag-search-view')
const recipeView = document.querySelector('.recipe-view')
const searchField = document.querySelector('.search-input')
const tagButton = document.getElementById('tags-button')
const searchButton = document.getElementById('search-button')
const favsButton = document.getElementById('favs-button')
const searchButtonTag = document.getElementById('search-button-for-tags-view')
const submitButton = document.getElementById('submit-button')
const dataArray = getDataArray()


document.addEventListener('DOMContentLoaded', function(){

 setTimeout(()=>{
    hideElements([landingPage])
    showElements([mainPage])
 },30)
});
tagButton.addEventListener('click', () =>{
  hideElements([navBar])
  showElements([navBarTags, searchButtonTag])
  });
searchButtonTag.addEventListener('click', ()=>{
  hideElements([searchButtonTag])
  showElements([searchField, submitButton])
  })
searchButton.addEventListener('click',()=>{
  hideElements([searchButtonTag, navBar])
  showElements([navBarTags, searchField, submitButton])
});
submitButton.addEventListener('click',()=>{
  hideElements([defaultMain, recipeView])
  showElements([searchMain])
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

//Here is an example function just to demonstrate one way you can export/import between the two js files. You'll want to delete this once you get your own code going.
// const displayRecipes = () => {
//   console.log(`Displaying recipes now`)
// }


// export {
//   displayRecipes,
// }