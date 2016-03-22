var fs = require("fs");
var data = '';

// Create a readable stream
var readerStream = fs.createReadStream('input.txt');


// Create a writable stream
var writerStream = fs.createWriteStream('output.txt');

// Set the encoding to be utf8. 
readerStream.setEncoding('UTF8');


// Handle stream events --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function(){
   console.log(data);
   writerStream.write(data,'UTF8');
   writerStream.end();
   writerStream.on('finish', function() {
    console.log("Write completed.");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});
});

readerStream.on('error', function(err){
   console.log(err.stack);
});

console.log(data + " asdasdasdasfsdagsdg");
// Write the data to stream with encoding to be utf8

// Mark the end of file


// Handle stream events --> finish, and error



console.log("Program Ended");




