var oneName = document.querySelector('#one-name');
var twoName = document.querySelector('#two-name');
var threeName = document.querySelector('#three-name');
var fourName = document.querySelector('#four-name');
var imparPoint = document.querySelector('#impar-point');
var parPoint = document.querySelector('#par-point');
socket.on('choosePlayer', function(playersId){
	console.log(playersId)
	for(i=0; i<playersId.length; i++){
		if(playersId[i].number === 'one'){
			oneName.innerHTML = playersId[i].name;
		}
		else if(playersId[i].number === 'two'){
			twoName.innerHTML = playersId[i].name;
		}
		else if(playersId[i].number === 'three'){
			threeName.innerHTML = playersId[i].name;
		}
		else if(playersId[i].number === 'four'){
			fourName.innerHTML = playersId[i].name;
		}
		else{

		}
	}
})

socket.on('choosePlayerDiscon', function(allPlayers){
	console.log(allPlayers.includes('one'));
	if(allPlayers.includes('one') === false){
		oneName.innerHTML = '...'
	}
	if(allPlayers.includes('two') === false){
		twoName.innerHTML = '...'
	}
	if(allPlayers.includes('three') === false){
		threeName.innerHTML = '...'
	}
	if(allPlayers.includes('four') === false){
		fourName.innerHTML = '...'
	}
})

socket.on('sbPoints', function(toSbPoints){
	window[toSbPoints+'Points']++;
	window[toSbPoints+'Point'].innerHTML = window[toSbPoints+'Points'];

})