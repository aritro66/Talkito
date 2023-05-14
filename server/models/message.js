const db = require("../utils/database");

module.exports = class MESSAGE {
  static fetchAll(message) {
    return db.execute(
      "SELECT * FROM messages WHERE ( sender = ? AND receiver = ? ) OR ( sender = ? AND receiver = ? )",
      [message.from, message.to, message.to, message.from]
    );
  }

  static addMessage(message) {
    return db.execute(
      "INSERT INTO messages (sender, receiver, message) VALUES (?,?,?)",
      [message.from, message.to, message.text]
    );
  }
};
