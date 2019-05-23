'use strict';
var express = require('express');
var bodyParser = require('body-parser');//Parses Incoming Request bodies
var app = express();
var mqttHandler = require('./mqtt_handler');

//const ngrok = require('ngrok');

const exec = require('child_process').exec;
var script = exec('ssh -R gopigo3:80:localhost:3000 serveo.net', (error,stdout,stderr) => {
 
  console.log(stdout);
  console.log(stderr);
  console.log(error);
});

script.stdout.pipe(process.stdout);//show the log of the script executed outside

var reply = "Empty";//Variable that will contain the messages

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

var mqttClient = new mqttHandler();
//mqttClient.custom_topic = '/board';
//mqttClient.connect(mqttClient.custom_topic);


// Routes
app.post("/send-mqtt", function (req, res) {
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
  if (req.body.queryResult.action === "getAccelerometre") {
    mqttClient.custom_topic = '/accelerometer';
    mqttClient.connect(mqttClient.custom_topic);    
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      setTimeout(()=>{//We give the time to the function to get the message 
        reply =mqttClient.getReponses();//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
      mqttClient.finishConnection();//we will close the connection with the topic   
        },1500); //time that could change in order to give time to the functions   
  }else if(req.body.queryResult.action === "getDistance") {
    mqttClient.custom_topic = '/distance';
    mqttClient.connect(mqttClient.custom_topic);    
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      setTimeout(()=>{//We give the time to the function to get the message 
        reply =mqttClient.getReponses();//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
      mqttClient.finishConnection();//we will close the connection with the topic   
        },1500); //time that could change in order to give time to the functions   
  }else if(req.body.queryResult.action === "getGyroscope") {
    mqttClient.custom_topic = '/gyroscope';
    mqttClient.connect(mqttClient.custom_topic);    
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      setTimeout(()=>{//We give the time to the function to get the message 
        reply =mqttClient.getReponses();//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
      mqttClient.finishConnection();//we will close the connection with the topic   
        },1500); //time that could change in order to give time to the functions   
  }else if(req.body.queryResult.action === "getEuler") {
    mqttClient.custom_topic = '/euler';
    mqttClient.connect(mqttClient.custom_topic);    
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      setTimeout(()=>{//We give the time to the function to get the message 
        reply =mqttClient.getReponses();//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
      mqttClient.finishConnection();//we will close the connection with the topic   
        },1500); //time that could change in order to give time to the functions   
  }else if(req.body.queryResult.action === "getManufacturer") {
    mqttClient.custom_topic = '/manufacturer';
    mqttClient.connect(mqttClient.custom_topic);    
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      setTimeout(()=>{//We give the time to the function to get the message 
        reply =mqttClient.getReponses();//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
      mqttClient.finishConnection();//we will close the connection with the topic   
        },1500); //time that could change in order to give time to the functions   
  }else if(req.body.queryResult.action === "getSerialNumber") {
    mqttClient.custom_topic = '/serial_number';
    mqttClient.connect(mqttClient.custom_topic);    
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      setTimeout(()=>{//We give the time to the function to get the message 
        reply =mqttClient.getReponses();//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
      mqttClient.finishConnection();//we will close the connection with the topic   
        },1500); //time that could change in order to give time to the functions   
  }else if(req.body.queryResult.action === "getHardwareVersion") {
    mqttClient.custom_topic = '/hardware_version';
    mqttClient.connect(mqttClient.custom_topic);    
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      setTimeout(()=>{//We give the time to the function to get the message 
        reply =mqttClient.getReponses();//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
      mqttClient.finishConnection();//we will close the connection with the topic   
        },1500); //time that could change in order to give time to the functions   
  }else if(req.body.queryResult.action === "getFirmwareVersion") {
    mqttClient.custom_topic = '/firmware_version';
    mqttClient.connect(mqttClient.custom_topic);    
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      setTimeout(()=>{//We give the time to the function to get the message 
        reply =mqttClient.getReponses();//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
      mqttClient.finishConnection();//we will close the connection with the topic   
        },1500); //time that could change in order to give time to the functions   
  }else if(req.body.queryResult.action === "getVoltageBattery") {
    mqttClient.custom_topic = '/voltage_battery';
    mqttClient.connect(mqttClient.custom_topic);    
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      setTimeout(()=>{//We give the time to the function to get the message 
        reply =mqttClient.getReponses();//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
      mqttClient.finishConnection();//we will close the connection with the topic   
        },1500); //time that could change in order to give time to the functions   
  }else if(req.body.queryResult.action === "getVoltageBoard") {
    mqttClient.custom_topic = '/voltage_board';
    mqttClient.connect(mqttClient.custom_topic);    
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      setTimeout(()=>{//We give the time to the function to get the message 
        reply =mqttClient.getReponses();//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
      mqttClient.finishConnection();//we will close the connection with the topic   
        },1500); //time that could change in order to give time to the functions   
  }else if(req.body.queryResult.action === "getMotorState") {
    mqttClient.custom_topic = '/motor_state';
    mqttClient.connect(mqttClient.custom_topic);    
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      setTimeout(()=>{//We give the time to the function to get the message 
        reply =mqttClient.getReponses();//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
      mqttClient.finishConnection();//we will close the connection with the topic   
        },1500); //time that could change in order to give time to the functions   
  }else if(req.body.queryResult.action === "getServoState") {
    mqttClient.custom_topic = '/servo_state';
    mqttClient.connect(mqttClient.custom_topic);    
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      setTimeout(()=>{//We give the time to the function to get the message 
        reply =mqttClient.getReponses();//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
      mqttClient.finishConnection();//we will close the connection with the topic   
        },1500); //time that could change in order to give time to the functions   
  }else if(req.body.queryResult.action === "getMagnetometer") {
    mqttClient.custom_topic = '/magnetometer';
    mqttClient.connect(mqttClient.custom_topic);    
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      setTimeout(()=>{//We give the time to the function to get the message 
        reply =mqttClient.getReponses();//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
      mqttClient.finishConnection();//we will close the connection with the topic   
        },1500); //time that could change in order to give time to the functions   
  }else if(req.body.queryResult.action === "getPiezo") {
    mqttClient.custom_topic = '/piezo';
    mqttClient.connect(mqttClient.custom_topic);    
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      setTimeout(()=>{//We give the time to the function to get the message 
        reply =mqttClient.getReponses();//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
      mqttClient.finishConnection();//we will close the connection with the topic   
        },1500); //time that could change in order to give time to the functions   
  }else if(req.body.queryResult.action === "getBoard") {
    mqttClient.custom_topic = '/board';
    mqttClient.connect(mqttClient.custom_topic);    
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      setTimeout(()=>{//We give the time to the function to get the message 
        reply =mqttClient.getReponses();//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
      mqttClient.finishConnection();//we will close the connection with the topic   
        },1500); //time that could change in order to give time to the functions   
  }else if(req.body.queryResult.action === "goForward") {
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      let distance = parseFloat(req.body.queryResult.parameters.number);//gets the number to give the distance to the robot to do the action
      console.log(distance);
      if(isNaN(distance)) distance = 50;//if the user doesn't give a number this will be the default value
      var runPy = new Promise(function (success, nosuccess){
        const {spawn} = require('child_process');
        const pyprog = spawn('python', ['./move_ForwardCm.py',distance]);
        
        pyprog.stdout.on('data', function(data){
          console.log("Python Executed");
          success(data);
          });
        
        
        pyprog.stderr.on('data', function(data){
          console.log("Python NOT Executed");
          nosuccess(data);
          });
        });
        
        runPy.then(function (fromRunpy){
          console.log(fromRunpy.toString());
          res.end(fromRunpy);
          });
      
        reply ="D'accord, j'avance de " + distance + " cm";//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
     
  }else if(req.body.queryResult.action === "turnBack") {
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      
      var runPy = new Promise(function (success, nosuccess){
        const {spawn} = require('child_process');
        const pyprog = spawn('python', ['./turnBack.py']);
        
        pyprog.stdout.on('data', function(data){
          console.log("Python Executed");
          success(data);
          });
        
        
        pyprog.stderr.on('data', function(data){
          console.log("Python NOT Executed");
          nosuccess(data);
          });
        });
        
        runPy.then(function (fromRunpy){
          console.log(fromRunpy.toString());
          res.end(fromRunpy);
          });
      
        reply ="D'accord, je fais demi-tour";//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
     
  }else if(req.body.queryResult.action === "turnLeft") {
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      
      var runPy = new Promise(function (success, nosuccess){
        const {spawn} = require('child_process');
        const pyprog = spawn('python', ['./turn_Left.py']);
        
        pyprog.stdout.on('data', function(data){
          console.log("Python Executed");
          success(data);
          });
        
        
        pyprog.stderr.on('data', function(data){
          console.log("Python NOT Executed");
          nosuccess(data);
          });
        });
        
        runPy.then(function (fromRunpy){
          console.log(fromRunpy.toString());
          res.end(fromRunpy);
          });
      
        reply ="D'accord, je tourne à Gauche";//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
     
  }else if(req.body.queryResult.action === "turnRight") {
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      
      var runPy = new Promise(function (success, nosuccess){
        const {spawn} = require('child_process');
        const pyprog = spawn('python', ['./turn_Right.py']);
        
        pyprog.stdout.on('data', function(data){
          console.log("Python Executed");
          success(data);
          });
        
        
        pyprog.stderr.on('data', function(data){
          console.log("Python NOT Executed");
          nosuccess(data);
          });
        });
        
        runPy.then(function (fromRunpy){
          console.log(fromRunpy.toString());
          res.end(fromRunpy);
          });
      
        reply ="D'accord, je tourne à Droite";//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
     
  }else if(req.body.queryResult.action === "runMotors") {
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      
      var runPy = new Promise(function (success, nosuccess){
        const {spawn} = require('child_process');
        const pyprog = spawn('python', ['./easy_Motors.py']);
        
        pyprog.stdout.on('data', function(data){
          console.log("Python Executed");
          success(data);
          });
        
        
        pyprog.stderr.on('data', function(data){
          console.log("Python NOT Executed");
          nosuccess(data);
          });
        });
        
        runPy.then(function (fromRunpy){
          console.log(fromRunpy.toString());
          res.end(fromRunpy);
          });
      
        reply ="D'accord, je demarre les moteurs";//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
     
  }else if(req.body.queryResult.action === "runServos") {
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      
      var runPy = new Promise(function (success, nosuccess){
        const {spawn} = require('child_process');
        const pyprog = spawn('python', ['./Servo.py']);
        
        pyprog.stdout.on('data', function(data){
          console.log("Python Executed");
          success(data);
          });
        
        
        pyprog.stderr.on('data', function(data){
          console.log("Python NOT Executed");
          nosuccess(data);
          });
        });
        
        runPy.then(function (fromRunpy){
          console.log(fromRunpy.toString());
          res.end(fromRunpy);
          });
      
        reply ="D'accord, je tourne la tete";//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
     
  }else if(req.body.queryResult.action === "goBackward") {
    console.log(req.body.queryResult.queryText);//Question made by user, req contains all the request      
      let distance = parseFloat(req.body.queryResult.parameters.number);//number to make the robot go backwards
      console.log(distance);
      if(isNaN(distance)) distance = 50;//the function in Python only needs a negative number
      var runPy = new Promise(function (success, nosuccess){
        const {spawn} = require('child_process');
        const pyprog = spawn('python', ['./move_Backward.py', distance*(-1)]);
        
        pyprog.stdout.on('data', function(data){
          console.log("Python Executed");
          success(data);
          });
        
        
        pyprog.stderr.on('data', function(data){
          console.log("Python NOT Executed");
          nosuccess(data);
          });
        });
        
        runPy.then(function (fromRunpy){
          console.log(fromRunpy.toString());
          res.end(fromRunpy);
          });
      
        reply = "D'accord, je recule de " + distance + " cm";//We get the message from the MQTT server
        res.json({
      "fulfillmentText": reply 
      });
}});

