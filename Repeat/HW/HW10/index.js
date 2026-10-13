import "dotenv/config";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateJWT from "./middlewares/authenticateJWT.js";
import authorizeRole from "./middlewares/authorizeRole.js";

const findUserById = (id) => users.find((u) => u.id === id);

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

let users = [
  {
    id: 1,
    username: "Alice",
    email: "alice@example.com",
    password: bcrypt.hashSync("alice123", 10),
    role: "user",
  },
  {
    id: 2,
    username: "Bob",
    email: "bob@example.com",
    password: bcrypt.hashSync("bob12345", 10),
    role: "admin", // Если админ, то только Bob ;-)
  },
  {
    id: 3,
    username: "Charlie",
    email: "charlie@example.com",
    password: bcrypt.hashSync("charlie789", 10),
    role: "user",
  },
];

const ALLOWED_ROLES = ["user", "admin"];


const app = express();

app.use(express.json());

app.post("/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password required",
    });
  }
  try {
    const user = users.find((u) => u.email === email);
    const isMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!user || !isMatch) {
      return res.status(401).json({
        message: "Wrong email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      },
    );
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Server error during authentication",
    });
  }
});

app.patch("/update-email", authenticateJWT, (req, res) => {
  const email = req.body?.email?.trim();

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }
  try {
    const userId = req.user.id;

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (users.some((u) => u.email === email.trim() && u.id !== userId)) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    user.email = email.trim();

    res.json({
      message: "Email successfully changed",
      newEmail: user.email,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Error during updating email",
    });
  }
});

app.delete("/delete-account", authenticateJWT, (req, res) => {
  try {
    const userId = req.user.id;

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    users = users.filter((u) => u.id !== userId);

    res.json({
      message: "User successfully deleted",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Error occurred deleting user",
    });
  }
});


app.patch("/update-role", authenticateJWT, authorizeRole(findUserById, "admin"), (req, res) => {
    const { userId, role } = req.body || {};

    if (userId === undefined || !role) {
      return res.status(400).json({
        message: "User ID and role are required",
      });
    }

    if (typeof role !== "string" || !ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({
        message: `Role must be one of: ${ALLOWED_ROLES.join(", ")}`,
      });
    }
    try {
      const user = users.find((u) => u.id === Number(userId));

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      user.role = role;

      res.json({
        message: "User role successfully updated",
        userId: user.id,
        username: user.username,
        newRole: user.role,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        message: "Error occurred updating role",
      });
    }
  },
);

app.post('/refresh-token', authenticateJWT, (req, res) => {
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)

        const user = findUserById(decoded.id)

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const newToken = jwt.sign({
            id: user.id,
            email: user.email, role: user.role,
        },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRES_IN
        }
    )

    res.json({
        message: 'Token refreshed',
        token: newToken
    })
    } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
