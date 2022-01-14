import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
  to: String,
  seen: Boolean,
  chatId: String,
});

export default mongoose.model("message", MessageSchema);
