var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var scrapeCtrl = require('./scarping/scrape.controller')
var dataGeneratorService = require('./data-generator/dataGenerator.service')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect("mongodb://127.0.0.1/test", { useNewUrlParser: true })
  .then(async () => {
    console.log('Mongo connection successful');

    await scrapeCtrl.scrapeAndInsertToDb();
    console.log('starting generate process...');

    await dataGeneratorService.clearData();
    console.log('data cleared');

    await dataGeneratorService.generateUsers(5);
    console.log('users generated');

    await dataGeneratorService.generateCars(30);
    console.log('cars generated');

    await dataGeneratorService.generateEntries(5);
    console.log('entries generated');

    console.log('done generating!');
  })
  .catch((err) => {
    console.log(err);
    console.log('Mongo connection error');
  });

app.use('/', indexRouter);


app.listen(3000, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`server is running on port 3000`);
})
module.exports = app;
