const mqtt = require('mqtt');


class MqttHandler {
  constructor() {//Just in case that we need authentification
    this.mqttClient = null;
    this.host = 'YOUR_HOST';
    this.username = 'YOUR_USER'; // mqtt credentials if these are needed to connect
    this.password = 'YOUR_PASSWORD';
  }
  
  connect(custom_topic) {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    //this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password });
    this.mqttClient = mqtt.connect('mqtt://localhost');

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe(custom_topic, {qos: 0});

   

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
      console.log(message.toString());
      this.reply = message.toString();//Global variable that send the message to DialogFlow
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // Sends a mqtt message to topic: mytopic
  sendMessage(message) {
    console.log(this.custom_topic);
    //setInterval(function() {//send a message every sec      
      this.mqttClient.publish(this.custom_topic, message);
  //}, 1000);
  }
}

module.exports = MqttHandler;