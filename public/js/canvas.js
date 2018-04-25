

// var s = function( p ) { // p could be any variable name
//   var x = 100; 
//   var y = 100;
//   p.setup = function() {
//     p.createCanvas(400, 200);
//   };

//   p.draw = function() {
//     p.background(0);
//     p.fill(255);
//     p.rect(x,y,50,50);
//   };
// };
// var myp5 = new p5(s, 'c1');
var ccolor;
socket.on('mouse', newDrawing);
socket.on('friendmouse', newDrawingFriend);
var s = function(p, socket){


var rcolor = 200;
var gcolor = 200;
var bcolor = 200;

p.setup = function(socket){
	p.createCanvas(225, 180);
	// myCanvas.parent('chat-box-canvas')
	p.background(59, 64, 71);
	ccolor = p.color(200, 200, 200);
	// socket.on('mouse', newDrawing);
}





p.mouseDragged = function(socket){
	
	p.strokeWeight(2);
	p.stroke(ccolor);
	p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);

	
	var data = {
		x: p.mouseX,
		y: p.mouseY,
		px: p.pmouseX,
		py: p.pmouseY,
		colorr: rcolor,
		colorg: gcolor,
		colorb: bcolor
	}
	
	pasando(data);
	
}

var clearCanvas = document.querySelector('#clear-canvas');
clearCanvas.addEventListener('click', function(){
	p.clear();
})


var canvasPink = document.querySelector('#canvas-pink');
var canvasYellow = document.querySelector('#canvas-yellow');
var canvasWhite = document.querySelector('#canvas-white');
var canvasBlue = document.querySelector('#canvas-blue');
var canvasGreen = document.querySelector('#canvas-green');

canvasPink.addEventListener('click', function(){
	ccolor = p.color(255, 209, 240)
	rcolor = 255;
	gcolor = 209;
	bcolor = 240;

})
canvasYellow.addEventListener('click', function(){
	ccolor = p.color(251, 255, 132)
	rcolor = 251;
	gcolor = 255;
	bcolor = 132;
})
canvasWhite.addEventListener('click', function(){
	ccolor = p.color(255, 255, 255)
	rcolor = 255;
	gcolor = 255;
	bcolor = 255;
})
canvasBlue.addEventListener('click', function(){
	ccolor = p.color(194, 220, 253)
	rcolor = 194;
	gcolor = 220;
	bcolor = 253;
})
canvasGreen.addEventListener('click', function(){
	ccolor = p.color(179, 255, 183)
	rcolor = 179;
	gcolor = 255;
	bcolor= 183;
})
}
var cCanvas = new p5(s, 'chat-box-canvas');
var clearCanvas = document.querySelector('#clear-canvas');
clearCanvas.addEventListener('click', function(){
	cCanvas.clear();
})
function newDrawing(data){
	var scolor = cCanvas.color(data.colorr, data.colorg, data.colorb)
	cCanvas.strokeWeight(2);
	cCanvas.stroke(scolor)
	cCanvas.line(data.x, data.y, data.px, data.py);
}

function pasando(data){
	socket.emit('mouse', data)
}




//friend canvas
var f = function(p){


var rcolor = 200;
var gcolor = 200;
var bcolor = 200;

p.setup = function(){
	p.createCanvas(225, 180);
	// myCanvas.parent('chat-box-canvas')
	p.background(59, 64, 71);
	fccolor = p.color(200, 200, 200);
	// socket.on('mouse', newDrawing);
}





p.mouseDragged = function(){
	
	p.strokeWeight(2);
	p.stroke(ccolor);
	p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);

	
	var data = {
		who: thisPlayer,
		x: p.mouseX,
		y: p.mouseY,
		px: p.pmouseX,
		py: p.pmouseY,
		colorr: rcolor,
		colorg: gcolor,
		colorb: bcolor
	}
	
	pasandoFriend(data);
	
}




var friendCanvasPink = document.querySelector('#friend-canvas-pink');
var friendCanvasYellow = document.querySelector('#friend-canvas-yellow');
var friendCanvasWhite = document.querySelector('#friend-canvas-white');
var friendCanvasBlue = document.querySelector('#friend-canvas-blue');
var friendCanvasGreen = document.querySelector('#friend-canvas-green');

friendCanvasPink.addEventListener('click', function(){
	ccolor = p.color(255, 209, 240)
	rcolor = 255;
	gcolor = 209;
	bcolor = 240;

})
friendCanvasYellow.addEventListener('click', function(){
	ccolor = p.color(251, 255, 132)
	rcolor = 251;
	gcolor = 255;
	bcolor = 132;
})
friendCanvasWhite.addEventListener('click', function(){
	ccolor = p.color(255, 255, 255)
	rcolor = 255;
	gcolor = 255;
	bcolor = 255;
})
friendCanvasBlue.addEventListener('click', function(){
	ccolor = p.color(194, 220, 253)
	rcolor = 194;
	gcolor = 220;
	bcolor = 253;
})
friendCanvasGreen.addEventListener('click', function(){
	ccolor = p.color(179, 255, 183)
	rcolor = 179;
	gcolor = 255;
	bcolor= 183;
})
}
var fCanvas = new p5(f, 'friend-chat-box-canvas');

function newDrawingFriend(data){
	if (data.who === coopPlayer){
	var scolor = fCanvas.color(data.colorr, data.colorg, data.colorb)
	fCanvas.strokeWeight(2);
	fCanvas.stroke(scolor)
	fCanvas.line(data.x, data.y, data.px, data.py);
	}
}


function pasandoFriend(data){
	socket.emit('friendmouse', data)
}
var clearFriendCanvas = document.querySelector('#friend-clear-canvas');
clearFriendCanvas.addEventListener('click', function(){
	fCanvas.clear();
})