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

// Edit Contact Router
router.put("/edit/:id", urlEncodedMid, function (req, res) {
    var authorizedUser = lodash.filter(users, function (user) {
        return user.authorization == req.headers.authorization
    });

    if (authorizedUser.length == 0)
        res.json("Not Authorized User");

    lodash.filter(contacts, function (contact) {
        if (contact.id == req.params.id) {
            if (req.body.name)
                contact.name = req.body.name;

            if (req.body.email)
                contact.email = req.body.email;

            if (req.body.phones)
                contactphones = JSON.stringify(req.body.phones);
        }
    });
    res.json(contacts);
});

// Delete Contact Router
router.delete("/delete/:id", urlEncodedMid, function (req, res) {
    var authorizedUser = lodash.filter(users, function (user) {
        return user.authorization == req.headers.authorization
    });

    if (authorizedUser.length == 0)
        res.json("Not Authorized User");

    lodash.remove(contacts, function (contact) {
        return contact.id == req.params.id
    });

    res.json(contacts);
});

// Get all contacts
router.get("/list", urlEncodedMid, function (req, res) {
    var authorizedUser = lodash.filter(users, function (user) {
        return user.authorization == req.headers.authorization
    });

    if (authorizedUser.length == 0)
        res.json("Not Authorized User");

    res.json(contacts);
});



module.exports = router;
