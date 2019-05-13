/* var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mqttHandler = require('./mqtt_handler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

var mqttClient = new mqttHandler();
mqttClient.custom_topic = 'temperature';
mqttClient.connect(mqttClient.custom_topic);

// Routes
app.post("/send-mqtt", function(req, res) {
  mqttClient.sendMessage(req.body.message);
  res.status(200).send("Message sent to mqtt");
});

var server = app.listen(18569, function () {
    console.log("app running on port.", server.address().port);
});
 */
var mqtt = require('mqtt')
 
 
var options = {
  port: 12152,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: "huhgmtli",
  password: "P76pc5uz8qG6",
};
 
 
var client  = mqtt.connect('mqtt://m24.cloudmqtt.com', options)
 
   client.on('connect', function() { // When connected
 
  // subscribe to a topic
  client.subscribe('topic1/test', function() {
    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      console.log("Received '" + message + "' on '" + topic + "'");
    });
  });
 
  // publish a message to a topic
  client.publish('topic1/test', 'IoT test message', function() {
    console.log("Message is published");
    //client.end(); // Close the connection when published
  });
});