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
    // all images included are findings from random google searches
    // array was used from Assign 1 page that said to reference SPP3
];

if (typeof module != 'undefined') {
    module.exports.products = products;
}