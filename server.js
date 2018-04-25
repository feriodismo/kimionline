const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;

const server = express()
  .use(express.static('public'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', newConnection);

// Info of players connections arrays
// array with player number info
var allPlayers = []
// array with objects with player number and player name info
var playersId = []
var playersActive = []
var trashId = []
var playerTab = []
// Server connection
var trashCount = 0;

function newConnection(socket){

	// Detect when a user is disconnected

	socket.on('disconnect', function () {

		// If socket connection has player number, it disconnect deleting it id, player info, and it share to the client
		if(allPlayers.indexOf(socket.id)>-1 === true){

			// This variable detects the indexOf socket.id of allPlayers array of disconnectig user | Server Side
			var i = allPlayers.indexOf(socket.id)

			// This variable detects the indexOf socket.id of playerId array of disconnecting user (the function of this array is for detect the names of coop, opp(1, 2) of ich player) | Client Side
			var o = playersId.map(function(e) { return e.number; }).indexOf(socket.id);

			// Deleting player info from its arrays
			playersId.splice(o, 1);
			allPlayers.splice(i, 1);
			socket.broadcast.emit('choosePlayerDiscon', allPlayers);
			// Sending all the allPlayers array to the Client (connection.js)
			socket.broadcast.emit('informDeconection', allPlayers);
				if(allPlayers.length === 3){
					var downServer = 'down.html';
					socket.broadcast.emit('playerDown', downServer);
					playerTab = []
					playersActive = [];
				}
			}

		// If socket connection is a repeat number (one, two, three or four), it force the disconnection	
		else{ // THIS NEEDS A VIEW OF FULL SERVER
    		console.log('desconectado por servidor lleno');
    	}
	});
	

	// Server connections 
	socket.on('informConnection', playerConnection);
	
	// Validate if a connection can go trought the web or its disconnect, deppending if player number exist or not | Receive an object with player number and player name (detection)
	function playerConnection(detection){

			if(allPlayers.indexOf(detection.number)>-1 === false){
				console.log('conectado: '+detection.number)
				socket.id = detection.number;
				allPlayers.push(detection.number);
				playersId.push(detection);
				socket.broadcast.emit('choosePlayer', playersId);
				socket.broadcast.emit('informConnection', allPlayers, detection, playersId, playersActive)
			}
			else{
				var destination = 'full.html';
				socket.emit('redirect', destination);
				socket.disconnect(); // THIS NEEDS A VIEW INFORMING USER THAT IS DISCONNECTING
			}
			
			
	}	
	// Active to play
	socket.on('activePlay', function(data){
		playersActive.push(data.who);
		socket.broadcast.emit('newActivePlay', data);
		console.log(playersActive.length);
		if (playersActive.length === 4){
			var detection = null;
			socket.broadcast.emit('informConnection', allPlayers, detection, playersId, playersActive)
			playersActive = [];
		}
	})
	// Delivery Cards
	socket.on('deliveryCards', function(newCard){
		socket.broadcast.emit('deliveryCards', newCard);
		console.log('entregando cartas')
	})

	// Start Game
	socket.on('gameStart', function(amountofplayer, allPlayers){
		socket.broadcast.emit('gameStart', amountofplayer, allPlayers)
	})

	// Server cards
	socket.on('share', updateHTML);
	function updateHTML(data){
			socket.broadcast.emit('share', data)
			// console.log(data.changingCard);
	}

	// Server chat
	socket.on('type', newServerTyping);
	function newServerTyping(data){
			socket.broadcast.emit('type', data)
		
		}

	//Server chat
	socket.on('serverText', newServerText);
	function newServerText(data){
			socket.broadcast.emit('serverText', data)
			
		}

	// Friend Server chat
	socket.on('friendType', newFriendServerTyping);
	function newFriendServerTyping(data){
			socket.broadcast.emit('friendType', data)
		
		}

	// Friend Server chat
	socket.on('serverFriendText', newServerFriendText);
	function newServerFriendText(data){
			socket.broadcast.emit('serverFriendText', data)
			
		}

	socket.on('kimipress', function(info){
		socket.broadcast.emit('kimipress', info);
	})

	socket.on('choosePlayer', function(){
		socket.emit('choosePlayer', playersId);
	})

	
	socket.on('firstShuffle', function(firstShuffleCard, firstDeckCards){
		socket.broadcast.emit('firstShuffle', firstShuffleCard, firstDeckCards)
	})

	socket.on('shareTrasho', function(chTrashId){
		socket.broadcast.emit('shareTrasho', chTrashId);

	})

	socket.on('trashQuestion', function(chTrashId){
		trashId = chTrashId
		socket.broadcast.emit('trashQuestion');
	})

	socket.on('trashQuestionAnswer', function(trashAnswer){

			if (trashAnswer.no === true){
				var continueWithTrash = false;
				socket.broadcast.emit('trashQuestionAnswer', continueWithTrash, trashId);
				trashCount = 0;
			}
			else if(trashAnswer.yes === true){
				trashCount++
				console.log(trashCount);
				if (trashCount === 4){
					var continueWithTrash = true;
					socket.broadcast.emit('trashQuestionAnswer', continueWithTrash, trashId);
					trashCount = 0;
				}

			}


	})
		socket.on('waitForCut', function(whoEmit){
		socket.broadcast.emit('waitForCut', whoEmit);
	})
	socket.on('cuttinOppServer', function(info){
		socket.broadcast.emit('cuttinOppServer', info);
	})

	//canvas
	socket.on('mouse', function(data){
		socket.broadcast.emit('mouse', data)
	})

	socket.on('friendmouse', function(data){
		socket.broadcast.emit('friendmouse', data)
	})

	socket.on('sbPoints', function(toSbPoints){
		socket.broadcast.emit('sbPoints', toSbPoints)
	})

	// For Latency
	socket.on('latency', function (startTime, cb) {
  		cb(startTime);
	});

	//For tab checker
	socket.on('inactiveTab', function(info, status){
			if(!status){
				playerTab.push(info);
				socket.broadcast.emit('pauseGame', playerTab);
			}
			else if (status){
				var index = playerTab.indexOf(info);
				playerTab.splice(index, 1);
				socket.broadcast.emit('pauseGame', playerTab);
			}

	});

}