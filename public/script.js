// run this function when the document has loaded
$(function(){
  var client = mqtt.connect('wss://kdwilich-test:38b015981e6337a9@broker.shiftr.io', {
    clientId: 'chowskihouski'
  });

  client.on('connect', function(){
    console.log('client has connected!');
  });

  client.on('message', function(topic, message) {
    console.log('new message:', topic, message.toString());
  });

  $('#button').click(function(){
    client.publish('/hello', 'flip');
  })
})