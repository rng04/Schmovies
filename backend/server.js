require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database failed to connect',err))

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(cors(corsOptions))
app.use('/', require('./routes/authRoute'))
app.use('/api/movies', require('./routes/dbRoute'))

const movieAPIurl = 'http://www.omdbapi.com/?apikey='+process.env.API_KEY

app.get('/api/movies/search', async (req,res) => {
    try {
        const { title, page } = req.query

        if(!title) {
            return res.status(422)
        }

        let searchUrl = `${movieAPIurl}&s=${title}`

        if(page) {
            searchUrl += `&page=${page}`
        }

        const fetchResponse = await fetch(searchUrl)
        const data = await fetchResponse.json()
        const maxPage = Math.ceil(data.totalResults/10)
        res.status(200).json({data:data, maxPage:maxPage})
    } catch (error) {
        console.error('Error fetching data from external API:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from the external API' });
    }
})

app.get('/api/movies/:title', async (req,res) => {
    try {
        const { title } = req.params
        if(!title) {
            res.sendStatus(500)
        }

        let searchUrl = `${movieAPIurl}&i=${title}`

        const fetchResponse = await fetch(searchUrl)
        const data = await fetchResponse.json()
        res.status(200).json(data)
    } catch(error) {
        res.sendStatus(500)
    }
})


app.listen(5000, ()=> {
    console.log("The server is listening on port 5000...")
})