const iothub = require('azure-iothub')

const connectionString = '{your_iothubowner_connection_string}'

const registry = iothub.Registry.fromConnectionString(connectionString)

let device = new iothub.Device(null)
device.deviceId = 'myFirstNodeDevice'
registry.create(device, (err, deviceInfo, res) => {
  if (err) {
    registry.get(device.deviceId, printDeviceInfo)
  }
  if (deviceInfo) {
    printDeviceInfo(err, deviceInfo, res)
  }
})

function printDeviceInfo (err, deviceInfo, res) {
  if (deviceInfo) {
    console.log('Device ID: ' + deviceInfo.deviceId)
    console.log('Device key: ' + deviceInfo.authentication.symmetricKey.primaryKey)
  }
  if (err) {
    console.log(err)
  }
}
