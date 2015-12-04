var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    questionId :{type:String},
    createdAt: {type: Date, default: Date.now},
    answer: {type: String},
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


var Answer = mongoose.model('Answer', schema);

module.exports = Answer;
