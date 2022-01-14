import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chat = new Schema({
  users: {
    required: true,
    type: Array,
  },
});

export default mongoose.model("chat", chat);