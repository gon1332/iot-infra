'use strict';

const port = 1883;

const broker = {};

/**
 * Start the MQTT broker
 *
 * @param actions Actions to be taken on connection
 */
broker.start = function start(actions) {
  const aedes = require('aedes')();
  const server = require('net').createServer(aedes.handle);

  server.listen(port, () => {
    console.log(`Broker started and listening on port ${port}`);
    actions();
  });
};

broker.start(() => {});
