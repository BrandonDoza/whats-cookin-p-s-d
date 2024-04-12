import { use } from "chai";

const users = () =>
  fetch("http://localhost:3001/api/v1/users").then(
    (response) => response.json()
  );

const ingredients = () =>
  fetch(
    "http://localhost:3001/api/v1/ingredients"
  ).then((response) => response.json());

const recipes = () =>
  fetch("http://localhost:3001/api/v1/recipes").then(
    (response) => response.json()
  );

const promises = [users(), ingredients(), recipes()];

let dataArray = [];

// Promise.all(promises)
//   .then((promises) => {
//     getData(promises);
//   })
//   .catch((err) => console.log("ERROR", err));

  export function getAllData() {
    return Promise.all(promises)
  .then((data) => {
    getData(data);
    return data
  })
  .catch((err) => console.log("ERROR", err))};

function getData(promises) {
  promises.forEach((element) => {
    dataArray.push(element);
  });
  return dataArray;
}

export function getDataArray() {
  return dataArray;
}

export const addUserRecipesToAPI = (currentUser, currentRecipe)=> {
  return fetch('http://localhost:3001/api/v1/usersRecipes', {
    method: 'POST',
        body: JSON.stringify({ userID: currentUser.id, recipeID: currentRecipe.id}),
        headers: {
            "content-type": 'application/json'
  }
})
.then(response => {
  if (response.status === 422) {
    throw new Error('Already Saved')
  } else if (!response.ok) {
    throw new Error('Server Error')
  } else {
    return response.json()
  }
})
.catch(err => {
  throw err
  })
}
