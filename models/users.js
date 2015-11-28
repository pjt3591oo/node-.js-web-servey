var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    email:{ type: String, required: true, index: true, unique: true, trim: true },
    password:{ type: String},
    name: { type: String },
    auth: { type:String, default:0}, //권한
    emailAuth: { type:String, default:0}, //이메일
    serveyCount: { type:String, default:0},
    createdAt: { type: Date, default: Date.now }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

var Users = mongoose.model('Users', schema);

module.exports = Users;
