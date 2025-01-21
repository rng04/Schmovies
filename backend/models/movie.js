const mongoose = require('mongoose')
const {Schema} = mongoose

const movieSchema = new Schema({
    id: {
        type:Number,
        unique:true
    }
})

//put it in user collection
const MovieModel = mongoose.model('Movie', movieSchema)

module.exports = MovieModel