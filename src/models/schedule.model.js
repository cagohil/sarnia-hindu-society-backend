const mongoose = require('mongoose');
const { Schema } = mongoose;

const ScheduleSchema = new Schema({
    title:{
        type: String,
    },
    time:{
        type: String,
    }
});

module.exports = mongoose.model('schedules', ScheduleSchema);