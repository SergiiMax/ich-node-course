Блок 1. События (EventEmitter)

1.1 — написать код

Подпишись на событие greet. В данных приходит { name }. Выведи Привет, <name>!. Затем заэмить событие с именем Аня.

1.2 — написать код

Сделай так, чтобы обработчик события start сработал только ОДИН раз, даже если событие вызвать три раза подряд.

1.3 — починить баг

Нужно: подписаться, вызвать событие (выведется), отписаться, вызвать снова (не выведется). Почему этот код не отписывается? Исправь.

jsemitter.on('ping', () => console.log('pong'))
emitter.emit('ping')
emitter.off('ping', () => console.log('pong'))  // не работает!
emitter.emit('ping')

1.4 — написать код

На событие sum приходит массив чисел. Посчитай их сумму через reduce и выведи. Заэмить с [10, 20, 30].

1.5 — написать код

Сделай класс Chat, который наследуется от EventEmitter. Метод send(text) эмитит событие message с текстом. Снаружи подпиши два независимых обработчика: один выводит текст, другой — его длину.
Эта задача про разделение (развязку), та же идея, что была в OrderService (когда с Тимофеем и Артемом обсуждали), только на чате.
Суть: класс Chat через send() просто объявляет факт — «пришло сообщение» — и всё, на этом его работа кончается. Он не знает и не должен знать, что кто-то выводит текст, а кто-то считает его длину. Эти два обработчика висят снаружи, независимо друг от друга, и подписаны на событие message.
Смысл задачи — чтобы вы увидели: чтобы добавить третью реакцию (например, сохранять сообщение в лог), метод send() трогать не надо — просто вешаешь ещё один chat.on('message', ...). Источник события развязан со своими потребителями: они общаются через имя события message, а не через прямые вызовы друг друга.
Коротко: send кричит «сообщение пришло», а кто и как на это реагирует — его не касается; реакции живут отдельно и добавляются, не меняя класс.

js// 1.1
emitter.on('greet', (data) => console.log(`Привет, ${data.name}!`))
emitter.emit('greet', { name: 'Аня' })

// 1.2
emitter.once('start', () => console.log('старт'))
emitter.emit('start'); emitter.emit('start'); emitter.emit('start')

// 1.3 — off() ищет по ссылке, а две стрелки это РАЗНЫЕ функции.
// Нужно вынести обработчик в переменную:
const onPing = () => console.log('pong')
emitter.on('ping', onPing)
emitter.emit('ping')
emitter.off('ping', onPing)   // та же ссылка
emitter.emit('ping')          // тишина

// 1.4
emitter.on('sum', (nums) => console.log(nums.reduce((a, b) => a + b, 0)))
emitter.emit('sum', [10, 20, 30])   // 60

// 1.5
class Chat extends EventEmitter {
  send(text) { this.emit('message', text) }
}
const chat = new Chat()
chat.on('message', (t) => console.log('Текст:', t))
chat.on('message', (t) => console.log('Длина:', t.length))
chat.send('привет')


Блок 2. Event Loop (предскажи вывод)

Для каждой задачи сначала напиши на бумаге, что выведется, потом запусти и сверься.

2.1

jsconsole.log('A')
setTimeout(() => console.log('B'), 0)
Promise.resolve().then(() => console.log('C'))
console.log('D')

2.2

jsconsole.log('1')
process.nextTick(() => console.log('2'))
Promise.resolve().then(() => console.log('3'))
console.log('4')

2.3

jssetTimeout(() => console.log('a'), 0)
Promise.resolve().then(() => console.log('b'))
Promise.resolve().then(() => console.log('c'))
console.log('d')

2.4

jsconsole.log('start')
Promise.resolve().then(() => {
  console.log('p1')
  Promise.resolve().then(() => console.log('p2'))
})
setTimeout(() => console.log('t'), 0)
console.log('end')

2.5

jsPromise.resolve().then(() => {
  console.log('x')
  setTimeout(() => console.log('y'), 0)
})
setTimeout(() => console.log('z'), 0)


2.1 → A, D, C, B — синхрон, потом микро (промис), потом макро (таймер).
2.2 → 1, 4, 2, 3 — синхрон, потом nextTick (у него приоритет даже над промисом), потом промис.
2.3 → d, b, c, a — синхрон, обе микротаски по порядку, потом таймер.
2.4 → start, end, p1, p2, t — микроочередь чистится до дна (p2 родился внутри p1, но ушёл раньше таймера).
2.5 → x, z, y — промис (x) вперёд; таймер y родился внутри промиса, но встал в макроочередь ПОСЛЕ z, который попал туда раньше.


Правило: синхрон → вся микроочередь до дна → макро в порядке попадания. Макро внутри микро не тащится следом.


Блок 3. FS (файловая система)

Заготовка:

jsconst fsp = require('node:fs/promises')

3.1 — написать код

Запиши в файл note.txt строку Node.js. Затем прочитай его обратно и выведи содержимое. (Не забудь про 'utf8'.)

3.2 — написать код

Запиши объект { port: 3000, host: 'localhost' } в файл config.json, а потом прочитай его и выведи значение port (число).

3.3 — предскажи результат

Что окажется в файле log.txt после запуска? Почему не только последняя строка?

jsawait fsp.appendFile('log.txt', 'первая\n')
await fsp.appendFile('log.txt', 'вторая\n')
await fsp.appendFile('log.txt', 'третья\n')

3.4 — написать код

В файле users.json лежит массив имён ["Аня", "Борис"]. Прочитай его, добавь имя Вика и запиши обратно с красивым форматированием (отступ 2 пробела).

3.5 — прочитать стримом

Создай читающий поток для файла big.txt c кодировкой utf8. На событие data выводи длину пришедшего чанка, на end — сообщение готово. Не забудь обработать error.

js// 3.1
await fsp.writeFile('note.txt', 'Node.js')
const text = await fsp.readFile('note.txt', 'utf8')  // без 'utf8' вернётся Buffer
console.log(text)

// 3.2
await fsp.writeFile('config.json', JSON.stringify({ port: 3000, host: 'localhost' }))
const raw = await fsp.readFile('config.json', 'utf8')
const config = JSON.parse(raw)          // строка -> объект
console.log(config.port)                // 3000

// 3.3 — в файле будут ВСЕ три строки:
// первая
// вторая
// третья
// appendFile дописывает в конец, не перезаписывая. (writeFile затёр бы всё, кроме последней.)

// 3.4
const users = JSON.parse(await fsp.readFile('users.json', 'utf8'))
users.push('Вика')
await fsp.writeFile('users.json', JSON.stringify(users, null, 2))  // null, 2 — форматирование

// 3.5
const fs = require('node:fs')
const stream = fs.createReadStream('big.txt', 'utf8')
stream.on('data', (chunk) => console.log('чанк:', chunk.length))
stream.on('end', () => console.log('готово'))
stream.on('error', (err) => console.error('ошибка:', err.message))

