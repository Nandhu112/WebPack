import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios'; // Import Axios

function Payment({handleSubmit}) {
  const serverUrl = "/api/user";

  const createOrder = (data, actions) => {
    console.log("chkkk createOrder.......");
    return axios.post('/api/users/orders', {
      product: {
        description: "Doctor Appointment",
        cost: "2.00",
      },
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.data.id)
    .catch((error) => {
      console.error("Error creating order:", error);
      throw error; // Ensure to handle this error appropriately
    });
  };
  
  const onApprove = (data, actions) => {
    console.log("chkkk onApprove.............");
    return axios.post('/api/users/orderCapture', {
      orderID: data.orderID,
    })
    .then((response) => {
      console.log("payment successful ", response.data);
      handleSubmit()
      return response.data; // Return the response data after logging
    })
    .then((data)=>console.log("data",data))
    .catch((error) => {
      console.error("Error capturing order:", error);
      throw error; // Ensure to handle this error appropriately
    });
  };
  
  const initialOptions = {
    clientId: "AbSqjA22gHoWJvFhXYeKOAz6VP0EzSxJAXgH22WOihJ0NL3rryfvfT-onL0K1oVw6dOKMoxomN2_hylu",
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons createOrder={(data, actions) => createOrder(data, actions)} onApprove={(data, actions) => onApprove(data, actions)} />
    </PayPalScriptProvider>
  );
}

export default Payment;
