'use strict'

var drinkStorage = new HashStorage();

function addInfo() {

  let info = {};

  info.isAlcohol = confirm('Если напток алкогольный, то нажмите Ok');

  info.preparation = prompt('Введите рецепт напитка', '');

  return info;
}



function getInfoByName(drinkName) {
  let str = '';
  let info = drinkStorage.getValue(drinkName); 
  
  if (info) {
    
    str = 'Название ' + drinkName +'\n' + 
      'алкогольный: ' + (info.isAlcohol ? 'да':'нет') + '\n' + 
      'Рецепт приотовления:' + '\n' + 
      info.preparation;

  } else {

    str = 'Хм.. такого напитка пока нет:( \n Но вы можете его добавить!'

  }

  return str;
}
