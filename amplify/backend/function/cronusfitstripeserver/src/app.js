/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const stripe = require('stripe')('sk_test_51Lf7hYLEgVjilS7myVobz3vvEFrW42AKd8tPAfX2wuuFkcbZ9WTx6g0PCqep5LmJI1GKman0QgjJY0lPNKWuZLCZ00EcAJKiRi');


// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

/***********************
 * Stripe API Endpoints *
 ***********************/

app.post('/checkout', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2022-08-01'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 0.01,
    currency: 'usd',
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_51Lf7hYLEgVjilS7mLwv5xoMUoynFgMwqJUk3e92DT3qmuLG4GAwpC4dTIzhUTZO9IEgxeKzHjanYKALbNPeMCQVB00TVLm0ke9'
  });
});
/*
// Create a payment intent
app.post('/create-payment-intent', async function(req, res) {
  try {
    const { amount, currency } = req.body;

    // Create a payment intent using the Stripe API
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Create a payment method
app.post('/create-payment-method', async function(req, res) {
  try {
    const { paymentMethod } = req.body;

    // Create a payment method using the Stripe API
    const paymentMethodObj = await stripe.paymentMethods.create(paymentMethod);

    res.json({ paymentMethod: paymentMethodObj });
  } catch (error) {
    console.error('Error creating payment method:', error);
    res.status(500).json({ error: 'Failed to create payment method' });
  }
});

// Confirm a payment intent
app.post('/confirm-payment-intent', async function(req, res) {
  try {
    const { paymentIntentId } = req.body;

    // Confirm a payment intent using the Stripe API
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

    res.json({ paymentIntent: paymentIntent });
  } catch (error) {
    console.error('Error confirming payment intent:', error);
    res.status(500).json({ error: 'Failed to confirm payment intent' });
  }
});

app.listen(3000, function() {
  console.log("App started");
});

*/

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
