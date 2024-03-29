const mongoose = require('mongoose');

let EventSchema = new mongoose.Schema({
    name : {type:String, required:true},
    image : {type:String, required:true},
    type : {type:String, required:true},
    date : {type:String, required:true},
    price : {type:Number, required:true},
    info : {type:String, required:true},
    created : {type:Date, default:Date.now()},
});

let Event = mongoose.model('event', EventSchema);
module.exports = Event;