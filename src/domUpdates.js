import { recipes , ingredients} from "../test/mock-data"

//NOTE: Your DOM manipulation will occur in this file

const landingPage = document.querySelector('.page-load')
const mainPage = document.querySelector('.main')
const navBar = document.querySelector('.after-load-sidebar-display')
const navBarTags = document.querySelector('.after-tag-click-sidebar-display')
const defaultMain = document.querySelector('.after-load-main-view')
const searchMain = document.querySelector('.after-tag-search-view')
const recipeView = document.querySelector('.recipe-view')
const tagButton = document.getElementById('tags-button')
const searchButton = document.getElementById('search-button')
const favsButton = document.getElementById('favs-button')
const searchButtonTag = document.getElementById('search-button-for-tags-view')
const submitButton = document.getElementById('submit-button')


document.addEventListener('DOMContentLoaded', function(){
 setTimeout(()=>{
    landingPage.classList.add('hidden')
    navBar.classList.remove('hidden')
    homePage.classList.remove('hidden')
 },3000)
});
navBar.addEventListener('click', (event) =>{
  
  let element = event.target
  if (element.classList.contains('tags')){
      navBar.classList.add('hidden')
    }
  });

//Here is an example function just to demonstrate one way you can export/import between the two js files. You'll want to delete this once you get your own code going.
// const displayRecipes = () => {
//   console.log(`Displaying recipes now`)
// }


// export {
//   displayRecipes,
// }