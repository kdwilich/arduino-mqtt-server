import React, { useEffect, useState } from 'react';
import './App.css';
import mqttService from './assets/mqttService';

function App() {
  const [mqttClient, setMqttClient] = useState(mqttService.getClient());
  const [topic, setTopic] = useState(null);
  const [apiEndpoint] = useState(mqttService.getApiEndpoint())

  useEffect(() => {
    mqttService.subscribe(mqttClient, '+');
    const callBack = (payload) => handlePayload(payload);
    mqttService.onMessage(mqttClient, callBack);
    return () => mqttService.closeConnection(mqttClient)
  });

  function handlePayload(payload) {
    if(payload.topic === `${apiEndpoint}prox-sensor`) {
      document.getElementById('distList').innerHTML += `<div>${payload.message} mm</div>`;
    } else if(payload.topic === `${apiEndpoint}temperature`) {
      document.getElementById('tempList').innerHTML += `<div>${payload.message}° F</div>`;
    }
  }
  
  function handlePublish(e) {
    switch (e.target.value) {
      case "ledOn":
        mqttService.publish(mqttClient, `${apiEndpoint}led`, 'ledOn')
        break;
      case "ledOff":
        mqttService.publish(mqttClient, `${apiEndpoint}led`, 'ledOff')
        break;
    
      default:
        break;
    }
  }

  return (
    <div className="App">
      <button value="ledOn" onClick={handlePublish}>LED ON</button>
      <button value="ledOff" onClick={handlePublish}>LED OFF</button>
      <table style={{width:'100%'}}>
        <tbody>
          <tr>
            <th>Ultrasonic Sensor</th>
            <th>Temperature</th>
          </tr>
          <tr>
            <td id="distList">
            </td>
            <td id="tempList">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
