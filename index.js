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

function confirmation() {
  alert("Succesfully sent");
}

const io = require('socket.io')(server);

io.on('connection', function (socket) {//We start listening the conversation
  console.log('a user connected');
});



// Web UI
app.get('/', (req, res) => {
  res.sendFile('index.html');
  runPy.then(function (fromRunpy) {
    console.log(fromRunpy.toString());
    res.end(fromRunpy);
  });
});

io.on('connection', function (socket) {//We need to open the browser with the url HTTPS in order to user DialogFlow


  // Get a reply from DialogFlow
  app.post('/', express.json(), function (req, res) {
    if (req.body.queryResult.action === "horary") {
      console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request
      let timer = parseFloat(req.body.queryResult.parameters.time);
      reply = "Ok " + timer;
      socket.emit('bot reply', reply);//Here we will give the respose to the browser
      res.json({
        "fulfillmentText": reply
      });
    } else if (req.body.queryResult.action === "detectemail") {//We start matching the others intents
      console.log(req.body.queryResult.queryText);
      let mail = req.body.queryResult.parameters.email;
      reply = mail;
      socket.emit('bot reply', reply);//Here we will give the respose to the browser     
      res.json({
        "fulfillmentText": reply
      });
    } else if (req.body.queryResult.action === "phonenumber") {//We start matching the others intents
      console.log(req.body.queryResult.queryText);
      let phone = req.body.queryResult.parameters.phonenumber;
      reply = phone;
      socket.emit('bot reply', reply);//Here we will give the respose to the browser   
      res.json({
        "fulfillmentText": reply
      });
    } else if (req.body.queryResult.action === "modelreservation") {//We start matching the others intents
      console.log(req.body.queryResult.queryText);
      let bike = req.body.queryResult.parameters.Bike;
      reply = bike;
      socket.emit('bot reply', reply);//Here we will give the respose to the browser  
      res.json({
        "fulfillmentText": reply
      });
    } else if (req.body.queryResult.action === "namedetection") {//We start matching the others intents
      console.log(req.body.queryResult.queryText);
      let name = req.body.queryResult.parameters.given;
      reply = name;
      socket.emit('bot reply', reply);//Here we will give the respose to the browser     
      res.json({
        "fulfillmentText": reply
      });
    }
    else if (req.body.queryResult.action === "formSubmit") {//We start matching the others intents
      console.log(req.body.queryResult.queryText);
      reply = req.body.queryResult.queryText + "Request generated";
      //we call the function to generate the txt with the order number
      //Intent confirmation sending, the user say YES for sending the form we'll generate a .txt with an order number
      let runPy = new Promise(function (success, nosuccess) {//Run Python's script
        const { spawn } = require('child_process');
        const pyprog = spawn('python', ['./public/py/ordernumber.py']);
        pyprog.stdout.on('data', function (data) {//In order ro receive data from Python
          console.log('python executed');
          success(data);
        });

        pyprog.stderr.on('data', (data) => {
          console.log('python NOT executed');
          nosuccess(data);
        });
      });
      
      socket.emit('bot reply', reply);//Here we will give the respose to the browser     
      res.json({
        "fulfillmentText": reply
      });
    }

  });
});

(async function () {
  const url = await ngrok.connect(port);//We have to upgrade to one of ngrok’s paid plans to avoid changing address everytime or use Heroku
  // No more pushing every little change in code to Firebase Cloud Functions and waiting a minute or two before testing
  console.log(url);
})();
