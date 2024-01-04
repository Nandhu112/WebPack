import Message from "../models/messageModel.js";

const addMessage = async ({user,hospital,chat,content,isUser,res}) => {
  try {
    let message
    if(isUser){
     message = await Message.create({
      chat:chat,
      user,
      hospital,
      content,
      isUser
    });
  }
  else{
     message = await Message.create({
      chat:chat,
      user,
      hospital,
      content,
    });
  }
    return { success: "Message added successfully", message };
  } catch (error) {
    console.error('Error adding message:', error);
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

const listMessage = async (roomId, res) => {
  try {
    const messages = await Message.find({ chat: roomId })

    return messages;  
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const DirectListAllMessages = async (uId,hId, res) => {
  try {
    const messages = await Message.find({ user:uId,hospital:hId})
    return messages;  
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


export{
    addMessage,
    listMessage,
    DirectListAllMessages,
}