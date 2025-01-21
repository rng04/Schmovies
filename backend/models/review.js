const mongoose = require('mongoose')
const {Schema} = mongoose

const reviewSchema = new Schema({
    userId: String,
    movieId: String,
    content: String,
    stars: {type: Number, min: 0, max:10},   
    createdAt: { type: Date, default: Date.now }
})

//put it in user collection
const ReviewModel = mongoose.model('Review', reviewSchema)

module.exports = ReviewModel