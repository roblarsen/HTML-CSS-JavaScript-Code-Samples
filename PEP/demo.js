window.addEventListener('DOMContentLoaded', function() {
var canvas = document.getElementById("track"),
	  ctx = canvas.getContext("2d");  
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    function randomHex(){
      return '#'+Math.floor(Math.random()*16777215).toString(16);
    }
    function circle( params ) {
      params = params || {};
      var x = params.x,
          y = params.y,
          radius = params.radius || 10,
          fillStyle = params.fillStyle || false;  
      ctx.moveTo( x, y );
      ctx.beginPath();
      ctx.arc( x, y, radius, 0, 2 * Math.PI);
      if ( fillStyle ) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
      }
      ctx.closePath();
    }
		function bubbleon(){
			canvas.addEventListener('pointermove', bubble, false);
		}
		function bubbleoff(){
			canvas.removeEventListener('pointermove', bubble, false);
		}
    function bubble(e){
      circle({
				x:e.clientX,
				y:e.clientY,
				radius:20 * Math.random(),
				fillStyle:randomHex()
			});
    }
    canvas.addEventListener('pointerdown', bubbleon, false);
		canvas.addEventListener('pointerup', bubbleoff, false);
    document.getElementById("reset")
      .addEventListener('click', function(){
        ctx.clearRect( 0, 0, 1024, 768 );
      }, false);
  }, false);