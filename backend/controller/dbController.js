const User = require('../models/user')
const Review = require('../models/review')
const Movie = require('../models/movie')

//update movie w/ updating favorite or bookmark, or remove an object if already exists in the array
const updateMovie = async (req, res) => {
    const { id, movieId, isFavorite } = req.body

    try {
        const field = isFavorite ? "favorites" : "bookmarks"
        const exists = await User.findOne({
            _id:id,
            [field]:movieId
        })

        if(exists) {
            await User.updateOne(
                { _id: id },
                { $pull: { [field]: movieId } }
            )

            return res.status(200).json({
                success:true,
                msg: isFavorite ? "Removed from favorites" : "Removed from bookmarks",
                active:false
            })
        }

        await User.updateOne(
            { _id: id },
            { $addToSet: { [field]: movieId } }
        )

        return res.status(200).json({
            success: true,
            msg: isFavorite ? "Added to favorites" : "Added to bookmarks",
            active:true
        })
    } catch (error) {
        console.error("Error updating movie:", error)
        return res.status(500).json({
            success: false,
            error: "An error occurred while updating the movie."
        })
    }
}

const containsMovie = async (req,res) => {
    const { id, movieId, type } = req.query
    
    try {
        const field = type
        const exists = await User.findOne({
            _id:id,
            [field]:movieId
        })

        if(exists) {
            return res.status(200).json({
                success:true,
                [field]:true
            })
        }

        return res.status(200).json({
            success:true,
            [field]:false
        })
    } catch (error) {
        console.error("Error finding movie:", error)
        return res.status(500).json({
            success: false,
            error: "An error occurred while checking the movie."
        })
    }
}

module.exports = {updateMovie,containsMovie}