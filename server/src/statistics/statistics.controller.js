const statisticsService = require('./statistics.service')
const carService = require('../car/car.service')

class statisticsCtrl {
  async getLastClient(req, res) {
    try {
      res.send(await statisticsService.getLastClient())
    }
    catch (error) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async getHitCount(req, res) {
    try {
      res.send(await statisticsService.getHitCount())
    }
    catch (error) {
      console.error(err);
      res.sendStatus(500);
    }

  }

  getNumberOfConnectedClients(req, res) {
    try {
      const numberOfConnectedClients = statisticsService.getNumberOfConnectedClients();
      res.send({ numberOfConnectedClients })
    }
    catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  async getStatisticsData(req, res) {
    try {
      const lastClient = await statisticsService.getLastClient();
      const numberOfConnectedClients = statisticsService.getNumberOfConnectedClients();
      const { hitCount } = await statisticsService.getHitCount();
      const groupBy = [
        {
          field: 'Mileage',
          data: await carService.groupBy('mileage')
        },
        {
          field: 'Model',
          data: await carService.groupBy('type')
        },
        {
          field: 'Hand',
          data: await carService.groupBy('hand')
        },
        {
          field: 'Avarage Mileage by Hand',
          map: 'Hand',
          reduce: 'Mileage',
          data: (await carService.mapReduceHandType()).results
        }
      ]

      res.send({ lastClient, numberOfConnectedClients, hitCount, groupBy });
    }
    catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
}

module.exports = new statisticsCtrl();