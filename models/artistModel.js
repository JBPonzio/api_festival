const mongoose = require("mongoose");
const {Schema} = require("mongoose");

// create artist schema
const ArtistSchema = new Schema(
    {
        firstname: {
            type: String,
            require: false
        },
        lastname: {
            type: String,
            require: false
        },
        name: {
            type: String,
            require: true
        },
        description :{
            type: String,
            require: true
        },
        events: {
            type: [String],
            require: false
        }
       },
);

// create model
const ArtistModel = mongoose.model("artist", ArtistSchema);

module.exports = ArtistModel;
