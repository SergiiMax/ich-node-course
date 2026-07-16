const fs = require("fs");

function logMessage(text) {
  fs.appendFile("log.txt", `${text}, `, (err) => {
    if (err) {
      console.log("error occured:", err);
      return;
    }
  });
}

module.exports = {
  logMessage,
};
