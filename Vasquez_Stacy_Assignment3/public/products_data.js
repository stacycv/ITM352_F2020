/*<!--
Stacy Vasquez's Assignment 2 products data page 12/1/2020
A1 - all images included are findings from random google searches, array was used from Assign 1 page that said to reference SPP3
A2 - copied Stacy Vasquez's A1
A3 - made products arrays
The purpose of the products data is to list the price, images and names of the products that the e-commerce site has avaliable for purchase
*/
{
    var spring2020 = [{
            "name": "Bira Dress - Sand",
            "price": 518.00,
            "image": "./images/S20/S20biraDressSand518.jpg",
            "image2": "./images/S20/S20biraDressSand518-2.jpg"
        },
        {
            "name": "Krystle Top - Cream",
            "price": 298.00,
            "image": "./images/S20/S20krystleTopCream298.jpg",
            "image2": "./images/S20/S20krystleTopCream298-2.jpg"
        },
        {
            "name": "Rosa Top - Hibiscus",
            "price": 598.00,
            "image": "./images/S20/S20rosaTopHibiscus598.jpg",
            "image2": "./images/S20/S20rosaTopHibiscus598-2.jpg"
        },
        {
            "name": "Thera Dress - Amber",
            "price": 678.00,
            "image": "./images/S20/S20theraDressAmber678.jpg",
            "image2": "./images/S20/S20theraDressAmber678-2.jpg",
        }
    ]
    var summer2020 = [{
            "name": "Margot Dress - Pool",
            "price": 348.00,
            "image": "./images/Su20/Su20margotDressPool348.jpg",
            "image2": "./images/Su20/Su20margotDressPool348-2.jpg"
        },
        {
            "name": "Tiana Dress - Magnolia",
            "price": 418.00,
            "image": "./images/Su20/Su20tianaDressMagnolia418.jpg",
            "image2": "./images/Su20/Su20tianaDressMagnolia418-2.jpg"
        },
        {
            "name": "Naomi Dress - Aquamarine",
            "price": 198.00,
            "image": "./images/Su20/Su20naomiDressAquamarine198.jpg",
            "image2": "./images/Su20/Su20naomiDressAquamarine198-2.jpg"
        },
        {
            "name": "Serita Dress - Off White",
            "price": 458.00,
            "image": "./images/Su20/Su20seritaDressOffWhite458.jpg",
            "image2": "./images/Su20/Su20seritaDressOffWhite458-2.jpg"
        }
    ]
    var fall2020 = [{
            "name": "Cleo Pant - Ash",
            "price": 368.00,
            "image": "./images/F20/F20cleoPantAsh368.jpg",
            "image2": "./images/F20/F20cleoPantAsh368-2.jpg"
        },
        {
            "name": "Emi Dress - Off White",
            "price": 1988.00,
            "image": "./images/F20/F20emiDressOffWhite1988.jpg",
            "image2": "./images/F20/F20emiDressOffWhite1988-2.jpg"
        },
        {
            "name": "Nyx Coat - Ash",
            "price": 698.00,
            "image": "./images/F20/F20nyxCoatAsh698.jpg",
            "image2": "./images/F20/F20nyxCoatAsh698-2.jpg"
        },
        {
            "name": "Stacie Pant - Black",
            "price": 298.00,
            "image": "./images/F20/F20staciePantBlack298.jpg",
            "image2": "./images/F20/F20staciePantBlack298-2.jpg"
        }
    ]
    var resort2021 = [{
            "name": "Antonella Knit Dress - Wild Rose",
            "price": 328.00,
            "image": "./images/R21/R21antonellaKnitDressWildRose328.jpg",
            "image2": "./images/R21/R21antonellaKnitDressWildRose328-2.jpg"
        },
        {
            "name": "Hanna Top - Light Camel",
            "price": 358.00,
            "image": "./images/R21/R21hannaTopLightCamel358.jpg",
            "image2": "./images/R21/R21hannaTopLightCamel358-2.jpg"
        },
        {
            "name": "Kersti Pant - Sapphire",
            "price": 298.00,
            "image": "./images/R21/R21kerstiPantSapphire298.jpg",
            "image2": "./images/R21/R21kerstiPantSapphire298-2.jpg"
        },
        {
            "name": "Yara Knit Dress - Amber",
            "price": 318.00,
            "image": "./images/R21/R21yaraKnitDressAmber318.jpg",
            "image2": "./images/R21/R21yaraKnitDressAmber318-2.jpg"
        }
    ]
}
var products = {
    "spring2020": spring2020,
    "summer2020": summer2020,
    "fall2020": fall2020,
    "resort2021": resort2021
}




if (typeof module != 'undefined') { //if the type of the module is defined
    module.exports.products = products; //export the product_data
}