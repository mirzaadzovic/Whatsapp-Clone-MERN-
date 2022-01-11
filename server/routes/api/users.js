import express from "express";
import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import UserDto from "../../dtos/UserDto.js";

const router = express.Router();

// /api/users
router.get("/", async (req, res) => {
  const result = await User.find().sort({ date: -1 });
  const users = result.map((user) => new UserDto(user));
  return res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(new UserDto(user));
  } catch (error) {
    return res.status(404).json({});
  }
});

router.post("/", async (req, res) => {
  const { username, password, email, avatarUrl } = req.body;

  // Validation
  if (!username || !password || !email)
    return res.status(400).json({ errorMessage: "Please enter all fields" });

  // Does email already exists
  const userEmail = await User.findOne({ email: email });
  if (userEmail)
    return res.status(400).json({ errorMessage: "Email already exists" });

  // Does username already exists
  const userName = await User.findOne({ username: username });
  if (userName)
    return res.status(400).json({ errorMessage: "Username already exists" });

  const newUser = new User({
    email,
    username,
    avatarUrl,
  });
  // Creating salt && hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err)
        return res.status(500).json({ errorMessage: "Internal server error" });
      newUser.passwordSalt = salt;
      newUser.passwordHash = hash;

      // Saving user in DB
      newUser
        .save()
        .then((data) => res.status(201).json(new UserDto(data)))
        .catch((err) => res.status(500).json({ errorMessage: err }));
    });
  });

  // Insert user in DB
});

export default router;
