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
var filename = './user_data.json'; // A2 new
var fs = require('fs'); //Loading file system
var express = require('express'); //server requires express to run
var app = express(); // run the express function and start express
var myParser = require("body-parser");
var quantity_str; // A3 new
var products = data.products; //added dec 14

// lab 15
var cookieParser = require('cookie-parser'); // assigns cookieParser variable to require cookie-parser 
app.use(cookieParser());

var session = require('express-session'); // assigns session variable to require express-session 
app.use(session({
    secret: "ITM352 rocks!",
    resave: false,
    saveUninitialized: true
}));

// Retrieved from Professor Port's Assignment 1 Example
// Uses function to check if string is a non-negative integer
app.all('*', function(request, response, next) {
    console.log(request.method + ' to ' + request.path); // Logs request method and path to the console;
    next();
});
//end of new code

app.use(myParser.urlencoded({ extended: true })); //get data in the body
//to process the response from what is typed in the form

if (fs.existsSync(filename)) {
    stats = fs.statSync(filename) //gets stats from file

    data = fs.readFileSync(filename, 'utf-8');
    users_reg_data = JSON.parse(data); //pulling data from JSON
} else { //if no matching filename, error message will appear in console
    console.log(filename + 'does not exist! Please enter valid user login to proceed');
}

//end of reference from a3 examples
app.post("/process_login", function(request, response) { // process login from POST and redirect to invoice if matches correctly
    POST = request.body; //nicer to look at when writing strings
    RQ = request.query; //nicer to look at when writing strings
    console.log(RQ);
    the_username = POST.username.toLowerCase(); //making username case insensititve
    if (typeof users_reg_data[the_username] != 'undefined') { //ask the object if it has matching username or leaving it as undefined
        if (users_reg_data[the_username].password == POST.password) {
            RQ.username = the_username;
            console.log(users_reg_data[RQ.username].name + " logged in");
            RQ.username = users_reg_data[RQ.username].username
            session.username = ['the_username']
            response.send(` <!--send user a UI personalized message that they are logged in with date/time they logged in + links that lead the user back to shopping or back to cart-->
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Comfortaa">
      <link rel="stylesheet" href="./products_style.css"> 
      <h2> Welcome ${users_reg_data[the_username].name}!  <br><br> Click <a href="/collection_display.html?">here</a> to continue shopping<br><br> Click <a href="./display_cart">here</a> to go back to cart</h2>
      `)
                // response.redirect('./login?' + quantityQuery_str + `&username=${the_username}`); **small changes
                // response.redirect('/invoice.html?' + queryString.stringify(RQ)); **cancel to add above code
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

app.get("/login", function(request, response) { //created to display login page
    console.log(request.query); // print out q-str
    if (typeof request.cookies['username'] != 'undefined') {
        str = `Welcome ${request.cookies['name']}!`
    } else {
        quantity_str = request.query;

        // Give a simple login form

        /* 
        //referenced from a3 examples
        app.get("/login", function(request, response) {
            response.cookie('username', 'stacycv', { maxAge: 60 * 10000 }).send('cookie set'); //sets name
        });
        */

        str = `
  <body>
      <form action="/login" method="POST">`

        if (session.name != undefined) { // if sessions username is not undefined, send a UI personalized user message that lets them know their login was successful, the time & date they logged in, and tells them to go back to shop (if login link in navbar is clicked again after successfully logging in, this message will help prevent them from logging in more than once )
            str += `<h1>Hello ${session.name}! You logged in at ${session.last_login_time}<br><p style="color:red"> Please Go Back to Shop</p><br>_______________________________________</h1> `
        }

        str += `<h1>Log In</h1> <!--html that displays the login page-->
          <div class="container">
          <label for="username"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="username"}> 
      
          <label for="password"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" >
      
          <button type="submit" class="loginbtn">Log In</button>
          </div> 
  
  
        <div class="container" style="background-color:#fadadd">
          <span class="newuser">New user? Click <a href="/register">HERE</a> to register!</span>
        </div>
        </form>
  
        <form action="/logout" method="POST">
        <button type="submit" class="logoutbtn">Log Out</button>
  
        </form>
  </body>
  
  <!-- Login Styling retrieved from https://www.w3schools.com/howto/howto_css_login_form.asp -->
          <style>
          body {font-family: Arial, Helvetica, sans-serif;}
          form {border: 30px solid #ffb6c1;}
  
          h1 {
            text-align: center;
            margin-top: 3%;
  
          }
          
          input[type=text], input[type=password] {
            width: 100%;
            padding: 15px 20px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            box-sizing: border-box;
          }
          
          .loginbtn, .logoutbtn {
            background-color: #ffb6c1;
            color: white;
            padding: 20px 40px;
            text-align: center;
            font-size: 16px;
            margin-top: 3%;
            margin-left: 35%;
            margin-bottom: 3%;
            width: 30%;
            cursor: pointer;
          }
          
          .loginbtn:hover {
            opacity: 0.8;
          }
          
          .container {
            padding: 60px;
          }
          
          span.psw {
            float: right;
            padding-top: 2-px;
          }
          </style>
      `;
        response.send(str);
    }
});

app.get("/logout", function(request, response) {
    username = request.cookies['username']; //if you have a username cookie ** workshop comments
    //refernece https://flaviocopes.com/express-cookies/ 
    response.clearCookie('username').send(`logged out! ${username}`);
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
        var username = POST.username;
        users_reg_data[username] = {}; // saving fullname as array name
        users_reg_data[username].name = POST.name;
        users_reg_data[username].password = POST.password;
        users_reg_data[username].email = POST.email;
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
/*
//canceled out because changed purchase to form
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
}); */

//reference kydee
app.get("/display_cart", function(request, response, next) { //created to display items in the shopping cart
    console.log(request.session.cart); //log the session cart data into the console
    var str = "";
    str += `
    <header>
    <h1>
    <meta charset="utf-8">
    <title>CULT GAIA</title>
    <link href="products_style.css" rel="stylesheet"> CULT GAIA
</h1>

    <li><a href="index.html">HOME</a></li>
    <li><a class="active" href="collection_display.html">SHOP BY COLLECTION</a></li>
    <li>
        <a href="registrationPage.html">REGISTER</a>
    </li>
    <li><a href="loginPage.html">LOGIN</a></li>
    <li><a href="/display_cart">CART</a></li>
</ul>
<br>
  
  
  </header>
  <h2> Cart </h2>`


    if (session.username != undefined) {
        username = users_reg_data[the_username].name
        str += `<h3> <p style="color:red">Welcome ${session.the_username}! You are currently logged in. </p></h3> <!--UI message for user if they are logged in-->`
    }

    //variabes created to keep track of extended price, subtotal, tax rate and shipping costs
    extended_price = 0;
    subtotal = 0;
    var tax_rate = 0.0575;
    shipping = 0;

    //for loops that generate products that the customer orders and posts them on the cart page
    for (product_type in request.session.cart) {
        for (i = 0; i < products[product_type].length; i++) {
            //variable used to check that the quantities of the products
            q = request.session.cart[product_type][`quantity${i}`];
            if (q == 0) {
                continue;
            }
            //extended price is the price of each product times the amount of that item added
            extended_price = products[product_type][i]["price"] * q;
            subtotal += extended_price;
            //this string will be posted on the cart page
            str += `
     
  
      <body>     
      <form action="/display_cart" method="POST">
  
      <div class="shop-item">
      <!--List the product names-->
              <h4><span class="shop-item-title">${products[product_type][i]["product"]}</span>
              <hr class="space" />
              <!--Show the images of each product-->
              <div class="enlarge">
                  <img class="shop-item-image" src=${products[product_type][i]["image"]}>
              </div>
              <!--Show the quantity of each product-->
              <hr class="space" />
              <label id="quantity${i}_label" class="shop-item-quantity">Quantity: ${q}</label>
              <div class="shop-item-details">
              <!--List the prices and extended prices-->
                  <hr class="space" />
                  <span class="shop-item-price">Price: $${extended_price}</span><br></h4>
              </div>
              </div>
         </form>
  </body>
  `;
        }
    }
    // Compute shipping
    if (subtotal > 0 && subtotal <= 2500) { // If subtotal is less than or equal to $2,500, shipping = $5
        shipping = 5;
    } else if (subtotal > 2500 && subtotal <= 5000) { // Else if subtotal is less than or equal to $5,000, shipping = $10
        shipping = 10;
    } else if (subtotal > 5000) { // Else if subtotal is greater than $5,000, shipping = $0 (free)
        shipping = 0; // Free shipping!
    }
    //calculate the tax by multiplying the tax rate to the subtotal
    var tax = tax_rate * subtotal;
    //calculate the grand total by adding subtotal with tax and shipping
    var grand_total = subtotal + tax + shipping;

    //add html to display cost information to the str variable
    str += ` 
    <form action="/display_cart" method="POST">
    <footer>
    <link rel="stylesheet" href="./product_style.css"> 
    <h2>
    <div class="shop-item-description">Subtotal: $${subtotal.toFixed(2)}</div>
    <div class="shop-item-description">Shipping: $${shipping.toFixed(2)}</div>
    <div class="shop-item-description">Tax: $${tax.toFixed(2)}</div>
    <div class="shop-item-description">Grandtotal: $${grand_total.toFixed(2)}</div>
  </h2>
    <input type="submit" value="Checkout Cart!" name="submit_cart">
  </footer>
  </form>`
    if (grand_total == 0) {
        response.send(`
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Comfortaa">
    <link rel="stylesheet" href="./product_style.css"> 
    <h2>Your cart is empty <br>Please go <a href="./">back</a> and add items to view your cart</h2>`);
    }

    response.send(str);

});

app.post("/display_cart", function(request, response) { // posts data from the display_cart form, with action named "display_cart"
    POST = request.body
    var qString = queryString.stringify(POST);
    if (typeof session.username != "undefined") {
        response.redirect('/invoice'); //changed
    } else {
        response.redirect('/loginPage.html?' + qString); //changed

    }
});

app.get("/invoice", function(request, response, next) { //created to generate invoice page
    console.log(request.session.cart); //log the session cart data into the console
    var str = "";
    str += `
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Comfortaa">
    <link rel="stylesheet" href="./invoice_style.css">
    <header>
    <h1>CULT GAIA<br>----- Invoice -----</h1> 
  
  </header>`
    if (session.username != undefined) { // if session username is not undefined
        str += `<h3><p style="color:red">Thank you for you purchase ${session.username}! </p></h3>` // generate UI thank you message for user if they are logged in

        //variabes created to keep track of extended price, subtotal, tax rate and shipping costs
        extended_price = 0;
        subtotal = 0;
        var tax_rate = 0.0575;
        shipping = 0;
        str += `
  <table border="2">
  <tbody>
    <tr>
      <th style="text-align: center;" width="43%">Item</th>
      <th style="text-align: center;" width="11%">quantity</th>
      <th style="text-align: center;" width="13%">price</th>
      <th style="text-align: center;" width="54%">extended price</th>
    </tr>
  `;

        //for loops that generate products that the customer orders and posts them on the invoice page
        for (product_type in request.session.cart) { // for every product type detected in the sessions cart
            for (i = 0; i < products[product_type].length; i++) { // A for loop generates length of products by product type from product_data.js file onto the invoice page, (i=i+1 -> post increment: use the value of i first, then increment)
                //variable used to check that the quantities of the products
                q = request.session.cart[product_type][`quantity${i}`]; // sets q variable to the quantities of items inputted inside session
                if (q == 0) { // if products quantitiy equals 0
                    continue; //continue, breaking one iteration in loop
                }
                //extended price is the price of each product times the amount of that item added
                extended_price = products[product_type][i]["price"] * q;
                subtotal += extended_price;
                //this string posts item submitted from cart on the invoice page
                str += ` 
        <tr>
          <td width="43%">${products[product_type][i]["product"]}</td> 
          <td align="center" width="11%">${q}</td>
          <td width="13%">\$${products[product_type][i]["price"]}</td>
          <td width="54%">\$${extended_price}</td>
        </tr>
        `;

            }
        }
        // Compute shipping
        if (subtotal > 0 && subtotal <= 2500) { // If subtotal is greater than $0 but less than or equal to $2,500, shipping = $5
            shipping = 5;
        } else if (subtotal > 2500 && subtotal <= 5000) { // Else if subtotal is greater than $2500 but less than or equal to $5,000, shipping = $10
            shipping = 10;
        } else if (subtotal > 5000) { // Else if subtotal is greater than $5,000, shipping = $0 (free)
            shipping = 0; // Free shipping!
        }
        //calculate the tax by multiplying the tax rate to the subtotal
        var tax = tax_rate * subtotal;
        //calculate the grand total by adding subtotal with tax and shipping
        var grand_total = subtotal + tax + shipping;

        //add html to display cost information to the str variable
        str += ` 
    
    <!--Generates invoice table for subtotal, tax, shipping & total (fixed to 2 deci places) from customers purchase-->
        <tr>
          <td colspan="4" width="100%">&nbsp;</td>
        </tr>
        <tr>
          <td style="text-align: center;" colspan="3" width="67%">Sub-total</td>
          <td width="54%">$
            ${subtotal.toFixed(2)}
          </td>
        </tr>
        <tr>
          <td style="text-align: center;" colspan="3" width="67%"><span style="font-family: arial;">Tax @
              ${100 * tax_rate}</span></td>
          <td width="54%">$
            ${tax.toFixed(2)}
          </td>
        </tr>
        <tr>
          <td style="text-align: center;" colspan="3" width="67%">Shipping</span></td>
          <td width="54%">$
            ${shipping.toFixed(2)}
          </td>
        </tr>
        <tr>
          <td style="text-align: center;" colspan="3" width="67%"><strong>Total</strong></td>
          <td width="54%"><strong>$
              ${grand_total.toFixed(2)}</strong></td>
        </tr>
      </tbody>
    </table>
  
    
  `;
        if (grand_total == 0) { //if grand_total = 0, cart must be empty so send them a response saying that no invoice was generated
            response.send(` 
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Comfortaa">
    <link rel="stylesheet" href="./invoice_style.css"> 
    <h2>No invoice was generated <br>Please go <a href="./">back</a>, add items to your cart, log into your account, & submit purchase to receive invoice</h2>`);
        } else { //else, send the invoice to email
            //code here to send variable str to email

            //sends an email to the users' email, retrieved from https://www.w3schools.com/nodejs/nodejs_email.asp

            var userInfo = users_reg_data[session.username];
            var nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'beautifullydesigned808@gmail.com',
                    pass: 'password808'
                }
            });

            var mailOptions = {
                from: 'beautifullydesigned808@gmail.com',
                to: userInfo['email'],
                subject: 'Beautifully Designed : Thank you!',
                text: 'Thank you for your order. Please shop with us again!'
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            str += `<h1>Thank you for your order!<br>Your invoice was sent to ${userInfo['email']}</h1>`
            request.session.destroy(); // after invoice is sent, customer session is destroyed and cart is cleared
            session.username = undefined; // session username becomes undefined, clearing UI messages

            response.send(str);
        }
    }
});

app.post("/process_form", function(request, response) { // posts data from the process form, with action named "process_form"
    POST = request.body; // lets POST variable hold contents of the body 
    RS = request.session
    var hasPurchases = false; // sets hasPurchases variable to false, assuming that the quantity of purchases starts off as false
    var isValidData = true; // sets is ValidData variable to true, assuming that the data entered is valid
    console.log(POST);
    if (typeof RS.cart == "undefined") { // if the sessions cart is undefined
        RS.cart = {}; // set cart to empty
    }
    if (typeof POST["product_type"] != "undefined") { // if "product_type" string is not undefined
        var product_type = POST["product_type"]; // set product_type variable to request the body of "product_type" string
        for (i = 0; i < products[product_type].length; i++) { // For loop that generates length of products by their product type by +1, (i=i+1 -> post increment: use the value of i first, then increment)
            q = POST[`quantity${i}`]; // assigns q variable to the quantity that is submitted by the user
            if (q > 0) { // if the quantity entered is more than zero
                hasPurchases = true; // then hasPurchases variable is now set at true, as the user has entered a valid quantity of at least 1
            }
            if (isNonNegInt(q) == false) { // if quantity entered fails isNonNegInt function
                isValidData = false; // then isValidData is now set at false, as the user probably entered invalid data (negative, not an integer, letters, etc)
            }

        }
    } // Received help from Professor Port's office hours
    var qString = queryString.stringify(POST); // creates qString variable to string the query together
    if (isValidData == true && hasPurchases == true) { // if the quantity is a valid integer and the quantity is valid for purchase + add the valid amount to cart
        RS.cart[product_type] = POST; // then request the body of sessions cart data by product type
        qString += "&addedToCart=true"; // add to qString a string in URL that identifies that something valid has been added to the cart (created & used to send alert that items have been added on page)
        console.log(RS.cart); // log the sessions cart into the console
    }
    response.redirect(`${request.headers["referer"]}?` + qString); // redirects to same page with same qString when items are added
});
//reference kydee


// direct lab 13 reference
function isNonNegInt(qty, returnErrors = false) {
    errors = []; // assume no errors at first
    if (qty == "") { qty = 0; }
    if (Number(qty) != qty) errors.push('Not a number!'); // Check if string is a number value
    if (qty < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(qty) != qty) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
}
app.use(express.static('./public')); // makes a static server using express from the public
app.listen(8080, () => console.log(`listen on port 8080`))