// const fs = require('fs')

// const logMessage = (str) => {
//     fs.appendFile('log.txt', str, (err) => {
//         if (err) {
//             console.error('Ошибка записи:', err);
//         }
//     })
// }

// module.exports = { logMessage }

// const fs = require('fs');

// const logMessage = (str) => {
//     fs.appendFile('log.txt', str, (err) => {
//         if (err) {
//             console.error('Ошибка записи:', err);
//             return
//         }
//     });
// };

// module.exports = logMessage;

const fs = require("fs").promises;

async function logMessage(message) {
  try {
    await fs.appendFile("log.txt", message + "\n");
    console.log("Сообщение записано в лог");
  } catch (err) {
    console.error("Ошибка при записи лога:", err);
  }
}

module.exports = logMessage