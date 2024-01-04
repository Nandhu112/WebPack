import ChatRoom from "../models/chatModel.js"


const checkChat = async (userId, hospitalId, res) => {

  try {
    // Find a chat where both user and hospital match
    const existingChat = await ChatRoom.findOne({
      user: userId,
      hospital: hospitalId
    });

    if (!existingChat) {
      console.log('No existing chat found, creating a new one');
      const newChat = await ChatRoom.create({
        user: userId,
        hospital: hospitalId
      });
      console.log(newChat._id,"nw cht")
      return  newChat._id ;
    } else {
      console.log('Existing chat found');
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
console.log(id,'chkkk id1111')
  try {
    const chat = await ChatRoom.findById(id)    
    if(chat){
      chat.unreaded=true
      chat.time=new Date()
      await chat.save();
    }
  } catch (error) {
     console.log("Internal server error")
  }
};
const updateChatUnreadedFalse = async (id) => {
  console.log(id,'chkkk id111133')
  try {
    const chat = await ChatRoom.findById(id)    
    if(chat){
      chat.unreaded=false
      chat.time=new Date()
      await chat.save();
    }
  } catch (error) {
    console.log("Internal server error")
  }
};


export {
    checkChat,
    userListChat,

    hospitalListChat,
    updateChatUnreadedTrue,
    updateChatUnreadedFalse
}