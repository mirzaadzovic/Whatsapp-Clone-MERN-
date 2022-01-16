export default class ChatDto {
  constructor(chat) {
    this.id = chat._id;
    this.withUser = chat.users[0];
    this.lastMessage = chat.lastMessage;
    this.dateUpdated = chat.dateUpdated;
  }
}
