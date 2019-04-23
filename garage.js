// var mqtt = require('mqtt')
// var client  = mqtt.connect('mqtt://test.mosquitto.org')
 
// client.on('connect', function () {
//   client.subscribe('presence', function (err) {
//     if (!err) {
//       client.publish('presence', 'Hello mqtt')
//     }
//   })
// })
 
// client.on('message', function (topic, message) {
//   // message is Buffer
//   console.log(message.toString())
//   client.end()
// })\\
// contoller.js and garage.js
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

/**
* The state of the garage, defaults to closed
* Possible states : closed, opening, open, closing
*/

var state = 'closed'

// client.on('connect', () => {
//   // Inform controllers that garage is connected
//   client.publish('garage/connected', 'true')
// })




//////////2
// added to end of garage.js
function sendStateUpdate () {
  console.log('sending state %s', state)
  client.publish('garage/state', state)
}
// updated garage.js connect
client.on('connect', () => {
  // Inform controllers that garage is connected
  client.publish('garage/connected', 'true')
  sendStateUpdate()
})
