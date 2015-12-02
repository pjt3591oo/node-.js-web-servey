var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    surveyId :{type:String},
    subject:{type:String},
    createdAt: {type: Date, default: Date.now}
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

var Questions = mongoose.model('Questions', schema);

module.exports = Questions;
