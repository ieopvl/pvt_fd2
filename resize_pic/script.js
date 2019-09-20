"use strict";

(function() {

let imgElem = document.getElementById('pic');
let params = getElementParams(imgElem);
let pictX = params.left;
let pictY = params.top;
let pictW = params.width;
let pictH = params.height;

 
update(pictX ,pictY, pictW, pictH);

imgElem.onmousedown = changePic;
imgElem.ondragstart = EO => false;
document.querySelectorAll('.manage').forEach( elem => elem.onmousedown = changePic );
document.querySelectorAll('.manage').forEach( elem => elem.ondragstart = EO => false );


/*Функция которая задает размеры картинки и позиционирует управляющие элементы */

function update(pictX, pictY, pictW, pictH) {

  let imgElem = document.getElementById('pic'); 
  imgElem.style.left = pictX + 'px';
  imgElem.style.top = pictY + 'px';
  imgElem.style.width = pictW + 'px';
  imgElem.style.height = pictH + 'px';

  let manageElems = document.getElementsByClassName('manage');
  let index = 0;
  let meW = manageElems[index].offsetWidth;
  let meH = manageElems[index].offsetHeight;

  for( let x = pictX; x <= pictW + pictX; x += pictW/2 ) {
    for(let y = pictY; y <= pictH + pictY; y += pictH/2) {
      if(x === pictX + (pictW/2)  &&
         y === ( pictY + (pictH/2) )) continue;

      manageElems[index].style.top = y  - meH/2 + 'px';
      manageElems[index].style.left = x - meW/2 + 'px';

      let elemIdName = getIdName(x,y, pictX, pictY, pictW, pictH);
      manageElems[index].id = manageElems[index].id || elemIdName;
      index++;
    }
  }

  function getIdName(x, y, pX, pY, pW, pH ) {
    let classX = '';
    let classY = '';

    if(x === pX) classX = 'left';
    if(x === pX + pW /2 ) classX = 'middle';
    if(x === pX + pW) classX = 'right';

    if(y === pY) classY = 'top';
    if(y === pY + pH /2 ) classY = 'middle';
    if(y === pY + pH) classY = 'bottom';

    return classX + '-' + classY; 
  }
}

/********************************************************************************* */

function changePic(EO) {
  EO = EO || window.event;

  let elem = EO.target;


  let imgElem = document.getElementById('pic');
  let cursorsType = {
      'left-top': 'nwse-resize',
      'left-middle': 'ew-resize',
      'left-bottom':'nesw-resize',
      'middle-top':'ns-resize',
      'middle-bottom':'ns-resize',
      'right-top':'nesw-resize',
      'right-middle': 'ew-resize',
      'right-bottom':'nwse-resize',
      'pic':'move'
  };

  document.body.style.cursor = cursorsType[elem.id];

  let startPictW = imgElem.getBoundingClientRect().width;
  let startPictH = imgElem.getBoundingClientRect().height; 
  let startPictX = imgElem.getBoundingClientRect().left;
  let startPictY = imgElem.getBoundingClientRect().top;

  let deltaX = EO.clientX - elem.getBoundingClientRect().left;
  let deltaY = EO.clientY - elem.getBoundingClientRect().top;

  moveAt(EO.pageX, EO.pafeY);

  function moveAt(pageX, pageY) {
    elem.style.left = pageX - deltaX + 'px';
    elem.style.top = pageY - deltaY + 'px';
  }

  let startX = EO.pageX;
  let startY = EO.pageY;

  function onMouseMove(EO) {
    EO = EO || window.event;
    moveAt(EO.pageX, EO.pageY);
    let finishX = EO.pageX;
    let finishY = EO.pageY;
    let shiftX = finishX - startX;
    let shiftY = finishY - startY;  

    let params = getNewParams(startPictX, startPictY, startPictW, startPictH,shiftX, shiftY, elem.id);
    let pX = params.x;
    let pY = params.y;
    let Pw = params.w;
    let Ph = params.h; 

    update(pX ,pY, Pw, Ph);
  }

  document.addEventListener('mousemove', onMouseMove);

  document.onmouseup = function(){
    document.removeEventListener('mousemove', onMouseMove);
    elem.onmouseup = null;
    document.body.style.cursor = 'pointer';
  };

}

function getNewParams(pictX, pictY, startPictW, startPictH,shiftX, shiftY,  id){

  let updatedFunc = {
    'left-top': () => ({
      w: startPictW - shiftX,
      h: startPictH - shiftX*startPictH/startPictW,
      x: pictX + shiftX,
      y: pictY +  shiftX*startPictH/startPictW
    }),
    'left-middle': () => ({
      w: startPictW - shiftX,
      h: startPictH,
      x: pictX + shiftX,
      y: pictY
    }),
    'left-bottom': () => ({
      w: startPictW - shiftX,
      h: startPictH - shiftX*startPictH/startPictW,
      x: pictX + shiftX,
      y: pictY
    }),
    'middle-top':()=>({
      w: startPictW,
      h: startPictH - shiftY,
      x: pictX,
      y: pictY + shiftY
    }),
    'middle-bottom':() => ({
      w: startPictW,
      h: startPictH + shiftY,
      x: pictX,
      y: pictY
    }),
    'right-top':()=> ({
      w: startPictW + shiftX,
      h: startPictH + shiftX*startPictH/startPictW,
      x: pictX,
      y: pictY - shiftX*startPictH/startPictW
    }),
    'right-middle': () => ({
      w: startPictW + shiftX,
      h: startPictH,
      x: pictX,
      y: pictY
    }),
    'right-bottom':() => ({
      w: startPictW + shiftX,
      h: startPictH + shiftX*startPictH/startPictW,
      x: pictX,
      y: pictY
    }),
    'pic':() => ({
      w: startPictW,
      h: startPictH,
      x: pictX + shiftX,
      y: pictY + shiftY
    })
  };
  return updatedFunc[id](); 
}

function getElementParams(elem) {
   return elem.getBoundingClientRect();
  }

})();

// D2+

// На каждом углу картинки, и на середине каждой стороны картинки расположите
// небольшой управляющий элемент, за который можно перетаскивать картинку,
// меняя её размеры и пропорции.
// При перетягивании за угол - пропорции картинки не должны изменяться.
// При перетягивании за середину стороны - пропорции картинки меняются.
// При перетягивании за саму картинку (не за управляющие элементы) -
// картинка должна перемещаться.
// Независимо от движений мыши, управляющие элементы должны всегда остававаться
// на углах и серединах сторон картинки.
// Подобное поведение, например, можно посмотреть в онлайн-SVG-редакторе:
// http://editor.method.ac/
// нарисуйте прямоугольник, у него появятся те же 8 управляющих элементов,
// попробуйте перетаскивать за них и отследите, как меняются размеры и
// пропорции прямоугольника. Одна тонкость - при перетаскивании угловых элементов данный
// редактор позволяет произвольно менять соотношение сторон прямоугольника;
// реализуйте, чтобы угловые элементы меняли размер обоих сторон ПРОПОРЦИОНАЛЬНО.