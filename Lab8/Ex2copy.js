var number = 0;     // Counter for age
var myAge = 20;     // My age


console.log("silly counting program for Ex2, with break")
while (number < myAge) {
    number++;
    if ((number >= myAge/2) && (number <= myAge * 3/4)) { 
        console.log(" ");
    }
    else {
    console.log("Age=" + number);
    }
}

 console.log("I'm out of here!");
