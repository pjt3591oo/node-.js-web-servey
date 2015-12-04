var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    surveyId :{type:String},
    head:{type:String},
    type:{type:String},
    answer:{type:String, default: '0'},
    createdAt: {type: Date, default: Date.now}
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

var Questions = mongoose.model('Questions', schema);

module.exports = Questions;
