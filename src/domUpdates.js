import { getDataArray } from "./apiCalls";
import {
  filterRecipeTag,
  findRecipeIngredients,
  getRecipeInstructions,
  getTagsFromData,
  filterRecipeName,
} from "./recipes";
import { dataModel, updateRecipeDataModel } from "./scripts";
import { addRecipeToCook } from "./users";

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
const data = getDataArray();
const backButton = document.getElementById("back-button");

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    let user = data[0].users;
    hideElements([landingPage]);
    let randomUser = getRandomUser(user);
    dataModel.currentUser = randomUser;
    showElements([mainPage]);
  }, 1500);
});

searchMain.addEventListener("click", (event) => {
  const element = event.target.parentElement.id;
  if (element) {
    let ingredientList = data[1].ingredients;
    dataModel.currentRecipe = dataModel.currentRecipes[element];
    renderRecipePage(dataModel.currentRecipes[element], ingredientList);
    hideElements([searchMain]);
    showElements([recipeView]);
  }
});

tagSection.addEventListener("click", (event) => {
  const element = event.target;
  if (!element.classList.contains("tags-section")) {
    const selectedTag = element.innerText;
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
  const element = event.target;
  if (element.classList.contains("fav-button")) {
    addRecipeToCook(dataModel.currentRecipe, dataModel.currentUser);
  }
});

searchButton.addEventListener("click", () => {
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
  let searchInputLower = searchInput.toLowerCase();
  let searchResult = filterRecipeName(searchInputLower, recipesToLower);
  updateRecipeDataModel(searchResult);
  searchResult = renderSearchResults(searchResult);
  populateSearchResults(searchResult);
  hideElements([defaultMain, recipeView]);
  showElements([searchMain]);
});

favsButton.addEventListener("click", () => {
  let favorites = dataModel.currentUser.recipesToCook;
  updateRecipeDataModel(favorites);
  favorites = renderSearchResults(favorites);
  populateSearchResults(favorites);
  hideElements([defaultMain, recipeView]);
  showElements([searchMain]);
});

backButton.addEventListener("click", () => {
  hideElements([navBarTags, searchField, backButton, searchMain, recipeView]);
  showElements([searchButtonTag, navBar, defaultMain]);
});

function hideElements(elementArray) {
  elementArray.forEach((element) => {
    element.classList.add("hidden");
  });
}
function showElements(elementArray) {
  elementArray.forEach((element) => {
    element.classList.remove("hidden");
  });
}

function populateSearchResults(searchResult) {
  searchMain.innerHTML = "";
  searchResult.forEach((element) => {
    searchMain.innerHTML += element;
  });
}

function renderSearchResults(recipes) {
  let toPrint = recipes.map((element, i) => {
    element = `<div id = ${i}>
            <img src="${element.image}" alt="${element.name}" />
            <p>${element.name}</p>
      </div>`;
    return element;
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
  let toPrint = search.map((element) => {
    element = `<li>
    <button>${element}</button>
    </li>`;
    return element;
  });
  return toPrint;
}

function renderRecipePage(recipe, ingredientList) {
  recipeView.innerHTML = "";
  let ingredientsString = "";
  let ingredientsStrings = findRecipeIngredients(recipe, ingredientList);

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
  </div>
  <button class="buttons fav-button">Favorite</button>`;
}

let getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

function getRandomUser(user) {
  let randomIndex = getRandomIndex(user);
  let randomUser = user[randomIndex];
  dataModel.currentUser = randomUser;
  currentUser.innerHTML = randomUser.name + "!";
  return randomUser;
}
