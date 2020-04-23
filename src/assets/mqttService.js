import mqtt from 'mqtt';

const websocketUrl = 'wss://kdwilich-test:38b015981e6337a9@broker.shiftr.io';
const clientId = 'site';
const apiEndpoint = '/chowskihouski/';

function getClient() {
  const client = mqtt.connect(websocketUrl, {
    clientId: clientId
  });
  client.stream.on('error', (err) => {
    console.log(`Connection to ${websocketUrl} failed`);
    client.end();
  });
  return client;
}

function subscribe(client, topic) {
  const callBack = (err, granted) => {
    if (err) {
      console.log('Subscription request failed');
    }
  };
  return client.subscribe(apiEndpoint + topic, callBack);
}

function onMessage(client, callBack) {
  client.on('message', (topic, payload, packet) => {
    const message = new TextDecoder('utf-8').decode(payload);
    callBack({topic:topic, message:message});
  });
}

function unsubscribe(client, topic) {
  client.unsubscribe(apiEndpoint + topic);
}

function closeConnection(client) {
  client.end();
}

function publish(client, topic, payload) {
  client.publish(topic, payload);
}

function getApiEndpoint() {
  return apiEndpoint;
}

const mqttService = {
  getClient,
  subscribe,
  onMessage,
  unsubscribe,
  closeConnection,
  publish,
  getApiEndpoint
};
export default mqttService;