const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const status = new Map();
status.set("EC", "En cours");
status.set("AV", "A venir");
status.set("C", "Clôturé");


// create event schema
const EventSchema = new Schema(
    {
        artist: {
            type: String,
            require: true
        },
        date: {
            type: Date,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        status: {
            type: String,
            require: true,
            default: status.get("AV")
        }
    },
);

// create model
const EventModel = mongoose.model("event", EventSchema);

module.exports = EventModel;
