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