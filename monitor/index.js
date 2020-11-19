'use strict';

const port = 1883;

const monitor = {};

/**
 * Connect to the MQTT broker
 *
 * @param actions Actions to be taken on connection
 */
monitor.connect = function connect(actions) {
  const mqtt = require('mqtt');
  monitor.client = mqtt.connect(`mqtt://localhost:${port}`);

  monitor.client.on('connect', () => {
    console.log('MQTT client connected!');
    actions();
  });
};

/**
 * Listen on a topic and act
 *
 * @param topicSub    The topic to listen to
 * @param actions     Actions to take on message receival
 */
monitor.listen = function listen(topicSub, actions) {
  monitor.client.subscribe(topicSub, {qos: 1}, (err, granted) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Subscribed:');
      console.log(`  topic: '${granted[0].topic}'`);
      console.log(`  QoS:    ${granted[0].qos}`);
    }
  });

  monitor.client.on('message', (topic, message) => {
    if (topicSub === topic) {
      actions(message.toString());
    }
  });

  monitor.client.on('error', (err) => {
    console.log(err);
  });
};

/**
 * Disconnect from the MQTT broker
 *
 * @param actions Actions to be taken on disconnection
 */
monitor.disconnect = function disconnect(actions) {
  monitor.client.end();
  actions();
};

/*
 * Actions of a client
 */
process.on('SIGINT', () => {
  console.log('Received SIGINT. Terminating');
  monitor.disconnect(() => {
    console.log('MQTT client disconnected.');
  });
});

monitor.connect(() => {
  const topic = 'house/bedroom1/temperature';
  monitor.listen(topic, (message) => {
    console.log(`${topic}: ${message}`);
  });
});
