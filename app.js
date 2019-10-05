var express = require("express");
var server = express();

server.use(function (req, resp, next) {
  resp.header("Access-Control-Allow-Origin", "*");
  resp.header("Access-Control-Allow-Headers", "Content-Type");
  resp.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});

var contactRouter = require("./controllers/contacts");
server.use("/contacts", contactRouter);

server.listen(3000, function () {
  console.log("Starting listen on port 3000...");
});
