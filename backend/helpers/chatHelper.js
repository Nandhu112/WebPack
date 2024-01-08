import ChatRoom from "../models/chatModel.js"


const checkChat = async (userId, hospitalId, res) => {

  try {
    // Find a chat where both user and hospital match
    const existingChat = await ChatRoom.findOne({
      user: userId,
      hospital: hospitalId
    });

    if (!existingChat) {
      const newChat = await ChatRoom.create({
        user: userId,
        hospital: hospitalId
      });
      return newChat._id;
    } else {
      return { chat: existingChat._id };
    }
    // Returns null if no chat found, or the chat object if found
  } catch (error) {
    // Handle the error here
    console.error('Error checking chat:', error);
    throw error;
  }
};

const userListChat = async (userId, res) => {

  try {
    const chats = await ChatRoom.find({ user: userId }).sort({ time: -1 }).populate("hospital");
    return chats;
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const hospitalListChat = async (hospitalId, res) => {

  try {
    const chats = await ChatRoom.find({ hospital: hospitalId }).sort({ time: -1 }).populate("user")
    return chats;
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const updateChatUnreadedTrue = async (id) => {
  try {
    const chat = await ChatRoom.findById(id)
    if (chat) {
      chat.unreaded = true
      chat.time = new Date()
      await chat.save();
    }
  } catch (error) {
  }
};
const updateChatUnreadedFalse = async (id) => {
  try {
    const chat = await ChatRoom.findById(id)
    if (chat) {
      chat.unreaded = false
      chat.time = new Date()
      await chat.save();
    }
  } catch (error) {
  }
};


export {
  checkChat,
  userListChat,

  hospitalListChat,
  updateChatUnreadedTrue,
  updateChatUnreadedFalse
}