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
