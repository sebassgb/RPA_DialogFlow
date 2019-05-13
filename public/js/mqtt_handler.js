const mqtt = require('mqtt');

class MqttHandler {
  constructor() {//Just in case that we need authentification
    this.mqttClient = null;
    this.host = 'http://postman.cloudmqtt.com';
    this.username = 'vomjuvox'; // mqtt credentials if these are needed to connect
    this.password = 'qZhDtGK09JuN';
    this.clean = false;
    this.port = 18569;
  }

  connect(custom_topic) {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    //this.mqttClient = mqtt.connect(this.host);
    //this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password, port: 18569 });
    this.mqttClient = mqtt.connect(this.host,{ username: this.username, password: this.password},this.port);
    
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
    this.mqttClient.subscribe(custom_topic, { qos: 1 },
      function () {
          console.log("Je viens de me suscrire");   
            }      
      );
      

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
      console.log(message.toString());
      this.reply = message.toString();
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // Sends a mqtt message to the topic
  sendMessage(message) {    
    this.reply = message.toString();
    this.mqttClient.publish(this.custom_topic, message,{qos:1});    
    console.log(this.custom_topic);//subscription's topic
    
    //return message.toString();
  }


}

module.exports = MqttHandler;