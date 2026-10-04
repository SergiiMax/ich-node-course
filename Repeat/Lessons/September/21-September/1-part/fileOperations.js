const fs = require("fs");

fs.writeFile("notes.txt", "First string\n", (err) => {
  if (err) {
    console.error("Error during writing", err.message);
    return;
  }
  console.log("File was written\n");

  fs.readFile("notes.txt", "utf-8", (err, data) => {
    if (err) {
      console.error("Error during reading", err.message);
      return;
    }
    console.log("File content:\n" + data);

    fs.unlink("notes.txt", (err) => {
      if (err) {
        console.error("Error during deleting", err.message);
        return;
      }
      console.log("File was deleted");
    });
  });
});
