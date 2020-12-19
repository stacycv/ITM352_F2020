/*
Stacy Vasquez's Assignment 2 server 12/18/2020
A1 - referenced from multiple individuals in class, assign 1 screencast, lab 13, and used ricks recommendation when looking over
A2 - copied Stacy Vasquez's A1, referenced Sharon Diep for console logs, edited to fix for feedback on A2
A3 - fixed login errors, referenced from WW3 school, Flavoscopes, A3 examples, workshop, Kylie Dee, Sharon Diep, and Melanie Yang
The purpose of the server is to connect and process the information throughout my e-commerce website Cult Gaia
*/
var data = require('./public/products_data.js'); //must have data from product_data.js
var products = data.products; //defining product within data
const queryString = require('query-string'); // so it'll load querystring
var filename = './user_data.json'; // A2 new
var fs = require('fs'); //Loading file system
var express = require('express'); //server requires express to run
var app = express(); // run the express function and start express
var myParser = require("body-parser");
var quantity_str; // A3 new

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
    var the_username = POST.username; // sets login_username to whatever username was entered on page
    quantityQuery_str = queryString.stringify(quantity_str); //strings query together
    the_username = POST.username.toLowerCase(); //making username case insensititve
    if (typeof users_reg_data[the_username] != 'undefined') { //ask the object if it has matching username or leaving it as undefined
        if (users_reg_data[the_username].password == POST.password) {
            RQ.username = the_username;
            console.log(users_reg_data[RQ.username].username);
            RQ.username = users_reg_data[RQ.username].username
            session.username = the_username //making universal refernce  so the_username will be the sessions username stored w cookie
            var theDate = new Date(); //date stated everytime logged in
            response.send(` <!--send user a UI personalized message that they are logged in with date/time they logged in + links that lead the user back to shopping or back to cart-->
      <link rel="stylesheet" href="./products_style.css"> 
      <h2>Hi <font color="red">${users_reg_data[the_username].name}</font>! You are now logged in as of ${theDate} <br><br>- Click <a href="./collection_display.html?">here</a> to continue shopping<br>- Click <a href="./display_cart">here</a> to go back to cart</h2>
      `)
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

//moved login page here so the cookie with be included
app.get("/process_login", function(request, response) { //created to display login page
    console.log(request.query); // print out quantity string
    if (typeof request.cookies['username'] != 'undefined') {
        str = `Welcome ${request.cookies['name']}!`
    } else {
        quantity_str = request.query;
        str = `
  <body>
  <link rel="stylesheet" href="./products_style.css"> 
      <form action="/process_login" method="POST">`

        if (session.username != undefined) { // if sessions username is not undefined, send a UI personalized user message that lets them know their login was successful, the time & date they logged in, and tells them to go back to shop (if login link in navbar is clicked again after successfully logging in, this message will help prevent them from logging in more than once )
            str += `<br><br><h1>Hello ${session.username}! You are already logged in<br><p style="color:red"> Please Go Back to Shop</p><br> If you would like to logout, please click <a href="./logout">here</a><br><br><h1>_______________________________________</h1> `
        } else {

            str += `    <title>Login Page</title>
        <h1>
            <meta charset="utf-8">
            <title>CULT GAIA</title>
            CULT GAIA
        </h1>
        <style>
            header {
                text-align: center;
                margin-bottom: 30px;
            }
            
            body {
                font-family: 'Stan', serif;
                background-color: rgb(234, 247, 255);
                background-position: cover;
                color: black;
                font-size: 20px;
                text-align: center;
            }
            
            form {
                text-align: center;
            }
            /* referenced from w3schools*/
            
            input[type=text],
            input[type=password],
            input[type=email] {
                text-align: center;
                font-size: 15px;
                width: 60%;
                padding: 10px 20px;
                margin: 8px 0;
                box-sizing: border-box;
            }
        </style>
    </head>
    
    <body>
        <style>
            ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
                overflow: hidden;
                background-color: beige;
                position: -webkit-sticky;
                /* Safari */
                position: sticky;
                top: 0;
            }
            
            li {
                float: left;
            }
            
            li a {
                display: block;
                color: darkgray;
                text-align: center;
                padding: 14px 16px;
                text-decoration: none;
            }
            
            li a:hover {
                background-color: bisque;
            }
            
            .active {
                background-color: beige;
            }
        </style>
        </div>
    
        <ul>
    
            <li><a href="index.html">HOME</a></li>
            <li><a class="active" href="collection_display.html">SHOP BY COLLECTION</a></li>
            <li>
                <a href="/process_registration">REGISTER</a>
            </li>
            <li><a href="/process_login">LOGIN</a></li>
        </ul>
        </div>
        <br>
        <p>To continue to purchase page<br> please login or register!</p>
        <form name="login" action="process_login" method="POST">
            <div class="login">
                <div class="username">
                    <input type="text" placeholder="Username" minlength="4" maxlength="30" name="username" required>
                </div>
    
                <div class="password">
                    <input type="password" placeholder="Password" id="password" minlength="6" maxlength="30" name="password" required>
                </div>
            </div>
    
            </div>
    
            <button class="login-btn" type="submit" name="submitLogin">Login</button>
    
        </form>
        <script>
            login.action += document.location.search; //keeping og data included like another stringify
        </script>
    </body>
    
    
    <h2> or create an account here! </h2>
    
    <body>
    
        <input type="button" name="signUp" value="Click here to register!" onclick="window.location='./process_registration' + document.location.search;">
    
    
    
    </body>
      `;
        }
        response.send(str);
    }
});


//refernece https://flaviocopes.com/express-cookies/ with the help of Dport A3 workshop
app.get("/logout", function(request, response) {
    username = request.cookies['username']; //if you have a username cookie ** workshop comments

    str = ` <h1>
    <meta charset="utf-8">
    <title>CULT GAIA</title>
    CULT GAIA
</h1><br><br><h1>Thank you for shopping with us <font color="red">${username}!</font> You've successfully been logged out<h1>
  <body>
  <link rel="stylesheet" href="./products_style.css"> 
  <br>
  Click <a href="./">here</a> to go back to home page`
    response.clearCookie('username').send(str); //thanks the user personally and also gives directory to home page
});

//moved into server so that it could read with session
app.get("/process_registration", function(request, response) { // created to generate registration page
    // Give a simple register form
    str = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Registration Page</title>
    <h1>
        <meta charset="utf-8">
        <title>CULT GAIA</title>
        CULT GAIA
    </h1>
    <style>
        header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        body {
            font-family: 'Stan', serif;
            background-color: rgb(234, 247, 255);
            background-position: cover;
            color: black;
            font-size: 20px;
            text-align: center;
        }
        
        form {
            text-align: center;
        }
        /* referenced from w3schools*/
        
        input[type=text],
        input[type=password],
        input[type=email] {
            text-align: center;
            font-size: 15px;
            width: 60%;
            padding: 10px 20px;
            margin: 8px 0;
            box-sizing: border-box;
        }
    </style>
</head>

<body>
    <style>
        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: beige;
            position: -webkit-sticky;
            /* Safari */
            position: sticky;
            top: 0;
        }
        
        li {
            float: left;
        }
        
        li a {
            display: block;
            color: darkgray;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
        }
        
        li a:hover {
            background-color: bisque;
        }
        
        .active {
            background-color: beige;
        }
    </style>
    </div>
    <link href="products_style.css" rel="stylesheet">
    <ul>
    <li><a href="index.html">HOME</a></li>
    <li><a href="/collection_display.html?">SHOP BY COLLECTION</a></li>
    <li><a href="/process_registration">REGISTER</a></li>
    <li><a href="/process_login">LOGIN</a></li>
    </ul>
    <br>
    </div>
    <br>
    <header>
        Join the cult
    </header>
    <div>
        <script>
            registration.action += document.location.search;
            //NEW CODE BEING ADDED REFERENCED FROM ALVIN-->

            function validate() { //function validate their passwords upon submission
                let password = document.getElementById("password").value; //setting variables
                let repeat_password = document.getElementById("repeat_password").value; //setting variables
                if (password == repeat_password) //if passwords match
                    document.getElementbyID("registration").submit(); //process registration POST
                else { //if they do not match
                    alert("Passwords do not match!"); //send an alert that they dont match
                }
            }

            //END OF NEW CODE REFERENCED FROM ALVIN-->
        </script>
        <form action="/process_registration" method="POST" class="form" name="registration">
            <!-- sets the action and method-->

            <div class="registration">
                <div class="name">
                    <input type="text" placeholder="First & Last Name" minlength="4" maxlength="30" name="name" required />
                </div>
                <div class="username">
                    <input type="text" placeholder="Username" minlength="8" maxlength="20" name="username" required />
                </div>

                <div class="email">
                    <input type="email" placeholder="Email" minlength="4" name="email" required />
                </div>
                <div class="password">
                    <input type="password" placeholder="Password" id="password" minlength="8" name="password" required />
                </div>
                <div class="repeat_password">
                    <input type="password" placeholder="Re-enter Password" id="repeat_password" minlength="8" name="repeat_password" required />
                </div>
            </div>
            <button <input type="submit" id="submit" onclick="validate()">Sign me up!
              </button>
        </form>
        <script>
            registration.action += document.location.search;
        </script>
    </div>
</body>
`;
    response.send(str);
});
app.post("/process_registration", function(request, response) {
    POST = request.body; //easier and faster to write, plus matches throughout the server
    RQ = request.query; //easier and fast to write, plus matches throughout the server
    console.log(POST); //logging the requested body
    var errors = []; //to reference errors
    // errors below will tell the console what is invalid. The user will see it up front via process_registration
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
        response.redirect('/process_registration?' + queryString.stringify(POST)) //reloading page instead of heading to invoice

    }
    // if no errors go to invoice 
    // reference from lab 15
    if (errors.length == 0) {
        console.log('No errors found. Valid log-in');
        var fullname = POST["fullname"];
        users_reg_data[fullname] = {}; // saving fullname as array name
        users_reg_data[fullname].username = POST["name"];
        users_reg_data[fullname].password = POST['password'];
        users_reg_data[fullname].email = POST['email'];
        data = JSON.stringify(users_reg_data); // making varible 
        fs.writeFileSync(filename, data, "utf-8"); // adding to JSON
        quantityQuery_str = queryString.stringify(quantity_str);
        response.send(`
        <link rel="stylesheet" href="./products_style.css"> 
        <h2>Hi <font color="red">${fullname}</font>! Thank you for registering<br><br> Click <a href="./process_login">here</a> to log into your new account`);
        response.redirect('./invoice'); // redirects user to their cart upon successful registration, requiring them to log in with new account info to gain access to purchase items in their cart

    }
    // reloading page if errors
    if (errors.length > 0) { // if errors then
        console.log(errors) //send information
        RQ.name = POST.name;
        RQ.username = POST.username;
        RQ.password = POST.password;
        RQ.repeat_password = POST.repeat_password;
        RQ.email = POST.email;
        RQ.errors = errors.join(' ; '); //if multiple errors, list them next to eachother
        response.redirect('/process_registration?' + queryString.stringify(POST)) //keep reloading page until corrected

    } else {
        response.end(JSON.stringify(errs)); // everything else, stringify errs
        console.log(errs) // log errs into the console
    }
}); // added registration



app.get("/display_cart", function(request, response, next) { //created to display items in the shopping cart
    console.log(request.session.cart); //log the session cart data into the console
    var str = "";
    //mod button functions referenced from sharon diep 
    function addItem(theProduct, theIndex) { //function to increase that row's tour amount by 1
        var this_product_quantity = parseInt(request.session.setItem(`${theProduct}${theIndex}`)); //parse it
        this_product_quantity += 1; //add 1 to number
        request.session.setItem(`${theProduct}${theIndex}`, this_product_quantity);
        window.location.reload(); //reload page to show changes in cart
    };

    function removeItem(theProduct, theIndex) { //function to increase that row's tour amount by 1
        var this_product_quantity = parseInt(equest.session.setItem(`${theProduct}${theIndex}`)); //parse it
        if (this_product_quantity > 0) { //if it is greater than 0, enable subtract to avoid neg values
            this_product_quantity -= 1; //subtract 1
            request.session.setItem(`${theProduct}${theIndex}`, this_product_quantity); //add new value to session
            window.location.reload(); //reload page to show changes
        }
    };
    str += `
    <header>
    <h1>
    <meta charset="utf-8">
    <title>CULT GAIA</title>
    <link href="products_style.css" rel="stylesheet"> CULT GAIA <br> <h2> ----- Cart ----- </h2>
</h1>
<ul>
    <li><a href="index.html">HOME</a></li>
    <li><a class="active" href="collection_display.html">SHOP BY COLLECTION</a></li>
    <li>
        <a href="/process_registration">REGISTER</a>
    </li>
    <li><a href="/process_login">LOGIN</a></li>
</ul>
<br>
  <br>
  
  </header>`

    if (session.username != undefined) { // if user has logged in it will display on the cart saying so 
        str += `<h3> <p style="color:red">Welcome ${session.username}! You are currently logged in. </p></h3> <!--UI message for user if they are logged in-->`
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
    
  <br>
      <div class="shop-item">
      <!--List the product names-->
              <h4><span class="shop-item-title">${products[product_type][i]["name"]}</span>
              <hr class="space" />
              <!--Show the images of each product-->
              <div class="enlarge">
                  <img class="shop-item-image" src=${products[product_type][i]["image"]}>
              </div>
              <!--Show the quantity of each product-->
              <hr class="space" />
              <label id="quantity${i}_label" class="shop-item-quantity">Quantity: ${q}</label>
              <div align="right" width="43%"><button <input type="modify" value="Modify Quantity" onclick="addItem()"> Modify Quantity
              </button> <button <input type="remove" value="Remove" onclick="removeItem()" >Remove
              </button></div>
              
                       
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
    <h2> <font color="black">
    <div class="shop-item-description">Subtotal: $${subtotal.toFixed(2)}</div>
    <div class="shop-item-description">Shipping: $${shipping.toFixed(2)}</div>
    <div class="shop-item-description">Tax: $${tax.toFixed(2)}</div>
    <div class="shop-item-description">Grandtotal: $${grand_total.toFixed(2)}</div></font></h2>
  
    <input type="submit" value="Checkout Cart!" name="submit_cart">
  </footer>
  </form>`
    if (grand_total == 0) {
        response.send(`
    <link rel="stylesheet" href="./products_style.css"> 
    <h2>Your cart is empty <br><br>Please go <a href="./collection_display.html?">back</a> and add items to view your cart</h2>`);
    }

    response.send(str);
});

app.post("/display_cart", function(request, response) { // posts data from the display_cart form, with action named "display_cart"
    if (typeof session.username != "undefined") {
        response.redirect('./invoice'); //changed
    } else {
        response.redirect('./process_login'); //changed

    }
});

app.get("/invoice", function(request, response, next) { //created to generate invoice page
    console.log(request.session.cart); //log the session cart data into the console
    var str = "";
    str += `
    
    <header>
    <link href="invoice_style.css" rel="stylesheet"> <h1>CULT GAIA</h1><h2> ----- Invoice ----- </h2>
  
  </header>`
    if (session.username != undefined) { // if session username is not undefined
        str += `<h2><p style="color:red">Thank you for your purchase ${session.username}! </p></h2>` // generate UI thank you message for user if they are logged in

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
          <td width="43%">${products[product_type][i]["name"]}</td> 
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
    <link rel="stylesheet" href="./invoice_style.css"> 
    <h2>No invoice was generated <br>Please go <a href="./">back</a>, add items to your cart, log into your account, & submit purchase to receive invoice</h2>`);
        } else {

            //sends an email to the users' email, retrieved from https://www.w3schools.com/nodejs/nodejs_email.asp and A3 examples
            var userInfo = users_reg_data[session.username]; //connecting session to userdata
            var nodemailer = require('nodemailer'); //needed

            var transporter = nodemailer.createTransport({ //create the transporter variable
                host: 'mail.hawaii.edu', //note on itmvm webserver have to use the mail from hawaii.edu
                port: 25,
                secure: false, //use tls
                tls: {
                    //do not fail on invalid certs
                    rejectUnauthorized: false
                }
            });

            var mailOptions = {
                from: 'cultgaia101@gmail.com', //made email for cult gaia
                to: userInfo['email'], //find user's email in array and send to them
                subject: ('Confirmation Order ' + `${userInfo['username']}` + ' - CULT GAIA'),
                text: 'Thank you for your order. Please shop with us again!',
                html: str, //string returns as html
            };

            transporter.sendMail(mailOptions, function(error, info) { // consoling a confirmation if the email was sent
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            str += `<h2>Thank you for your order!<br>Your invoice was sent to ${userInfo['email']}</h2> <br><br>
            Click here to <a href="./logout">logout`
            request.session.destroy(); // after invoice is sent, customer session is destroyed and cart is cleared but still lets them log out to feel like a real store
            session.username = undefined; // session username becomes undefined, clearing UI messages

            response.send();
        }
    }
});

app.post("/process_form", function(request, response) { // posts data from the process form, with action named process_form
    POST = request.body;
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
    } //reference kylie dee
    var qString = queryString.stringify(POST); // creates qString variable to string the query together
    if (isValidData == true && hasPurchases == true) { // if the quantity is a valid integer and the quantity is valid for purchase + add the valid amount to cart
        RS.cart[product_type] = POST; // then request the body of sessions cart data by product type
        qString += "&addedToCart=true"; // add to qString a string in URL that identifies that something valid has been added to the cart
        console.log(RS.cart); // log the sessions cart into the console
    }
    response.redirect(`${request.headers["referer"]}?` + qString); // redirects to same page with same qString when items are added
});



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