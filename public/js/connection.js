
//	Save the allPlayers array from server to local enviroment | Local debugging
var localPlayers = []

socket.on('informConnection', playerConnection);
function playerConnection(allPlayers, detection, playersId, playersActive){

	var amountofplayer = false;
	if(playersActive.length === 4){
		console.log('play')
		randomShuffle();
		console.log(card);
		firstShuffleCard = card;
		firstDeckCards = deckCards;
		socket.emit('firstShuffle', firstShuffleCard, firstDeckCards)
		amountofplayer = true;
	}
	
	socket.emit('gameStart', amountofplayer, allPlayers)
	localPlayers = allPlayers
}



// This function take the info of deconections player and update the array of localPlayers
socket.on('informDeconection', playerDeconnection);		
function playerDeconnection(allPlayers){
	localPlayers = allPlayers
}


// Debugg listener

// window.addEventListener('click', function(){
// 	console.log(localPlayers);
// })
