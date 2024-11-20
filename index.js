const express = require('express');
const { resolve } = require('path');

const cors = require("cors");
const app = express();
app.use(cors());
const port = 3000;

//Endpoint to calculate total price of items in the cart, <http://localhost:3000/cart-total?newItemPrice=1200&cartTotal=0>
 
// Server-side constants
const taxRate = 5; // 5%
const discountPercentage = 10; // 10%
const loyaltyRate = 2; // 2 points per $1
 
app.get("/cart-total", (req, res) => {
  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);
  const totalCartValue = cartTotal + newItemPrice;
  res.send(totalCartValue.toString());
});

//Endpoint to apply a discount based on membership status, <http://localhost:3000/membership-discount?cartTotal=3600&isMember=false>

app.get("/membership-discount", (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember === "true";
  const finalPrice = isMember
    ? cartTotal - (cartTotal * discountPercentage) / 100
    : cartTotal;
 
  res.send(finalPrice.toString());
});

//Endpoint to calculate tax on cart Total, <http://localhost:3000/membership-discount?cartTotal=3600&isMember=false>

app.get("/calculate-tax", (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const tax = (cartTotal * taxRate) / 100;
  res.send(tax.toString());
});

//Endpoint to Estimate delivery time based on shipping method, <http://localhost:3000/estimate-delivery?shippingMethod=standard&distance=100>


app.get("/estimate-delivery", (req, res) => {
  const shippingMethod = req.query.shippingMethod.toLowerCase();
  const distance = parseFloat(req.query.distance);
  const deliveryDays =
    shippingMethod === "standard" ? Math.ceil(distance / 50) : Math.ceil(distance / 100);
 
  res.send(deliveryDays.toString());
});


//Endpoint to Calculate shipping cost based on weight and distance, <http://localhost:3000/shipping-cost?weight=2&distance=600>


app.get("/shipping-cost", (req, res) => {
  const weight = parseFloat(req.query.weight);
  const distance = parseFloat(req.query.distance);
  const shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});


//Endpoint to Calculate loyalty points earned from a purchase, <http://localhost:3000/loyalty-points?purchaseAmount=3600>


app.get("/loyalty-points", (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);
  const loyaltyPoints = purchaseAmount * loyaltyRate;
  res.send(loyaltyPoints.toString());
});

// Start the server
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});





































