'use strict'
//window.localStorage.clear();

const drinks = new LocalStorage("drinks"); //new HashStorage();

drinks.setInfo = function() {
  let drinkName = prompt("Введите название напитка", '');
  let alcahol = confirm("Алкогольный?");
  let recipe = prompt("Введите рецепт");

  let info = `Алкогольный: ${alcahol ? "да" : "нет"};\nРецепт: ${recipe}`;

  this.addValue(drinkName, info);
}

drinks.getInfo = function(key) {
  return this.getValue(key) || false;
}

const food = new LocalStorage("food"); //new HashStorage();

food.setInfo = function() {
  let foodName = prompt("Введите название блюда", '');
  let recipe = prompt("Введите рецепт");
  this.addValue(foodName, recipe);
}

food.getInfo = function(key) {
  return this.getValue(key) || false;
}