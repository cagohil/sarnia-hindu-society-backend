const mongoose = require('mongoose');
const { Schema } = mongoose;

const MemberSchema = new Schema({
    name:{
        type: String,
    },
    designation:{
        type: String,
    }
});

module.exports = mongoose.model('members', MemberSchema);