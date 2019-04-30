'use strict';

require('dotenv').config()
var bodyParser = require('body-parser');
const ngrok = require('ngrok');
const express = require('express');
const app = express();
var palabra = '';
//const APIAI_TOKEN = process.env.DIALOGFLOW_PRIVATE_KEY;
//const APIAI_SESSION_ID = process.env.DIALOGFLOW_CLIENT_EMAIL;

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

var port = process.env.PORT || 3000;
var ip = process.env.IP || '127.0.0.1';

const server = app.listen(port, ip);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/*
app.post('/', function (req, res) {
    if (req.body.queryResult.action == "horary") {
        let num1 = parseFloat(req.body.queryResult.parameters.number);
        let num2 = parseFloat(req.body.queryResult.parameters.number1);
        let sum = num1 + num2;
        suma = sum;
        response = num1 + " + " + num2 + " es " + sum;
        res.json({
            "fulfillmentText": response
        });
    }
});*/
const io = require('socket.io')(server);

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.emit('bot reply', 'salut');
});

// Web UI
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

   // Get a reply from API.ai
   app.post('/', express.json(), function (req, res) {
    if (req.body.queryResult.action === "horary") {
      let num1 = parseFloat(req.body.queryResult.parameters.number);
      let num2 = parseFloat(req.body.queryResult.parameters.number1);
      let sum = num1 + num2;      
      var reply = num1 + " + " + num2 + " es " + sum;
      palabra = reply;
      res.json({
          "fulfillmentText": reply
      });
  }
});  

io.on('connection', function (socket) {
  socket.emit('bot reply', palabra);
});

(async function () {
  const url = await ngrok.connect(port);
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
*/
/*bbffd312e7f88ee8eeef0459bcfe10602e523620
With a continuous socket connection, we won’t need to reload the browser or keep sending an AJAX request at a frequent interval.
*/