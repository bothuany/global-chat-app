const Message = require("../models/Message.js");

exports.createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
  }
};
/*exports.getMessage = async (id) => {
  try {
    const message = await Message.findById(id);

    return message;
  } catch (err) {
    console.log(err);
  }
};

exports.deleteMessage = async (id) => {
  try {
    const message = await Message.findOneAndRemove(id);
  } catch (err) {
    console.log(err);
  }
};*/
