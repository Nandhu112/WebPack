
import * as paypal from "../paypal-api.js";
import asyncHandler from "express-async-handler"




const createAppointment = asyncHandler(async (req, res) => {
  try {
    const order = await paypal.createOrder(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
});




const capturePayment = asyncHandler(async (req, res) => {
  const { orderID } = req.body;
  try {
    const captureData = await paypal.capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


export {
  createAppointment,
  capturePayment

}