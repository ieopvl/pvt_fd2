"use strict";

(function () {
let coords = chessKnightCoords();

showBoard(coords);

let btn = document.querySelector('.btn');



btn.addEventListener('click', function(){

  let count = 1;
  let block = document.querySelector('.board');
  let blocks = block.children;

  for( let i = 0; i < blocks.length; i++ ) {
    let block = blocks[i];
    block.style.border = 'none';
    block.style.color = 'transparent';
  }
  
  let interval = setInterval( () => {
    toStep();
  }, 300);

  function toStep() {

    if(count === 64) clearInterval( interval );

    let elem;
    let num;
    for( let i = 0; i < blocks.length; i++ ) {
      elem = blocks[i];
      if(elem.textContent == count) {
        elem.style.border = '2px solid red';
        elem.textContent = '♞';
        elem.style.color = 'black';
        num = count;
        count++;
        break;
      }
    }

    setTimeout(function(){
      elem.textContent = num;
      elem.style.border = '2px solid green';
    }, 300);
    
  }

});

function chessKnightCoords() {
  //создаем массив для вычеркивания шагов
  let coordinates = [];
  for( let i = 0; i < 8; i++ ) {
    coordinates.push([]);
    for(let j = 0; j < 8; j++){
      coordinates[i].push(false);
    }
  }

  let stack = [ {x: 0, y:0} ];

  step(0,0);

  return stack;

  function step(x, y) {

    if( stack.length === 64 ) return true; 

    x = x || 0;
    y = y || 0;
    coordinates[x][y] = true;
    let stepStack = [];
    
    for( let i = x - 2; i <= x + 2; i++ ) {
      if( i > 7 || i < 0 || i === x ) continue; 
      for( let j = y - 2; j <= y + 2; j++ ) {
        if( j > 7 ||
            j < 0 ||
            j === y ||
            Math.abs(x - i) === Math.abs(y - j)
          ) continue;
           
          if( !coordinates[i][j] ) {
                       
            let nextStepInfo = {}; 
            nextStepInfo.x = i;
            nextStepInfo.y = j;
            nextStepInfo.steps = getNumberNextSteps(i, j);
            stepStack.push(nextStepInfo);
          }
        }
      }
      
      stepStack.sort( compare ); 
      function compare(a, b){
        return a.steps - b.steps;
      } 

      for( let i = 0; i < stepStack.length; i++ ) {
        let coords = stepStack[i];
        let x = coords.x;
        let y = coords.y;
        stack.push( {x: x, y: y} );

        if( step(x, y) ) {
          return true;
        } else {
          coordinates[x][y] = false;
          stack.pop();
        }
      }

      return false;

      function getNumberNextSteps(x, y) {
        let n = 0;
    
        for( let i = x - 2; i <= x + 2; i++ ) {
          if( i > 7 || i < 0 || i === x ) continue; 
          for( let j = y - 2; j <= y + 2; j++ ) {
            if( j > 7 ||
                j < 0 ||
                j === y ||
                Math.abs(x - i) === Math.abs(y - j)
              ) continue;
    
              if( !coordinates[i][j] ) {
                n++;
              }
          }
    
        }
        return n;
      }
  }

}

function showBoard(coords) {

  let boardCreation = document.createElement('div');
  boardCreation.className = 'board';

  let  boardSpace = document.querySelector('.space');
  let board = boardSpace.appendChild(boardCreation);

  let block;

  for( let i = 0; i < 8; i++ ) {

    for( let j = 0; j < 8; j++) {

      let color = ( i +  j ) % 2 ? 'black' : 'white';

      let nameForClass = 'cell ' + color;

      block = document.createElement('div');
      block.className = nameForClass; 

      let pos = board.appendChild(block);

      for(let k = 0; k < coords.length; k++ ) {
        let x = coords[k].x;
        let y = coords[k].y;
        if(x === i && y === j) {
          pos.textContent = k + 1;
        }
      }
    }
  }
}

})();