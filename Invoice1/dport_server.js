// referenced from assignment 1 screencast and lab 13 and port's assignment 1
var express = require('express'); //server requires express to run
var myParser = require("body-parser");
var products = require('./public/products_data.json'); //must have data from product_data.js
const { response } = require('express');
const { totalmem } = require('os');

var app = express(); // run the express function and start expres

app.use(myParser.urlencoded({ extended: true })); //get data in the body
//to process the response from what is typed in the form
// if valid redirect to invoice, if not go order page

app.post("/process_purchase", function(req, res, next) {
    console.log(Date.now() + ': Purchase made from ip ' + req.ip + ' date: ' +
        JSON.stringify(req.body));
    invoice_data = invoice(req.body)
    response.json(invoice_data);
    next();
});

app.use(express.static('./public')); // makes a static server using express from the public

var listener = app.listen(8080, () => { console.log('server started listening on port' + listener.address().port); });

function invoice(quantities) {
    subtotal = 0
    for (i = 0; i < products.length; i++) {
        a_qty = quantities[`quantity${i}`];
        if (a_qty > 0) {
            //add to subtotal
            subtotal += a_qty * prroducts[i].price
        }
    }
    //compute tax
    var tax_rate = 0.0575;
    var tax = tax_rate * subtotal;

    //compute shipping
    if (subtotal <= 50) {
        shipping = 2
    } else if (subtotal <= 50) {
        shipping = 5
    } else {
        shipping = 0.05 * subtotal; // 5% of subtotal
    }

    // compute grand total
    var total = subtotal + tax + shipping;

    return {
        "quantities": quantities,
        "total": total,
        "subtotal": subtotal,
        "tax_rate": tax_rate,
        "tax": tax,
        "shipping": shipping
    };
}