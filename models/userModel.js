const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const {Schema} = require("mongoose");


const roles = new Map();
roles.set("USER", "USER");
roles.set("ADMIN", "ADMIN");

//create schema
const UserSchema =  new Schema(
    {
        firstname: {
            type: String,
            require: true
        },
        lastname: {
            type: String,
            require: true
        },
        username: {
            type: String,
            minLength: 5,
            require: true,
            unique: true
        },
        email :{
            type: String,
            require: true,
            unique: true,
            validate: [isEmail]
        },
        password: {
            type: String,
            require: true,
            minLength: 6,
        },
        role: {
            type: String,
            require: true,
            default: roles.get("USER")
        },
        events: {
            type: [String],
            require: false
        }
    },
);

//hash the password
UserSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// create model
const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;