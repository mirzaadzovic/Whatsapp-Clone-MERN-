import express from "express";
import Message from "../../models/Message.js";
import auth from "../../middleware/auth.js";

const router = express.Router();

// /api/messages
router.get("/", auth, (req, res) => {
  Message.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(data);
    }
  });
});

router.get("/:chatId", auth, async (req, res) => {
  const { chatId } = req.params;
  const data = await Message.find();
  const messages = data.filter((message) => message.chatId === chatId);
  res.status(200).json(messages);
});

router.post("/", auth, (req, res) => {
  const newMessage = req.body;
  Message.create(newMessage, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log(`${data.name} to ${data.to.username} -> ${data.message}`);
      res.status(201).json(data);
    }
  });
});

export default router;
