import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const FILENAME = process.env.FILENAME;

fs.writeFile(FILENAME, "Hello from env! :)", (err) => {
  if (err) {
    console.error("Error occured writing file: ", err);
    return;
  }

  console.log("File created successfully");

  fs.readFile(FILENAME, "utf-8", (err, data) => {
    if (err) {
      console.error("Error occured reading file: ", err);
      return;
    }
    console.log("File content:", data);
  });
});
