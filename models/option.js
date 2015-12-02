var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    questionId :{type:String},
    createdAt: {type: Date, default: Date.now},
    option1: {type: String},
    option2: {type: String},
    option3: {type: String},
    option4: {type: String},
    option5: {type: String},
    option6: {type: String},
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


var Options = mongoose.model('Options', schema);

module.exports = Options;
