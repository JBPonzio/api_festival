const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://user:PjR9MU6IoESw0AbR@cluster0.sn9i0.mongodb.net/db_festival",
    {useNewUrlParser: true, useUnifiedTopology: true},
    (error => {
        if(!error) {
            console.log("Mongodb connected");
        }else {
            console.log("Error mongodb connection:"+error);
        }
    }));