
const mongoose = require("mongoose")

const passportlocalmongoose = require('passport-local-mongoose')


const userschema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
})

//here usernameField is help to customize the username to email/customs based on specific field
userschema.plugin(passportlocalmongoose, { usernameField: 'email' })

module.exports = mongoose.model("users", userschema)