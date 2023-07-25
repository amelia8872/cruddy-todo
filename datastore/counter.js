const fs = require('fs'); // file system operations
const path = require('path'); // file path
const sprintf = require('sprintf-js').sprintf; // formatting numbers with leading zeros

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F


//  format a number with leading zeros, to ensure it has a minimum width of 5 digits
const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

// reading the counter value from file
const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData)); //  parses this content into a number using Number(fileData)
    }
  });
};

// write the updated counter value to the counter.txt file.
// callback is a function provided to handle the result of the asynchronous operation
const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  // read the current counter value from the file
  readCounter((err, currentCounter) => {
    if (err) {
      throw ('Error reading counter');
      callback(null, 0);
    }

    // Increment the counter by 1
    counter = currentCounter + 1;

    //Write the updated counter value to the file
    writeCounter (counter, (err, counterString) => {
      if (err) {
        throw ('error writing counter');
      }
      // return the zero-padded counter string
      callback(null, zeroPaddedNumber(counter));
    });
  });
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
