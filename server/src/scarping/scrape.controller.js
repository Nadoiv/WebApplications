const scrapeService = require('./scarpe.service')
var typeModel = require('../type/type.model');
var mongoose = require('mongoose');

class scrapeCtrl {
  async scrapeAndInsertToDb() {
    try {
      const collection = await mongoose.connection.db.listCollections({ name: 'types' }).next()
      if (collection) {
        console.log('Dropping types collection')
        await mongoose.connection.db.dropCollection('types')
      }
      console.log('Scrpaing types data from wikipedia')
      const typeTable = await scrapeService.scrapeCarModelsFromWikipedia()
      console.log('Saveign data to mongoDb')
      typeTable.forEach((row) => {
        new typeModel(row).save()
      })
      console.log('Done scraping proccess!')
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = new scrapeCtrl()