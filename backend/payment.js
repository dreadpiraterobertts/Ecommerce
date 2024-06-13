// This is your test secret API key.
const stripe = require('stripe')('sk_test_51PNxEB1XzIPCkFeylgf0aXgO3u7hlMMN1i5uaElkTAi8OeVsWZJdVxZnKbJWSl2M0c7Vtb9HSBpWdLZlK0KkFoGO00PUEBQL0F');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4000';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(4000, () => console.log('Running on port 4000'));