import express from "express";
import Chat from "../../models/Chat.js";
import auth from "../../middleware/auth.js";
import jwt from "jsonwebtoken";
import config from "config";

const router = express.Router();

// GET chats
router.get("/", auth, async (req, res) => {
  const data = await Chat.find();
  if (!data) return res.status(404).json({});

  const token = req.cookies.wat;
  if (!token) return null;
  jwt.verify(token, config.get("secretKey"), (error, loggedInUser) => {
    if (error) return null;
    const chats = data.filter((c) =>
      c.users.some((user) => user.id === loggedInUser.id)
    );
    return res.status(200).json(chats);
  });
});

// POST chat
router.post("/", auth, async (req, res) => {
  const { users } = req.body;
  if (!users)
    return res.status(400).json({ errorMessage: "Wrong body parameters" });
  if (await doesChatExist(users))
    return res
      .status(400)
      .json({ errorMessage: "Chat between these users already exists" });

  const chat = new Chat({
    users,
  });

  chat.save().then((chats) => res.status(201).json(chats));
});

// Does chat between these users already exists
async function doesChatExist(users) {
  const data = await Chat.find();

  if (!data) return false;
  const chats = data.filter((u) => areUsersEqual(u.users, users));
  return chats.length > 0;
}

// Are users equal
function areUsersEqual(arr1, arr2) {
  const ids = arr2.map((a) => a.id);
  const chatUsers = arr1.map((u) => u.id);

  if (chatUsers.includes(ids[0]) && chatUsers.includes(ids[1])) return true;

  return false;
}

export default router;
