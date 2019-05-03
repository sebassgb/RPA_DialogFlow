'use strict';

const socket = io();

const outputYou = document.querySelector('.output-you');
const outputBot = document.querySelector('.output-bot');
// test for relevant API-s
  // for (let api of ['speechSynthesis', 'webkitSpeechSynthesis', 'speechRecognition', 'webkitSpeechRecognition']) {
  //   console.log('api ' + api + " and if browser has it: " + (api in window));
  // }
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;


//We  capture the DOM reference for the button UI, and listen for the click event to initiate speech recognition
/* document.querySelector('button').addEventListener('click', () => {
  recognition.start();
}); */

recognition.addEventListener('speechstart', () => {
  console.log('Speech has been detected.');
});

recognition.addEventListener('result', (e) => {
  console.log('Result has been detected.');

  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;

  outputYou.textContent = text;
  console.log('Confidence: ' + e.results[0][0].confidence);
//Then, insert this code where you are listening to the result event from SpeechRecognition
  socket.emit('chat message', text);
});
//Once speech recognition has started, use the result event to retrieve what was said as text
recognition.addEventListener('speechend', () => {
  recognition.stop();
});

recognition.addEventListener('error', (e) => {
  outputBot.textContent = 'Error: ' + e.error;
});
//this will interpret what user said
function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
}
//Function that will show the answer in the browser

socket.on('bot reply', function (replyText) {
  synthVoice(replyText);
  if (replyText === '') replyText = '(No answer...)';
  outputBot.textContent = replyText;
});
/*
For the API endpoint, usage quota is no longer offered. And, apparently, it was an endpoint specific for community developers for the Chromium project.
Google's Speech API is the Cloud Speech API .
http://www.chromium.org/developers/how-tos/api-keys
 */