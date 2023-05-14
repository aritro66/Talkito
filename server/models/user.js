const db = require("../utils/database");

module.exports = class USER {
  static fetchAll(user) {
    return db.execute("SELECT * FROM users WHERE email != ?", [user.email]);
  }

  static addUser(user) {
    return db.execute("INSERT INTO users VALUES (?,?,?)", [
      user.email,
      user.name,
      user.imgURL,
    ]);
  }
};
