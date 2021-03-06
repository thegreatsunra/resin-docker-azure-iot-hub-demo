const clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString
const Message = require('azure-iot-device').Message
const connectionString = 'HostName={your_iot_hostname};DeviceId=myFirstNodeDevice;SharedAccessKey={your_device_key}'
const client = clientFromConnectionString(connectionString)

function printResultFor (op) {
  return function printResult (err, res) {
    if (err) console.log(op + ' error: ' + err.toString())
    if (res) console.log(op + ' status: ' + res.constructor.name)
  }
}

const connectCallback = function (err) {
  if (err) {
    console.log('Could not connect: ' + err)
  } else {
    console.log('Client connected')

    // Create a message and send it to the IoT Hub every second
    setInterval(() => {
      const temperature = 20 + (Math.random() * 15)
      const humidity = 60 + (Math.random() * 20)
      const data = JSON.stringify({
        deviceId: 'myFirstNodeDevice',
        temperature: temperature,
        humidity: humidity
      })
      const message = new Message(data)
      message.properties.add('temperatureAlert', (temperature > 30) ? 'true' : 'false')
      console.log('Sending message: ' + message.getData())
      client.sendEvent(message, printResultFor('send'))
    }, 1000)
  }
}

client.open(connectCallback)
