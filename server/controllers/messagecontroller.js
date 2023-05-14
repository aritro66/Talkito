const Message = require("../models/message");

const getAllMessages = async (req, res, next) => {
  try {
    const [data] = await Message.fetchAll(req.query);
    const finaldata = data.map((ele) => ({
      ...ele,
      youSent: ele.sender === req.query.from,
    }));
    res.status(200).json(finaldata);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const createMessage = async (req, res, next) => {
  try {
    const postResponse = await Message.addMessage(req.body);
    console.log(postResponse);
    res.status(201).json("Message created");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAllMessages, createMessage };
