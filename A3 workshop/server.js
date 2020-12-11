var express = require('express');
var app = express();


var cookieParser = require('cookie-parser');
app.use(cookieParser());

var products_data = require('./products.json'); //loading in products data--


app.post("/get_products_data", function(request, response) {
    response.json(products_data);
});

app.get("/login", function(request, response) {
    response.cookie('username', 'stacycv', { maxAge: 60 * 10000 }).send('cookie set'); //sets name
});

app.get("/logout", function(request, response) {
    username = request.cookies.username; //if you have a username cookie
    //refernece https://flaviocopes.com/express-cookies/ 
    response.clearCookie('username').send(`logged out! ${username}`);
});

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));