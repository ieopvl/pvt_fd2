'use strict'
//window.localStorage.clear();

const drinks = new LocalStorage("drinks"); //new HashStorage();

drinks.setInfo = function() {
  let drinkName = prompt("Введите название напитка", '');
  let alcahol = confirm("Алкогольный?");
  let recipe = prompt("Введите рецепт");

  //let info = `Алкогольный: ${alcahol ? "да" : "нет"};\nРецепт: ${recipe}`;

  this.addValue(drinkName, {alcahol, recipe});
}

drinks.getInfo = function(key) {
  let data = this.getValue(key);
  if(!data) return false;
  return `Алкогольный: ${data.alcahol ? "да" : "нет"}\nРецепт: ${data.recipe}`;
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