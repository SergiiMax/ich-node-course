import "dotenv/config";
import express from "express";
import bcrypt from "bcrypt";
import User from "./models/user.js";
import authenticate from "./middlewares/authenticate.js";
import checkAdmin from "./middlewares/checkAdmin.js";
import mustChangePassword from "./middlewares/mustChangePassword.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "User successfully registered",
      id: user.id,
      username: user.name,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Error during registration",
    });
  }
});

app.post("/login", mustChangePassword, async (req, res) => {
  try {
    const { password } = req.body;
  const isMatch = await bcrypt.compare(password, req.user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  res.json({ message: `Welcome, ${req.user.name}` });
  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      message: "Error occurred logining"
    })
  }
});

app.get("/change-password", (_req, res) => {
  res.json({ message: "You must change your password. Send POST /change-password" });
});

app.post("/change-password", authenticate, async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    const isSame = await bcrypt.compare(newPassword, req.user.password)
    if (isSame) {
      return res.status(400).json({
        message: "New password must differ from current one"
      })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await req.user.update({
      password: hashedPassword,
      mustChangePassword: false,
    });

    res.json({
      message: "Password successfully changed",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Error ocurred changing password",
    });
  }
});

app.post("/delete-account", authenticate, async (req, res) => {
  try {
    await req.user.destroy();
    res.json({
      message: "User successfully deleted",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Error occured deleting user",
    });
  }
});

app.get("/admin", authenticate, checkAdmin, (req, res) => {
  res.json({
    message: `Welcome to the admins panel, ${req.user.name}`,
  });
});

app.post('/change-email', authenticate, async (req, res) => {
  try {
    const { newEmail} = req.body

    if (!newEmail) {
      return res.status(400).json({
        message: "New email is required"
      })
    }

    if (newEmail === req.user.email) {
      return res.status(400).json({
        message: "New email must differ from current one"
      })
    }

    const emailExists = await User.findOne({ where: { email: newEmail } })

    if (emailExists) {
      return res.status(409).json({
        message: "This email is already in use"
      })
    }

    await req.user.update({ email: newEmail })
    res.json({
      message: "Email successfully changed"
    })
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Invalid email format"
      })
    }
    console.error(error.message)
    res.status(500).json({
      message: "Error changing email"
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
