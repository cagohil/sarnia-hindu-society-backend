const mongoose = require('mongoose');
const { Schema } = mongoose;

const MemberSchema = new Schema({
    memberimage: {
        type: String,
    },
    name:{
        type: String,
    },
    designation:{
        type: String,
    },
    about:{
        type: String,
    }
});

module.exports = mongoose.model('members', MemberSchema);