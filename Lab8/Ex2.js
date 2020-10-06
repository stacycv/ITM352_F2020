var number = 0;     // Counter for age
var myAge = 20;     // My age


console.log("silly counting program for Ex2, with break")
while (number < myAge) {
    console.log("Age=" + number);
    number++;
    if (number > myAge/2 ) {   
        console.log("Don't ask me how old I am!");
        process.exit();
     } 
}
 console.log("I'm out of here!");
