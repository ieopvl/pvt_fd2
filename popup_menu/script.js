
"use strict";

(function(){

  var menu=[
    {name:'Пункт 1',submenu:
      [
        {name:'Пункт 1.1',submenu:
          [
            {name:'Пункт 1.1.1',url:'http://www.tut.by'},
            {name:'Пункт 1.1.2 длинный',url:'http://www.tut.by'}
          ]
        },
        {name:'Пункт 1.2',url:'http://www.tut.by'},
        {name:'Пункт 1.3 длинный',submenu:
          [
            {name:'Пункт 1.3.1',url:'http://www.tut.by'},
            {name:'Пункт 1.3.2',url:'http://www.tut.by'},
            {name:'Пункт 1.3.3',url:'http://www.tut.by'},
            {name:'Пункт 1.3.4 длинный',url:'http://www.tut.by'}
          ]
        }
      ]
    },
    {name:'Пункт 2 длинный',url:'http://www.tut.by'},
    {name:'Пункт 3',submenu:
      [
        {name:'Пункт 3.1 длинный',url:'http://www.tut.by'},
        {name:'Пункт 3.2',url:'http://www.tut.by'}
      ]
    }
  ];



  let container = document.getElementById('menu-container');
  buildMenu(container, menu, 'menu');

  function buildMenu(parent, array, className) {
    let ulElem = document.createElement('ul');
    ulElem.classList.add(className);
    parent.appendChild(ulElem);

    for( let item of array ) {
      let liElem = document.createElement('li');
      liElem.innerHTML = item.url ? `<a href="${item.url}">${item.name}</a>` :
                                    `<a class='par' href="#">${item.name}</a>`;

      if(item.submenu) buildMenu(liElem, item.submenu, 'submenu');
      ulElem.appendChild(liElem);
    }
  }
 


})();