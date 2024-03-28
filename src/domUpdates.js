import { recipes , ingredients} from "../test/mock-data"

//NOTE: Your DOM manipulation will occur in this file

const landingPage = document.querySelector('.page-load')
const navBar = document.querySelector('.after-load-side-bar')
const navBarTags = document.querySelector('.tag-view-search')
const homePage = document.querySelector('.after-load-main-view')

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