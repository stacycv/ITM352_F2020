// referenced from assignment 1 scrreencast and lab 13
var data = require('./public/products_data.js'); //must have data from product_data.js
var products = data.products;
const queryString = require('query-string'); // so it'll load querystring
var filename = 'user_data.json'; // new
var fs = require('fs'); //Loading file system
var express = require('express'); //server requires express to run
var app = express(); // run the express function and start express
var myParser = require("body-parser");

//  TESTING NEW REGISTER PROCESS POST

// if valid redirect to invoice, if not go order page
app.all('*', function(request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

app.use(myParser.urlencoded({ extended: true })); //get data in the body
//to process the response from what is typed in the form

if (fs.existsSync(filename)) {
    stats = fs.statSync(filename) //gets stats from file
    console.log(filename + 'has' + stats.size + 'characters');

    data = fs.readFileSync(filename, 'utf-8');
    users_reg_data = JSON.parse(data);
} else {
    console.log(filename + 'does not exist!');
}
app.post("/process_login", function(req, res) { //referenced from https://github.com/shelahcruz
    var LogError = [];
    console.log(req.query);
    the_username = req.body.username.toLowerCase();
    if (typeof users_reg_data[the_username] != 'undefined') {
        //Asking object if it has matching username, if it doesnt itll be undefined.
        if (users_reg_data[the_username].password == req.body.password) {
            req.query.username = the_username;
            console.log(users_reg_data[req.query.username].name);
            req.query.name = users_reg_data[req.query.username].name
            res.redirect('/invoice.html?' + queryString.stringify(req.query));
            return;
            //Redirect them to invoice here if they logged in correctly//
        } else {
            LogError.push = ('Invalid Password');
            console.log(LogError);
            req.query.username = the_username;
            req.query.name = users_reg_data[the_username].name;
            req.query.LogError = LogError.join(';');
        }
    } else {
        LogError.push = ('Invalid Username');
        console.log(LogError);
        req.query.username = the_username;
        req.query.LogError = LogError.join(';');
    }
    res.redirect('./loginPage.html?' + queryString.stringify(req.query));
});


app.post("/process_registration", function(request, response) { //referenced https://github.com/alvinalmira
    username = request.body.username.toLowerCase();
    user_reg_data[username] = {};
    user_reg_data[username].name = request.body.name;
    user_reg_data[username].password = request.body.password;
    user_reg_data[username].email = request.body.email.toLowerCase();

    if (request.body.password == request.body.repeat_password) {

        reg_info_str = JSON.stringify(user_reg_data);
        fs.writeFileSync(user_data_info, reg_info_str);

        response.redirect('/invoice.html?' + queryString.stringify(require.query))
    }
}); // added registration

app.post("/process_purchase", function(request, response) {
    let POST = request.body;

    if (typeof POST['submitPurchase'] != 'undefined') {
        var validQuantities = true; // creating a varable assuming that it'll be true
        var hasQuantities = false
        for (i = 0; i < products.length; i++) {
            qty = POST[`quantity${i}`];
            hasQuantities = validQuantities || qty > 0; // allowed if > than 0
            validQuantities = hasQuantities && isNonNegInt(qty);
        }
        // if all quant are valid go to invoice
        const stringify = queryString.stringify(POST);
        if (validQuantities && hasQuantities) {
            response.redirect("./loginPage.html?" + stringify); // following A2 reqs must sign in before purchase + data entered
        } else {
            response.send("Uh oh, invalid quantity. Please return and enter valid quantity to continue!"); // error message
        }
    }
});
// direct lab 13 reference
function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume no errors at first
    if (q == "") { q = 0; }
    if (Number(qty) != q) errors.push('Not a number!'); // Check if string is a number value
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
}
app.use(express.static('./public')); // makes a static server using express from the public
app.listen(8080, () => console.log(`listen on port 8080`))

// referenced from multiple individuals in class, assign 1 screencast, lab 13, and used ricks recommendation when looking over