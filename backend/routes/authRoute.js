const express = require('express')
const router = express.Router()
const cors = require('cors')
const {registerUser,loginUser,logoutUser,verifyToken,getProfile} = require('../controller/authController.js')

//middleware
router.use(
    cors({
        credentials:true,
        origin:'http://localhost:3000'
    })
)

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', [verifyToken,logoutUser])
router.get('/profile', getProfile)

module.exports = router