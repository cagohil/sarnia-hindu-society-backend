const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImageSchema = new Schema({
    title:{
        type: String,
    },
    image: {
        type: String,
    }
});

module.exports = mongoose.model('images', ImageSchema);