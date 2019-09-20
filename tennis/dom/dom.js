"use strict";



(function(){

  const keys = {
    leftTop: 16,
    leftBottom: 17,
    rightTop: 38,
    rightBottom: 40
  };
  
  const game = {
    duration: false,
    ball: null,
    racket: null,
    racketLeft: null,
    racketRight: null,
    score: [,0,0],
    gradCorr: 10, //корректировка угла
    area: {
      width: 500,
      height: 280
    },
  
    init: function() {
        this.container = document.getElementById('dom-area');
        this.move();
    },
    move: function() {
      document.getElementById('btn-start').addEventListener('click', (e) => {
        this.duration = true;
        this.racketDefaultPos();
        this.ball.start();
      });
  
      window.addEventListener('keydown', e => {
  
        if( e.keyCode === keys.leftTop || e.keyCode === keys.leftBottom ) // move l top
          this.racketL.setSpeed(e.keyCode);
        if(e.keyCode === keys.rightTop || e.keyCode === keys.rightBottom) // move r top 
          this.racketR.setSpeed(e.keyCode);
        
      });
  
      window.addEventListener('keyup', e => {
          this.racketL.stop();
          this.racketR.stop();
  
      });
    },
    draw: function() {
      this.remove(this.container);

      //fields
      this.container.style.left = 0 + 'px';
      this.container.style.top = 0 + 'px';
      this.container.style.width = this.area.width + 'px';
      this.container.style.height = this.area.height + 'px';
      this.container.style.border = "1px solid 'black'";
      this.container.style.position = "relative";
      this.container.style.backgroundColor = 'yellow';
     
  
      //ball
      let ball = document.createElement("div");
      ball.style.left = this.ball.x + 'px';
      ball.style.top =  this.ball.y + 'px';
      ball.style.width = this.ball.size*2 + 'px';
      ball.style.height = this.ball.size*2 + 'px';
      ball.style.position = "absolute";
      ball.style.backgroundColor = 'red';
      ball.style.borderRadius = "50%";
      ball.style.transform = 'translate(-50%, -50%)';
      this.container.appendChild(ball);


      //racket_left
      
      let racketLeft = document.createElement('div');
      racketLeft.style.left = this.racketL.x + 'px';
      racketLeft.style.top = this.racketL.y + 'px';
      racketLeft.style.width = this.racket.width + 'px';
      racketLeft.style.height = this.racket.height + 'px';
      racketLeft.style.position = "absolute";
      racketLeft.style.backgroundColor = 'green';
      this.container.appendChild(racketLeft);
  
 
  
      //racket_right
      let racketRight = document.createElement('div');
      racketRight.style.left = this.racketR.x - this.racket.width + 'px';
      racketRight.style.top = this.racketR.y + 'px';
      racketRight.style.width = this.racket.width + 'px';
      racketRight.style.height = this.racket.height + 'px';
      racketRight.style.position = "absolute";
      racketRight.style.backgroundColor = 'black';
      this.container.appendChild(racketRight);

    },
    update: function() {
      if(this.duration) {
        this.racketL.move();
        this.racketR.move();
        this.ball.move();
      }
    },
    run: function() {
      window.requestAnimationFrame( () => {
        this.update();
        this.draw();
        this.run();
      });
    },
    start: function() {
      this.init();
      this.run();
    },
    rand: function(x, y) {
      let min = Math.atan(x/y)*180/Math.PI + this.gradCorr;
      let max = 180 - min - this.gradCorr;
  
      let sign =  Math.random() - 0.5 > 0 ? 180 : 0; //корректровка для противоположного напрвления
  
      let angl = Math.floor(Math.random()*(max - min + 1) + min) + sign;
      let anglRad = (angl)/180*Math.PI;
  
      return {
        delta1: Math.sin(anglRad),
        delta2: -Math.cos(anglRad),
      };
    },
  
    addScore: function(number) {
      const scoreElem = document.querySelector(`.score-${number}`);
      scoreElem.textContent = ++this.score[number]; 
    },
    racketDefaultPos: function() {
      this.racketR.y = this.racketL.y = this.area.height/2 - this.racket.height/2;
    },
    remove: function(node) {
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
    }
  };
  
  
  game.ball = {
    x: game.area.width/2, 
    y: game.area.height/2,
    accel: 6,
    speedX: 0,
    speedY: 0,
    size: 12.5,
    torsion: 1,
    start: function() {
      this.x = game.area.width/2;
      this.y = game.area.height/2;
      let grad =game.rand(game.area.width, game.area.height);
  
      this.speedX = this.accel*grad.delta1;
      this.speedY = this.accel*grad.delta2;
    },
    move: function() {
      
      /*** ball X left ***/
      if(this.x - this.size < 0) {
        this.speedX = 0;
        this.speedY = 0;
        this.x = this.size; 
        game.duration = false;
        game.addScore(2);
      }
  
      /*** ball X right ***/
      if(this.x + this.size >= game.area.width) {
        this.speedX = 0;
        this.speedY = 0;
        this.x = game.area.width - this.size; 
        game.duration = false;
        game.addScore(1);
      }
  
      /*** ball Y top ***/
      if(this.y - this.size < 0) {
        this.speedY = this.accel;
      }
  
      /*** ball Y bottom ***/
      if(this.y + this.size >= game.area.height) {
        this.speedY = -this.accel;
      }
  
      /*** ball SRTIKE left ***/
      if(this.x - this.size <  game.racketL.x + game.racket.width  &&
        this.y + this.size > game.racketL.y &&
        this.y - this.size < game.racketL.y + game.racket.height) {
          this.speedX = this.accel;
          this.speedY = this.speedY + this.torsion;
  
          let racketSpeed = game.racketL.speed;
          if( racketSpeed > 0 ) {
            this.speedY = -(this.speedY + this.torsion);
          } else if (racketSpeed < 0 ) {
            this.speedY = this.speedY + this.torsion;
          } else {
            this.speedY = this.speedY;
          }
       }
  
       /*** ball SRTIKE right ***/
      if(this.x + this.size > game.racketR.x - game.racket.width &&
        this.y + this.size > game.racketR.y &&
        this.y - this.size < game.racketR.y + game.racket.height) {
          this.speedX = -this.accel;
  
          let racketSpeed = game.racketR.speed;
          if( racketSpeed > 0 ) {
            this.speedY = -(this.speedY + this.torsion);
          } else if (racketSpeed < 0 ) {
            this.speedY = this.speedY + this.torsion;
          } else {
            this.speedY = this.speedY;
          }
          
      } 
  
      this.y += this.speedY;
      this.x += this.speedX;
    },
    
  };
  
  game.racket = {
    accel: 5,
    width: 12,
    height: 80,
  };
  
  //***********  Racket Left ****************/
  game.racketL = {
    speed: 0,
    x: 0,
    y: game.area.height/2 - game.racket.height/2,
    move: function() {
      if(this.speed) {
        this.y += this.speed;
        if( this.y <= 0 || this.y + game.racket.height >= game.area.height) {
          this.speed = 0;
        }
      }  
    },
    setSpeed: function(direction){
     
      if(direction === keys.leftTop) {
        this.speed = this.y <= 0 ? 0 :  -game.racket.accel;
      }
      if(direction === keys.leftBottom) {
        this.speed = (this.y + game.racket.height) >= game.area.height ? 0 :  game.racket.accel;
      }
    },
    stop: function() {
      this.speed = 0;
    }
  };
  
  //***********  Racket Right ****************/
  game.racketR = {
    speed: 0,
    x: game.area.width,
    y: game.area.height/2 - game.racket.height/2,
    move: function() {
      if(this.speed) {
        this.y += this.speed;
        if( this.y <= 0 || this.y + game.racket.height >= game.area.height) {
          this.speed = 0;
        }
      }
    },
    setSpeed: function(direction){
     
      if(direction === keys.rightTop) {
        this.speed = this.y <= 0 ? 0 :  -game.racket.accel;
      }
      if(direction === keys.rightBottom) {
        this.speed = (this.y + game.racket.height) >= game.area.height ? 0 :  game.racket.accel;
      }
    },
    stop: function() {
      this.speed = 0;
    }
  };
  
    
    window.addEventListener('load', () => {
      game.start();
    });
  
  })();