// Есть эмиттер и обработчик, который на событие message выводит текст из данных. Подпишись на событие, вызови его один раз (должно вывестись), затем отпишись через off(), и вызови ещё раз — второй раз ничего выводиться не должно.

const EventEmitter = require('events')
const emitter = new EventEmitter()

const handler = (text)=> {
    console.log(text);
}


emitter.on('event', handler)
emitter.emit('event', 'some text')
emitter.off('event', handler)
emitter.emit('event', 'new text')

// const EventEmitter = require('events')
// const emitter = new EventEmitter()

// function handler (text) {
// console.log(text)
// }

// emitter.on('event', handler)
// emitter.emit('event', 'some text')
// emitter.off('event', handler)
// emitter.emit('event', 'new text')