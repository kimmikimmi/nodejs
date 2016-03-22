// Import events module 
var events = require('events');
//Create an eventEmitter object
var eventEmitter = new events.EventEmitter();
var cnt = 1;
//Create an event handler as follows
var connectHandler = function connected() {
	console.log('connection successful.');
	console.log(cnt++);
	//Fire the data_received event
	eventEmitter.emit('data_received');
}

//Bind the connection event with the handler
eventEmitter.on('connection', connectHandler);

//Bind the data_received event with the anonymous function
eventEmitter.on('data_received', function() {
		console.log('data received successfully');
});

//Fire the conncetion event
eventEmitter.emit('connection');

console.log("program ended");


