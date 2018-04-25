var pauseDiv = document.querySelector('.pause');

window.addEventListener("blur", function(){
	 var info = namePlayer;
	 var status = false;
	 socket.emit('inactiveTab', info, status);
	 console.log('inactive');
});

window.addEventListener("focus", function(){
	var info = namePlayer;
	var status = true;
	socket.emit('inactiveTab', info, status);
	console.log('active');
});

socket.on('pauseGame', function(playerTab){
	if (playerTab.length > 0){
		console.log(playerTab);
		pauseDiv.style.display = 'flex';
	}
	else{
		pauseDiv.style.display = 'none';
	}
})