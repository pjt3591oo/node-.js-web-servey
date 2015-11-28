var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String},
    email: {type: String, required: true, index: true, unique: true, trim: true},
    password: {type: String, required: true, unique: false},
    auth: { type:String, default:0}, //권한
    emailAuth: { type:String, default:0}, //이메일
    serveyCount: { type:String, default:0}, //설문 갯수
    createdAt: {type: Date, default: Date.now}
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


var Users = mongoose.model('Users', schema);

module.exports = Users;
