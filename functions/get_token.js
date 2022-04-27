const twilio = require('twilio')

exports.handler = async function (context, event, callback) {
  const response = new Twilio.Response();
  // Set the CORS headers to allow Flex to make an error-free HTTP request
  // to this Function
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');


  const { ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET } = context
  const accessToken = new twilio.jwt.AccessToken(ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET)
  accessToken.identity = event.username
  
  const grant = new twilio.jwt.AccessToken.VideoGrant({
    room: event.roomname
  })

  accessToken.addGrant(grant)

  response.appendHeader('Content-Type', 'application/json');
  response.setBody({
    token: accessToken.toJwt()
  });

  callback(null, response)
}