require('dotenv').config()
const express = require('express') //require() method in javascript is used to load and cache javascript modules
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')


const app = express() //creates an express application
app.use(express.json()) //app.use() is application-level middleware
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

// Routes
app.use('/user', require('./routes/userRouter')) //from routes subdirectory
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/productRouter'))
app.use('/api', require('./routes/paymentRouter'))



// Connect to mongodb
const URI = process.env.MONGODB_URL //using environment variables to secure the project. some variables are sensitive and should not be used by the public (database username and password, email authentication credentials, session secret key, etc)
mongoose.connect(URI, {
    useCreateIndex: true, //to fix deprecation warnings
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}



const PORT = process.env.PORT || 5000 //we can set the environment variable PORT to whatever the environment variable PORT, or 5000 if there's nothing there (used while hosting to another service like heroku,nodejitsu,AWS)
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})