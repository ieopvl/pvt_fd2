
"use strict";

(function(){

 //************* INIT ************************/
 let canvas = document.getElementById('CVA');
 let ctx = canvas.getContext('2d');


 
 let img = new Image();
 img.src = 'img/snail.png';
 img.addEventListener('load', render);

 function render() {
   ctx.drawImage(img, 0, 0, 300, 300);
 }
/******************************************************/

 
 const imageData = ctx.getImageData(0, 0, 300, 300);
 console.log('imageData.data :', imageData.data);

 let startR = 255;
 let startG = 255;
 let startB = 255;

 let fillColorR = 255;
 let fillColorG = 0;
 let fillColorB = 0;



 let pixelStack = [[1, 1]];

 while(pixelStack.length) {
   let newPos, x, y, pixelPos;
   newPos = pixelStack.pop();
   x = newPos[0];
   y = newPos[1];

   pixelPos = (y*canvas.width + x)*4;
   while(y-- >= 0 && matchStartColor(pixelPos)) {//идем к верхней границе
     pixelPos -= canvas.width*4;
   }

   pixelPos += canvas.width*4;
   ++y;
   let reachLeft = false;
   let reachRight = false;

   while(y++ < canvas.height -1 && matchStartColor(pixelPos)) {
     colorPixel(pixelPos);

     //проверка пикселей слева
     if( x > 0) { //не за границей канваса
       if(matchStartColor(pixelPos - 4)) { //если цвет совпал со стартовым
         if(!reachLeft) { //если данной вертикали нет в стэке
           pixelStack.push([x - 1, y]);
           reachLeft = true;
         }
       }
       else if(reachLeft) {//если вертикаль прерывается то меняем флаг
         reachLeft = false;
       }
     }

     //проверка пикселей справа
     if(x < canvas.width - 1) {
       if(matchStartColor(pixelPos + 4)) {
         if(!reachRight) {
           pixelStack.push([x + 1, y]);
           reachRight = true;
         }
       } else if(reachRight) {
         reachRight = false;
       }
     }

     pixelPos += canvas.width*4;
   }
 }



 /* function manage color  */

 function matchStartColor(pixelPos) {
   let r = imageData.data[pixelPos];
   let g = imageData.data[pixelPos + 1];
   let b = imageData.data[pixelPos + 2];
   return (r == startR && g == startG && b == startB);
 }

 
 function colorPixel(pixelPos) {
   imageData.data[pixelPos] = fillColorR;
   imageData.data[pixelPos + 1] = fillColorG;
   imageData.data[pixelPos + 2] = fillColorB;
   imageData.data[pixelPos + 3] = 255;
 }




})();