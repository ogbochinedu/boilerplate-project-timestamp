// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



app.get("/api/:date?", (req, res) => {
  let date = req.params.date;
  let timestamp;
console.log(date);
  if (!date) {
    // If no date is provided, return the current timestamp
    timestamp = Date.now();
  } else if (!isNaN(date)) {
    // If the input is numeric, parse as a Unix timestamp (milliseconds)
    timestamp = parseInt(date);

    // Check if timestamp is in seconds and convert to milliseconds
    if (timestamp.toString().length === 10) {
      timestamp *= 1000; // Convert seconds to milliseconds
    }
  } else {
    // Try to parse input as a date string
    let parsedDate = Date.parse(date);

    if (isNaN(parsedDate)) {
      return res.json({ error: "Invalid Date" });
    }

    timestamp = parsedDate;
  }

  let utcDate = new Date(timestamp).toUTCString();
  res.json({ unix: timestamp, utc: utcDate });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
