Реализуем регистрацию, логин пользователей с JWT , bcrypt

Создайте модель Comment (поля text — строка, обязательное; userId — целое, обязательное, внешний ключ на Users с onDelete: 'CASCADE'; createdAt/updatedAt — автоматически) вместе с миграцией create-comments и свяжите её с User через hasMany / belongsTo.
Напишите контроллеры createComment (берёт text из тела, автора — из req.user.id, который положил authMiddleware, сохраняет запись и возвращает { id, text, author }) и getComments (последние 20 комментариев с именем автора через include: User), и повесьте их на роуты POST /comments и GET /comments под authMiddleware.

Задача - создать реакт приложение, без архитектуры, все в app пишем устанавливаем библиотеку socket.io
с формой для регистрации
вот такой простой
import { useState } from "react";

function App() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState('')

  const register = async() => {
    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname: name,
        email,
        password
      })
    })
    const data = await res.json()
    if(!res.ok) {
      setError("Error register")
    }
  }

  const login = async() => {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password
      })
    })
    const data = await res.json()
    if(!res.ok) {
      setError("Error register")
    }
    setToken(data.token)
  }

  if (!token) {
    return (
      <>
        <h1>Register</h1>
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={register}>Register</button>
        <button onClick={login}>Login</button>
      </>
    );
  }
  return (
    <>
      <form>
        <h1>Login</h1>
        <div>
          <label>Email</label>
          <input type="text" placeholder="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="text" placeholder="password" />
        </div>
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default App;