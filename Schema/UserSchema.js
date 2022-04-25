
const mongoose = require("mongoose")

const passportlocalmongoose = require('passport-local-mongoose')


const userschema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
})

userschema.plugin(passportlocalmongoose)

module.exports = mongoose.model("users", userschema)