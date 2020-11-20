# iot-infra
A really simple IoT infrastructure project based on MQTT.

## Project dependencies
 * [Node.js](https://nodejs.org/en/) >= 12.8

## Run the example

 1. Install depedencies:
 ```{shell}
 $ npm install
 ```

 2. Open a terminal. Run the server locally with:
 ```{shell}
 $ node broker/index.js

 Broker started and listening on port 1883
 ```

 3. Open a new terminal. Run the monitor MQTT client.
```{shell}
 $ node monitor/index.js

 MQTT client connected!
 Subscribed:
   topic: 'house/bedroom1/temperature'
   QoS:   1
 ```

 4. Open a new terminal. Run the end-device MQTT client.
```{shell}
 $ node end_device/index.js

 MQTT client connected.
 MQTT client published message.
 ```
 
 5. Now in the terminal running the monitor client you can see the measurement:
 ```{shell}
 house/bedroom1/temperature: 10.4
 ```
 
 6. Terminate everything by pressing <kbd>Ctrl</kbd>+<kbd>C</kbd>.
