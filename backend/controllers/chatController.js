import asyncHandler from "express-async-handler"
import ChatRoom from "../models/chatModel.js"
import {checkChat,userListChat,hospitalListChat} from "../helpers/chatHelper.js"
import {addMessage,listMessage,DirectListAllMessages} from "../helpers/messageHelper.js"



  const addNewMessage = asyncHandler(async (req, res) =>    {       
    const { user,hospital,content,chat,isUser} = req.body;   
    if(!chat){
        const chats =await checkChat (user,hospital).then(async(id)=>{  
          const addMessages =await addMessage({user,hospital,chat:id.toString(),content,isUser,res})
          res.json(addMessages); 
        })    
       
    }
    else{ 
      const addMessages =await addMessage({user,hospital,chat,content,isUser,res})    
      res.json(addMessages); 
    }
  });

  const hospitalListAllChats = asyncHandler(async (req, res) => {
    const {hospitalId}=req.query
    const result = await hospitalListChat(hospitalId);
    res.json(result); // Send the result back to the client
  });
  const userlListAllChats = asyncHandler(async (req, res) => {
    const {userId}=req.query
    const result = await userListChat(userId);
    res.json(result); // Send the result back to the client
  });    

  const hospitalListAllMessages = asyncHandler(async (req, res) => {
    const {roomId}=req.query
    const result = await listMessage(roomId);
    res.json(result); // Send the result back to the client
  });
  const userlListAllMessages = asyncHandler(async (req, res) => {
    const {roomId}=req.query
    const result = await listMessage(roomId);
    res.json(result); // Send the result back to the client    
  });
  const userDirectListAllMessages = asyncHandler(async (req, res) => {
    const {uId,hId}=req.query
    const result = await DirectListAllMessages(uId,hId);
    res.json(result); // Send the result back to the client    
  });



  export{
    addNewMessage,
    hospitalListAllChats,
    userlListAllChats,
    hospitalListAllMessages,
    userlListAllMessages,
    userDirectListAllMessages
  }