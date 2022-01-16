import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chat = new Schema({
  users: {
    required: true,
    type: Array,
  },
  lastMessage: {
    type: Object,
  },
  dateUpdated: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("chat", chat);
