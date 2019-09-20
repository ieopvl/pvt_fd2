"use strict";


(function() {
  
  let startX, startY, startXElem, startYElem, deltaX, deltaY;
  let indexZ = 0;
  
  let containerElem = document.querySelector('.images');
  let elems = containerElem.children;
  
  
  for(let i = 0; i < elems.length; i++ ) {
    let elem = elems[i];
    
    elem.addEventListener('mousedown', outerDown(elems, elem));
    elem.addEventListener('mouseup', up);

    elem.ondragstart = function(EO) {
      EO = EO || window.event;
      EO.preventDefault();
    };
  }
  
  function outerDown(elems) {
  
    return down;
  
    function down(EO) { 
      EO = EO || window.event;
  
      let elem = this;
  
      if(elem.style.position !== 'absolute') {
           
        for(let i = elems.length - 1; i >= 0; i--) {
          
          let c = getElementPos(elems[i]);
          
          elems[i].style.left = c.left + 'px';
          elems[i].style.top = c.top + 'px';
          elems[i].style.position = 'absolute';
        }
  
      }
  
      let coordinates =  getElementPos(elem);
      
      startXElem = coordinates.left;
      startYElem = coordinates.top;
  
      startX = Math.round( EO.pageX ); //коордиаты мыши
      startY = Math.round( EO.pageY );
  
      elem.style.zIndex = ++indexZ;

      //document.body.style.cursor = "crosshair";
  
      window.onmousemove =  function (EO) {
  
        EO = EO || window.event;

        document.body.style.cursor = "move";
  
        deltaX = isNaN(EO.pageX - startX) ? 0 : EO.pageX - startX;
        deltaY = isNaN(EO.pageY - startY) ? 0 : EO.pageY - startY;
      
        elem.style.left = startXElem + deltaX + 'px';
        elem.style.top = startYElem + deltaY + 'px';
        
      };
  
    }
  
  }
  
  
  function up(EO) {  
    EO = EO || window.event;
    document.body.style.cursor = "pointer";
    //console.log('up');
    window.onmousemove = null;
  }
  
  
  
  
  let fullImgContainer = document.querySelector('.full-image');
  let btnElem = document.querySelector('button');
  
  
  btnElem.addEventListener('mousedown', function() {
  
    for(let i = 0; i < elems.length; i++ ) {
      elems[i].style.opacity = '0';
    }
  
    let fullImg = document.createElement('img');
  
    fullImg.src = 'images/full-img.jpg';
    fullImg.alt = 'полная картинка';
    fullImg.style.position = 'absolute';
    fullImg.style.top = '8px';
    fullImg.style.left = '8px';
    fullImg.style.width = '780px';

  
    fullImg.style.zIndex = ++indexZ; 
  
  
    fullImgContainer.appendChild(fullImg);
  
  });
  
  btnElem.addEventListener('mouseout', function() {
  
    for(let i = 0; i < elems.length; i++ ) {
      elems[i].style.opacity = '1';
    }
  
    let fullImg = fullImgContainer.querySelector('img');
    if( fullImg ) fullImgContainer.removeChild(fullImg);
  
  
  });
  
  btnElem.addEventListener('mouseup', function() {
  
    for(let i = 0; i < elems.length; i++ ) {
      elems[i].style.opacity = '1';
    }
  
    let fullImg = fullImgContainer.querySelector('img');
  
    if( fullImg ) fullImgContainer.removeChild(fullImg);
  
  });
  
  
  function getElementPos(elem) {
    var bbox=elem.getBoundingClientRect();
    return {
        left: bbox.left + window.pageXOffset,
        top: bbox.top + window.pageYOffset
    };
  }

})();

