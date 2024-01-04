import Notification from "../models/notificationModel.js";
import asyncHandler from "express-async-handler"
import jwt from 'jsonwebtoken';
import dotevn from "dotenv"



const newNotification = asyncHandler(async (req, res) => {   
    console.log('chk make Notification')       
      const { user,link,videoCall} = req.body;
      console.log( user,link,'chk makeAppointment')   
      try {
        const notification = await Notification.create({
          user,
          link,
          videoCall
        });
        console.log('chk make Notification22')    
        res.json({result:"Notification added successfully"});
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    });

    const prescriptionNotification = asyncHandler(async (req, res) => {   
      console.log('chk make Notification')       
        const { user,prescription,appointmentId} = req.body;
        console.log( user,prescription,appointmentId,'chk makeAppointment')   
        try {
          const notification = await Notification.create({
            user,
            prescription,
            appointmentId,
          });
          console.log('chk make Notification22')    
          res.json({result:"Notification added successfully"});
        } catch (error) {
          res.status(500).json({ error: "Internal server error" });
        }
      });

    const getNotification = asyncHandler(async (req, res) => {   

        console.log('chk make Notification')       
          const { roomId} = req.query;
          console.log( req.query,'chk makeAppointment')   
          try {
            const notification = await Notification.find({user:roomId,unRead:true}) 
            console.log(notification,"chk  notification")
            res.json(notification);
          } catch (error) {
            res.status(500).json({ error: "Internal server error" });
          }
        });

        const changeNotifictionStatus = asyncHandler(async (req, res) => {   
          console.log('chk mchangeNotifictionStatus')       
            const { _id} = req.body;
            console.log( _id,'chk mchangeNotifictionStatus11')   
            try {
              const notification = await Notification.findById(_id);
              if (notification) {
                notification.unRead = false; 
                  await notification.save();
              }
              return { success: "Notification Status changed successfully" }; // Returned object corrected
          } catch (error) {
              res.status(500).json({ error: "Internal server error" });
          }
          });



    export{
        newNotification,
        getNotification,
        prescriptionNotification,
        changeNotifictionStatus
    }