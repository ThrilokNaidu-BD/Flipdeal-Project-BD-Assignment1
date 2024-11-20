const express = require('express');
const { resolve } = require('path');

let cors = require("cors");
let app = express();
app.use(cors());
const port = 3000;
app.use(express.static('static'));

//Endpoint to calculate total price of items in the cart, <http://localhost:3000/cart-total?newItemPrice=1200&cartTotal=0>
app.get("/cart-total", (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice)
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCart = newItemPrice + cartTotal;
  res.send(totalCart.toString());
});

//Endpoint to apply a discount based on membership status, <http://localhost:3000/membership-discount?cartTotal=3600&isMember=false>

function  finalPrice (cartTotal, isMember) {
  if (isMember === 'true') {
    let finalPrice;
    let discount =10;
    finalPrice = cartTotal - (cartTotal * (discount/100));
    return finalPrice;
  } else {
    return cartTotal;
  }
}
app.get("/membership-discount", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal)
  let isMember = req.query.isMember;
  res.send(finalPrice(cartTotal,isMember).toString());
});

//Endpoint to calculate tax on cart Total, <http://localhost:3000/membership-discount?cartTotal=3600&isMember=false>

function  taxAmount (cartTotal) {
  
    let taxAmount;
    let tax =5;
    taxAmount = cartTotal * (tax/100);
    return taxAmount;
}
app.get("/calculate-tax", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(taxAmount(cartTotal).toString());
});

//Endpoint to Estimate delivery time based on shipping method, <http://localhost:3000/estimate-delivery?shippingMethod=standard&distance=100>


function deliveryTime(shippingMethod, distance) {
  let deliveryTime;
  if (shippingMethod === 'standard') {
    deliveryTime = distance / 50;
  } else if (shippingMethod === 'express') {
    deliveryTime = distance / 100; //if required can use Math.ceil function to get roundoff to higher number
  }
  return deliveryTime;
}
app.get("/estimate-delivery", (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(deliveryTime(shippingMethod, distance).toString());
});


//Endpoint to Calculate shipping cost based on weight and distance, <http://localhost:3000/shipping-cost?weight=2&distance=600>


function shippingCost(weight, distance) {
  let shipmentCost = weight * distance * 0.1; 
  return shipmentCost;
}
app.get("/shipping-cost", (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(shippingCost(weight, distance).toString());
});


//Endpoint to Calculate loyalty points earned from a purchase, <http://localhost:3000/loyalty-points?purchaseAmount=3600>


function calculateLoyalityPoints(purchaseAmount) {
  let loyalityPoints = 2; // 2 points per $1
  let totalLoyalityPoints = purchaseAmount * loyalityPoints;

  return totalLoyalityPoints;
}
app.get("/loyalty-points", (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  
  res.send(calculateLoyalityPoints(purchaseAmount).toString());
});






































app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
