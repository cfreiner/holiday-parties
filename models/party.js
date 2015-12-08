var mongoose = require('mongoose');

var PartySchema = mongoose.Schema({
  date: Date,
  users: [mongoose.Schema.Types.ObjectId],
  holiday:  String,
  needs: [String]
});

// Let's craft how our JSON object should look!
// http://mongoosejs.com/docs/api.html#document_Document-toObject
// PartySchema.set('toJSON', {
//    transform: function(doc, ret, options) {
//        var returnJson = {
//            id: ret._id,
//            holiday: ret.holiday,
//            needs: ret.needs,
//        };
//        return returnJson;
//    }
// });

module.exports = mongoose.model('Party', PartySchema);
