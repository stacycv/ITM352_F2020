// referenced from assignment 1 scrreencast and lab 13
var data = require('./public/products_data.js'); //must have data from product_data.js
var products = data.products;
const queryString = require('query-string'); // so it'll load querystring
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
            response.redirect("./loginPage.html?" + stringify); // loginPage.html and keep the data entered for purchase page
        } else {
            response.send("Uh oh, invalid quantity. Please return and enter valid quantity to continue!"); // error message
        }
    }

    //direct lab 14 reference
    var filename = "user_data.json";

    if (fs.existsSync(filename)) {
        data = fs.readFileSync(filename, 'utf-8');
        //console.log("Success! We got: " + data);

        user_data = JSON.parse(data);
        console.log("User_data=", user_data);
    } else {
        console.log("Sorry can't read file " + filename);
        exit();
    }

    app.get("/login", function(request, response) {
        // Give a simple login form
        str = `
<body>
<form action="/login" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
        response.send(str);
    });

    app.post("/login", function(request, response) {
        // Process login form POST and redirect to logged in page if ok, back to login page if not
        console.log("Got a POST login request");
        POST = request.body;
        user_name_from_form = POST["username"];
        console.log("User name from form=" + user_name_from_form);
        if (user_data[user_name_from_form] != undefined) {
            response.send(`<H3> User ${POST["username"]} logged in`);
        } else {
            response.send(`Sorry Charlie!`);
        }
    });

    app.get("/register", function(request, response) {
        // Give a simple register form
        str = `
<body>
<form action="/register" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
        response.send(str);
    });

    app.post("/register", function(request, response) {
        // process a simple register form
        POST = request.body;
        console.log("Got register POST");
        if (POST["username"] != undefined && POST['password'] != undefined && POST["repeat_password"] != undefined) { // Validate user input
            username = POST["username"];
            user_data[username] = {};
            user_data[username].name = username;
            user_data[username].password = POST['password'];
            user_data[username].email = POST['email'];

            data = JSON.stringify(user_data);
            fs.writeFileSync(filename, data, "utf-8");

            response.send("User " + username + " logged in");
        } else {
            response.send("Sorry, invalid entry. You are being redirected now.")
        }
    });



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