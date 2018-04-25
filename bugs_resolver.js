

// SERVER

//for latency
socket.on('latency', function (startTime, cb) {
  		cb(startTime);
	}); 

//for inactive windows
	socket.on('inactive', function(data){
		io.sockets.emit('sendInactvieMessage', data)
	})



//CLIENT

//for latency

setInterval(function(){
	socket.emit('latency', Date.now(), function(startTime) {
	    var latency = Date.now() - startTime;
	    console.log(latency);
	});
},1000)


//for inactive windows

var body = document.querySelector('body');

window.addEventListener("blur", function(){
	var data = true;
	socket.emit('inactive', data);
	console.log('inactive');
});

window.addEventListener("focus", function(){
	var data = false;
	socket.emit('inactive', data);
	console.log('active');
});

socket.on('sendInactvieMessage', function(data){
	console.log(data);
	if(data===true){
		body.style.background = 'black';
	}
	if(data===false){
		body.style.background = 'white';
	}
})