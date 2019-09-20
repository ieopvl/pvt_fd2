"use strict";

(function() {

  let size = 400; //диаметр часов
  let hoursQuantity = 12; // параметр циферблата 12/24

  let cvs = document.getElementById('CVA');
  let context = cvs.getContext('2d');

  drawClock(size, hoursQuantity)();

  /****************************** Функция отрисовки часов ************************************/

  function drawClock(size, hoursQuantity) {
    
    return function() {
      drawCircle(size/2, size/2, size/2, 'orange');

      let angleDelta = 360 / hoursQuantity; //угловой шаг для часов
      let angle = angleDelta;
      for(let i = 1; i <= hoursQuantity; i++ ) {
        let cX = setCoord(size/2, size/2, size/2.5, angle).x;
        let cY = setCoord(size/2, size/2, size/2.5, angle).y;
        angle += angleDelta;
        drawCircle(cX, cY, size*0.06, 'green');
        addText(i, cX, cY, 'black', 16);
      }
  
      let date = new Date();
      let s = date.getSeconds();
      let m = date.getMinutes();
      let h = date.getHours(); 
  
      drawClockhand(size, size*0.45, 2, 6*s);
      drawClockhand(size, size*0.3, 4, 6*m);
      drawClockhand(size, size*0.2, 6, 360/hoursQuantity*(h + 1/60*m));
      addText(digitsClock(h, m, s), size/2, size/3,'black', 26);
  
      setTimeout( drawClock(size, hoursQuantity), (1010 - date.getMilliseconds) );

    };
  }

  /****************************** Функция отрисовки круга ************************************/
  function drawCircle(cX, cY, r, fill) {
    context.fillStyle = fill;
    context.beginPath();
    context.arc(cX, cY, r, 0, Math.PI*2, false);
    context.fill();
  }

 /****************************** Функция добавления текста ************************************/
  function addText(text, x, y, fill, fontSize) {

    context.fillStyle = fill;
    if(fontSize) context.font = `italic bold ${fontSize}px Arial`;
    context.textAlign = 'center';
    context.textBaseline = 'middle'; 
    context.fillText(text, x, y);
  }

 /****************************** Функция отрисовки стрелок ************************************/
  function drawClockhand(size, length, width, angle) {

    let x = setCoord( size/2, size/2, length, angle ).x;
    let y = setCoord( size/2, size/2, length, angle ).y;
    let x1 = setCoord( size/2, size/2, length/5, angle+180 ).x;
    let y1 = setCoord( size/2, size/2, length/5, angle+180 ).y;
  
    context.strokeStyle = 'black'; //рисуем основную стрелку с центра
    context.beginPath();
    context.moveTo(size/2 , size/2);
    context.lineCap = 'round';
    context.lineWidth = width;
    context.lineTo(x, y);
    context.stroke();

    context.beginPath(); //рисуем хвост стрелки
    context.moveTo(size/2 , size/2);
    context.lineTo(x1, y1);
    context.stroke();
  }

/****************************** Функция получения координат через угл ************************************/
  function setCoord(x0, y0, r, angle) {
    let x = x0 + r*Math.sin(angle/180*Math.PI);
    let y = y0 - r*Math.cos(angle/180*Math.PI);
    return {x, y};
  }

/****************************** Функция для поучения цифровых часов ************************************/
  function digitsClock(h, m, s){
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

})();



  

  
 
