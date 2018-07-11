const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RatesSchema = new Schema({
  date: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
})

module.exports = Rates = mongoose.model('rates', RatesSchema);