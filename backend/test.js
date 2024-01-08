
import * as paypal from "./paypal-api.js";


const app = express();


// render checkout page with client id & unique client token
app.get("/", async (req, res) => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  try {
    const clientToken = await paypal.generateClientToken();
    res.render("checkout", { clientId, clientToken });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// create order
app.post("/api/orders", async (req, res) => {
  try {
    const order = await paypal.createOrder();
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// capture payment
app.post("/api/orders/:orderID/capture", async (req, res) => {
  const { orderID } = req.params;
  try {
    const captureData = await paypal.capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}/`);
});
