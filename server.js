// referenced from assignment 1 scrreencast and lab 13
var data = require('./public/products_data.js'); //must have data from product_data.js
var products = data.products;
const queryString = require('query-string'); // so it'll load querystring
var filename = 'user_data.json'; // new
var fs = require('fs'); //Loading file system
var express = require('express'); //server requires express to run
var app = express(); // run the express function and start express
var myParser = require("body-parser");

// if valid redirect to invoice, if not go order page
app.all('*', function(request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

app.use(myParser.urlencoded({ extended: true })); //get data in the body
//to process the response from what is typed in the form

if (fs.existsSync(filename)) {
    stats = fs.statSync(filename) //gets stats from file

    data = fs.readFileSync(filename, 'utf-8');
    users_reg_data = JSON.parse(data);
} else {
    console.log(filename + 'does not exist! Please enter valid user login to proceed');
}

app.post("/process_login", function(request, respond) { //referenced melanie yang
    var LogError = [];
    let POST = request.query;
    console.log(POST);
    the_username = request.body.username.toLowerCase(); //making username case insensititve
    if (typeof users_reg_data[the_username] != 'undefined') { //ask the object if it has matching username or leaving it as undefined
        if (users_reg_data[the_username].password == request.body.password) {
            POST.username = the_username;
            console.log(users_reg_data[POST.username].name);
            POST.name = users_reg_data[POST.username].name
            respond.redirect('/invoice.html?' + queryString.stringify(request.query));
            return; //redirect to the invoice if valid
        } else { //if password is not entered correctly tell console
            LogError.push = ('invalid password');
            console.log(LogError);
            POST.username = the_username;
            POST.name = users_reg_data[the_username].name;
            POST.LogError = LogError.join(';');
        }
    } else { //if username is incorrect tell console
        POST.username = the_username;
        response.send(`The following values entered are not valid </br>
    username: ${POST['username']} </br>
    password: ${POST['password']} </br>
    Please go back and enter a valid login to proceed`); // letting the user know what they entered is incorrect 
    }
});


app.post("/process_registration", function(request, response) {
    POST = request.body;
    RQ = request.query;
    console.log(POST);
    var errors = [];
    // errors below will tell the console what is invalid. The user will see it up front via registrationPage.html
    if (/[A-Za-z]+$/.test(POST.name)) {} else {
        console.log('name must be letters only')
    }
    // validate name
    if (POST.name == "") {
        console.log('fullname invalid');
    }
    // checking if username is taken
    var reguser = POST.username.toLowerCase(); // case insensitive
    if (typeof users_reg_data[reguser] != 'undefined') {
        console.log('username already taken');
    }
    // only letters and numbers in username
    if (/[0-9a-zA-Z]+$/.test(POST.username)) {} else {
        console.log('no special characters allowed in username');
    }
    // password is min 8 characters
    if ((POST.password.length < 8 && POST.username.length > 20)) {
        console.log('password too short');
    }
    // checking if passwords match
    if (POST.password !== POST.repeat_password) {
        console.log('passwords do not match');
    }
    // if no errors go to invoice
    if (errors.length == 0) {
        console.log('No errors found. Valid log-in');
        RQ.username = reguser;
        RQ.name = POST.name;
        response.redirect('/invoice.html?' + queryString.stringify(RQ))
    }
    // reloading page if errors
    if (errors.length > 0) {
        console.log(errors)
        RQ.name = POST.name;
        RQ.username = POST.username;
        RQ.password = POST.password;
        RQ.repeat_password = POST.repeat_password;
        RQ.email = POST.email;

        RQ.errors = errors.join(';');
        response.redirect('registrationPage.html?' + queryString.stringify(RQ))
    }
}); // added registration

app.post("/process_purchase", function(request, response) {
    let POST = request.body;

    if (typeof POST['submitPurchase'] != 'undefined') {
        var validQuantities = true; // creating a variable assuming that it'll be true
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

// A1 - referenced from multiple individuals in class, assign 1 screencast, lab 13, and used ricks recommendation when looking over
// A2 - referenced melanie yang for console logs