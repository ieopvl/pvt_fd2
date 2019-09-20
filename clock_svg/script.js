"use strict";

(function() {

  let size = 400; //размер часов
  let initValue = 12; //количество цифр на циферблате при первом создании часов (12 или 24)

  let clockParams = drawClock( size, initValue ); //отрисовка часов и возвращаем их параметры

  digitClock( clockParams ); //запускаем цифровые часы
  showTime( clockParams )(); //приводим часы в действие

  let changeClockface = document.querySelector('.check'); 
  changeClockface.addEventListener('click', changeClockFace( clockParams ));//событие изменяющее циферблат


//************ Функции для смены циферблата ****************************** */

  function changeClockFace( clock ) {

    let hoursQuantity = initValue;

    return function() {

      hoursQuantity = hoursQuantity === 24 ? 12 : 24;
      let newClockParams = setClockParams(hoursQuantity); //получаем новые параметры циферблата

      for( let param in newClockParams) {
        clockParams[param] = newClockParams[param];  //присваеваем их в действующие часы
      }

      deleteClock(clockParams.svgElem); 
      clockParams.drawDigits(clockParams); 
    };
  }

//************ Функции рисования и удаления часов ****************************** */
  function setClockParams(hoursQuantity, size) { //функция расчета параметров часов для их отрисовки

    size = size || 400;
    let cX = size/2; //центр циферблата х
    let cY = size/2;
    let step = 360 / hoursQuantity; //шаг угла для расположения цифр
    let digElemSize = hoursQuantity === 12 ? size*0.06 : size*0.05; //размер кругов для цифр
    let distance = size/2.5; // радиус расположения цифр
    
    let clockParams = {
      'size': size,
      'cX' : cX,
      'cY' : cY,
      'distance': distance,
      'step' : step,
      'hoursQuantity': hoursQuantity,
      'digElemSize':digElemSize
    };

    return clockParams;

  }

  function drawClock(size, hoursQuantity) {

    let cP = setClockParams(hoursQuantity, size);

    let svgElem = document.getElementById('clock');
    svgElem.setAttribute('width', size);
    svgElem.setAttribute('height', size);
    cP['svgElem'] = svgElem;

    creatCircle(cP.size/2, cP.cX, cP.cY, 'orange', svgElem);

    let ellipseHidden = document.createElementNS("http://www.w3.org/2000/svg",'ellipse'); //создаем невидимый элемент
    ellipseHidden.setAttribute('cx', cP.cX);
    ellipseHidden.setAttribute('cy', cP.cY);
    ellipseHidden.setAttribute('rx', 1);
    ellipseHidden.setAttribute('ry', 1);
    ellipseHidden.setAttribute('id', 'hidden');
    svgElem.appendChild(ellipseHidden);

    let drawDigits = function(clock) {
      let angle = clock.step;

      for(let i = 1; i <= clock.hoursQuantity; i++) { //создаем цифры для часов
        let anglePos = (angle)/180*Math.PI;
        angle +=  clock.step;
  
        let digitCx = clock.cX + clock.distance*Math.sin(anglePos);
        let digitCy = clock.cY - clock.distance*Math.cos(anglePos);
  
        creatCircle(clock.digElemSize, digitCx, digitCy, 'green', clock.svgElem);
        creatText(digitCx, digitCy, 'black', i, clock.svgElem, 'digits');
      }
    };

    drawDigits(cP);

    cP['secHand'] = creatLine(cP.cX, cP.cY, cP.size*0.1, 'black', 2, cP.svgElem);
    cP['minHand'] = creatLine(cP.cX, cP.cY, cP.size*0.2, 'black', 4, cP.svgElem);
    cP['hourHand'] = creatLine(cP.cX, cP.cY, cP.size*0.3, 'black', 6, cP.svgElem);

    cP['drawDigits'] = drawDigits;


    return cP;
  }

  function deleteClock(svgContainer) {
    let circles = svgContainer.getElementsByTagName('circle');
    let texts = svgContainer.getElementsByTagName('text');

    for(let i = circles.length - 1; i >= 0; i-- ) {
      if(circles[i].getAttribute('fill') === 'green' ) svgContainer.removeChild(circles[i]);
    }
    for(let i = texts.length - 1; i >= 0; i-- ) {
      if(texts[i].getAttribute('id') === 'digits') svgContainer.removeChild(texts[i]);
    }
  }

//**************************************************************************** */

//************ Функции рисования элементов *********************************** */

  function creatCircle(r, cx, cy, fill, svgContainer) {
    let ellipseHidden = svgContainer.getElementById('hidden'); 

    let circle = document.createElementNS("http://www.w3.org/2000/svg",'circle');
    circle.setAttribute('r', r);
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('fill', fill);
    if(ellipseHidden) {
      svgContainer.insertBefore(circle, ellipseHidden);
    } else {
      svgContainer.appendChild(circle);
    }

  }

  function creatText(x, y, fill, content, svgContainer, id) {
    let text = document.createElementNS("http://www.w3.org/2000/svg",'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('text-anchor', 'middle'); //!
    text.style.fill = fill;
    text.setAttribute('alignment-baseline', 'middle');
    text.textContent = content;
    if(id) text.setAttribute('id', id);
    svgContainer.appendChild(text);
  }

  function creatLine(x1, y1, length, color, width, svgContainer) {
    let line = document.createElementNS("http://www.w3.org/2000/svg",'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1 + length*0.2);
    line.setAttribute('x2', x1);
    line.setAttribute('y2', length);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', width);
    line.setAttribute('stroke-linecap', 'round');
    svgContainer.appendChild(line);
    return line;
  }

//********************************************************************* */

//*****************Функции отображения и управления временем *******************************/
  function showTime(clock) {
    return function() {
      let deg = clock.step; 
      let degMin = deg/60;
      let hourElem = clock.hourHand;
      let minElem = clock.minHand;
      let secElem = clock.secHand;
      let cX = clock.cX;
      let cY = clock.cY;  
      let d = getTimeData();
      console.log(new Date(), (new Date()).getMilliseconds());
      hourElem.setAttribute('transform', 'rotate('+(deg*d.hours +degMin*d.min)+' '+cX+' '+cY+')');
      minElem.setAttribute('transform', 'rotate('+(6*d.min)+' '+cX+' '+cY+')'); 
      secElem.setAttribute('transform', 'rotate('+(6*d.sec)+' '+cX+' '+cY+')');
      document.getElementById('digit-clock').textContent=formatTime( formatDigit(d.hours), formatDigit(d.min),formatDigit(d.sec) );

      setTimeout( showTime(clock), (1010 - d.mil) ); // вызываем снова функцию
    };
  }

  function digitClock(clock) {
    let x = clock.cX;
    let y = clock.cY - clock.size*0.25;
    let svgContainer = clock.svgElem;
    let d = getTimeData();
    let time = formatTime( formatDigit(d.hours), formatDigit(d.min),formatDigit(d.sec) );
    creatText(x, y, 'black', time, svgContainer, 'digit-clock');
  }

  function getTimeData() {
    let date = new Date();
    return {
      'sec' : date.getSeconds(),
      'min' : date.getMinutes(),
      'hours' : date.getHours(),
      'mil': date.getMilliseconds()
    };
  }

  function formatTime(h,m,s) {
    return h + ':' + m + ':' + s;
  }

  function formatDigit(digit) {
    return digit < 10 ? '0'+digit : digit;
  }


})();

