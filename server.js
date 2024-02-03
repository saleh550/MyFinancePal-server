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
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://65be266999ee797ffe7e996c--jade-frangipane-0df171.netlify.app");
    // Add other necessary headers here
    // Set the allowed headers, including 'Content-Type'
    res.header("Access-Control-Allow-Headers", "Content-Type");
  
    // Allow the methods you need
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  
    // Allow credentials if necessary
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
//Routes
app.use('/api/users', require('./Routes/userRoutes'))
app.use('/api/incomes', require('./Routes/incomeRoutes'))
app.use('/api/expenses', require('./Routes/expenseRoutes'))

// use the errorHandler function for manage error events 
app.use(errorHandler)

app.listen(PORT,function(){
    console.log(`started serve on port ${PORT}`)
})