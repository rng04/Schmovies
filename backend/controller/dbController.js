const User = require('../models/user')
const Review = require('../models/review')
const Movie = require('../models/movie')

const addReview = async (req,res) => {
    try {
        const {userId, movieId, stars, content} = req.body

        if(!userId || !movieId || !stars || !content) {
            throw new Error("Invalid review input")
        }

        const review = await Review.create({
            userId,
            movieId,
            content,
            stars
        })

        res.status(200).json(review)
    } catch (error) {
        res.status(400).json({success:false, error:error.message})
    }
}

const removeReview = async (req,res) => {
    try {
        const {userId, movieId} = req.body

        await Review.findOneAndDelete(
            {userId:userId},
            {movieId:movieId}
        )

        res.status(200).json({success:true, msg:`Removed movie(${movieId}) from user(${userId})`})
    } catch (error) {
        res.status(400).json({success:false, error:error})
    }
}

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

const getFavOrBookmarks = async (req, res) => {
    const { userId, type } = req.query;

    try {
        // Query to fetch only the 'favorites' field
        const field = type
        const user = await User.findOne({ _id: userId }, [field]);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            [field]: type==="favorites" ? user.favorites : user.bookmarks, // Only return the 'favorites' field
        });
    } catch (error) {
        console.error("Error finding user or favorites:", error);
        return res.status(500).json({
            success: false,
            error: "An error occurred while fetching favorites.",
        });
    }
};


module.exports = {updateMovie,containsMovie,addReview,removeReview,getFavOrBookmarks}