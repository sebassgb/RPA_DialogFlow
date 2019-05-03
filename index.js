'use strict';

//require('dotenv').config()
var bodyParser = require('body-parser');
const ngrok = require('ngrok');
const express = require('express');
const app = express();

var reply = "";//Variable that will contain the messages

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

var port = process.env.PORT || 3000;
var ip = process.env.IP || '127.0.0.1';

const server = app.listen(port, ip);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function confirmation(){
  alert("Succesfully sent");
}

const io = require('socket.io')(server);

io.on('connection', function (socket) {//We start listening the conversation
  console.log('a user connected');
});
/* 
let runPy = new Promise(function(success, nosuccess) {//Run Python's script

  const { spawn } = require('child_process');
  const pyprog = spawn('python', ['./public/py/test.py']);

  pyprog.stdout.on('data', function(data) {//In order ro receive data from Python
    console.log('python executed');
      success(data);
  });
 
  pyprog.stderr.on('data', (data) => {
    console.log('python NOT executed');
      nosuccess(data);
  });
}); */

// Web UI
app.get('/', (req, res) => {
  res.sendFile('index.html');
 /*  runPy.then(function(fromRunpy) {
    console.log(fromRunpy.toString());
    res.end(fromRunpy);
}); */
});

io.on('connection', function (socket) {//We need to open the browser with the url HTTPS in order to user DialogFlow
 
  // Get a reply from DialogFlow
  app.post('/', express.json(), function (req, res) {
    if (req.body.queryResult.action === "horary") {
      console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request
      let num1 = parseFloat(req.body.queryResult.parameters.number);
      let num2 = parseFloat(req.body.queryResult.parameters.number1);
      let sum = num1 + num2;
      reply = num1 + " + " + num2 + " es " + sum;
      socket.emit('bot reply', reply);//Here we will give the respose to the browser
      res.json({
        "fulfillmentText": reply
      });
    }else if(req.body.queryResult.action === "detectemail"){//We start matching the others intents
      console.log(req.body.queryResult.queryText);
      let mail = req.body.queryResult.parameters.email;
      reply = mail;     
      res.json({
        "fulfillmentText": reply
      });
    } 

  });
});

/*else if(req.body.queryResult.action === "detectemail"){
      console.log(req.body.queryResult.queryText);
      let mail = req.body.queryResult.parameters.email;
      reply = mail;
      res.json({
        "fulfillmentText": reply
      });
    } */

(async function () {
  const url = await ngrok.connect(port);//We have to upgrade to one of ngrok’s paid plans to avoid changing address everytime or use Heroku
  // No more pushing every little change in code to Firebase Cloud Functions and waiting a minute or two before testing
  console.log(url);
})();
/*We are going to use Express, a Node.js web application server framework, to run the server locally.
 To enable real-time bidirectional communication between the server and the browser*/
/*Socket.IO is a library that enables us to use WebSocket easily with Node.js. By establishing a socket
connection between the client and server, our chat messages will be passed back and forth between
 the browser and our server, as soon as text data is returned by the Web Speech API (the voice message)
*/
/*
Socket.IO is a library for real-time web applications. It enables real-time bidirectional communication
between web clients and servers. We are going to use it to pass the result from the browser to the Node.js code,
and then pass the response back to the browser.
/*
With a continuous socket connection, we won’t need to reload the browser or keep sending an AJAX request at a frequent interval.
*/