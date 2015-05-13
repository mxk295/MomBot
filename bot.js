var HTTPS = require('https');
var cool = {};
cool[1] ='Hi';
cool[2] ='Hey';
cool[3] ='Homedog Im busy';
cool[4] ='call you in a bit...';
cool[5] ='Hey--I wish to speak with you...but later';
cool[6] ='YES MADAME?';
cool[7] ='A plague on this weather!!!!';
cool[8] ='Kind of want your chicken keema';
cool[9] ='Yes';
cool[10] ='Doing well. Will contact you later';
cool[11] ='Let me be';

var botID = process.env.BOT_ID;

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^Hi|Hey Didi|Kutti|Malsi|Dede$/i;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = cool[randomIntInc(1,11)];

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
