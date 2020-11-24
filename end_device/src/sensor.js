'use strict';

const sensor = {};

/**
 * Return a sensor measurement
 */
sensor.read = function read() {
  function rand_int(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return rand_int(2, 30);
};

module.exports = sensor;
