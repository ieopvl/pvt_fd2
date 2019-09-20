"use strict";

(function() {

  const size = 400;
  let initilizeValue = 12;

  let turn = document.querySelector('.check');

  turn.style.marginTop = size + 10 + 'px'; 
  turn.addEventListener('click', changeClockFace());

  function changeClockFace() {
    let hoursQuantity = initilizeValue;
    return function() {
      deleteDigits();
      hoursQuantity = hoursQuantity === 24 ? 12 : 24;
      addDigits(hoursQuantity);
      clearInterval(interval); //остановка текущего таймера
      interval = setInterval(showTime(hoursQuantity), 1000); //запуск таймера с новыми параметрами
    };
  }


  let clock = document.querySelector('.clock');

  let clockface = document.createElement('div');
  clockface.style.width = size + 'px';
  clockface.style.height = size + 'px';
  clockface.style.position = 'absolute';
  clockface.style.borderRadius = size/2 + 'px';
  clockface.style.backgroundColor = 'orange';
  clock.appendChild(clockface);

  let centerX = clockface.offsetLeft + size/2;
  let centerY = clockface.offsetTop + size/2;



  addDigits(initilizeValue);

  
  function addDigits(hoursQuantity) {
    let angleDelta = 360 / hoursQuantity;
    let angle = angleDelta;

    for( let i = 1; i <= hoursQuantity; i++ ) {
      let anglePos = (angle)/180*Math.PI;
      angle +=  angleDelta;

      let hourElem = document.createElement('div');
      let hourElemSize = size*0.09;
      let hourElemDistance = size/2.5;
      let hourElemCenterX = centerX + hourElemDistance*Math.sin(anglePos);
      let hourElemCenterY = centerY - hourElemDistance*Math.cos(anglePos);

      hourElem.style.width = hourElemSize + 'px';
      hourElem.style.height = hourElemSize  + 'px'; 
      hourElem.style.borderRadius = Math.round(hourElemSize/2) + 'px';
      hourElem.style.position = 'absolute';
      hourElem.style.left = hourElemCenterX - hourElemSize/2 + 'px';
      hourElem.style.top = hourElemCenterY - hourElemSize/2 + 'px';
      hourElem.style.backgroundColor = 'green';
      hourElem.style.textAlign ='center';
      hourElem.style.lineHeight = hourElemSize + 'px';
      hourElem.classList.add('digits');
      
      hourElem.textContent = i ;
      clock.appendChild(hourElem);
    }
  }

  function deleteDigits() {
    let digits = clock.getElementsByClassName('digits');
    for(let i = digits.length - 1; i >= 0; i--) {
      clock.removeChild(digits[i]);
    }
  }

  

  let handSec = document.createElement('div');
  let handSecLength = size/2.1;
  let handSecWidth = 2;
  let handSecX = centerX - handSecWidth/2;
  let handSecY = centerY - handSecLength + handSecLength*0.2;
  handSec.style.width = '2px';
  handSec.style.height = handSecLength + 'px';
  handSec.style.position = 'absolute';
  handSec.style.backgroundColor = 'black';
  handSec.style.left = handSecX + 'px';
  handSec.style.top =  handSecY + 'px';
  handSec.style.zIndex = 100;
  clock.appendChild(handSec);

  let handMin = document.createElement('div');
  let handMinLength = size/2.5;
  let handMinWidth = 6;
  let handMinX = centerX - handMinWidth/2;
  let handMinY = centerY - handMinLength + handMinLength*0.2;
  handMin.style.width = handMinWidth + 'px';
  handMin.style.height = handMinLength + 'px';
  handMin.style.position = 'absolute';
  handMin.style.borderRadius = '8px';
  handMin.style.backgroundColor = 'brown';
  handMin.style.left = handMinX + 'px';
  handMin.style.top =  handMinY + 'px';
  clock.appendChild(handMin);

  let handHour = document.createElement('div');
  let handHourLength = size/3;
  let handHourWidth = 11;
  let handHourX = centerX - handHourWidth/2; 
  let handHourY = centerY - handHourLength + handHourLength*0.2;
  handHour.style.width = handHourWidth + 'px';
  handHour.style.height = handHourLength + 'px';
  handHour.style.position = 'absolute';
  handHour.style.backgroundColor = 'violet';
  handHour.style.borderRadius = '10px';
  handHour.style.left = handHourX + 'px';
  handHour.style.top = handHourY + 'px';
  clock.appendChild(handHour);
  
  let digitalClock = document.createElement('span');
  digitalClock.style.position = 'absolute';
  digitalClock.textContent = '12:21:21';
  clock.appendChild(digitalClock);
  digitalClock.style.left = centerX - digitalClock.offsetWidth/2  + 'px';
  digitalClock.style.top = centerY - size/4 + 'px';  
  showTime(initilizeValue)();

  let interval = setInterval(showTime(initilizeValue), 1000);

  function showTime(hours) {
    let deg = 360 / hours; 
    let degMin = deg/60;

    return function () {
      let date = new Date();
      let sec = date.getSeconds();
      let min = date.getMinutes();
      let hours = date.getHours();

      digitalClock.textContent =  formatTime( formatDigit(hours),formatDigit(min),formatDigit(sec) ) ;
    
      handHour.style.transformOrigin = 50 +'% ' + handHourLength*0.8 + 'px';
      handHour.style.transform = 'rotate('+ (deg*hours +degMin*min)+'deg)';
    
      handMin.style.transformOrigin = 50 +'% ' + handMinLength*0.8 + 'px';
      handMin.style.transform = 'rotate('+ 6*min +'deg)';
    
      handSec.style.transformOrigin = 50 +'% ' + handSecLength*0.8 + 'px';
      handSec.style.transform = 'rotate('+ 6*sec +'deg)';
  
      function formatDigit(digit) {
        return digit < 10 ? '0'+digit : digit;
      }
  
      function formatTime(h,m,s) {
        return h + ':' + m + ':' + s;
      }
    };

  }

})();

