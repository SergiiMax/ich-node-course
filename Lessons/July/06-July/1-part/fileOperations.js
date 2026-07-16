const fs = require("fs");
fs.writeFile("example.txt", "this is easy", (err) => {
  if (err) {
    console.log("error occured:", err);
    return;
  }
  console.log("file has been created");
  fs.readFile("example.txt", "utf-8", (err, data) => {
    if (err) {
      console.error("error occured:", err);
      return;
    }
    console.log("file content:", data);
    fs.unlink("example.txt", (err) => {
      if (err) {
        console.error("error occured:", err);
        return;
      }
      console.log("file has been deleted");
    });
  });
});
