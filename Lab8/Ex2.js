var number = 0;     // Counter for age
var myAge = 20;     // My age


console.log("silly counting prrogram for Ex2, with break")
while (number < myAge) {
    number++;
    if ((number >= myAge/2) && (number <= myAge * 3/4)) { 
        continue;
    }
    console.log("Age=" + number);
}

 console.log("I'm out of here!");
