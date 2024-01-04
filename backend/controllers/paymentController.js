
import * as paypal from "../paypal-api.js";
import asyncHandler from "express-async-handler"


// app.get("/", async (req, res) => {
//   const clientId = process.env.PAYPAL_CLIENT_ID;
//   try {
//     const clientToken = await paypal.generateClientToken();
//     res.render("checkout", { clientId, clientToken });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// create order
// app.post("/api/orders", async (req, res) => {
    
//   try {
//     const order = await paypal.createOrder(req.body);
//     res.json(order);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

const createAppointment = asyncHandler(async (req, res) => {   
    console.log('createAppointment')
    try {
        const order = await paypal.createOrder(req.body);
        console.log('chkk createAppointment',order)
        res.json(order);
      } catch (err) {
        res.status(500).send(err.message);
      }
});


// capture payment
// app.post("/api/orders/:orderID/capture", async (req, res) => {
//   const { orderID } = req.params;
//   try {
//     const captureData = await paypal.capturePayment(orderID);
//     res.json(captureData);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

const capturePayment = asyncHandler(async (req, res) => {   
  console.log('capturePayment')
    const { orderID } = req.body;
    try {
      const captureData = await paypal.capturePayment(orderID);
      res.json(captureData);
    } catch (err) {
      res.status(500).send(err.message);
    }
});


export{
    createAppointment,
    capturePayment

}