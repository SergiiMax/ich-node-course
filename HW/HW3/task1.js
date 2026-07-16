const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "myFolder");

fs.mkdir(folderPath, (err) => {
  if (err) {
    console.error("Error during creating directory: ", err);
    return;
  }
  console.log("Directory was successfully created");

  fs.rmdir(folderPath, (err) => {
    if (err) {
      console.error("Error during deleting directory: ", err);
      return;
    }
    console.log("Derictory was successfully deleted");
  });
});
