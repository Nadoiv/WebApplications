var typeService = require('./type.service')

class typeCtrl {
  async getAll(req, res) {
    try {
      res.send(await typeService.getAll())
    }
    catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
  }

  async filter(req, res) {
    const filter = req.body;

    try {
      res.send(await typeService.filter(filter))
    }
    catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  async update(req, res) {
    try {
      const type = req.body;
      res.send(await typeService.update(type))
    }
    catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  async delete(req, res) {
    try {
      res.send(await typeService.delete(req.params.id))
    }
    catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  async add(req, res) {
    try {
      const type = req.body
      res.send(await typeService.add(type))
    }
    catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
}

module.exports = new typeCtrl()