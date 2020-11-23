'use strict';

require('dotenv').config();
const sensor = require('./src/sensor');

const {
  NAME,
  BROKER_HOST,
  BROKER_PORT,
} = process.env;

const host = BROKER_HOST;
const port = BROKER_PORT;

const endDevice = {};
endDevice.name = NAME;

/**
 * Connect to the MQTT broker
 *
 * @param actions Actions to be taken on connection
 */
endDevice.connect = function connect(provide_status, actions) {
  const mqtt = require('mqtt');

  var lwt;
  if (provide_status) {
    lwt = {
      topic: `${endDevice.name}/status`,
      payload: 'Offline',
      qos: 1,
      retain: true,
    };
  }
  endDevice.client = mqtt.connect(`mqtt://${host}:${port}`, { will: lwt });

  endDevice.client.on('connect', () => {
    console.log('MQTT client connected.');

    if (provide_status) {
      // Initialize the status topic to Online
      endDevice.client.publish(lwt.topic, 'Online', {
        qos: lwt.qos, retain: lwt.retain,
      }, (err) => {
        if (err) {
          console.log(`MQTT client error in publishing status: ${err}`);
        } else {
          console.log('MQTT client is Online.');
        }
      });
    }

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
  endDevice.client.publish(topic, msg, {qos: 0, retain: true}, (err) => {
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
  process.exit(0);
});

endDevice.connect(true, () => {
  const period = 2000;
  console.log(`Sensing every ${period} milliseconds`);
  setInterval(() => {
    endDevice.send('house/bedroom1/temperature', sensor.read());
  }, period);
});
