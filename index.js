const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db");
const routes = require("./routes/user_route");
const app = express();
const port = 4000;

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql Connected...");
});

app.use(bodyParser.json());
app.use("/api", routes);
app.listen(port, (err) => {
  console.log("server is running on port " + port);
});
