// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
app.get("/api/:DateString", function (req, res) {
  var fullDate = req.params.DateString.split("-");
  console.log(fullDate);
  var returnDate;
  if (fullDate.length == 1) {
    returnDate = new Date(Number(req.params.DateString));
  } else {
    returnDate = new Date(
      Number(fullDate[0]),
      Number(fullDate[1] - 1),
      Number(fullDate[2])
    );
    //var utcString = returnDate.getUTCDay()
  }
  console.log(returnDate);
  res.json({ unix: returnDate.getTime(), utc: returnDate.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
