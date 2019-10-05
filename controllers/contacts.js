var express = require("express");
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({ extended: true });
var router = express.Router();
var uuid = require('uuid/v4')
var validator = require('validator');
var lodash = require('lodash');
var contacts = require("../data/contacts");
var users = require("../data/users");

// Add Contact Router
router.post("/add", urlEncodedMid, function (req, res) {
    var authorizedUser = lodash.filter(users, function (user) {
        return user.authorization == req.headers.authorization
    });

    if (authorizedUser.length == 0)
        res.json("Not Authorized User");

    if (validator.isEmail(req.body.email) && validator.isAlpha(req.body.name)) {
        var contact = {
            id: uuid(),
            name: req.body.name,
            email: req.body.email,
            phones: JSON.stringify(req.body.phones),
            userId: authorizedUser[0].userId
        }
        contacts.push(contact);
        res.json(contacts);
    }
});

module.exports = router;
