import express from "express";
import Message from "../../models/Message.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// /api/messages
router.get("/", (req, res) => {
  Message.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(data);
    }
  });
});

router.post("/", (req, res) => {
  const newMessage = req.body;
  Message.create(newMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(`${data.name} to ${data.to} -> ${data.message}`);
      res.status(201).send(data);
    }
  });
});

export default router;
