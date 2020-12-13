/*
Stacy Vasquez's Assignment 2 server 12/15/2020
A1 - referenced from multiple individuals in class, assign 1 screencast, lab 13, and used ricks recommendation when looking over
A2 - copied Stacy Vasquez's A1, referenced Sharon Diep for console logs, edited to fix for feedback on A2
A3 - fixed login errors 
The purpose of the server is to connect and process the information throughout my e-commerce website TRUE-Empress
*/
var data = require('./public/products_data.js'); //must have data from product_data.js
var products = data.products;
const queryString = require('query-string'); // so it'll load querystring
var filename = 'user_data.json'; // new
var fs = require('fs'); //Loading file system
var express = require('express'); //server requires express to run
var app = express(); // run the express function and start express
var myParser = require("body-parser");
const { request } = require('express');

// lab 15
var cookieParser = require('cookie-parser'); // assigns cookieParser variable to require cookie-parser 
app.use(cookieParser());

var session = require('express-session'); // assigns session variable to require express-session 
app.use(session({
    secret: "ITM352 rocks!",
    resave: false,
    saveUninitialized: true
}));

app.use(myParser.urlencoded({ extended: true })); //get data in the body
//to process the response from what is typed in the form

if (fs.existsSync(filename)) {
    stats = fs.statSync(filename) //gets stats from file

    data = fs.readFileSync(filename, 'utf-8');
    users_reg_data = JSON.parse(data); //pulling data from JSON
} else { //if no matching filename, error message will appear in console
    console.log(filename + 'does not exist! Please enter valid user login to proceed');
}
//referenced from a3 examples
app.get("/login", function(request, response) {
    response.cookie('username', 'stacycv', { maxAge: 60 * 10000 }).send('cookie set'); //sets name
});

app.get("/logout", function(request, response) {
    username = request.cookies.username; //if you have a username cookie
    //refernece https://flaviocopes.com/express-cookies/ 
    response.clearCookie('username').send(`logged out! ${username}`);
});
//end of reference from a3 examples
app.post("/process_login", function(request, response) { // process login from POST and redirect to invoice if matches correctly
    POST = request.body; //nicer to look at when writing strings
    RQ = request.query; //nicer to look at when writing strings
    console.log(RQ);
    the_username = POST.username.toLowerCase(); //making username case insensititve
    if (typeof users_reg_data[the_username] != 'undefined') { //ask the object if it has matching username or leaving it as undefined
        if (users_reg_data[the_username].password == POST.password) {
            RQ.username = the_username;
            console.log(users_reg_data[RQ.username].name);
            RQ.name = users_reg_data[RQ.username].name
            response.redirect('/invoice.html?' + queryString.stringify(RQ));
            return; //redirect to the invoice if valid
        } else { //letting them know exactly whats wrong with the information entered (username is listed in this one because it is existant)
            response.send(`The password entered is not valid for the following username</br> 
           <b> username:</b> <font color="red">${POST['username']} </font></br>
           <b> password:</b> <font color="red">${POST['password']} </font></br>
           </br>
            Please go back and enter a valid login to proceed!`);
        }
    } else { //letting them know exactly whats wrong with the information entered (username is NOT listed in this one because it is NONexistant)
        response.send(`One or more of values entered are not valid </br>
    <b> username:</b> <font color="red">${POST['username']} </font> </br>
    <b> password:</b> <font color="red">${POST['password']} </font> </br>
    </br>
    Please go back and enter a valid login to proceed!`); // letting the user know what they entered is incorrect 
    }
});


app.post("/process_registration", function(request, response) {
    POST = request.body; //easier and faster to write, plus matches throughout the server
    RQ = request.query; //easier and fast to write, plus matches throughout the server
    console.log(POST); //logging the requested body
    var errors = []; //to reference errors
    // errors below will tell the console what is invalid. The user will see it up front via registrationPage.html
    if (/[A-Za-z]+$/.test(POST.name)) {} else { //if it does not match, console will read..
        console.log('name must be letters only') //letting them know only letters are allowed
    }
    // validate name
    if (POST.name == "") { //if nothing entered for name
        console.log('fullname invalid'); //log full name is invalid
    }
    // checking if username is taken
    var reguser = POST.username.toLowerCase(); // case insensitive
    if (typeof users_reg_data[reguser] != 'undefined') { //if username is already defined..
        console.log('username already taken'); //log its already taken
    }
    // only letters and numbers in username
    if (/[0-9a-zA-Z]+$/.test(POST.username)) {} else { //if the username has special characters
        console.log('no special characters allowed in username'); //log no special charaters are allowed
    }
    // password is min 8 characters
    if ((POST.password.length < 8 && POST.username.length > 20)) { //if passwork is not inbetween 8-20 characters
        console.log('password must be 8-20 characters'); //log password must be between 8-20 characters
    }
    // checking if passwords match
    if (POST.password !== POST.repeat_password) { //if it doesnt match previously entered password
        console.log('Passssswords do not match');
        response.redirect('registrationPage.html?' + queryString.stringify(POST)) //reloading page instead of heading to invoice

    }
    // if no errors go to invoice 
    // reference from lab 15
    if (errors == 0) {
        console.log('No errors found. Valid log-in');
        var fullname = POST["name"];
        users_reg_data[fullname] = {}; // saving fullname as array name
        users_reg_data[fullname].name = POST["username"];
        users_reg_data[fullname].password = POST['password'];
        users_reg_data[fullname].email = POST['email'];
        data = JSON.stringify(users_reg_data); // making varible 
        fs.writeFileSync(filename, data, "utf-8"); // adding to JSON
        response.redirect('/invoice.html?' + queryString.stringify(RQ)) //redirecting to invoice if correct

    }
    // reloading page if errors
    if (errors > 0) { // if errors then
        console.log(errors) //send information
        RQ.name = POST.name;
        RQ.username = POST.username;
        RQ.password = POST.password;
        RQ.repeat_password = POST.repeat_password;
        RQ.email = POST.email;
        RQ.errors = errors.join(' ; '); //if multiple errors, list them next to eachother
        response.redirect('/registrationPage.html?' + queryString.stringify(POST)) //keep reloading page until corrected
    }
}); // added registration

app.post("/process_purchase", function(request, response) {
    POST = request.body;

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
            response.redirect("./products_display.html?" + queryString.stringify(POST)); // reload until corrected and alert will show up
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