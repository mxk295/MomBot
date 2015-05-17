var HTTPS = require('https');
var cool = ['Hi', 
'Hey', 
'Homedog Im busy',
'call you in a bit...',
'Hey--',
'YES MADAME?',
'A plague on this weather!!!!',
'Kind of want your chicken keema',
'Yes',
'Doing well. Will contact you later',
'Let me be',
'!HEY!',
'!!!',
'Beep Beep',
'Taking a nap',
'...stop',
'...'];

var botID = process.env.BOT_ID;
var MAX_RESPONSE_TIME = 60*100*5;
var MIN_RESPONSE_TIME = 60*100*1;

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^(Hi|Hey) (Didi|Kutti|Malsi|Dede)$/i;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postmessage;
    //setTimeOut(postMessage, randomIntInc (MIN_RESPONSE_TIME, MAX_RESPONSE_TIME)) ;
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = cool[randomIntInc (1, cool.length)];

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
