// Sum the numbers u to a specified integer
// Date: September 30, 2020
// Author: Stacy Vasquez

var target = 5;     // limit of sum of numbers
var counter = 1;    // Counter for the loop
var sum =0;         // Total of the numberrs added together

console.log(`Welcome to counting program!`)
while (counter <= target) {
    sum += counter;     // sum = sum + counter
    console.log(`Sum=${sum}`);
    counter++;
}
console.log (`Final Sum=${sum}`);

sum = 0;
console.log('Second try with For loop')
for (counter=5; counter > 0; counter=counter-2) {
    sum += counter;     // sum = sum + counter
    console.log(`Sum=${sum}`);
}
console.log (`Final Sum=${sum}`);