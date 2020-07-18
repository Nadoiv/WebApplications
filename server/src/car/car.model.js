var mongoose = require('mongoose');
var User = require('../user/user.model')
var ws = require('../ws');
var Type = require('../type/type.model')
const CarSchema = new mongoose.Schema(
  {
    type: {
      type: mongoose.Types.ObjectId, ref: Type
    },
    hand: Number,
    manufactured: Number,
    isRented: Boolean,
    image: String,
    mileage: Number,
    carAgent: {
      type: mongoose.Types.ObjectId, ref: User
    }
  }
)

CarSchema.post('findOneAndRemove', doc => {
  ws.broadcastDelete(doc);
})

CarSchema.post('save', async doc => {
  ws.broadcastAdd(await doc.populate('carAgent').populate('type').execPopulate());
})

CarSchema.post('findOneAndUpdate', async doc => {
  ws.broadcastUpdate(await doc.populate('carAgent').populate('type').execPopulate());
})


module.exports = mongoose.model('Car', CarSchema)