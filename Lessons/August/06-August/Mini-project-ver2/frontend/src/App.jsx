import { useState } from 'react'


function App() {
const [token, setToken] = useState("")
const [email, setEmail] = useState("")
const [name, setName] = useState("")
const [password, setPassword] = useState("")
const [error, setError]= useState("")
async function register() {
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
  if(!res.ok){
    setError(`Error register`)
  }
}
async function login() {
  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password
    })
  })
  const data = await res.json()
  if(!res.ok){
    setError(`Error register`)
  }
  setToken(data.token)
}
if(!token){
  return(<>
      <h1>Register</h1>
        <div>
          <label htmlFor="">Name</label>
          <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="text" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button onClick={register}>Register</button>

        <button onClick={login}>Login</button>
      </>)
}
  return (
    <>
    
      <form>
      <h1>Login</h1>
        <div>
          <label htmlFor="">Email</label>
          <input type="text" placeholder='email'/>
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="text" placeholder='Password'/>
        </div>
        <button type='submit'>Send</button>
      </form>
    </>
  )
}

export default App
