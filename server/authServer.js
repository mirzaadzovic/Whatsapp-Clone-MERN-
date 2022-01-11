import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET as secretKey,
  REFRESH_TOKEN_SECRET as secretRefreshKey,
} from "./env.js";

const users = [
  { id: 1, username: "mirza", password: "mirza123" },
  { id: 2, username: "adoni", password: "adoni456" },
];
// App config
const port = process.env.PORT || 5050;
const app = express();
app.use(express.json());

const corsConfig = {
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

// Middleware
app.use(cors(corsConfig));

const generateJwtToken = (user) => {
  return jwt.sign(user, secretKey, { expiresIn: "15min" });
};

// Login
app.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.filter((u) => u.username === username)[0];

    if (user === undefined)
      return res.status(400).send("Wrong username or password");

    if (user.password === password) {
      const accessToken = generateJwtToken(user);
      const refreshToken = jwt.sign(user, secretRefreshKey);

      console.log(`${user.username} logged in`);
      return res.json({ accessToken: accessToken, refreshToken: refreshToken });
    }

    return res.status(400).send("Wrong username or password");
  } catch (error) {
    return res.status(500).send();
  }
});

// Listen

app.listen(port, () => console.log(`Auth server running at localhost:${port}`));
