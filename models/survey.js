var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String},
    email: {type: String},
    head: {type: String, required: true, unique: false}, //설문제목
    read:{type:String, default:'0'},
    createdAt: {type: Date, default: Date.now}
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


var Surveys = mongoose.model('Surveys', schema);

module.exports = Surveys;
