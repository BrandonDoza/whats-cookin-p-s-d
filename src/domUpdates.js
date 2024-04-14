import { getDataArray, addUserRecipe, addUserRecipesToAPI, getAllData } from "./apiCalls";
import {
  filterRecipeTag,
  findRecipeIngredients,
  getRecipeInstructions,
  getTagsFromData,
  filterRecipeName,
  estimatedCostInCents,
  getCurrencyConversion,
  findCurrency
} from "./recipes";
import { currencies, dataModel, updateRecipeDataModel } from "./scripts";
import { addRecipeToCook, removeRecipeToCook } from "./users";

//<><>query selectors<><>
const landingPage = document.querySelector(".page-load");
const mainPage = document.querySelector(".main");
const navBar = document.querySelector(".after-load-side-bar-display");
const navBarTags = document.querySelector(".after-tag-click-sidebar-display");
const defaultMain = document.querySelector(".after-load-main-view");
const searchMain = document.querySelector(".after-tag-search-view");
const recipeView = document.querySelector(".recipe-view");
const recipesDisplay = document.querySelector(".recipes-display");
const searchField = document.querySelector(".search-input");
const tagSection = document.querySelector(".tags-section");
const searchButton = document.getElementById("search-button");
const favsButton = document.getElementById("favs-button");
const searchButtonTag = document.getElementById("search-button-for-tags-view");
const currentUser = document.querySelector(".current-user");
const costData = document.querySelector(".cost")
const costAmount = document.querySelector('.amount')
const selectedCurrency = document.getElementById('currency-cost')
const backButton = document.getElementById("back-button");
const clickTimer = {
  setup(recipeElement){
      this.timeout = setTimeout(() => {
          selectSearchResult(recipeElement)
      
      }, 500);
  },
  clear(){
      clearTimeout(this.timeout)
  }
};

const backButton2 = document.getElementById("back-button2");
let data;


//<><>event listeners<><>
document.addEventListener("DOMContentLoaded", function () {
  getAllData()
  .then(apiData => {
    data = apiData;
    let user = data[0].users;
    let recipes = data[2].recipes
    hideElements([landingPage]);
    let randomUser = getRandomUser(user);
    dataModel.currentUser = randomUser;
    dataModel.currentRecipes = recipes
    randomUser.recipesToCook = getSavedApiRecipes(randomUser, recipes)
    showElements([mainPage]);
    hideElements([costData])
  })
});

searchMain.addEventListener("click", (event) => {
  const recipeElement = event.target.parentElement.id;
  if (recipeElement) {
    clickTimer.setup(recipeElement)
  }
});

selectedCurrency.addEventListener("change", ()=>{
  renderCost()
})

tagSection.addEventListener("click", (event) => {
  const tag = event.target;
  if (!tag.classList.contains("tags-section")) {
    const selectedTag = tag.innerText;
    let recipes = data[2].recipes;
    let searchResult = filterRecipeTag(selectedTag, recipes);
    updateRecipeDataModel(searchResult);
    searchResult = renderSearchResults(searchResult);
    populateSearchResults(searchResult);
    hideElements([defaultMain, recipeView]);
    showElements([searchMain]);
  }
});

recipeView.addEventListener("click", (event) => {
  const faveButton = event.target;
  if (faveButton.classList.contains("fav-button")) {
    addRecipeToCook(dataModel.currentRecipe, dataModel.currentUser);
    addUserRecipesToAPI(dataModel.currentUser, dataModel.currentRecipe)
    .then(resp => {
      faveButton.innerText = 'Recipe Saved'
    })
    .catch(err => {
      faveButton.innerText = err.message;
    })
  }
});

searchButton.addEventListener("click", () => {
  searchMain.classList.remove('favorites')
  let recipes = data[2].recipes;
  let tags = getTagsFromData(recipes);
  tags = renderFilterTags(tags);
  populateTags(tags);
  let allRecipes = data[2].recipes;
  updateRecipeDataModel(allRecipes);
  allRecipes = renderSearchResults(allRecipes);
  populateSearchResults(allRecipes);
  hideElements([searchButtonTag, navBar, defaultMain, recipeView]);
  showElements([navBarTags, searchField, backButton, searchMain]);
});

searchField.addEventListener("input", () => {
  let recipes = data[2].recipes;
  let recipesToLower = recipes.map((recipe) => {
    return { ...recipe, name: recipe.name.toLowerCase() };
  });
  let searchInput = searchField.value;
  let searchInputToLower = searchInput.toLowerCase();
  let searchResult = filterRecipeName(searchInputToLower, recipesToLower);
  updateRecipeDataModel(searchResult);
  searchResult = renderSearchResults(searchResult);
  populateSearchResults(searchResult);
  hideElements([defaultMain, recipeView]);
  showElements([searchMain]);
});

favsButton.addEventListener("click", () => {
  searchMain.classList.add('favorites')
  let favorites = dataModel.currentUser.recipesToCook;
  updateRecipeDataModel(favorites);
  favorites = renderSearchResults(favorites);
  populateSearchResults(favorites);
  hideElements([defaultMain, recipeView, favsButton,costData]);
  showElements([searchMain, backButton2]);
});

backButton.addEventListener("click", () => {
  hideElements([navBarTags, searchField, backButton, searchMain, recipeView, backButton2, costData]);
  showElements([searchButtonTag, navBar, defaultMain, favsButton]);
});

backButton2.addEventListener("click", () => {
  hideElements([navBarTags, searchField, backButton2, searchMain, recipeView, costData]);
  showElements([searchButtonTag, navBar, defaultMain, favsButton]);
});


searchMain.addEventListener("dblclick", (event) => {
  clickTimer.clear()
  if(searchMain.classList.contains('favorites')){
    let faveRecipes = dataModel.currentUser.recipesToCook
    let user = dataModel.currentUser
    const element = event.target.closest('div')
    if (element){
      element.remove();
      removeRecipeToCook(faveRecipes, user)
    }
};
})

//<><>event handlers<><>
function selectSearchResult(recipeElement){
  let ingredientList = data[1].ingredients;
  dataModel.currentRecipe = dataModel.currentRecipes[recipeElement];
  renderRecipePage(dataModel.currentRecipes[recipeElement], ingredientList);
  hideElements([searchMain]);
  showElements([recipeView, costData]);
}
function hideElements(elementArray) {
  elementArray.forEach((element) => {
    element.classList.add("hidden");

  });
}

function showElements(viewsArray) {
  viewsArray.forEach((view) => {
    view.classList.remove("hidden");
  });
}

function populateSearchResults(searchResults) {
  searchMain.innerHTML = "";
  searchResults.forEach((result) => {
    searchMain.innerHTML += result;
  });
}

function renderSearchResults(recipes) {
  let toPrint = recipes.map((recipe, i) => {
    recipe = `<div id = ${i}>
            <img src="${recipe.image}" alt="${recipe.name}" />
            <p>${recipe.name}</p>
      </div>`;
    return recipe;
  });
  return toPrint;
}

function populateTags(tags) {
  tagSection.innerHTML = "";
  tags.forEach((tag) => {
    tagSection.innerHTML += tag;
  });
}

function renderFilterTags(search) {
  let toPrint = search.map((tag) => {
    tag = `<li>
    <button class="tag-buttons">${tag}</button>
    </li>`;
    return tag;
  });
  return toPrint;
};

function renderCost(){
  let currency = findCurrency(selectedCurrency.value, currencies)
  costAmount.innerText = getCurrencyConversion(currency, dataModel.currentRecipeCost)
};

function renderRecipePage(recipe, ingredientList) {

  recipeView.innerHTML = "";
  let ingredientsString = "";
  let ingredientsStrings = findRecipeIngredients(recipe, ingredientList);
  dataModel.currentRecipeCost = estimatedCostInCents(recipe, ingredientsStrings)
  renderCost()
  ingredientsStrings.forEach((ingredient, i) => {
    ingredientsString += `
      <li>${ingredient.name}: ${recipe["ingredients"][i].quantity.amount} ${recipe["ingredients"][i].quantity.unit}</li>`;
  });
  let instructionsString = "";
  let instructionsStrings = getRecipeInstructions(recipe);
  instructionsStrings.forEach((instruction) => {
    instructionsString += `
      <li>${instruction.instruction}</li>`;
  });
  recipeView.innerHTML += `<h1 class="recipe-name">${recipe.name}</h1>
  <img class="recipe-image" src="${recipe.image}" alt="recipe-photo">
  <h2 class="ingredients-label">Ingredients</h2>
  <ul class="lists-display">
  ${ingredientsString}
  </ul>
  <h2 class="directions-label">Directions</h2>
  <ol class="lists-display">
  ${instructionsString}
  </ol>
  <button class="buttons fav-button">Favorite</button>`;
}

let getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

function getRandomUser(users) {
  let randomIndex = getRandomIndex(users);
  let randomUser = users[randomIndex];
  dataModel.currentUser = randomUser;
  currentUser.innerHTML = randomUser.name + "!";
  return randomUser;
}

function getSavedApiRecipes(user, recipes) {
  const foundRecipes = user.recipesToCook.reduce((newRecipes, id) => {
    const allRecipes = recipes.forEach((recipe) => {
        if (id === recipe.id) {
          newRecipes.push(recipe)
        }
    })  
    return newRecipes          
  }, [])
  return foundRecipes
}
