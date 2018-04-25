
/*
 _____ _____ _   _ _   _ _____ _____ _____ _____ _____ _   _   _____ _____ _____ _   _______ 
/  __ \  _  | \ | | \ | |  ___/  __ \_   _|_   _|  _  | \ | | /  ___|  ___|_   _| | | | ___ \
| /  \/ | | |  \| |  \| | |__ | /  \/ | |   | | | | | |  \| | \ `--.| |__   | | | | | | |_/ /
| |   | | | | . ` | . ` |  __|| |     | |   | | | | | | . ` |  `--. \  __|  | | | | | |  __/ 
| \__/\ \_/ / |\  | |\  | |___| \__/\ | |  _| |_\ \_/ / |\  | /\__/ / |___  | | | |_| | |    
 \____/\___/\_| \_|_| \_|____/ \____/ \_/  \___/ \___/\_| \_/ \____/\____/  \_/  \___/\_|    
 */
                                                                                  
// Inform connection to connection.js


var localPlayers = []
socket.on('gameStart', function(amountofplayer, allPlayers){ //THIS NEED A WAITING VIEW
	localPlayers = allPlayers
	console.log(localPlayers.length+'/4 players connected');
	// boxText.innerHTML += "<p style='color:green;' class='connected'>"+localPlayers.length+"/4 jugadores conectados</p>"
	boxText.scrollTop = boxText.scrollHeight;
	if(amountofplayer === true){
	// boxText.innerHTML += "<p style='color:green;' class='connected'>comienza el kimi!</p>"
	// kimiShuffle();
	}

});


socket.on('informDeconection', playerDeconnection);

function playerDeconnection(allPlayers){
	localPlayers = allPlayers
	// console.log(localPlayers.length+'/4 players connected');
	// boxText.innerHTML += "<p style='color:red;' class='connected'>"+localPlayers.length+"/4 jugadores conectados</p>"
	boxText.scrollTop = boxText.scrollHeight;
}




/*
 _____ _   _  ___ _____   _____ _____ _____ _   _______ 
/  __ \ | | |/ _ \_   _| /  ___|  ___|_   _| | | | ___ \
| /  \/ |_| / /_\ \| |   \ `--.| |__   | | | | | | |_/ /
| |   |  _  |  _  || |    `--. \  __|  | | | | | |  __/ 
| \__/\ | | | | | || |   /\__/ / |___  | | | |_| | |    
 \____|_| |_|_| |_/\_/   \____/\____/  \_/  \___/\_|
 */

var whoWrite = namePlayer;
var inputName = '#type-input-'+thisPlayer

window[thisPlayer+'typeInput'] = document.querySelector(inputName);
var boxText = document.querySelector('#box-text');
var boxTyping = document.querySelector("#box-typing")
window[thisPlayer+'typeInput'].addEventListener('input', typing);
// window[thisPlayer+'typeInput'].addEventListener('keypress', enterText);
window[thisPlayer+'typeInput'].focus();	

socket.on('type', newTyping);
socket.on('serverText', printInBox);
var playerTyping = []

playerTyping[0] = 'none';
playerTyping[1] = 'none';
playerTyping[2] = 'none';
playerTyping[3] = 'none';
function newTyping(data){
	if(data.whotyping === 'none'){
		boxTyping.innerHTML = ''
	}
	else if(data.who !== thisPlayer){
		boxTyping.innerHTML = '<p>'+data.whotyping+' esta escribiendo...</p>'
	}
}




function typing(){
	console.log('que pso')
	if(window[thisPlayer+'typeInput'].value !== ''){
		var data = {
				who: thisPlayer,
				whotyping: namePlayer
				}
		socket.emit('type', data);
	}
	else if(window[thisPlayer+'typeInput'].value === ''){
		var data = {
				whotyping: 'none'
				}

		socket.emit('type', data);
	}
}


window[thisPlayer+'typeInput'].addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        var bug = namePlayer
		if(bug === namePlayer){
		var write = window[thisPlayer+'typeInput'].value;

		console.log(namePlayer+': '+write);
		
			var data = {
				who: namePlayer,
				write: write
				}
	
		localPrintBox(data);
		}
    }
});


function printInBox(data){


		var who = data.who;
		var text = data.write
		console.log(who);
		if (who === namePlayer){
		 }
		else{
			typing();
			boxText.innerHTML +="<div class='chat-box-friend'><div class='friend-message'><p>"+text+"</p></div><div class='friend-name'>"+who+"</div></div>"
			boxText.scrollTop = boxText.scrollHeight;
			if (chatClose === true){
				chatBox.style.border = "2px solid #54eee0"
			}
		 }		

}

function localPrintBox(data){


	var who = data.who;
	var text = data.write

	if(text !== ''){
		if (who === namePlayer){
			window[thisPlayer+'typeInput'].value = '';
			typing();
			boxText.innerHTML +="<div class='chat-box-player'><div class='player-message'><p>"+text+"</p></div><div class='player-name'>"+who+"</div></div>"
			boxText.scrollTop = boxText.scrollHeight;
				var data = {
				who: namePlayer,
				write: data.write
				}
		socket.emit('serverText', data);
		printInBox(data);
		}
	}	
}

var minChatBtn = document.querySelector('#min-chat-btn');
var chatInputDiv = document.querySelector('#chat-input-div');
var chatBox = document.querySelector('#chat-box');
var chatCanvas = document.querySelector('#chat-box-canvas');
var chatCanvasIndex = document.querySelector('#chat-box-canvas-index')
minChatBtn.addEventListener('click', minimizeChat)
var chatClose = false; 

function minimizeChat(){

	if(chatClose === false){
		chatClose = true;
		boxTyping.style.padding = '0px'
		boxTyping.style.height = '0px'
		chatBox.style.height = '35px'
		boxText.style.display = 'none';
		chatInputDiv.style.display = 'none';
		chatCanvasIndex.style.display = 'none';
		chatCanvas.style.display = 'none';
	}
	else if(chatClose === true){
		chatClose = false;
		chatBox.style.border = "1px solid #80808059";
		
		boxTyping.style.height = '10px';
		boxTyping.style.padding = '4px';
		chatBox.style.height = '520px'
		boxText.style.display = 'block';
		chatInputDiv.style.display = 'block';
		chatCanvas.style.display = 'block';
		chatCanvasIndex.style.display = 'flex';
		window[thisPlayer+'typeInput'].focus();	
	}

}


//FRIEND CHAT
socket.on('friendType', newFriendTyping);
socket.on('serverFriendText', friendPrintInBox);
var friendTypeInput = document.querySelector('#friend-type-input');
var friendBoxText = document.querySelector('#friend-box-text');
var friendBoxTyping = document.querySelector("#friend-box-typing");
friendTypeInput.addEventListener('input', friendTyping);
// window[thisPlayer+'typeInput'].addEventListener('keypress', enterText);

function newFriendTyping(data){
	console.log(data.who)
	if(data.whotyping === 'none'){
		friendBoxTyping.innerHTML = ''
	}
	else if(data.who !== thisPlayer && data.who === coopPlayer){
		friendBoxTyping.innerHTML = '<p>'+data.whotyping+' esta escribiendo...</p>'
	}
}




function friendTyping(){

	if(friendTypeInput.value !== ''){
		var data = {
				who: thisPlayer,
				whotyping: namePlayer
				}
		socket.emit('friendType', data);
	}
	else if(friendTypeInput.value === ''){
		var data = {
				who: thisPlayer,
				whotyping: 'none'
				}

		socket.emit('friendType', data);
	}
}

friendTypeInput.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        var bug = namePlayer
		if(bug === namePlayer){
		var write = friendTypeInput.value;

		console.log(namePlayer+': '+write);

			var data = {
				whoNumber: thisPlayer,
				who: namePlayer,
				write: write
				}
	
		friendLocalPrintBox(data);
		}
    }
});


function friendPrintInBox(data){
	console.log('este es mio:'+ data.whoNumber)
	if (data.whoNumber === coopPlayer){
		var who = data.who;
		var text = data.write
		console.log(who);
		if (who === namePlayer){
		 }
		else{
			typing();
			friendBoxText.innerHTML +="<div class='chat-box-friend'><div class='friend-message'><p>"+text+"</p></div><div class='friend-name'>"+who+"</div></div>"
			friendBoxText.scrollTop = friendBoxText.scrollHeight;
			friendBoxTyping.innerHTML = '';
		 }
	}		

}

function friendLocalPrintBox(data){

	
		var who = data.who;
		var text = data.write

		if(text !== ''){
			if (who === namePlayer){
				friendTypeInput.value = '';
				typing();
				friendBoxText.innerHTML +="<div class='chat-box-player'><div class='player-message'><p>"+text+"</p></div><div class='player-name'>"+who+"</div></div>"
				friendBoxText.scrollTop = friendBoxText.scrollHeight;
					var data = {
					whoNumber: thisPlayer,
					who: namePlayer,
					write: data.write
					}
			socket.emit('serverFriendText', data);
			printInBox(data);
			}
		}	
	
}