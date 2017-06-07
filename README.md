# resin-docker-azure-iot-hub-demo

> Microsoft Azure IoT Hub demo from a resin.io Docker container

This demo is based on [this tutorial](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-node-node-getstarted)

## Prerequisites

1) Install [node](https://nodejs.org/en/)
2) Install [git](https://git-scm.com/downloads)
3) Install [yarn](https://yarnpkg.com/lang/en/docs/install/)

## Get setup with Azure and create an IoT Hub

1) [Sign up](https://azure.microsoft.com/) for a Microsoft Azure account

2) [Follow the beginning of these instructions](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-node-node-getstarted) to create an Azure IoT Hub (stop at "Create a device identity" as that's where this demo starts)

3) As you follow those instructions, be sure to note your IoT Hub `hostname` and your iothubowner `Connection string`

## Get this demo

1) clone this repo

```bash
git clone https://github.com/thegreatsunra/resin-docker-azure-iot-hub-demo.git
cd resin-docker-azure-iot-hub-demo
```

2) install dependencies

```bash
yarn
```

## Create a device

1) Edit `createDeviceIdentity.js` and replace the value for `connectionString` with your iothubowner `Connection string` from Azure

2) Save and close `createDeviceIdentity.js`

3) Create a device identity

```bash
node ./createDeviceIdentity.js
```

4) Note the `Device ID` and the `Device key`

## Create a Node app to simulate a device and send messages to the cloud

1) Edit `simulatedDevice.js`

2) Find the `HostName` value within the `connectionString` variable string, and replace it with your IoT Hub `hostname` (it should look something like `xxxxxxxx.azure-devices.net`)

3) Find the `SharedAccessKey` value within the `connectionString` variable string, and replace it with the `Device key` value you got when you ran `createDeviceIdentity.js` above

## Create a Node app to read device-to-cloud messages

1) Edit `readDeviceToCloudMessages.js` and replace the value for `connectionString` with your iothubowner `Connection string` from Azure

2) Save and close `readDeviceToCloudMessages.js`

## Test your device and message apps locally

1) Open a Terminal window and run

```bash
# Start your simulated device app
node ./simulatedDevice.js
```

2) Open a second Terminal window and run

```bash
# Start your app that reads your cloud-to-device messages
# This app may take a few seconds to initialize as it creates its partition receivers
node ./readDeviceToCloudMessages.js`
```

3) Your `simulatedDevice` window should report once per second that it's sending a message, and your `readDeviceToCloudMessages` window should report once per second that it received a message

4) With your apps running, visit your Microsoft Azure IoT Hub dashboard. In the "Usage" widget, the number of Messages should be increasing (you may need to refresh the page as they may not increment in real time)

### Set up resin.io and push your project to get it on a device

1) [Sign up for a resin.io account][signup-page]

2) Create an app on resin.io. Look at their [Getting Started tutorial][gettingStarted-link] for help

3) Set up a device (e.g. a Raspberry Pi 3) on resin.io

4) Add your resin.io application's remote repository to your project repo

```bash
# run this command from your resin-docker-webhooks-demo folder
git remote add resin username@git.resin.io:username/myapp.git
```

5) Push your changes to the newly added remote to kick off a build:

```bash
git push resin master
```

It will take a few minutes for the code to push, build, deploy to your device, and for your device to start your app

## License

The MIT License (MIT)

Copyright (c) 2017 Dane Petersen

[resin-link]:https://resin.io/
[signup-page]:https://dashboard.resin.io/signup
[gettingStarted-link]:http://docs.resin.io/#/pages/installing/gettingStarted.md
