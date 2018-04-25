var socket = io();
socket.emit('choosePlayer');

var oneSlot = document.querySelector('#oneSlot');
var twoSlot = document.querySelector('#twoSlot');
var threeSlot = document.querySelector('#threeSlot');
var fourSlot = document.querySelector('#fourSlot');

var oneName = document.querySelector('#one-name');
var twoName = document.querySelector('#two-name');
var threeName = document.querySelector('#three-name');
var fourName = document.querySelector('#four-name');

socket.on('choosePlayer', function(playersId){
	console.log(playersId)
	for(i=0; i<playersId.length; i++){
		if(playersId[i].number === 'one'){
			oneSlot.innerHTML = playersId[i].name+' esta jugando...'
		}
		else if(playersId[i].number === 'two'){
			twoSlot.innerHTML = playersId[i].name+' esta jugando...'
		}
		else if(playersId[i].number === 'three'){
			threeSlot.innerHTML = playersId[i].name+' esta jugando...'
		}
		else if(playersId[i].number === 'four'){
			fourSlot.innerHTML = playersId[i].name+' esta jugando...'
		}
		else{

		}
	}
})

socket.on('choosePlayerDiscon', function(playersId){
	
	if(playersId.length === 0){
		oneSlot.innerHTML = '<a href="views/one.html">Jugador Uno</a>'
		twoSlot.innerHTML = '<a href="views/two.html">Jugador Dos</a>'
		threeSlot.innerHTML = '<a href="views/three.html">Jugador Tres</a>'
		fourSlot.innerHTML =  '<a href="views/four.html">Jugador Cuatro</a>'
	}

	for(i=0; i<playersId.length; i++){
		console.log('for')
		if(playersId.map(function(e) { return e.number; }).indexOf('one') === -1){
			console.log('aqui uno')
			oneSlot.innerHTML = '<a href="views/one.html">Jugador Uno</a>'
		}
		if(playersId.map(function(e) { return e.number; }).indexOf('two') === -1){
			console.log('aqui dos')
			twoSlot.innerHTML = '<a href="views/two.html">Jugador Dos</a>'
		}
		if(playersId.map(function(e) { return e.number; }).indexOf('three') === -1){
			console.log('aqui tres')
			threeSlot.innerHTML = '<a href="views/three.html">Jugador Tres</a>'
		}
		if(playersId.map(function(e) { return e.number; }).indexOf('four') === -1){
			console.log('aqui cuatro')
			fourSlot.innerHTML = '<a href="views/four.html">Jugador Cuatro</a>'
		}
	}
})