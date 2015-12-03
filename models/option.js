var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    questionId :{type:String},
    createdAt: {type: Date, default: Date.now},
    option: {type: String},
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


var Options = mongoose.model('Options', schema);

module.exports = Options;
