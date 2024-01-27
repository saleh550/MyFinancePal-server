require('dotenv').config()
const PORT=process.env.PORT || 5000
const express= require("express")
const app =express()
const {errorHandler}=require('./middleware/errorMiddleware')
const connectDB=require('./db')
const colors=require('colors');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

connectDB()

//Routes
app.use('/api/users', require('./Routes/userRoutes'))

// use the errorHandler function for manage error events 
app.use(errorHandler)

app.listen(PORT,function(){
    console.log(`started serve on port ${PORT}`)
})