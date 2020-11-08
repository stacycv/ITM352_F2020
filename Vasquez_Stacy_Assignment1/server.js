//Creating a server via express//

var data = require('./public/product_data.js'); //get the data from product_data.js
var products = data.products;

// So it'll load querystring// 
const queryString = require('query-string'); // so it'll load querystring// 
var filename = 'user_data.json'; // new//
var fs = require('fs'); //Load file system//

var express = require('express'); //Server requires express to run//
var app = express(); //Run the express function and start express//
var myParser = require("body-parser");

if (fs.existsSync(filename)) {
    stats = fs.statSync(filename) //gets stats from file
    console.log(filename + 'has' + stats.size + 'characters');

    data = fs.readFileSync(filename, 'utf-8');
    users_reg_data = JSON.parse(data);
} else {
    console.log(filename + 'does not exist!');
}
// Go to invoice if quantity values are good, if not redirect back to order page//
//new//
// means any path //
app.all('*', function(request, response, next) {
    console.log(request.method + ' to ' + request.path)
    next();
});

app.use(myParser.urlencoded({ extended: true }));

app.post("/process_purchase", function(request, response) {
    let POST = request.body; // data would be packaged in the body//

    if (typeof POST['submitPurchase'] != 'undefined') {
        var hasvalidquantities = true; // creating a varibale assuming that it'll be true// 
        var hasquantities = false
        for (i = 0; i < products.length; i++) {

            qty = POST[`quantity${i}`];
            hasquantities = hasquantities || qty > 0; // If it has a value bigger than 0 then it is good//
            hasvalidquantities = hasvalidquantities && isNonNegInt(qty); // if it is both a quantity over 0 and is valid//     
        }
        // if all quantities are valid, generate the invoice// 
        const stringified = queryString.stringify(POST);
        if (hasvalidquantities && hasquantities) {
            response.redirect("./Invoice.html?" + stringified); // using the invoice.html and all the data that is input//
        } else { response.send('Enter a valid quantity!') }
    }
});

function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume that quantity data is valid 
    if (q == "") { q = 0; }
    if (Number(q) != q) errors.push('Not a number!'); //check if value is a number
    if (q < 0) errors.push('Negative value!'); //check if value is a positive number
    if (parseInt(q) != q) errors.push('Not an integer!'); //check if value is a whole number
    return returnErrors ? errors : (errors.length == 0);
}
app.use(express.static('./public')); //Creates a static server using express from the public folder
app.listen(8080, () => console.log(`listen on port 8080`))