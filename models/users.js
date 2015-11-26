var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    email:{ type: String, required: true, index: true, unique: true, trim: true },
    password:{ type: String, required: true, index: true, unique: true, trim: true },
    name: { type: String, required: true, index: true, unique: true, trim: true },
    auth: { type:String, default:0},
    serveyCount: { type:String, default:0},
    createdAt: { type: Date, default: Date.now }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


var Users = mongoose.model('Users', schema);

module.exports = Users;
