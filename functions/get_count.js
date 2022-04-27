const twilio = require('twilio')

exports.handler = async function (context, event, callback) {
  try {
    const response = new Twilio.Response()
    // Set the CORS headers to allow Flex to make an error-free HTTP request
    // to this Function
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { ACCOUNT_SID, AUTH_TOKEN } = context
  
    console.log(event.roomname)
    const client = twilio(ACCOUNT_SID, AUTH_TOKEN)
    const room = client.video.rooms(event.roomname)
    const data = await room.participants.list({status: 'connected'})
    const count = data.length;
    
    response.appendHeader('Content-Type', 'application/json');
    response.setBody({ count });
  
    callback(null, response)

  } catch (e) {
    callback(null, {
      msg: e.message
    })
  }
  
}