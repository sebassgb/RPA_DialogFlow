'use strict';
var express = require('express');
var bodyParser = require('body-parser');//Parses Incoming Request bodies
var app = express();
var mqttHandler = require('./mqtt_handler');
const ngrok = require('ngrok');

var reply = "";//Variable that will contain the messages

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

var mqttClient = new mqttHandler();
mqttClient.custom_topic = 'topic';
mqttClient.connect(mqttClient.custom_topic);
// Routes
app.post("/send-mqtt", function(req, res) {
  mqttClient.sendMessage(req.body.message);
  res.status(200).send("Message sent to mqtt");
});

var port = process.env.PORT || 3000;
var server = app.listen(3000, function () {
  console.log("app running on port.", server.address().port);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


  // Get a reply from DialogFlow
  app.post('/', express.json(), function (req, res) {
    if (req.body.queryResult.action === "getTemperature") {
      console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request
         res.json({
        "fulfillmentText": reply
      });
    }
  });    


(async function () {
  const url = await ngrok.connect(port);//We have to upgrade to one of ngrok’s paid plans to avoid changing address everytime or use Heroku
  // No more pushing every little change in code to Firebase Cloud Functions and waiting a minute or two before testing
  console.log(url);
})();
