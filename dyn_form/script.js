"use strict";

var formDef1=
[
  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  {label:'E-mail для связи:',kind:'shorttext',name:'email'},
  {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
  {label:'Размещение:',kind:'radio',name:'payment', 
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
  {label:'Разрешить отзывы:',kind:'check',name:'votes'}, 
  {label:'Описание сайта:',kind:'memo',name:'description'}, 
  {label:'Опубликовать:',kind:'submit'}, 
];


var formDef2=
[
  {label:'Фамилия:',kind:'longtext',name:'lastname'},
  {label:'Имя:',kind:'longtext',name:'firstname'},
  {label:'Отчество:',kind:'longtext',name:'secondname'},
  {label:'Возраст:',kind:'number',name:'age'},
  {label:'Зарегистрироваться:',kind:'submit'},
];

dynForm('siteform', formDef1);

dynForm('siteform2', formDef2);


function dynForm(formName, formContent) {

  let textTypes = {
    'longtext': 'text',
    'shorttext': 'text',
    'number': 'text',
    'check': 'checkbox'
  }

  let formElem = document.forms[formName];

  let str = '<ul>';

  for( let i = 0; i < formContent.length; i++ ) {

    let label = formContent[i].label;
    let type = formContent[i].kind in textTypes ? textTypes[formContent[i].kind]: formContent[i].kind;
    let inputClass = formContent[i].kind;
    let attrName = formContent[i].name;
    
    if( type === 'combo' ) {

      str += '<li><label for='+ attrName + '>'+ label + '</label><select'  + ' name=' + attrName + '>'; 

      for( let j = 0; j < formContent[i].variants.length; j++ ) {

        let value = formContent[i].variants[j].value;
        let text =  formContent[i].variants[j].text;

        str += '<option value=' + value + ' >' + text + '</option>';

      }

      str += '</select></li>';

    } 
    
    else if(type === 'radio') {

     str += '<li><label for='+ attrName + '>' + label + '</label>';

      for( let j = 0; j < formContent[i].variants.length; j++ ) {
        let value = formContent[i].variants[j].value;
        let text =  formContent[i].variants[j].text;
        str += '<input type=' + type + ' name=' + attrName + ' value=' + value + '>' + text;
      }

      str += '</li>';
      
    } 
    
    else if(type === 'memo') {
      str += '<li><label for='+ attrName + '>' + label + '</label></li>';
      str += '<li><textarea name=' + attrName + ' style="width:360px; heigth:200px"></textarea></li>';

    } 
        
    else if (type === 'check') {

      str += '<li><label for='+ attrName + '>' + label + '</label><input type=' + type + ' name=' + attrName + ' checked="checked" ></li>';
      
    }  

    else if (type === 'submit') {
      str += '<li><input type=' + type + ' value=' + label + '></label></li>';
    } 
    
    else {
      str += '<li><label for='+ attrName + '>' + label + '</label><input class='+ inputClass +" "+ 'type=' + type + ' name=' + attrName + '></li>';
    }
  
  }

  str +='</ul>';

  formElem.innerHTML = str;

}