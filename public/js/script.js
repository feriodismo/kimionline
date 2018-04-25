// Setting up connections
var socket = io();
var body = document.querySelector('body');
// For Latency
setInterval(function(){
	socket.emit('latency', Date.now(), function(startTime) {
	    var latency = Date.now() - startTime;
	    if (latency > 800){
	    	body.style.background = '#FFE2E2'
	    }
	    else if (latency < 800 && latency > 700){
	    	latencyDisplay.innerHTML = "<div style='background:#FF9494' class='latency-ball'></div>"
	    	body.style.background = 'white'
	    }
	     else if (latency < 800 && latency > 400){
	    	latencyDisplay.innerHTML = "<div style='background:#FFD394' class='latency-ball'></div> <div style='background:#FFD394' class='latency-ball'></div>"
	    	body.style.background = 'white'
	    }

	    else if (latency < 800 && latency > 200){
	    	latencyDisplay.innerHTML = "<div style='background:#FFFB9B' class='latency-ball'></div> <div style='background:#FFFB9B' class='latency-ball'></div> <div style='background:#FFFB9B' class='latency-ball'></div>"
	    	body.style.background = 'white'
	    }

	    else if (latency < 800 && latency > 0){
	    	latencyDisplay.innerHTML = "<div class='latency-ball'></div> <div class='latency-ball'></div> <div class='latency-ball'></div> <div class='latency-ball'></div>"
	    	body.style.background = 'white'
	    }
	});
},1000)

var kimiAudio = document.querySelector('#kimi-audio');
// kimiAudio.play();
var allPlayerInGame = false;
var app = document.querySelector('#app');
var latencyDisplay = document.querySelector('.latency-bar')
var playBtn = document.querySelector('#play-btn');
var myAlert=document.querySelector('#my-alert');
var myAlertTrash = document.querySelector('#my-alert-trash');
var myAlertCut = document.querySelector('#my-alert-cut');
var yesBtn = document.querySelector('#yes-btn');
var noBtn = document.querySelector('#no-btn');
var opp1Btn = document.querySelector('#opp1-btn')
var opp2Btn = document.querySelector('#opp2-btn')
var chatBtns = document.querySelector('#chat-btns')
var oneCircle = document.querySelector('#one-circle');
var twoCircle = document.querySelector('#two-circle');
var threeCircle = document.querySelector('#three-circle');
var fourCircle = document.querySelector('#four-circle');
var friendChatBox = document.querySelector('#friend-chat-box');
var friendChatBoxIndex = document.querySelector('.friend-chat-box-index');
yesBtn.addEventListener('click', yesClick)
noBtn.addEventListener('click', noClick)
// Declare variables of others players name for the distribution
var nameCoop = 'anonimo';
var nameOpp1 = 'anonimo';
var nameOpp2 = 'anonimo';
socket.on('newActivePlay', function(data){
	if (data.who !== thisPlayer){
	window[data.who+'Circle'].style.visibility = 'visible';
	}

})

socket.on('playGame', function(){
		myAlert.style.display = 'none';
		myAlert.innerHTML = '';
		chatBtns.style.visibility = 'visible';

})
socket.on('playerDown', function(serverDown){
	window.location.href = serverDown;
})

socket.on('redirect', function(destination) {
    window.location.href = destination;
});


socket.on('firstShuffle', function(firstShuffleCard, firstDeckCards){
	myAlert.style.display = 'none';
	myAlert.innerHTML = '';
	chatBtns.style.visibility = 'visible';
	friendChatBox.style.display = 'none';
	card = firstShuffleCard;
	deckCards = firstDeckCards;
	kimiShuffle()
})

socket.on('informConnection', playersNames)

function playersNames(allPlayers, detection, playersId, playersActive){
	if (playersActive.length !== 4){
		console.log('go')
		myAlert.style.display = 'flex';
		myAlert.innerHTML = '<div class="my-alert"><h1>hey se calento?</h1><br><h2></h2><br><p></p></div>'


		if (playersId.length === 4){
			allPlayerInGame = true;
			playBtn.style.display = 'block';
			// myAlert.style.display = 'none';
			// myAlert.innerHTML = '';
			// chatBtns.style.visibility = 'visible';
		}
		if (namePlayer !== undefined){
			if(playersId.length !== 4){
				
			// myAlert.style.display = 'flex';
			// myAlert.innerHTML = '<div class="my-alert"><h1>espera</h1><br><h2>faltan jugadores para empezar la partida</h2><br><p></p></div>'


			}
		}
	  	// app.style.display = 'block'
	  	for(i=0;i<playersId.length;i++){
	  	console.log(playersId[i].name);
	  		if(playersId[i].number === coopPlayer){
	  			nameCoop = playersId[i].name;
	  		}
	  	
	  		if(playersId[i].number === opp1){
	  			nameOpp1 = playersId[i].name;
	  		}
	  	
	  		else if(playersId[i].number === opp2){
	  			nameOpp2 = playersId[i].name;
	  		}

	  	}		
	}
}



setTimeout(function(){myAlert.style.display = 'flex'; askName();},10)
function askName(){
var nameVal = /[A-Za-z 0-9_-][^(){}]\w+/
var alertIpt = document.querySelector('#alert-ipt');
alertIpt.focus();

var alertBtn = document.querySelector('#alert-btn');
alertIpt.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        alertBtn.click();
    }
});
alertBtn.addEventListener('click', function(){
	if (alertIpt.value.match(nameVal) && alertIpt.value !== ''){
		namePlayer = alertIpt.value;
		myAlert.innerHTML = ''
		myAlert.style.display = 'none';
		app.style.display = 'block';
		document.title = namePlayer+' | Kimi';
		window[thisPlayer+'typeInput'].focus();	
			var detection = {
				number: thisPlayer,
				name: namePlayer
				}
		socket.emit('informConnection', detection);

	}
	else{
		alert('escribe un nombre valido');
	}
})
}


playBtn.addEventListener('click', function(){

	if (allPlayerInGame === true){
	
	friendChatBoxIndex.style.background = '#a1cbb1';
	playBtn.style.display = 'none';
	console.log('apuratteeee')
window[thisPlayer+'Circle'].style.visibility = 'visible';

	var data = {
		who: thisPlayer
	}
socket.emit('activePlay', data);
}
else{
	alert('espera que este llena la mesa');
}
})


// Team and opponent team minus points variables 
window[team+'noKimi'] = 0;
window[oppTeam+'noKimi'] = 0;
window[team+'Points'] = 0;
window[oppTeam+'Points'] = 0;


// Bar inputs
var playerBar = document.querySelector('#'+thisPlayer+'-ch-bar');
var coopBar = document.querySelector('#'+coopPlayer+'-ch-bar')
var tableBar = document.querySelector('#table-ch-bar');


// PlayerOne cardholders
var oneCh0 = document.querySelector('#one-ch-0');
var oneCh1 = document.querySelector('#one-ch-1');
var oneCh2 = document.querySelector('#one-ch-2');
var oneCh3 = document.querySelector('#one-ch-3');

// Array with PlayerOne cardholders
const oneHolders = []
oneHolders[0] = oneCh0;
oneHolders[1] = oneCh1;
oneHolders[2] = oneCh2;
oneHolders[3] = oneCh3;

// PlayerTwo cardholders
var twoCh0 = document.querySelector('#two-ch-0');
var twoCh1 = document.querySelector('#two-ch-1');
var twoCh2 = document.querySelector('#two-ch-2');
var twoCh3 = document.querySelector('#two-ch-3');

// Array with PlayerTwo cardholders
const twoHolders = []
twoHolders[0] = twoCh0;
twoHolders[1] = twoCh1;
twoHolders[2] = twoCh2;
twoHolders[3] = twoCh3;

// PlayerThree cardholders
var threeCh0 = document.querySelector('#three-ch-0');
var threeCh1 = document.querySelector('#three-ch-1');
var threeCh2 = document.querySelector('#three-ch-2');
var threeCh3 = document.querySelector('#three-ch-3');

// Array with PlayerThree cardholders
const threeHolders = []
threeHolders[0] = threeCh0;
threeHolders[1] = threeCh1;
threeHolders[2] = threeCh2;
threeHolders[3] = threeCh3;

// PlayerFour cardholders
var fourCh0 = document.querySelector('#four-ch-0');
var fourCh1 = document.querySelector('#four-ch-1');
var fourCh2 = document.querySelector('#four-ch-2');
var fourCh3 = document.querySelector('#four-ch-3');

// Array with PlayerFour cardholders
const fourHolders = []
fourHolders[0] = fourCh0;
fourHolders[1] = fourCh1;
fourHolders[2] = fourCh2;
fourHolders[3] = fourCh3;

// Table cardholders
var tCh0 = document.querySelector('#t-ch-0');
var tCh1 = document.querySelector('#t-ch-1');
var tCh2 = document.querySelector('#t-ch-2');
var tCh3 = document.querySelector('#t-ch-3');
var tCh4 = document.querySelector('#t-ch-4');
var tCh5 = document.querySelector('#t-ch-5');
var tCh6 = document.querySelector('#t-ch-6');
var tCh7 = document.querySelector('#t-ch-7');
var tCh8 = document.querySelector('#t-ch-8');
var tCh9 = document.querySelector('#t-ch-9');
var tCh10 = document.querySelector('#t-ch-10');
var tCh11 = document.querySelector('#t-ch-11');
var tCh12 = document.querySelector('#t-ch-12');
var tCh13 = document.querySelector('#t-ch-13');
var tCh14 = document.querySelector('#t-ch-14');
var tCh15 = document.querySelector('#t-ch-15');

// Array with table cardholders
const tableHolders = []
tableHolders[0] = tCh0;
tableHolders[1] = tCh1;
tableHolders[2] = tCh2;
tableHolders[3] = tCh3;
tableHolders[4] = tCh4;
tableHolders[5] = tCh5;
tableHolders[6] = tCh6;
tableHolders[7] = tCh7;
tableHolders[8] = tCh8;
tableHolders[9] = tCh9;
tableHolders[10] = tCh10;
tableHolders[11] = tCh11;
tableHolders[12] = tCh12;
tableHolders[13] = tCh13;
tableHolders[14] = tCh14;
tableHolders[15] = tCh15;

var cardAssignmentStatus = 0;
var gTCardholderStatus = -1;
// Array with players cardholders name for the kimi btn and cut btn
var cardholderList = []
cardholderList[0] = "oneCh0"
cardholderList[1] =	"oneCh1"
cardholderList[2] = "oneCh2"
cardholderList[3] = "oneCh3"
cardholderList[4] = "twoCh0"
cardholderList[5] =	"twoCh1"
cardholderList[6] = "twoCh2"
cardholderList[7] = "twoCh3"
cardholderList[8] = "threeCh0"
cardholderList[9] = "threeCh1"
cardholderList[10] = "threeCh2"
cardholderList[11] = "threeCh3"
cardholderList[12] = "fourCh0"
cardholderList[13] = "fourCh1"
cardholderList[14] = "fourCh2"
cardholderList[15] = "fourCh3"

// Declaring gropus of objects (cards)
function Cards(id, group, name, material, location, cardholder) {
  this.id = id;
  this.group = group;
  this.name = name;
  this.material = material;
  this.location = location;
  this.cardholder = cardholder;
}

// Declaring where to put objects of cards
var card = []

// Declaring each card // toRandom values, location and cardholder
card[0] = new Cards(0, 1, "s/t", "../cards/card0.png", "random", "none");
card[1] = new Cards(1, 1, "s/t", "../cards/card1.png", "random", "none");
card[2] = new Cards(2, 1, "s/t", "../cards/card2.png", "random", "none");
card[3] = new Cards(3, 1, "s/t", "../cards/card3.png", "random", "none");
card[4] = new Cards(4, 2, "s/t", "../cards/card4.png", "random", "none");
card[5] = new Cards(5, 2, "s/t", "../cards/card5.png", "random", "none");
card[6] = new Cards(6, 2, "s/t", "../cards/card6.png", "random", "none");
card[7] = new Cards(7, 2, "s/t", "../cards/card7.png", "random", "none");
card[8] = new Cards(8, 3, "s/t", "../cards/card8.png", "random", "none");
card[9] = new Cards(9, 3, "s/t", "../cards/card9.png", "random", "none");
card[10] = new Cards(10, 3, "s/t", "../cards/card10.png", "random", "none");
card[11] = new Cards(11, 3, "s/t", "../cards/card11.png", "random", "none");
card[12] = new Cards(12, 4, "s/t", "../cards/card12.png", "random", "none");
card[13] = new Cards(13, 4, "s/t", "../cards/card13.png", "random", "none");
card[14] = new Cards(14, 4, "s/t", "../cards/card14.png", "random", "none");
card[15] = new Cards(15, 4, "s/t", "../cards/card15.png", "random", "none");
card[16] = new Cards(16, 5, "s/t", "../cards/card16.png", "random", "none");
card[17] = new Cards(17, 5, "s/t", "../cards/card17.png", "random", "none");
card[18] = new Cards(18, 5, "s/t", "../cards/card18.png", "random", "none");
card[19] = new Cards(19, 5, "s/t", "../cards/card19.png", "random", "none");
card[20] = new Cards(20, 6, "s/t", "../cards/card20.png", "random", "none");
card[21] = new Cards(21, 6, "s/t", "../cards/card21.png", "random", "none");
card[22] = new Cards(22, 6, "s/t", "../cards/card22.png", "random", "none");
card[23] = new Cards(23, 6, "s/t", "../cards/card23.png", "random", "none");
card[24] = new Cards(24, 7, "s/t", "../cards/card24.png", "random", "none");
card[25] = new Cards(25, 7, "s/t", "../cards/card25.png", "random", "none");
card[26] = new Cards(26, 7, "s/t", "../cards/card26.png", "random", "none");
card[27] = new Cards(27, 7, "s/t", "../cards/card27.png", "random", "none");





// This socket recive the other players modification of cards distribuiting

socket.on('share', sharing);

// This function get the socket object, and place the opponents cards in his view

function sharing(data){

	var ccid = data.changingCard.id
	window[data.changingCard.cardholder].thisCard = undefined;
	window[data.changingCard.cardholder].innerHTML = '';
	card[ccid].location = data.location

	if (data.location === 'table'){
		card[ccid].cardholder = 'tCh'+data.i;
	}
	else if (data.location === 'one') {
		card[ccid].cardholder = 'oneCh'+data.i;
	}
	else if (data.location === 'two') {
		card[ccid].cardholder = 'twoCh'+data.i;
	}
	else if (data.location === 'three') {
		card[ccid].cardholder = 'threeCh'+data.i;
	}
	else if (data.location === 'four') {
		card[ccid].cardholder = 'fourCh'+data.i;
	}

	kimiShuffle();
}




function kimiShuffle(){
	for(i=0; i<card.length; i++){
		let cardIndex = i;
		if(card[i].cardholder !== 'none'){
			
			if(card[i].location === thisPlayer){
				window[card[i].cardholder].innerHTML = '<img style="width:90px; height:115px; cursor:pointer;" src="'+card[i].material+'">';
			} 
			else if(card[i].location === 'table'){
				window[card[i].cardholder].innerHTML = '<img style="width:60px; height:75px; cursor:pointer;"src="'+card[i].material+'">';
			}
			//AQUI+*
			else if(card[i].location !== 'table' || card[i].location !== thisPlayer){
				// console.log(card[i]);
				// window[card[i].cardholder].innerHTML = '<img style="width:40px; height:50px;  cursor:pointer;"src="'+card[i].material+'">'
				window[card[i].cardholder].innerHTML = '<img style="width:40px; height:50px;  cursor:pointer;"src="../cards/default.png">'
				
			}

		window[card[i].cardholder].thisCard = card[i];
		
		}
	}
	cleaner();
}


playerBar.addEventListener('click', function(e){ 
	window[thisPlayer+'typeInput'].focus();	
	// Declaring location variable for the function hasCard()
	var location = thisPlayer
	// The clicked HTML element of player bar has card
	if(hasCard(e, "listener", location)){
	
		var changingCard = e.target.parentElement.thisCard
		toTableBar(changingCard);
		

	}

	// The clicked HTML element of player bar has not card
	else{ 
		
	}
	
})

tableBar.addEventListener('click', function(e){
	window[thisPlayer+'typeInput'].focus();	
	var location = "table"

	if(hasCard(e, "listener", location)){
		var changingCard = e.target.parentElement.thisCard
		toPlayerBar(changingCard);

	}
	else{
		
	}
})



function toTableBar(cardObj){ 

	if(!countCard('table')){

		var location = "table"

		for(i=0; i<tableHolders.length; i++){
			if(!hasCard(i, "moving", location)){
				

				// PASSING DATAS TROUGH SERVER

					var data = {

					// Passing all cards data
					allCards: card,
					// Pasing the changing card data
					changingCard: cardObj,
					// Pasing next cardholder id
					i: i,
					// Pasing next location
					location: location 
				}
				socket.emit('share', data);


				// LOCAL CHANGINS

				// Erasing HTML Element attached Card object
				window[cardObj.cardholder].thisCard = undefined;
				// Erasing HTML Element attached Card material
				window[cardObj.cardholder].innerHTML = '';
				// Changing Card object location
				cardObj.location = location
				// Changing Card object cardholder
				cardObj.cardholder = 'tCh'+i;
				// Update Local HTML


			
				kimiShuffle();
				return;
				
				
			}
		}
	}
}

function toPlayerBar(cardObj){
		
		var location = thisPlayer;

		//ATENCION oneHolders
		for(i=0; i<oneHolders.length; i++){
			if(!hasCard(i, "moving", location)){
				// SEVER CHANGINS
					var data = {

					// Passing all cards data
					allCards: card,
					// Pasing the changing card data
					changingCard: cardObj,
					// Pasing next cardholder id
					i: i,
					// Pasing next location
					location: location 
				}
				socket.emit('share', data);

				// LOCAL CHANGINGS
				window[cardObj.cardholder].innerHTML = '';
				window[cardObj.cardholder].thisCard = undefined;
	    		cardObj.location = thisPlayer;	
				cardObj.cardholder = thisPlayer+'Ch'+i;
				kimiShuffle();
				return;
				
				
			}
		}

}



/*//////////////////////////////////////////////////////////////
 _____               _       _                 _     _   _      
/  __ \             | |     | |               (_)   | | (_)     
| /  \/ __ _ _ __ __| |___  | |     ___   __ _ _ ___| |_ _  ___ 
| |    / _` | '__/ _` / __| | |    / _ \ / _` | / __| __| |/ __|
| \__/\ (_| | | | (_| \__ \ | |___| (_) | (_| | \__ \ |_| | (__ 
 \____/\__,_|_|  \__,_|___/ \_____/\___/ \__, |_|___/\__|_|\___|
                                          __/ |                 
                                         |___/                  
//////////////////////////////////////////////////////////////*/



// This function count the amount of card, depending cardholder bar location, return true when the bar is full
function countCard(location){

	// If cardlocation is on table
	if (location === 'table'){
	var counter = 0;
		for(i=0; i<tableHolders.length; i++){
			if(hasCard(i, "moving", location)){
				counter++
				if(counter === tableHolders.length){
					console.log('la mesa esta llena');
					counter = 0;
					return true;
				}
			}
		}
	}

	// if (location === 'player'){
	// 	for(i=0; i<tableHolders.length; i++){
	// 		if(hasCard(i, "moving")){
	// 			counter++
	// 			console.log(counter);
	// 			if(counter === tableHolders.length-1){
	// 				console.log('la mesa esta llena');
	// 				return true;
	// 			}
	// 		}
	// 	}
	// }
}

// This function return true or false dependig if HTML elements has card or not (dependig when is calling)
function hasCard(e, where, location){

	// If calling location is on the listener
	if(where === "listener"){
		if(e.target.parentElement.thisCard === undefined){
			return false;
		}
		else if(e.target.parentElement.thisCard !== undefined){
			return true;
		}
	}

	// If calling location is on the movings functins (toTableBar)
	else if(where === "moving"){
	
		// console.log('tch'+e+': '+window['tCh'+e.thisCard])		
		if (location === "table"){
			if(window['tCh'+e].thisCard === undefined){
				return false;
			}
			else if(window['tCh'+e].thisCard !== undefined){
				return true;
			}
		}
	
		else if(location === thisPlayer){
			if(window[thisPlayer+'Ch'+e].thisCard === undefined){
		
				return false;
			}
			else if(window[thisPlayer+'Ch'+e].thisCard !== undefined){
				return true;
			}
		}
	}
}


var cleanCardholders = []




//THE CLEANER for bugs

function cleaner(){
	for (i=0;i<cardholderList.length;i++){
		cleanCardholders.push(cardholderList[i]);
	}
	

	for(i=0;i<card.length;i++){

		if(cardholderList.indexOf(card[i].cardholder)>-1 === true){
			var o = cleanCardholders.indexOf(card[i].cardholder);
			cleanCardholders.splice(o, 1);
		}

	}

	for (i=0;i<cleanCardholders.length;i++){
		window[cleanCardholders[i]].innerHTML = ''
		window[cleanCardholders[i]].thisCard = undefined
		console.log('cardholders sin cartas: '+cleanCardholders[i]);
	}
	cleanCardholders = [];
}







/*    _                     __                       _                   
     | |                   / _|                     | |                  
  ___| | ___  __ _ _ __   | |_ _ __ ___  _ __ ___   | |__   ___ _ __ ___ 
 / __| |/ _ \/ _` | '_ \  |  _| '__/ _ \| '_ ` _ \  | '_ \ / _ \ '__/ _ \
| (__| |  __/ (_| | | | | | | | | | (_) | | | | | | | | | |  __/ | |  __/
 \___|_|\___|\__,_|_| |_| |_| |_|  \___/|_| |_| |_| |_| |_|\___|_|  \___|
 */


//KIMI BUTTON

var kimiBtn = document.querySelector('#kimi-btn')
// var nameCoop = 'anonimo';
// var nameOpp1 = 'anonimo';
// var nameOpp2 = 'anonimo';
kimiBtn.addEventListener('click', function(){
	var info = {
		who: thisPlayer,
		whoName: namePlayer,
		whoCoop: nameCoop,
		whoTeam: team,
		whoOpp1: nameOpp1,
		whoOpp2: nameOpp2,
		noKimiPoints: window[team+'noKimi'],
		action: 'none'
	}
	
	var countCoop = 0
	for(i=0;i<4;i++){
	
		if (window[coopPlayer+'Ch'+i].thisCard !== undefined){
			countCoop++;
			if (countCoop === 4){
				var countGroups = 0;
				for(o=0;o<4;o++){
				var groupCard = window[coopPlayer+'Ch'+0].thisCard.group
					if(groupCard !== window[coopPlayer+'Ch'+o].thisCard.group){
						window[team+'noKimi']++
						info.noKimiPoints = window[team+'noKimi'];
						console.log(info.noKimiPoints)
						if(window[team+'noKimi'] !== 2){
							info.action = 'false kimi';
							socket.emit('kimipress', info);
							// If some one calls kimi an the coop dosent have kimi gameAlert calls (noKimi = 1)
							gameAlert('false kimi', 'no kimi :(', 'hecho por '+namePlayer,  'a '+namePlayer+' y a '+nameCoop+'  le falta 1 corte');
						}
						else{
							info.action = 'false kimi';
							socket.emit('kimipress', info);
							// If some one calls kimi and (noKimi = 2) gameAlert calls, this means that the game is over
							gameAlert('false kimi', 'no kimi :(', 'ganan '+nameOpp1+' y '+nameOpp2,  'jugar otra vez?');
							var toSbPoints = oppTeam;
							socket.emit('sbPoints', toSbPoints);
						}
						break;
					}
					else{
						countGroups++
						if (countGroups === 4){
							info.action = 'true kimi';
							socket.emit('kimipress', info);
							// If some one calls kimi and the coop player have kimi gameAlert kimi true call, this means that the game is over
							gameAlert('true kimi','kimi!', 'ganan '+namePlayer+' y '+nameCoop, 'jugar otra vez?');
							var toSbPoints = team;
							socket.emit('sbPoints', toSbPoints);
						}
					}
				}
			}
		}

		//si no tiene cuatro cartas
		if (i === 3 && countCoop !== 4){
			window[team+'noKimi']++
			info.noKimiPoints = window[team+'noKimi'];
			console.log(info.noKimiPoints)
			if(window[team+'noKimi'] !== 2){
				info.action = 'false kimi';
				socket.emit('kimipress', info);
				//If some one calls kimi and the coop dont even have 4 cards gameAlerts call (noKimi = 1)
				gameAlert('false kimi', 'no kimi :(', 'hecho por '+namePlayer, 'a '+namePlayer+' y a '+nameCoop+'  le falta 1 corte');
			}
			else{
				info.action = 'false kimi';
				socket.emit('kimipress', info);
				//If some one calls kimi and the coop dont even have 4 cards gameAlerts call (noKimi = 2) this means that the game is over
				gameAlert('false kimi', 'no kimi :(', 'ganan '+nameOpp1+' y '+nameOpp2,  'jugar otra vez?');
				var toSbPoints = oppTeam;
				socket.emit('sbPoints', toSbPoints);
			}
		}
	}
})





function gameAlert(action, title, text, miniText){
	if(action === 'false kimi'){
		if(window[team+'noKimi'] !== 2){
			chatBtns.style.visibility = 'hidden';
			myAlert.style.display = 'flex';
			myAlert.innerHTML = '<div class="my-alert"><h1>'+title+'</h1><br><h2>'+text+'</h2><br><p>'+miniText+'</p></div>'
			setTimeout(function(){
				chatBtns.style.visibility = 'visible';
				myAlert.style.display = 'none';
				myAlert.innerHTML = '';
			},5000)
		}
		else{
			myAlert.style.display = 'flex';
			myAlert.innerHTML = '<div class="my-alert"><h1>'+title+'</h1><br><h2>'+text+'</h2></div>'
			restartGame();
		}
	}
	else if(action === 'true kimi'){
		myAlert.style.display = 'flex';
		myAlert.innerHTML = '<div class="my-alert"><h1>'+title+'</h1><br><h2>'+text+'</h2></div>'
		restartGame();
	}
}

socket.on('kimipress', gameAlertServer);

function gameAlertServer(info){

	if(info.who !== thisPlayer){
		if(info.action === 'false kimi' && info.noKimiPoints === 1){
			window[info.whoTeam+'noKimi'] = info.noKimiPoints;
			// console.log(info.whoTeam+'noKimi: '+window[info.whoTeam+'noKimi']);
			chatBtns.style.visibility = 'hidden';
			myAlert.style.display = 'flex';
			myAlert.innerHTML = '<div class="my-alert"><h1>no kimi :(</h1><br><h2>hecho por '+info.whoName+'</h2><br><p>a '+info.whoName+' y '+info.whoCoop+' le falta un corte</p></div>'
			setTimeout(function(){
				chatBtns.style.visibility = 'visible';
				myAlert.style.display = 'none';
				myAlert.innerHTML = '';
			},5000)
		}
		else if(info.action === 'false kimi' && info.noKimiPoints === 2){
			myAlert.style.display = 'flex';
			myAlert.innerHTML = '<div class="my-alert"><h1>no kimi :(</h1><br><h2>ganan '+info.whoOpp1+' y '+info.whoOpp2+'</h2></div>'
			restartGame();
		}
		else if(info.action === 'true kimi'){
			myAlert.style.display = 'flex';
			myAlert.innerHTML = '<div class="my-alert"><h1>kimi!</h1><br><h2>ganan '+info.whoName+' y '+info.whoCoop+'</h2></div>'
			restartGame();
		}
	}
	
}

/* _          _                           
  | |        | |                          
  | |_ ___   | |__   ___ _ __ ___         
  | __/ _ \  | '_ \ / _ \ '__/ _ \        
  | || (_) | | | | |  __/ | |  __/  _ _ _ 
   \__\___/  |_| |_|\___|_|  \___| (_|_|_)
 */                                      










/*
     _      _                                   _                                      _   
    | |    | |                                 (_)                                    | |  
  __| | ___| |__  _   _  __ _    ___ _ ____   ___ _ __ ___  _ __  _ __ ___   ___ _ __ | |_ 
 / _` |/ _ \ '_ \| | | |/ _` |  / _ \ '_ \ \ / / | '__/ _ \| '_ \| '_ ` _ \ / _ \ '_ \| __|
| (_| |  __/ |_) | |_| | (_| | |  __/ | | \ V /| | | | (_) | | | | | | | | |  __/ | | | |_ 
 \__,_|\___|_.__/ \__,_|\__, |  \___|_| |_|\_/ |_|_|  \___/|_| |_|_| |_| |_|\___|_| |_|\__|
                         __/ |                                                             
                        |___/                                                         
*/





// RANDOM SHUFFLE


var randomVars = []

//INTIAL SHUFFLE

var deckCards = []
for(i=0;i<card.length;i++){
	randomVars.push(i);
}


function randomShuffle(){
	console.log('aui');

	// Asignar al usuario activo cuatro cartas
	// for(i=0;i<randomVars.length;i++){
		// console.log(i);
		
		var randomCard = Math.floor(Math.random()*(card.length));
		if(randomVars.indexOf(randomCard) !== -1){
			var index = randomVars.indexOf(randomCard)
			randomVars.splice(index, 1);
			// console.log(randomCard);
			cardAssignment(randomCard);
			
		}
		
		if(randomVars.length > 0){

				randomShuffle();
		}

	// }
	
}



function cardAssignment(randomCard){
cardAssignmentStatus++
// console.log(cardAssignmentStatus)
	if(cardAssignmentStatus <= 4){
		cardTo = 'tCh'
		locationTo = 'table'
	}
	else if(cardAssignmentStatus <= 8){
		cardTo = 'oneCh'
		locationTo = 'one'
	}
	else if(cardAssignmentStatus <= 12){
		cardTo = 'twoCh'
		locationTo = 'two'
	}

	else if(cardAssignmentStatus <= 16){
		cardTo = 'threeCh'
		locationTo = 'three'
	}

	else if(cardAssignmentStatus <= 20){
		cardTo = 'fourCh'
		locationTo = 'four'
	}

	if(cardAssignmentStatus <= 20){
	// Going to cardholder
	gTCardholder(randomCard, cardTo, locationTo);
	}
	else if(cardAssignmentStatus === card.length){
		deckCards.push(randomCard)
		console.log(card)
		console.log('aqui')
		console.log(deckCards)

		
	}
	else{
		deckCards.push(randomCard)
	}
}



function gTCardholder(randomCard, cardTo, locationTo){
gTCardholderStatus++;

	if(gTCardholderStatus === 0){
		card[randomCard].location = locationTo;
		card[randomCard].cardholder = cardTo+'0';
		// console.log(card[randomCard]);
	}
	else if(gTCardholderStatus === 1){
		card[randomCard].location = locationTo;
		card[randomCard].cardholder = cardTo+'1';
		// console.log(card[randomCard]);
	}
	else if(gTCardholderStatus === 2){
		card[randomCard].location = locationTo;
		card[randomCard].cardholder = cardTo+'2';
		// console.log(card[randomCard]);
	}
	else if(gTCardholderStatus === 3){
		card[randomCard].location = locationTo;
		card[randomCard].cardholder = cardTo+'3';
		gTCardholderStatus = -1;
		// console.log(card[randomCard]);
	}


}


var chTrashId = []
// TRASH BUTON
var trashBtn = document.querySelector('#trash-btn');

trashBtn.addEventListener('click', function(){
	if (deckCards.length !== 0){
		var counterTrash = 0;
		chTrashId = [];
		for(i=0; i<tableHolders.length; i++){
		
			if(hasCard(i, "moving", "table")){
				chTrashId.push(i)
				counterTrash++
			}
			
		}

		if(counterTrash === 4){

			socket.emit('trashQuestion', chTrashId);
			// socket.emit('shareTrasho', chTrashId)
			
			
		}
		else{
			chTrashId = [];
		}
		console.log(counterTrash)
		}
})

function changeTableCards(chTrashId){
	// console.log('hola')
		for(i=0; i<chTrashId.length; i++){
			cardholderReplace = 'tCh'+chTrashId[i];
			replaceCardId = window[cardholderReplace].thisCard.id
			card[replaceCardId].location = 'random'
			card[replaceCardId].cardholder = 'none'
			window['tCh'+chTrashId[i]].innerHTML = ''
			window['tCh'+chTrashId[i]].thisCard = undefined
		}
		for(i=0; i<4; i++){
			replaceCard = deckCards[0];
			card[replaceCard].location = 'table'
			card[replaceCard].cardholder = 'tCh'+i
			deckCards.splice(0, 1)
		}
		kimiShuffle();
		chTrashId = []
}

socket.on('shareTrasho', function(chTrashId){
	changeTableCards(chTrashId)
})

socket.on('trashQuestion', function(){
	chatBtns.style.visibility = 'hidden';
	myAlertTrash.style.display = 'flex';
})

function yesClick(){
	myAlertTrash.style.display = 'none';
	var trashAnswer = {
		yes: true,
		no: false
	}
	socket.emit('trashQuestionAnswer', trashAnswer);
	myAlert.style.display = 'flex';
	myAlert.innerHTML = '<div class="my-alert"><h1>recogiendo basura</h1><br><h2>esperando las repuestas del resto de los jugadores</h2><br><p></p></div>'

}

function noClick(){
	myAlertTrash.style.display = 'none';
	var trashAnswer = {
		yes: false,
		no: true
	}
	socket.emit('trashQuestionAnswer', trashAnswer);
	myAlert.style.display = 'flex';
	myAlert.innerHTML = '<div class="my-alert"><h1>:() no hubo basura</h1><br><h2>uno de los jugadores no quizo</h2><br><p></p></div>'
	setTimeout(function(){
		chatBtns.style.visibility = 'visible';
		myAlert.style.display = 'none';
		myAlert.innerHTML = '';
	},2000)
	}

socket.on('trashQuestionAnswer', function(continueWithTrash, trashId){
console.log('contiue with trash'+ continueWithTrash)
	if (continueWithTrash === true){
		chTrashId = trashId;
		chatBtns.style.visibility = 'visible';
		myAlert.style.display = 'none'
		myAlert.innerHTML = ''
		changeTableCards(chTrashId);
		boxText.innerHTML += "<p style='color:green;' class='connected'>"+(deckCards.length/4)+" basura restantes</p>"
		boxText.scrollTop = boxText.scrollHeight;
	}
	else if(continueWithTrash === false){

	myAlertTrash.style.display = 'none';
	myAlert.style.display = 'flex';
	myAlert.innerHTML = '<div class="my-alert"><h1>:() no hubo basura</h1><br><h2>uno de los jugadores no quizo</h2><br><p></p></div>'
	setTimeout(function(){
		chatBtns.style.visibility = 'visible';
		myAlert.style.display = 'none';
		myAlert.innerHTML = '';
	},2000)
	}

})




	// window.addEventListener('click', function(e){
// 	console.log(deckCards);
// 	console.log(card);
	
// })


// CUT BTN

var cutBtn = document.querySelector('#cut-btn');

cutBtn.addEventListener('click', function(){
	var whoEmit = {
		number: thisPlayer,
		name: namePlayer
	}
	chatBtns.style.visibility = 'hidden';
	socket.emit('waitForCut', whoEmit);
	myAlertCut.style.display = 'flex';
	opp1Btn.innerHTML = '<- '+nameOpp1;
	opp2Btn.innerHTML = nameOpp2+' ->';
})

opp1Btn.addEventListener('click', cuttingOpp.bind(null, 'opp1'));
opp2Btn.addEventListener('click', cuttingOpp.bind(null, 'opp2'));

function cuttingOpp(whoOpp, env){

	myAlertCut.style.display = 'none'
	var pp = whoOpp.substring(1);
	var actualOppName = 'nameO'+pp;
	actualOppName = window[actualOppName]
	var countCutOpp = 0;
	var actualOpp = window[whoOpp];

	var info = {
		whoDid: thisPlayer,
		whoDidName: namePlayer,
		toWho: actualOppName,
		whoTeam: team,
		whoCoop: nameCoop,
		whoOpp1: nameOpp1,
		whoOpp2: nameOpp2,
		noKimiPoints: window[team+'noKimi'],
		action:'none',
	}
	for(i=0;i<4;i++){
		if(window[actualOpp+'Ch'+i].thisCard !== undefined){
		countCutOpp++
			if(countCutOpp === 4){
				var countCutGroups = 0;
				for(o=0; o<4;o++){
					var groupOppCard = window[actualOpp+'Ch'+0].thisCard.group
						if(groupOppCard !== window[actualOpp+'Ch'+o].thisCard.group){
							window[team+'noKimi']++	
							info.noKimiPoints = window[team+'noKimi'];
							info.action = 'false cut';
							socket.emit('cuttinOppServer', info);						
							if (window[team+'noKimi'] === 1){
							myAlert.style.display = 'flex';
							myAlert.innerHTML = '<div class="my-alert"><h1>un corte falso!</h1><br><h2>'+actualOppName+' no kimi en su mano</h2><br><p>a'+namePlayer+' y a '+nameCoop+' le falta 1 corte</p></div>';
							setTimeout(function(){
								chatBtns.style.visibility = 'visible';
								myAlert.style.display = 'none';
								myAlert.innerHTML = '';
							},5000)

							}
							else{
							myAlert.style.display = 'flex';
							myAlert.innerHTML = '<div class="my-alert"><h1>un corte falso a '+actualOppName+'!</h1><br><h2>felicidad! '+nameOpp1+' y '+nameOpp2+' ganan la partida</h2></div>';
							restartGame();
							var toSbPoints = oppTeam;
							socket.emit('sbPoints', toSbPoints);
							// setTimeout(function(){
							// 	myAlert.style.display = 'none';
							// 	myAlert.innerHTML = '';
							// },5000)
							
							}
							break;
						}
						else{
							
							countCutGroups++
							if (countCutGroups === 4){
							info.noKimiPoints = window[team+'noKimi'];
							info.action = 'true cut';
							socket.emit('cuttinOppServer', info);
							myAlert.style.display = 'flex';
							myAlert.innerHTML = '<div class="my-alert"><h1>Corte a '+actualOppName+'!!!!!!</h1><br><h2>felicidad! '+namePlayer+' y '+nameCoop+' ganan la partida</h2></div>';
							restartGame();
							var toSbPoints = team;
							socket.emit('sbPoints', toSbPoints);
							}
				}
			}
	
		}
	}
	

		if(i === 3 && countCutOpp !==4){
				window[team+'noKimi']++	
				info.noKimiPoints = window[team+'noKimi'];
				info.action = 'false cut';
				socket.emit('cuttinOppServer', info);								
							if (window[team+'noKimi'] === 1){
							myAlert.style.display = 'flex';
							myAlert.innerHTML = '<div class="my-alert"><h1>un corte falso a '+actualOppName+'!</h1><br><h2>'+window[actualOppName]+' no tiene cuatro cartas iguales</h2><br><p>a'+namePlayer+' y a '+nameCoop+' le falta 1 corte</p></div>';
							setTimeout(function(){
								chatBtns.style.visibility = 'visible';
								myAlert.style.display = 'none';
								myAlert.innerHTML = '';
							},5000)

							}
							else{
							myAlert.style.display = 'flex';
							myAlert.innerHTML = '<div class="my-alert"><h1>un corte falso a '+actualOppName+'!</h1><br><h2>felicidad! '+nameOpp1+' y '+nameOpp2+' ganan la partida</h2></div>';
							restartGame();
							var toSbPoints = oppTeam;
							socket.emit('sbPoints', toSbPoints);
							}
							// setTimeout(function(){
							// 	myAlert.style.display = 'none';
							// 	myAlert.innerHTML = '';
							// },5000)
		}
	}
}


socket.on('waitForCut', function(whoEmit){
	if(whoEmit.number !== thisPlayer){
		chatBtns.style.visibility = 'hidden';
		myAlert.style.display = 'flex'
		myAlert.innerHTML = '<div class="my-alert"><h1>'+whoEmit.name+'... </h1><br><h2>esta eligiendo a quien cortar</h2><br><p></p></div>';
	}
})

socket.on('cuttinOppServer', function(info){
	
	if (info.whoDid !== thisPlayer){
		window[info.whoTeam+'noKimi'] = info.noKimiPoints;
		myAlert.style.display = 'none'
		myAlert.innerHTML = ''
		if(info.action === 'false cut'){
			if (window[info.whoTeam+'noKimi'] === 1){
				myAlert.style.display = 'flex';
				myAlert.innerHTML = '<div class="my-alert"><h1>un corte falso!</h1><br><h2>'+info.toWho+' no tiene kimi en su mano</h2><br><p>a'+info.whoDidName+' y a '+info.whoCoop+' le falta 1 corte</p></div>';
				setTimeout(function(){
					chatBtns.style.visibility = 'visible';
					myAlert.style.display = 'none';
					myAlert.innerHTML = '';
				},5000)
				console.log('el equipo de '+info.whoDidName+' tiene un punto menos')
			}
			else{
				myAlert.style.display = 'flex';
				myAlert.innerHTML = '<div class="my-alert"><h1>un corte falso a '+info.toWho+'!</h1><br><h2>felicidad! '+info.whoOpp1+' y '+info.whoOpp2+' ganan la partida</h2></div>';
				restartGame();
				// setTimeout(function(){
				// 	myAlert.style.display = 'none';
				// 	myAlert.innerHTML = '';
				// },5000)
				
				console.log('el equipo de '+info.whoDidName+' perdio')
			}
		}
		else if(info.action === 'true cut'){
			myAlert.style.display = 'flex';
			myAlert.innerHTML = '<div class="my-alert"><h1>Corte a '+info.toWho+'!!!!!!</h1><br><h2>felicidad! '+info.whoDidName+' y '+info.whoCoop+' ganan la partida</h2></div>';
			console.log('el equipo de '+info.whoDidName+' gano')
			restartGame();
		}
	}
})

// window.addEventListener('keyup',restartGame);
function restartGame(){

	// if (e.code === 'KeyZ'){
	friendChatBox.style.display = 'block';
	playBtn.style.display = 'block';
	friendChatBoxIndex.style.background = '#566071';
	window[team+'noKimi'] = 0;
	window[oppTeam+'noKimi'] = 0;

	oneCircle.style.visibility = 'hidden';
	twoCircle.style.visibility = 'hidden';
	threeCircle.style.visibility = 'hidden';
	fourCircle.style.visibility = 'hidden';
	chatBtns.style.visibility = 'hidden';
	card[0] = new Cards(0, 1, "s/t", "../cards/card0.png", "random", "none");
	card[1] = new Cards(1, 1, "s/t", "../cards/card1.png", "random", "none");
	card[2] = new Cards(2, 1, "s/t", "../cards/card2.png", "random", "none");
	card[3] = new Cards(3, 1, "s/t", "../cards/card3.png", "random", "none");
	card[4] = new Cards(4, 2, "s/t", "../cards/card4.png", "random", "none");
	card[5] = new Cards(5, 2, "s/t", "../cards/card5.png", "random", "none");
	card[6] = new Cards(6, 2, "s/t", "../cards/card6.png", "random", "none");
	card[7] = new Cards(7, 2, "s/t", "../cards/card7.png", "random", "none");
	card[8] = new Cards(8, 3, "s/t", "../cards/card8.png", "random", "none");
	card[9] = new Cards(9, 3, "s/t", "../cards/card9.png", "random", "none");
	card[10] = new Cards(10, 3, "s/t", "../cards/card10.png", "random", "none");
	card[11] = new Cards(11, 3, "s/t", "../cards/card11.png", "random", "none");
	card[12] = new Cards(12, 4, "s/t", "../cards/card12.png", "random", "none");
	card[13] = new Cards(13, 4, "s/t", "../cards/card13.png", "random", "none");
	card[14] = new Cards(14, 4, "s/t", "../cards/card14.png", "random", "none");
	card[15] = new Cards(15, 4, "s/t", "../cards/card15.png", "random", "none");
	card[16] = new Cards(16, 5, "s/t", "../cards/card16.png", "random", "none");
	card[17] = new Cards(17, 5, "s/t", "../cards/card17.png", "random", "none");
	card[18] = new Cards(18, 5, "s/t", "../cards/card18.png", "random", "none");
	card[19] = new Cards(19, 5, "s/t", "../cards/card19.png", "random", "none");
	card[20] = new Cards(20, 6, "s/t", "../cards/card20.png", "random", "none");
	card[21] = new Cards(21, 6, "s/t", "../cards/card21.png", "random", "none");
	card[22] = new Cards(22, 6, "s/t", "../cards/card22.png", "random", "none");
	card[23] = new Cards(23, 6, "s/t", "../cards/card23.png", "random", "none");
	card[24] = new Cards(24, 7, "s/t", "../cards/card24.png", "random", "none");
	card[25] = new Cards(25, 7, "s/t", "../cards/card25.png", "random", "none");
	card[26] = new Cards(26, 7, "s/t", "../cards/card26.png", "random", "none");
	card[27] = new Cards(27, 7, "s/t", "../cards/card27.png", "random", "none");
	for(i=0;i<tableHolders.length;i++){
		window['tCh'+i].innerHTML = '';
		window['tCh'+i].thisCard = undefined;
	}
	deckCards = [];
	randomVars = [];
	for(i=0;i<card.length;i++){
	randomVars.push(i);
	}

	cardAssignmentStatus = 0;
	gTCardholderStatus = -1;
	// randomShuffle()
	kimiShuffle();
	// }
}

window.addEventListener('click', function(e){
	// toSbPoints = window[team+'']
})