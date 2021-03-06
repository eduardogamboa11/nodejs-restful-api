var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Car = require('./Car');

// CREATES A NEW CAR
router.post('/', function (req, res) {
    Car.create({
            gear : req.body.gear,
            model : req.body.model,
            brand : req.body.brand
        }, 
        function (err, car) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(car);
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    Car.find({}, function (err, cars) {
        if (err) return res.status(500).send("There was a problem finding the cars.");
        res.status(200).send(cars);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    Car.findById(req.params.id, function (err, car) {
        if (err) return res.status(500).send("There was a problem finding the car.");
        if (!car) return res.status(404).send("No car found.");
        res.status(200).send(car);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Car.findByIdAndRemove(req.params.id, function (err, car) {
        if (err) return res.status(500).send("There was a problem deleting the car.");
        res.status(200).send("Car "+ car.model +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    Car.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, car) {
        if (err) return res.status(500).send("There was a problem updating the car.");
        res.status(200).send(car);
    });
});


module.exports = router;