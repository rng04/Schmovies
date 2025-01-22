const mongoose = require('mongoose')
const {Schema} = mongoose

const reviewSchema = new Schema({
    userId: {type: String, unique: true},
    movieId: {type: String, unique: true},
    content: String,
    stars: {type: Number, min: 1, max:10}
},{ timestamps: true })

//put it in user collection
const ReviewModel = mongoose.model('Review', reviewSchema)

module.exports = ReviewModel