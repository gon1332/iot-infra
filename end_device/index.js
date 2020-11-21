'use strict';

require('dotenv').config();

const {
  BROKER_HOST,
  BROKER_PORT,
} = process.env;


const host = BROKER_HOST;
const port = BROKER_PORT;

const endDevice = {};

/**
 * Connect to the MQTT broker
 *
 * @param actions Actions to be taken on connection
 */
endDevice.connect = function connect(actions) {
  const mqtt = require('mqtt');
  endDevice.client = mqtt.connect(`mqtt://${host}:${port}`);

  endDevice.client.on('connect', () => {
    console.log('MQTT client connected.');
    actions();
  });

  endDevice.client.on('error', (err) => {
    console.log(err);
  });
};

/**
 * Send the measurements to the MQTT broker
 *
 * @param topic       The topic to send the measurement
 * @param measurement The measurement to send
 */
endDevice.send = function send(topic, measurement) {
  const msg = `${measurement}`;
  endDevice.client.publish(topic, msg, {qos: 0}, (err) => {
    if (err) {
      console.log(`MQTT client error in publishing: ${err}`);
    } else {
      console.log('MQTT client published message.');
    }
  });
};

/**
 * Disconnect from the MQTT broker
 *
 * @param actions Actions to be taken on disconnection
 */
endDevice.disconnect = function disconnect(actions) {
  endDevice.client.end();
  actions();
};

/*
 * Actions of a client
 */
process.on('SIGINT', () => {
  console.log('Received SIGINT. Terminating');
  endDevice.disconnect(() => {
    console.log('MQTT client disconnected.');
  });
});

endDevice.connect(() => {
  endDevice.send('house/bedroom1/temperature', 10.4);
});
