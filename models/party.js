var mongoose = require('mongoose');

var PartySchema = mongoose.Schema({
  date: Date,
  users: [mongoose.Schema.Types.ObjectId],
  holiday:  String,
  needs: [String], 
  name: String, 
  creator: mongoose.Schema.Types.ObjectId,
  image: String
});


module.exports = mongoose.model('Party', PartySchema);
