const mqtt = require('mqtt');
var reponses = '';
class MqttHandler {
  constructor() {//Just in case that we need authentification
    this.mqttClient = null;
    this.clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8);
    this.host = 'mqtt://m24.cloudmqtt.com';
    this.username = 'huhgmtli'; // mqtt credentials if these are needed to connect
    this.password = 'P76pc5uz8qG6';
    this.clean = false;
    this.port = 12152;
  }

  connect(custom_topic) {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect('mqtt://localhost');
    //this.mqttClient = mqtt.connect(this.host, { port: this.port, clientId: this.clientId, username: this.username, password: this.password });
    //this.mqttClient = mqtt.connect({host: this.host, username: this.username, password: this.password, port: this.port});
    
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
      reponses = message.toString();
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
    console.log("responses"+reponses);
    return reponses;
  }

  // Sends a mqtt message to the topic
finishConnection(){
  this.mqttClient.end();
}

  sendMessage(message) {    
    //this.reply = message.toString();
    this.mqttClient.publish(this.custom_topic, message,{qos:1});   
    //console.log(this.custom_topic);//subscription's topic 
  }


}

module.exports = MqttHandler;