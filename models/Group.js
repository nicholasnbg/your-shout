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
      type: boolean,
      default: false
    },
    avatar: {
      type: String
    }
  }]
})

module.exports = Group = mongoose.model('groups', GroupSchema);