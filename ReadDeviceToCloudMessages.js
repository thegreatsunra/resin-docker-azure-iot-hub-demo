const EventHubClient = require('azure-event-hubs').Client
const connectionString = '{your_iothubowner_connection_string}'

const printError = (err) => {
  console.log(err.message)
}

const printMessage = (message) => {
  console.log('Message received: ')
  console.log(JSON.stringify(message.body))
  console.log('')
}

const client = EventHubClient.fromConnectionString(connectionString)
client.open()
  .then(client.getPartitionIds.bind(client))
  .then((partitionIds) => {
    return partitionIds.map((partitionId) => {
      return client.createReceiver('$Default', partitionId, {
        'startAfterTime': Date.now()
      }).then((receiver) => {
        console.log('Created partition receiver: ' + partitionId)
        receiver.on('errorReceived', printError)
        receiver.on('message', printMessage)
      })
    })
  })
  .catch(printError)
