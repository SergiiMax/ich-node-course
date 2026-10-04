const fs = require("fs");
const axios = require("axios");

axios
  .get("https://jsonplaceholder.typicode.com/posts")
  .then((result) => {
    fs.writeFile("posts.txt", JSON.stringify(result.data, null, 2), "utf-8", (err) => {
      if (err) {
        return console.error("Error occeurred writing file: ", err.message);
      }
      console.log("File was successfully written");
      fs.readFile("posts.txt", "utf-8", (err, data) => {
        if (err) {
          return console.error("Error occeurred reading file: ", err.message);
        }
        console.log("File contents: ", data);
      });
    });
  })
  .catch((error) => {
    console.error("Network error: ", error.message);
  });
