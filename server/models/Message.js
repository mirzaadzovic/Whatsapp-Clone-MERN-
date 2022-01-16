import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: Date,
  to: Object,
  seen: Boolean,
  chatId: String,
});

export default mongoose.model("message", MessageSchema);
