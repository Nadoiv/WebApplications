const userModel = require('../user/user.model');
const userService = require('../user/user.service');
const carModel = require('../car/car.model');
const typeModel = require('../type/type.model');
const statisticsModel = require('../statistics/statistics.model')
const statisticsService = require('../statistics/statistics.service')
const firstNames = require('./data-pool/names-first.json')
const surnames = require('./data-pool/names-surnames.json')
const countries = require('./data-pool/countries.min.json')
const browsers = require('./data-pool/browsers.json')
const deviceTypes = require('./data-pool/device-types.json')
const operationSystems = require('./data-pool/os.json')
const addresses = require('./data-pool/addresses.json')

class dataGeneratorService {
  constructor() {
  }

  clearData() {
    const promises = [];
    promises.push(carModel.deleteMany({}).exec())
    promises.push(userModel.deleteMany({}).exec())
    promises.push(statisticsModel.deleteOne({}).exec())
    return Promise.all(promises);
  }

  generateUsers(amount) {
    const promises = [];
    for (let index = 0; index < amount; index++) {
      var firstName = this.getRandomItemFromArray(firstNames.data);
      var surname = this.getRandomItemFromArray(surnames.data);
      var phoneNumber = this.getRandomItemFromArray(['050', '051', '052', '053', '054', '055', '058']) + (Math.floor(Math.random() * 9000000) + 1000000)
      var country = "Israel"
      var city = this.getRandomItemFromArray(Object.keys(addresses))
      var steert = this.getRandomItemFromArray(addresses[city])
      var number = Math.floor(Math.random() * 30)

      var newUser = {
        fullName: firstName + ' ' + surname,
        email: surname + '@gmail.com',
        phoneNumber: phoneNumber,
        address: {
          country: country,
          city: city,
          street: steert,
          number: number
        }
      }
      promises.push(userService.add(newUser));
    }

    return Promise.all(promises);
  }

  async generateCars(amount) {
    const userIds = await userModel.find({}).select('_id').exec();
    const types = await typeModel.find({}).select(['_id', 'Automobile', 'Image', 'Production']).exec();
    const promises = [];
    for (let index = 0; index < amount; index++) {
      const type = this.getRandomItemFromArray(types);
      const image = type.Image;
      const year = this.getRandomInt(+type.Production.substring(0, 4), 2021);
      const hand = year === 2020 ? 1 : this.getRandomInt(1, 5);
      const isRented = this.getRandomItemFromArray(['false', 'true']);
      const mileage = 10000 * 2020 - year;
      const carAgent = this.getRandomItemFromArray(userIds);

      const newCar = new carModel({
        hand: hand,
        manufactured: year,
        isRented: isRented,
        mileage: mileage,
        image: image,
        type: type._id,
        carAgent: carAgent
      });

      promises.push(newCar.save())

    }

    return promises;
  }

  async generateEntries(amount) {
    statisticsService.initSketch();
    var statistics = new statisticsModel({
      hitCount: 0,
      lastClient: {},
      countMinSketch: {}
    })

    await statistics.save()
    const promises = []
    for (let index = 0; index < amount; index++) {
      var country = this.getRandomItemFromArray(Object.keys(countries))
      var city = this.getRandomItemFromArray(countries[country])
      var browser = this.getRandomItemFromArray(browsers)
      var os = this.getRandomItemFromArray(operationSystems)
      var type = this.getRandomItemFromArray(deviceTypes)

      var client = {
        Country: country,
        City: city,
        Browser: browser,
        OS: os,
        Type: type
      }

      for (var prop in client) {
        statisticsService.updateCMS(client[prop])
      }

      promises.push(statisticsModel.findOneAndUpdate({}, {
        lastClient: client,
        $inc: { hitCount: 1 },
        countMinSketch: statisticsService.sketch
      }))
    }

    return Promise.all(promises)
  }

  getRandomItemFromArray(data) {
    return data[Math.floor(Math.random() * data.length)];
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

module.exports = new dataGeneratorService();