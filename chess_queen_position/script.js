
"use strict";



chessQueen();

function chessQueen() {
  let answers = getSolutions();

  

  document.querySelector('.quantity').textContent = answers.length;


  document.querySelector('.btn-set').addEventListener('click', function() {
 
    deleteBoard()
    
    let solution  = document.querySelector('.solution-number').value - 1;
    
    showBoard(solution, answers);

  });
}


function deleteBoard() {

  let board = document.querySelector('.board');

  if(board) {
    board.parentNode.removeChild(board);
  }
 

}
          

function showBoard(number, answers) {
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

      if(answers[number][j] === i) {
        pos.textContent = 'Q';
      }

    }

  }

}



function getSolutions() {

  let queensPoses = [0,0,0,0,0,0,0,0];
  let solutionsSaver = [];

  checkColl();

  return  solutionsSaver;


    function checkColl(n) {
      n  = n || 0;
      
      if( n > 7 ) {
        solutionsSaver.push( queensPoses.slice() );
        return;
      }

      for( let row = 0; row < 8; row++ ) {

        let coll = 0;
        while(coll < n) {
          if(queensPoses[coll] === row || 
          Math.abs(queensPoses[coll] - row) === n - coll ) break;
          coll++;
        }

        if( coll === n ) {
          queensPoses[coll] = row;
          checkColl(n + 1);
        }
      }
    }
  }