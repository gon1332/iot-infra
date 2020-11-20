# iot-infra
A really simple IoT infrastructure project based on MQTT.

## Project dependencies
 * [Node.js](https://nodejs.org/en/) >= 12.8
 * [Docker](https://docs.docker.com/engine/) >= 19.03.13
 * [docker-compose](https://docs.docker.com/compose) >= 1.27.4

## Run example with `docker-compose`

 1. Run the containers. This command will build them if they don't exist:
 ```{shell}
 $ docker-compose up -d

 Creating network "iot-infra_iot-network" with the default driver
 Building broker
 ...
 Successfully built blah blah
 Successfully tagged iot-infra_broker:latest
 WARNING: Image for service broker was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
 Building monitor
 ...
 Successfully built blah blah
 Successfully tagged iot-infra_monitor:latest
 WARNING: Image for service monitor was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
 Building end_device
 ...
 Successfully built blah blah
 Successfully tagged iot-infra_end_device:latest
 WARNING: Image for service end_device was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
 Creating iot-broker ... done
 Creating iot-monitor    ... done
 Creating iot-end_device ... done
```

 2. Check if they are up:
 ```{shell}
 $ docker-compose ps

 Name                   Command               State    Ports  
 ------------------------------------------------------------------
 iot-broker       docker-entrypoint.sh node  ...   Up      1883/tcp
 iot-end_device   docker-entrypoint.sh ./scr ...   Up      1883/tcp
 iot-monitor      docker-entrypoint.sh ./scr ...   Up      1883/tcp
```

 3. Print the logs:
 ```{shell}
 $ docker-compose logs

 Attaching to iot-monitor, iot-end_device, iot-broker
 iot-broker    | Broker started and listening on port 1883
 iot-end_device | MQTT client connected.
 iot-end_device | MQTT client published message.
 iot-monitor   | MQTT client connected!
 iot-monitor   | Subscribed:
 iot-monitor   |   topic: 'house/bedroom1/temperature'
 iot-monitor   |   QoS:    1
 iot-monitor   | house/bedroom1/temperature: 10.4
```

 4. Bring them down if you want. Add -rmi to completely remove the images:
 ```{shell}
 $ docker-compose down

 Stopping iot-monitor    ... done
 Stopping iot-end_device ... done
 Stopping iot-broker     ... done
 Removing iot-monitor    ... done
 Removing iot-end_device ... done
 Removing iot-broker     ... done
 Removing network iot-infra_iot-network
```


## Run example without Docker engine

 1. Install depedencies:
 ```{shell}
 $ npm --prefix broker install broker
 $ npm --prefix monitor install monitor
 $ npm --prefix end_device install end_device
 ```

 2. Open a terminal. Run the server locally with:
 ```{shell}
 $ cd broker
 $ node index.js

 Broker started and listening on port 1883
 ```

 3. Open a new terminal. Run the monitor MQTT client.
```{shell}
 $ cd monitor
 $ node index.js

 MQTT client connected!
 Subscribed:
   topic: 'house/bedroom1/temperature'
   QoS:   1
 ```

 4. Open a new terminal. Run the end-device MQTT client.
```{shell}
 $ cd end_device
 $ node index.js

 MQTT client connected.
 MQTT client published message.
 ```
 
 5. Now in the terminal running the monitor client you can see the measurement:
 ```{shell}
 house/bedroom1/temperature: 10.4
 ```
 
 6. Terminate everything by pressing <kbd>Ctrl</kbd>+<kbd>C</kbd>.
