var carService = require('./car.service');
var userService = require('../user/user.service')
var mongoose = require('mongoose');

class carCtrl {
  async getAll(req, res) {
    try {
      res.send(await carService.getAll())
    }
    catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
  }

  async filter(req, res) {
    try {
      const filter = req.body
      res.send(await carService.filter(filter))
    }
    catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
  }

  async delete(req, res) {
    try {
      res.send(await carService.delete(req.params.id))
    }
    catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  async add(req, res) {
    try {
      const car = req.body
      car.carAgent = await userService.add(car.carAgent)
      const newCar = await carService.add(car)
      res.send(await newCar.populate('carAgent').populate('type').execPopulate())
    }
    catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  async update(req, res) {
    try {
      const car = req.body;
      car.carAgent = await userService.update(car.carAgent)
      const updatedCar = await carService.update(car);
      res.send(await updatedCar.populate('carAgent').populate('type').execPopulate())
    }
    catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  async rented(req, res) {
    try {
      const car = req.body;
      car.isRented = true;
      res.send(await carService.update(car))
    }
    catch (err) {
      console.log(err)
      res.sendStatus(500);
    }
  }
}

module.exports = new carCtrl();
