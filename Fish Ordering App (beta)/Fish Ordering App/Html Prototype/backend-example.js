// Install: npm install express stripe body-parser cors
const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const stripe = Stripe('sk_test_YOUR_SECRET_KEY');
app.use(cors());
app.use(bodyParser.json());

app.post('/create-payment', async (req, res) => {
  const {amount} = req.body;
  try {
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), currency: 'myr',
      payment_method_types: ['card'],
    });
    res.send({clientSecret: intent.client_secret});
  } catch (e) {
    res.status(500).send({error: e.message});
  }
});

app.listen(4242, () => console.log('Server running on port 4242'));