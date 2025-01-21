const express = require('express')
const router = express.Router()
const cors = require('cors')
const {updateMovie, containsMovie} = require('../controller/dbController.js')

//middleware
router.use(
    cors({
        credentials:true,
        origin:'http://localhost:3000'
    })
)

router.put('/update', updateMovie)
router.get('/contains', containsMovie)

module.exports = router