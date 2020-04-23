// run this function when the document has loaded
$(function(){
  var client = mqtt.connect('wss://kdwilich-test:38b015981e6337a9@broker.shiftr.io', {
    clientId: 'site'
  });

  client.on('connect', function(){
    console.log('client has connected!');
  });

  // client.on('message', function(topic, message) {
  //   console.log('new message:', topic, message.toString());
  // });
  client.subscribe('/chowskihouski/+');
  client.on('message', function(topic, payload) {
      var decoded = new TextDecoder("utf-8").decode(payload);
      console.log(decoded);

      if(topic == "/chowskihouski/prox-sensor") {
        document.getElementById("distList").innerHTML += `<li>${decoded}</li>`;
      }
      else if(topic == "/chowskihouski/temperature") {
        document.getElementById("tempList").innerHTML += `<li>${decoded}</li>`;
      }
  })



  // $('#ledOn').click(function(){
  //   client.publish('/chowskihouski/led', 'ledOn');
  // })
  // $('#ledOff').click(function(){
  //   client.publish('/chowskihouski/led', 'ledOff');
  // })
})