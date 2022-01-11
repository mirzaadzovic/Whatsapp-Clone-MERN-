import express from "express";
import User from "../../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  //   const users = await User.find().sort({ date: -1 });
  const users = [{ name: "mirza" }, { name: "adoni" }];
  return res.json(users);
});

router.post("/register", (req, res) => {});

export default router;
