export default class UserDto {
  constructor({ id, username, email, registered_date, avatarUrl }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.registered_date = registered_date;
    this.avatarUrl = avatarUrl;
  }
}
