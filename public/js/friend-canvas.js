var ccolor;
var rcolor = 200;
var gcolor = 200;
var bcolor = 200;



function setup(){
	var myCanvas = createCanvas(225, 180);
	myCanvas.parent('friend-chat-box-canvas')
	background(59, 64, 71);
	c = color(200, 200, 200);
	socket.on('mouse', newDrawing);
}


function newDrawing(data){
	var scolor = color(data.colorr, data.colorg, data.colorb)
	strokeWeight(2);
	stroke(scolor)
	line(data.x, data.y, data.px, data.py);
}


function mouseDragged(){
	
	strokeWeight(2);
	stroke(c);
	line(mouseX, mouseY, pmouseX, pmouseY);

	
	var data = {
		x: mouseX,
		y: mouseY,
		px: pmouseX,
		py: pmouseY,
		colorr: rcolor,
		colorg: gcolor,
		colorb: bcolor
	}
	
	socket.emit('mouse', data)
	
}
