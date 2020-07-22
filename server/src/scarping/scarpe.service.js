const cheerio = require('cheerio')
const requestPromise = require('request-promise')

class scrapeService {
  async scrapeCarModelsFromWikipedia() {
    const html = await requestPromise('https://en.wikipedia.org/wiki/List_of_automobile_sales_by_model')
    const $ = cheerio.load(html)
    var titles = []
    var cars = []

    $('#mw-content-text > div > table:nth-child(12) > tbody > tr:nth-child(1) th').each((i, el) => {
      titles.push($(el).text().replace('\n', ''));
      console.log($(el).text().replace('\n', ''));
    })

    $('table.wikitable').find('tr').each((i, el) => {
      var rows = {};

      $(el).children('td').each((i, el) => {
        var text = $(el).text()

        if (titles[i] === 'Image') {
          text = $(el).find('img').attr('src') || ''
          rows[titles[i]] = text;
        } else {
          rows[titles[i + 1]] = text;
        }

      });

      $(el).children('th').each((i, el) => {
        rows['Automobile'] = $(el).text();
      });

      if (!(Object.entries(rows).length === 0 && rows.constructor === Object)) {
        cars.push(rows);
        cars = cars.filter(row => row['Image'] && row['Production'].includes('–present'));
      }
    });

    console.log(cars);
    console.log(cars.length);
    return cars.map(car => {
      return {
        Automobile: car.Automobile,
        Image: car.Image,
        Production: car.Production.substring(0, 4)
      };
    });
  }
}

module.exports = new scrapeService()
