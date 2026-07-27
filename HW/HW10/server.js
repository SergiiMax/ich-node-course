import express from "express"
import "dotenv/config"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const app = express()
const PORT = process.env.PORT
const users = [
    {
        id: 1,
        username: "Sergii",
        email: "sergii@gmail.com",
        password: bcrypt.hashSync("sergii12345", 10),
        role: "admin"
    },
    {
        id: 2,
        username: "Maks",
        email: "maks@gmail.com",
        password: bcrypt.hashSync("maks12345", 10),
        role: "user"
    },
    {
        id: 3,
        username: "Liza",
        email: "liza@gmail.com",
        password: bcrypt.hashSync("liza12345", 10),
        role: "user"
    }
]

app.use(express.json())

function authenticateJWT(req, res, next) {
    const header = req.headers.authorization
    if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = header.slice('Bearer '.length);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id;
    req.userRole = payload.role
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

function authorizeRole(requiredRole) {
  return (req, res, next) => {
    if (req.userRole !== requiredRole) {
        return res.status(403).json({error: "Access denied"})
    }
    next()
  }
}

app.post('/login', async (req, res) => {
    const {username, password} = req.body
    const user = users.find(user => user.username === username)
    
    if (!user) {
        return res.status(404).json({error: "User not found"})
    }
    if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Wrong password"})
    }
    const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, { expiresIn: "1h"})
    res.json({token})
})

app.put("/update-email", authenticateJWT, (req, res) => {
    const { newEmail } = req.body
    const user = users.find(user => user.id === req.userId)

    if (!user) {
        return res.status(404).json({error: "User not found"})
    }
    user.email = newEmail
    res.status(200).json({message: "Email was successfully updated", username: user.username, email: user.email, role: user.role})
})

app.delete("/delete-account", authenticateJWT, (req, res) => {
    const userIndex = users.findIndex(user => user.id === req.userId)

    if(userIndex === -1) {
        return res.status(404).json({error: "User not found"})
    }
    users.splice(userIndex, 1)
    res.status(200).json({message: "User was deleted"})
})

app.put("/update-role", authenticateJWT, authorizeRole("admin"), (req, res) => {
    const { id, newRole } = req.body
    const user = users.find(user => user.id === id)

    if (!user) {
        return res.status(404).json({error: "User not found"})
    }
    user.role = newRole
    res.status(200).json({message: "Role was successfully updated", username: user.username, email: user.email, role: user.role})
})

app.listen(PORT, () => {
    console.log(`Server listen no port ${PORT}`);
})