var products = [
    //P1
    {
        "name": "Back Massage Chair",
        "time": "60 min",
        "price": 75.00,
        "image": "./images/backMassageA1.jpg"
    },
    //P2
    {
        "name": "Couples Massage",
        "time": "90 min",
        "price": 125.00,
        "image": "./images/couplesMassageA1.jpg"
    },
    //P3
    {
        "name": "Back Massage",
        "time": "60 min",
        "price": 125.00,
        "image": "./images/facialSpaA1.jpg"
    },
    //P4
    {
        "name": "Thai Stone Massage",
        "time": "70 min",
        "price": 75.00,
        "image": "./images/thaiStoneMassage.jpg"
    },
    //P5
    {
        "name": "Thai Foot Massage",
        "time": "60 min",
        "price": 65.00,
        "image": "./images/thaiFootMassageA1.jpg"
    },
    // all images included are findings from random google searches
    // array was used from Assign 1 page that said to reference SPP3
];

if (typeof module != 'undefined') {
    module.exports.products = products;
}