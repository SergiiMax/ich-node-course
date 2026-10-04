const EventEmitter = require('events')
const chating = new EventEmitter()

const sendMessage = (user, message, emitter) => {
    emitter.emit('newMessage', user, message)
}

chating.on('newMessage', (user, message) => {
    console.log(`${user}: ${message}`);
})

sendMessage('Alex', 'Hello!!!', chating)
sendMessage('Bob', 'Hello Alex!!!', chating)
sendMessage('Jill', 'Hello guies!!!', chating)