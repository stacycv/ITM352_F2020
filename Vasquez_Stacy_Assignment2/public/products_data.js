/*<!--
Stacy Vasquez's Assignment 2 products data page 12/1/2020
A1 - all images included are findings from random google searches, array was used from Assign 1 page that said to reference SPP3
A2 - copied Stacy Vasquez's A1
The purpose of the products data is to list the price, images and names of the products that the e-commerce site has avaliable for purchase
*/
var products = [
    //P1
    {
        "name": "Roller",
        "price": 75.00,
        "image": "./images/massageRollerA1.jpg"
    },
    //P2
    {
        "name": "Balms",
        "price": 125.00,
        "image": "./images/massageBalmsA1.jpg"
    },
    //P3
    {
        "name": "Candles",
        "price": 125.00,
        "image": "./images/massageCandle.jpg"
    },
    //P4
    {
        "name": "Oil",
        "price": 75.00,
        "image": "./images/massageOilA1.jpg"
    },
    //P5
    {
        "name": "Hot Stones",
        "price": 65.00,
        "image": "./images/massageStoneA1.jpg"
    },

];

if (typeof module != 'undefined') {
    module.exports.products = products;
}