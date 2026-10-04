const fs = require("fs");
const path = require("path");

console.log(__dirname);
const dirPath = path.join(__dirname, "test");
console.log(dirPath);

fs.mkdir(dirPath, { recursive: true }, (err) => {
  if (err) {
    console.error("Error occured creating the directory", err.message);
    return;
  }

  console.log("Успешно создана папка testDir");
  const filePath = path.join(dirPath, "example.txt");
  console.log(filePath);
  fs.writeFile(filePath, "Hello, Node.js", "utf-8", (err) => {
    if (err) {
      console.error("Error occured writing file: ", err.message);
      return;
    }
    console.log("Файл успешно создан");
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        console.error("Error occured reading the directory: ", err.message);
        return;
      }
      console.log(files);

      console.log(`Directory contents: ${files}`);
    });
  });
});
