"use strict";
/*
Правила заполнения полей
Все поля должны быть заполнены.

Разаработчики - не менее 3 и не более 25 символов.

Название сайта - не менее 3 и не более 35 символов.

URL сата - должен содержать домен .by

Дата запуска - формат даты цифрами dd.mm.yy

Посетителей в сутки - должно быть число

Email - должен содержать символ "@"

Рубрика каталог - недьзя выбрать "домашний уют"

Размещение - нельзя выбирать "Бесплатное"

Резрешить отзыв - должен быть отмечен

Описание сайта - не менее 5 слов


 */
validForm();

function validForm() {
  
"use strict";


let formTag = document.forms['site-info'];

function checkField(elem, func) {

  return function() {

    let parent = elem.parentNode;
    let lastElem = parent.lastChild;
    

    let value = elem.type === 'checkbox' ? elem.checked : elem.value;

    if( func(value) ) {
      if(lastElem.textContent === ' ошибка!') return;
      showWarningMsg(elem);
    } else {
      deleteWarningMsg(elem);
    }

  };

}


function showWarningMsg(elem) {

  let parent = elem.parentNode;

  let warningMsg = document.createElement('span');
  warningMsg.textContent = ' ошибка!';
  warningMsg.style.color = 'red'; 

  parent.appendChild(warningMsg);

}


function deleteWarningMsg(elem){
  
  let parent = elem.parentNode;
  let warningMsg = parent.lastChild;

  if(warningMsg.textContent === ' ошибка!') {
    parent.removeChild(warningMsg);
  }

}

let checkFunctions = {};

checkFunctions['developers'] = function(value) {
  let len = value.length;
  return len <= 3 || len >= 25;
};


checkFunctions['site-name'] = function(value) {
  let len = value.length;
  return len <= 3 || len >= 35;
};

checkFunctions['site-URL'] = function(value) {
  return value.indexOf('.by') < 1;
};

checkFunctions['date'] = function(value) {
  let arrFromValue = value.split('.');

  if(arrFromValue.length !== 3) return true;

  let days = parseInt(arrFromValue[0]);
  let month = parseInt(arrFromValue[1]);
  let year = parseInt(arrFromValue[2]); 

  if( isNaN(days) || days <= 0 || days > 31 ) return  true;
  if( isNaN(month) || month <= 0 || month > 12 ) return  true;
  if( isNaN(year) || year <= 0 || year > 2019 ) return  true;

  return false;
};

checkFunctions['visitors-per-day'] = function(value) {
  return isNaN( parseFloat(value) );
};

checkFunctions['email'] = function(value) {
  return value.indexOf('@') < 1;
};

checkFunctions['sections'] = function(value) {
  return value === '1';
};

checkFunctions['tariff'] = function(value) {
  return value === '1';
};

checkFunctions['review-status'] = function(value) {
  return !value;
};

checkFunctions['site-description'] = function(value) {
  let arrFromValue = value.split(' ');
  return arrFromValue.length < 5;
};


for( let i = 0; i < formTag.length - 1; i++) {

  let elem = formTag[i];
  
  elem.addEventListener( 'blur', checkField( elem, checkFunctions[elem.name] ) );
//'checkbox'
  if(elem.type === 'radio' )  elem.addEventListener( 'focus', checkField( elem, checkFunctions[elem.name] ) );
  if(elem.type === 'checkbox')  elem.addEventListener( 'click', checkField( elem, checkFunctions[elem.name] ) );

  if(elem.type === 'select-one')  elem.addEventListener( 'click', checkField( elem, checkFunctions[elem.name] ) );
}


formTag.addEventListener('submit', validateForm);

function validateForm(EO) {
  EO = EO || window.event;

  try {
  
    let formTag = document.forms['site-info'];

    let checked = false; //до первой ошибки  
    let focusIndex = -1;
    let radioChecked = false; //до первого radio 

    for( let i = 0; i < formTag.length - 1; i++) {
    

      let elem = formTag[i];

      let parent = elem.parentNode;
      let lastElem = parent.lastChild;
 
  
      let value = elem.type === 'checkbox' ? elem.checked : elem.value;
      
      
      if( elem.type === 'radio' ) {
        if( !radioChecked ) {
          let radioName = elem.name;
          let radioValue = formTag.elements[radioName].value;

          if(lastElem.textContent === ' ошибка!') {
            if( !checked ) {
              focusIndex = i;
              checked = true;
            }
            continue;
          }
   
          if(radioValue <= 1) { //ошибка
            if( !checked ) {
              focusIndex = i;
              checked = true;
            }
            showWarningMsg(elem);
          }
          radioChecked = true;
          continue;
        } else {
           continue;
        }
      }
      
      if( checkFunctions[elem.name](value) ) {
        
        if( !checked ) {
          focusIndex = i;
          checked = true;
        }
        if(lastElem.textContent === ' ошибка!') continue;
        showWarningMsg(elem);
      }

    }
    //console.log(focusIndex);
    if( focusIndex >= 0) {
      if( formTag[focusIndex].type === 'radio' ) {

        document.getElementById('radio1').scrollIntoView();

      } else {

        formTag[focusIndex].focus();

      }

      EO.preventDefault();

    }

  }  catch(ex) {
     EO.preventDefault();
  }
  
}

}

