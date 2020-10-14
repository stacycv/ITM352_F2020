var cars = ["Saab", "Volvo", "BMW"];
var carsSize = cars.length;    // length returns the # of elementsvar sortedCars = cars.sort(); // sort() method sorts arrays
var first = cars[0]; 	   // What is the value of first?
var last = cars[cars.length - 1]; // What is the value of last? Why length – 1?
var datatype = typeof cars; // What data type is this?

--

var fruits = ["Banana", "Orange", "Apple", "Mango"];

//To add a new element to the end (append): 
fruits.push("Lemon");  // same as fruits[fruits.length] = "Lemon";   

//To remove the last element:
fruits.pop(); // fruits[fruits.length] = undefined or null only replaces the value, delete fruits[fruits.length] leaves a “hole”

//More generally you can use splice() to add/remove any amount in any place:
fruits.splice(fruits.length, 0, "Lemon"); // push
fruits.splice(fruits.length-1, 1); // pop

--

//For Arrays, Strings, and some other special objects with iterators you can use for/of:
var fruits = ["Banana", "Orange", "Apple", "Mango"];
    for(f of fruits)
        { console.log(f); } 
// Since fruits is an array, the above is the same as
    for(i in fruits) 
        { console.log(fruits[i]); }

--

//MIXING OBJECT AND ARRAYS
var people = [ 	
    {'name': 'Dan', 'major': 'MIS'},
    {'name': 'Rick', 'major': 'ICS'},
    {'name': 'Jane', 'major': 'FIN'}
        ];
for(person of people) {
    console.log(`${person.name} is a ${person.major} major.`);
 -OR-

 var myNetwork = { 	
    'friends': ["Dan", "rick"],
    'co-workers': ["Sally", "Joe"]
};

for(relationship in myNetwork) {
    console.log(`${relationship} are ${myNetwork[relationship].join(',')}`);
    }
