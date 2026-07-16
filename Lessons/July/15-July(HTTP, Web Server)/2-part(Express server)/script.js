import express from "express";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const app = express();
// .use - middleware, туда прокидываем то что должно отработать и покрыть приложение
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "hello, client" });
});
app.post("/register", (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    res.status(400).send({ error: "Please fill all fields" });
    return;
  }
  res
    .status(201)
    .send({
      message: "user successfully registered",
      user: { email, username },
    });
});

app.listen(PORT, () => {
  console.log("server is running on " + PORT + " port");
});