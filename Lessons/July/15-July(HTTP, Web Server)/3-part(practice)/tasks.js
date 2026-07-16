// TASK 1 =====================================================================================
// import express from 'express'
// import dotenv from 'dotenv'
// dotenv.config()

// const PORT = process.env.PORT
// const app = express()
// app.use(express.json());

// const quotes = [
//   "The only limit is your mind.",
//   "Stay hungry. Stay foolish.",
//   "Practice makes perfect.",
//   "Success is not final, failure is not fatal: it is the courage to continue that counts.",
//   "Believe you can and you're halfway there.",
//   "The future depends on what you do today.",
//   "Dream big. Work hard. Stay focused.",
//   "Don't watch the clock; do what it does. Keep going.",
//   "Great things never come from comfort zones.",
//   "Your only limit is the one you set yourself.",
//   "Discipline is the bridge between goals and accomplishment.",
//   "Small steps every day lead to big results.",
//   "Success comes to those who never give up.",
//   "Learning never stops, and neither should you.",
//   "Every expert was once a beginner.",
//   "Hard work beats talent when talent doesn't work hard.",
//   "The secret of getting ahead is getting started.",
//   "Mistakes are proof that you are trying.",
//   "Focus on progress, not perfection.",
//   "Your mindset determines your success."
// ];

// app.post('/quotes', (req, res) => {
//     const { text } = req.body
//     if(!text) {
//         res.status(400).send('{ error: "Please fill all fields" }')
//         return
//     }

//     quotes.push(text)
//     res.status(201).send({message: 'Quote successfully added', text})
// })

// app.get('/quotes', (req, res) => {
//     res.send(quotes)
// })

// app.get('/quotes/random', (req, res) => {
//     const randomQuote = Math.floor(Math.random() * quotes.length)
//     res.send({ quote: quotes[randomQuote]})
// })

// app.listen(PORT, () => {
//   console.log("server is running on " + PORT + " port");
// });

// TASK 2 =======================================================================================

// import express from "express";
// import dotenv from "dotenv";
// dotenv.config();

// const PORT = process.env.PORT;
// const app = express();
// app.use(express.json());

// const todos = [
//   {
//     id: 1,
//     title: "Learn Node.js",
//     isDone: true
//   },
//   {
//     id: 2,
//     title: "Create Express server",
//     isDone: false
//   },
//   {
//     id: 3,
//     title: "Learn REST API",
//     isDone: false
//   },
//   {
//     id: 4,
//     title: "Practice JavaScript",
//     isDone: true
//   },
//   {
//     id: 5,
//     title: "Build Todo App",
//     isDone: false
//   }
// ];

// app.get('/todos', (req, res) => {
//     res.send(todos)
// })

// app.get('/todos/:id', (req, res) => {
//     const id = req.params.id
//     const todo = todos.find(todo => todo.id === id)
//     if(!todo) {
//         res.status(404).send({message: 'Todo not found'})
//     }
//     res.send(todo)
// })
// app.post('/todos', (req, res) => {
//     const { title } = req.body
//     if(!title) {
//         res.status(400).send('Title is required')
//     }
//     const newTodo = {
//         id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
//         title,
//         done: false
//     };

//     todos.push(newTodo)
//     res.status(201).send({ message: "Todo was successfully created and added", newTodo})
// })

// app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// })

// TASK 3 =======================================================================================

import express from "express";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

const messages = [
  {
    id: 1,
    name: "Alex",
    message: "Hello everyone, glad to be here!",
    createdAt: new Date("2026-07-10T09:30:00"),
  },
  {
    id: 2,
    name: "Maria",
    message: "Express.js is really interesting to learn.",
    createdAt: new Date("2026-07-11T14:15:00"),
  },
  {
    id: 3,
    name: "John",
    message: "Today I created my first REST API project.",
    createdAt: new Date("2026-07-12T18:45:00"),
  },
  {
    id: 4,
    name: "Sophie",
    message: "Practice makes programming skills better every day.",
    createdAt: new Date("2026-07-13T11:20:00"),
  },
  {
    id: 5,
    name: "Daniel",
    message: "Learning backend development step by step.",
    createdAt: new Date("2026-07-15T08:10:00"),
  },
];

app.post("/messages", (req, res) => {
  const errors = [];

  const { name, message } = req.body;
  if (!name || name.trim().length < 2) {
    errors.push("Name must contain at least 2 characters");
  }

  if (!message || message.trim().length < 5) {
    errors.push("Message must contain at least 5 characters");
  }

  if (message && message.trim().length > 200) {
    errors.push("Message must not exceed 200 characters");
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  const newMessage = {
    id: messages.length > 0 ? messages[messages.length - 1].id + 1 : 1,
    name,
    message,
    createdAt: new Date(),
  };
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

app.get("/messages", (req, res) => {
  const sortedMessages = [...messages].sort(
    (a, b) => b.createdAt - a.createdAt,
  );
  res.send({ sortedMessages });
});

app.get("/messages/count", (req, res) => {
  res.send({ count: messages.length });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
