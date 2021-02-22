"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
};

function start() {
  console.log("ready");

  // TODO: Add event-listeners to filter and sort buttons
  document
    .querySelector("[data-filter='cat']")
    .addEventListener("click", filterCats);
  document
    .querySelector("[data-filter='dog']")
    .addEventListener("click", filterDogs);
  document
    .querySelector("[data-filter='*']")
    .addEventListener("click", filterAll);

  //sorting
  document
    .querySelector("[data-filter='descending']")
    .addEventListener("click", sortDesc);
  document
    .querySelector("[data-filter='ascending']")
    .addEventListener("click", sortAsc);
  document
    .querySelector("[data-filter='age']")
    .addEventListener("click", sortAge);

  loadJSON();
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(preapareObject);

  // TODO: This might not be the function we want to call first
  displayList(allAnimals);
}

function preapareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;
  //   console.log(animal);
  return animal;
}

//filter from event for cats, calls filter and calls display
function filterCats() {
  const catResult = allAnimals.filter(onlyCats);
  console.log(allAnimals.filter(onlyCats));
  //calls displayList where animals param becomes catResults now
  displayList(catResult);
}

function onlyCats(animal) {
  if (animal.type === "cat") {
    console.log("hey cat");
    return true;
  } else {
    return false;
  }
  return catResult;
}

function filterDogs() {
  const dogResult = allAnimals.filter(onlyDogs);
  console.log(allAnimals.filter(onlyDogs));
  //calls displayList where animals param becomes dogResults now
  displayList(dogResult);
}

function onlyDogs(animal) {
  if (animal.type === "dog") {
    console.log("hey dog");
    return true;
  } else {
    return false;
  }
  return dogResult;
}

function filterAll() {
  displayList(allAnimals);
}

//sorting

function sortDesc() {
  console.log(allAnimals);
  const descending = allAnimals.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    } else {
      return 1;
    }
  });

  displayList(allAnimals);
  // function sort(a,b)
  //
}

function sortAsc() {
  const ascending = console.log(allAnimals);
  allAnimals.sort(function (a, b) {
    return b.name - a.name;
  });
  displayList(allAnimals);
}

function sortAge() {
  const oldest = console.log(allAnimals);
  allAnimals.sort(function (a, b) {
    return b.age - a.age;
  });
  displayList(allAnimals);
}

function displayList(animals) {
  console.log(animals);
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
