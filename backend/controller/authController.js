const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const test = (req,res) => {
    res.json('test is working')
}

const registerUser = async (req,res) => {
    try {
        const {email, username, password} = req.body
        if(!email || email.length<1) {
            return res.json({
                error: "email is required"
            })
        }
        if(!username || username.length<1) { 
            return res.json({
                error:"username is required"
            })
        } 
        if(!password || password.length<1) {
            return res.json({
                error:"password is required"
            })
        }

        const exists = await User.findOne({email})

        if(exists) {
            return res.json({
                error: "email taken already"
            })
        } 
    
        const hashedPassword = await hashPassword(password)
        const user = await User.create({
            email,
            username,
            password:hashedPassword
        })

        return res.json(user)
     } catch (error) {
        console.log(error)
    }
}

const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body

        //check for existence
        const user = await User.findOne({email})
        if(!user) {
            return res.json({
                error:"No user found"
            })
        }

        const match = await comparePassword(password, user.password)
        
        if(match) {
            jwt.sign({email: user.email, id:user._id, user: user.username}, process.env.JWT_SECRET,{},(err,token)=>{
                if(err) throw err
                res.cookie('token', token).json(user)
            })
        } else {
            res.json({
                error:"Incorrect password"
            })
        }
    } catch(error) {
        console.log(error)
    }
}

const getProfile = (req,res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err,user)=> {
            if(err) throw err
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

const revokedTokens = new Set()

const logoutUser = (req,res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if(token) {
        revokedTokens.add(token)
    }

    res.status(200).send({ message: 'Logged out successfully' });
}

const verifyToken = (req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (revokedTokens.has(token)) {
        return res.status(401).send({ message: 'Token is invalidated' });
    }
    next()
}

module.exports = { test, registerUser,loginUser,logoutUser,verifyToken,getProfile }