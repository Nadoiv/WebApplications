var typeModel = require('./type.model');

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
    const aggregateQuery = [];
    let matchQuery = {};
    matchQuery.Production = { $gte: filter.production }
    matchQuery.Automobile = { $regex: filter.type , $options : 'i'}
    
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