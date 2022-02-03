const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const passwordSchema = require("../middlewares/password");
const bcrypt = require("bcrypt");
const accessTokenSecret = 'apC3Y9dhSjbMQzrq';
const maxAge = 3 * 24 * 60 * 60 * 1000;

// function to sign up
module.exports.signUp = async (req, res) => {
    const {firstname, lastname, username, email, password} = req.body
    // verify the password
    await passwordSchema.validate(password, {list: true});
    try {
        const user = await UserModel.create({firstname, lastname, username, email, password });
        // Generate an access token
        const accessToken =  await jwt.sign({user: {username: user.username, role: user.role}}, accessTokenSecret);
        res.cookie('jwt', accessToken, { httpOnly: true, maxAge});
        res.status(200).json({ user: user._id, accessToken : accessToken})
    }
    catch(err) {
        res.status(400).send({ err })
    }
}

// function to sign in
module.exports.login = async (req, res) => {
    const { username, password } = req.body
    const user = await UserModel.findOne({ username : username });
    try {
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                // Generate an access token
                const accessToken =  await jwt.sign({user: {username: user.username, role: user.role}}, accessTokenSecret);
                res.cookie('jwt', accessToken, { httpOnly: true, maxAge});
                res.status(200).json({ user: user._id,  accessToken : accessToken})
            }
        }
    } catch (err){
        res.status(400).json({ err: err });
    }
}

// function to logout
module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}