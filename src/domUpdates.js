//NOTE: Your DOM manipulation will occur in this file
const landingPage = document.querySelector('page-load')
const navBar = document.querySelector('after-load-side-bar hidden')
const homePage = document.querySelector('after-load-main-view hidden')
document.addEventListener('DOMContentLoaded', () => {
 setTimeout(()=>{
    landingPage.classList.add('hidden')
    navBar.classList.remove('hidden')
    homePage.classList.remove('hidden')
 },300)
});

//Here is an example function just to demonstrate one way you can export/import between the two js files. You'll want to delete this once you get your own code going.
const displayRecipes = () => {
  console.log(`Displaying recipes now`)
}


export {
  displayRecipes,
}