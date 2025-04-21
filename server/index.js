"use strict";

// Basic express setup:
const express       = require("express");
const app           = express();
const PORT          = 8080;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// The in-memory database of tweets. It's a basic object with an array in it.
let db = require("./lib/in-memory-db");

// Update the dates for the initial tweets.
db = require("./lib/date-adjust")(db);

// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:
const DataHelpers = require("./lib/data-helpers.js")(db);

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.
const tweetsRoutes = require("./routes/tweets")(DataHelpers);

// Mount the tweets routes at the "/tweets" path prefix:
app.use("/api/tweets", tweetsRoutes);

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
