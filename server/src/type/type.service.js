var typeModel = require('./type.model');
var AhoCorasick = require('ahocorasick');

class typeService {
  constructor() {
    (async () => {
      const res = await typeModel.find({}).exec();
      this.originsAho = new AhoCorasick(res.map(it => it.Origin))
      this.typeAho = new AhoCorasick(res.map(it => it.type))
    })()
  }

  getAll() {
    return typeModel.find({}).sort({ type: 1 }).exec()
  }

  filter(filter) {
    const { origins } = filter;
    const aggregateQuery = [];
    let matchQuery = {};
    if (origins.length > 0) {
      matchQuery.Origin = { $in: origins }
    }

    if (filter.search) {
      let originResult = this.originsAho.search(filter.search);
      let typeResult = this.typeAho.search(filter.search);

      matchQuery.$or = [{ type: { $in: [].concat.apply([], typeResult.map(it => it[1])) } }, { Origin: { $in: [].concat.apply([], originResult.map(it => it[1])) } }]
    }

    aggregateQuery.push({ $match: matchQuery })
    return typeModel.aggregate(aggregateQuery).exec();
  }

  delete(id) {
    return typeModel.findByIdAndRemove(id).exec();
  }

  add(type) {
    const newtype = new typeModel(type);
    return newtype.save();
  }

  update(type) {
    return typeModel.findByIdAndUpdate(type._id, type, { new: true }).exec();
  }

}

module.exports = new typeService()