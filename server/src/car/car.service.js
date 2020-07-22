var carModel = require('./car.model');
var mongoose = require('mongoose');

class carService {
  getAll() {
    return carModel.find({ isRented: false }).populate('carAgent').populate('type').exec();
  }

  filter(filter) {
    const aggregateQuery = [];
    const matchQuery = {};

    matchQuery.isRented = false;

    if (filter.hands && filter.hands.length > 0) {
      matchQuery.hand = { $in: filter.hands }
    }

    if (filter.types && filter.types.length > 0) {
      matchQuery.type = { $in: filter.types.map(it => new mongoose.Types.ObjectId(it)) }
    }

    matchQuery.manufactured = { $gte: filter.manufactured }

    aggregateQuery.push({ $match: matchQuery })
    aggregateQuery.push({
      $lookup: {
        from: 'users',
        localField: 'carAgent',
        foreignField: '_id',
        as: 'carAgent'
      }
    })
    aggregateQuery.push({
      $lookup: {
        from: 'types',
        localField: 'type',
        foreignField: '_id',
        as: 'type'
      }
    })

    return carModel.aggregate(aggregateQuery).exec()
  }

  delete(id) {
    return carModel.findByIdAndRemove(id).populate('carAgent').populate('type').exec();
  }

  add(car) {
    const newCar = new carModel(car);
    return newCar.save();
  }

  update(car) {
    return carModel.findByIdAndUpdate(car._id, car, { new: true }).exec();
  }

  groupBy(field) {
    const aggregateQuery = [];
    aggregateQuery.push({
      $match: {
        isRented: true
      }
    })

    aggregateQuery.push(
      {
        $group: {
          _id: '$' + field,
          count: { $sum: 1 }
        }
      })

    aggregateQuery.push({
      $sort: {
        _id: 1
      }
    })

    aggregateQuery.push({
      $limit : 6
    })    

    if (field === "type") {
      aggregateQuery.push({
        $lookup: {
          from: 'types',
          localField: '_id',
          foreignField: '_id',
          as: 'type'
        }
      })
    }
    return carModel.aggregate(aggregateQuery).exec();

  }

  mapReduceHandType() {
    var o = {};
    o.map = function () {
      emit(this.hand, this.mileage)
    }

    o.reduce = function (k, values) {
      return values.reduce((a,b) => a+b) / values.length;
    }

    o.query = {
      isRented: true
    }

    return carModel.mapReduce(o)
  }
}

module.exports = new carService();