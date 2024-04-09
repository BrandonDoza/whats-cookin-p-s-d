import { use } from "chai";

const users = () =>
  fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users").then(
    (response) => response.json()
  );

const ingredients = () =>
  fetch(
    "https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients"
  ).then((response) => response.json());

const recipes = () =>
  fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes").then(
    (response) => response.json()
  );

const promises = [users(), ingredients(), recipes()];

let dataArray = [];

Promise.all(promises)
  .then((promises) => {
    getData(promises);
  })
  .catch((err) => console.log("ERROR", err));

function getData(promises) {
  promises.forEach((element) => {
    dataArray.push(element);
  });
  return dataArray;
}

export function getDataArray() {
  return dataArray;
}
