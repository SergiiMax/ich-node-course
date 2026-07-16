// 1. Импортируйте модуль `events` и создайте экземпляр `EventEmitter`.
// 2. Напишите функцию `sendMessage`, которая принимает имя пользователя, сообщение и объект `EventEmitter`.
// 3. Внутри функции `sendMessage` генерируйте событие `message` с именем пользователя и сообщением.
// 4. Зарегистрируйте обработчик для события `message`, чтобы выводить сообщение в формате "User: Message".
// 5. Вызовите функцию `sendMessage` несколько раз с разными пользователями и сообщениями.

const EventEmitter = require('events')
const emitter = new EventEmitter()

const sendMessage = (username, message, emitter) => {
    emitter.emit('message', {username, message})
}

emitter.on('message', (data) => {
    console.log(`${data.username}: ${data.message}`);
})

sendMessage("Sergii", "Hello!!!", emitter)
sendMessage("Max", "Hi!!!", emitter)
sendMessage("Sergii", "How are you?", emitter)
sendMessage("Max", "Can't complain.", emitter)