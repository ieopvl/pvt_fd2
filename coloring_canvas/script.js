
"use strict";

(function(){

  const coloring = {
    cva: document.getElementById('CVA'), // canvas
    ctx: null, // context
    img: null,
    init: function() {
      this.ctx = this.cva.getContext('2d');
      this.events();
    },
    load: function() {
      this.img = new Image();
      this.img.src = 'img/snail.png';
       
      this.img.addEventListener('load', () => {
        this.run();
      });
    },
    render: function() {
      this.ctx.drawImage(this.img, 0, 0, 250, 250);
    },
    run: function() {
      window.requestAnimationFrame( () => {
        this.render();
      });
    },
    start: function() {
      this.init();
      this.load();
    },
    events: function() {
      document.getElementById('CVA').addEventListener('click', (e) => {
        e = e || window.e;

        let x = e.pageX - this.pic.x;
        let y = e.pageY - this.pic.y;
        
        let pixelInfo = this.ctx.getImageData(x, y, 1, 1);
        console.log('pixelInfo :', this.ctx);
        let data = pixelInfo.data; // red green blue alfa

        console.log('data :', data.length);
      });
    }
  };
  
  coloring.pic = {
    x: coloring.cva.offsetLeft,
    y:coloring.cva.offsetTop,
  };




  window.addEventListener( 'load', (e) => coloring.start() );
  //console.log('img :', img);



})();