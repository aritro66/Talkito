const User = require("../models/user");

const getAllUsers = async (req, res, next) => {
  try {
    const [data] = await User.fetchAll(req.query);
    const finalData = data.map((user) => {
      return {
        ...user,
        online: global.onlineUsers.has(user.email),
      };
    });
    res.status(200).json(finalData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const createUser = async (req, res, next) => {
  try {
    const postResponse = await User.addUser(req.body);
    console.log(postResponse);
    res.status(201).json("User created");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAllUsers, createUser };
