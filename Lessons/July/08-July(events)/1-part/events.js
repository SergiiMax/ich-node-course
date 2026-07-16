const { removeListener } = require('cluster')
const EventEmmiter = require('events')
const emitter = new EventEmmiter()

emitter.on('data', (message) => {
    if(message) {
        console.log(message)
    } else {
        console.log('data is empty, but event is done')
    }
})

emitter.emit('data')
emitter.emit('data', {id: 1, message: 'First event from node'})
emitter.emit('data', {id: 2, message: 'Second event from node'})

// ==============================================ONCE

emitter.once('connect', () => {

    console.log('Connect for the first time')
})

emitter.emit('connect')
emitter.emit('connect')

// ==================================removeListener

const eventHandler = () => {
    console.log('this will not be logged after removal')
}

emitter.on('removeEvent', eventHandler)

emitter.emit('removeEvent')
emitter.removeListener('removeEvent', eventHandler)
emitter.emit('removeEvent')