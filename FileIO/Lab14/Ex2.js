var fs = require('fs');

var filename = "user_data.json";

if (fs.existsSync(filename)) {
    fileStats = fs.statSync(filename);
    console.log("File " + filename + " has " + fileStats.size + " characters");
    raw_data = fs.readFileSync(filename, 'utf-8');
    //  console.log("Success! We got: " + raw_data);

    user_data = JSON.parse(raw_data);
    console.log("user_data=", user_data);
} else {
    console.log("Sorry, can't read file " + filename);
}