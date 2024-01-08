import Notification from "../models/notificationModel.js";
import asyncHandler from "express-async-handler"
import jwt from 'jsonwebtoken';
import dotevn from "dotenv"



const newNotification = asyncHandler(async (req, res) => {
  const { user, link, videoCall } = req.body;
  try {
    const notification = await Notification.create({
      user,
      link,
      videoCall
    });
    res.json({ result: "Notification added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const prescriptionNotification = asyncHandler(async (req, res) => {
  const { user, prescription, appointmentId } = req.body;
  try {
    const notification = await Notification.create({
      user,
      prescription,
      appointmentId,
    });
    res.json({ result: "Notification added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const getNotification = asyncHandler(async (req, res) => {

  const { roomId } = req.query;
  try {
    const notification = await Notification.find({ user: roomId, unRead: true })
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const changeNotifictionStatus = asyncHandler(async (req, res) => {
  const { _id } = req.body;
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



export {
  newNotification,
  getNotification,
  prescriptionNotification,
  changeNotifictionStatus
}