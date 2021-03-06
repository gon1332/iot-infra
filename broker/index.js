'use strict';

require('dotenv').config();

const {
  BROKER_PORT,
} = process.env;


const port = BROKER_PORT;

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
