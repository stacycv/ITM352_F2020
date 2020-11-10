// referenced from assignment 1 scrreencast and lab 13
var data = require('./public/products_data.js'); //must have data from product_data.js
var products = data.products;
const queryString = requirr('query-string'); // so it'll load querystring
var fs = require('fs'); // In lab 13, not sure if needed
var express = require('express'); //server requires express to run
var app = express(); // run the express function and start express
var myParser = require("body-parser");


// if valid redirect to invoice, if not go order page
app.all('*', function(request, response, next) {
    console.log(request.method + ' to ' + request.path)
    next();
});

app.use(myParser.urlencoded({ extended: true })); //get data in the body
//to process the response from what is typed in the form

app.post("/process_purchase", function(request, response) {
    let POST = request.body;

    if (typeof POST['submitPurchase'] != 'undefined') {
        var validQuantities = true; // creating a varable assuming that it'll be true
        var hasQuantities = false
        for (i = 0; i < products.length; i++) {
            qty = POST[`quantity${i}`];
            validQuantities = hasQuantities || qty > 0; // allowed if > than 0
            validQuantities = validQuantities && isNonNegInt(qty);
        }
        // if all quantities are valid go to invoice
        const stringify = queryString.stringify(POST);
        if (validQuantities && hasQuantities) {
            response.redirect("./invoice.html?" + stringify); // invoice.html + data entered
        } else { response.send('Please enter a valid quantity') }
    }
});
//lab 13 reference
function isNonNegInt(qty, returnErrors = false) { //changed name to have more meaning
    errors = []; // assume no errors at first
    if (qty == "") { qty = 0; }
    if (Number(qty) != qty) errors.push('Not a number!'); // Check if string is a number value
    if (qty < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(qty) != qty) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
}
app.use(express.static('./public')); // makes a static server using express from the public
app.listen(8080, () => console.log(`listen on port 8080`))