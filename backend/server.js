import  express  from "express";
import dotevn from "dotenv"
import {notFound,errorHandler} from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
dotevn.config();
import path from "path"

import connectDB from "./config/db.js";
const port=process.env.PORT || 5000;
import userRoutes from "./route/userRoute.js"
import adminRoutes from "./route/adminRoute.js"
import hospitalRoutes from "./route/hospitalRoute.js" 
import doctorRoute from "./route/doctorRoute.js"
import session from "express-session"
import { updateChatUnreadedTrue,updateChatUnreadedFalse} from "../backend/helpers/chatHelper.js"


import cors from "cors";

connectDB()

const app = express()  

app.use(cors());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  }));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/users',userRoutes)
app.use('/api/hospitals',hospitalRoutes)
app.use('/api/doctors',doctorRoute)
app.use('/api/admin',adminRoutes)   


// // for dist

if(process.env.NODE_ENV==='production'){
  const __dirname= path.resolve() 
  app.use(express.static(path.join(__dirname,'../frontend/dist')))

  app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'..','frontend','dist','index.html')))
}else{

//? ===================== Application Home Route =====================
app.get('/' ,(req,res)=>res.send('server is running')) 
} 

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// app.get('/' ,(req,res)=>res.send('server is running'))

app.use(notFound)
app.use(errorHandler)



const server= app.listen(port,()=>console.log(`server is running ${port}`))

import ("socket.io").then((socketIO)=>{
  const io = new socketIO.Server(server,{
      pingTimeout:60000, // amount of time to wait b4 being inactive to save bandwidth
      cors:{
          // origin:"http://localhost:3000"
          origin:"https://medpack.online"
      }
  })

  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (data) => {
      console.log("Connected to socket.io66",data);           
      socket.join(data);    
      socket.emit("connected");
      const usersInOnline = io.sockets.adapter.rooms.get(data);
      console.log("No sockets in room:jhj " + data);  
      if(usersInOnline){
        console.log('user online')
      }
      else{
        console.log('user not online')
      }
 
  
    });

    socket.on("join chat", (data) => {
      if(data.preRoomId){
        console.log("leave form",data.preRoomId)
        socket.leave(data.preRoomId);      
      }
      socket.join(data.sender)    
      socket.join(data.roomId)     
      socket.emit("chkk")
      console.log("User joined Room: " + data.roomId,data.sender)   
             
  })
  socket.on("sendNotification", (data) => {
    console.log("sendNotification11", data);   
    const usersInOnline = io.sockets.adapter.rooms.get(data);
     
    if(usersInOnline){
      console.log('user online')
    }
    else{
      console.log('user not online')
    }
    socket.in(data).emit("notificationRecieved");
           
})

  socket.on("new message",async (data) => {
    console.log("new message received", data.roomId);   
         const socketsInRoom = io.sockets.adapter.rooms.get(data.roomId);
        //  console.log("socketsInRoom.size  " + socketsInRoom.size?socketsInRoom.size:null);
      if (socketsInRoom && socketsInRoom.size >1) {
        const unreaded=await updateChatUnreadedFalse(data.roomId)
        console.log("Message sent to sockets in room: " + data.roomId);           
        // socket.in(roomId).emit("messageReceived");
        socket.in(data.roomId).emit("messageRecieved");

      } else {
        var senderIdAsString = data.senderId.toString();
        const allRoomIds = [];
        io.sockets.adapter.rooms.forEach((value, key) => {
          allRoomIds.push(key);
        });
         
        // Log all room IDs
        console.log("All Room IDs:", allRoomIds);
        const unreaded=await updateChatUnreadedTrue(data.roomId)
        console.log("No sockets in room:" + data.senderId);  
        const usersInOnline = io.sockets.adapter.rooms.get(data.senderId);
     
        if(usersInOnline){
          console.log('user online')
        }
        else{
          console.log('user not online')
        }
        console.log("No sockets in room: " , data.senderId);  
        socket.in(data.senderId).emit("offlineMessageRecieved");
      }
  });
       
  })

})

