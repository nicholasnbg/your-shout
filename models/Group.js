const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Create Schema
const GroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  members: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    admin: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: String
    },
    balance: {
      type: Number,
      default: 0
    }
  }],
  transactions: [{
    users: [{
      userid: {
        type: Schema.Types.ObjectId
      },
      amount: {
        type: Number
      }
    }],
    date: String,
    description: String
  }],
  showCurrency: {
    type: Array,
    default: ['usd']
  }
})

module.exports = Group = mongoose.model('groups', GroupSchema);