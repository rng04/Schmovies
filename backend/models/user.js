const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    email: {
        type:String,
        unique:true
    },
    username: String,
    password: String,
    favorites: [String],
    bookmarks: [String]
})

//put it in user collection
const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel