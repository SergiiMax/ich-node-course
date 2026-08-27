import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port = 3000;


app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Привет, это GET запрос!');
});


app.post('/', (req: Request, res: Response) => {
  const { name, message } = req.body;
  res.send(`Привет, ${name}! Ты отправил сообщение: "${message}"`);
});


app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});