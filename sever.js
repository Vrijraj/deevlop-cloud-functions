// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const firebase = require('firebase');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

var firebaseConfig = {
 
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  
  function getData(agent) {
    agent.add(`data: from vrijraj`);
  }
  
  function showNumber(agent){
    console.log(`agent: ${agent}`);
    //let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask(
    var a = agent.parameters.number;
    var b;
    firebase.database().ref('number').push({number:a});
    //agent.add(`Your Number is : ${a}`);
    
    firebase.database().ref('data').on('value',snap=>{
      	b = snap.val();
     	agent.add(`Your Data is ${b} and number is: ${a}`);
    	console.log(`hellow froom ${b}`);
    });
    
    
  }
  
    


  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('GetData', getData);
  intentMap.set('showNumber', showNumber);
  
  agent.handleRequest(intentMap);
});
