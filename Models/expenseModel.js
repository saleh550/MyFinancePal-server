const mongoose=require('mongoose')

const expenseSchema=mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "must to have user id"],
      },
    name:{
        type:String,
        required:[true,'Please add a name .']
    },
    category:{
        type:String,
        enum:["FOOD","RESTAURANTS","SHOPPING","FUEL","CIGARETTES","OTHER"],
        required:[true,'Please add your user name']

    },
    date:{
        type:Date,
        required:[true,'Please add your date']

    },
    amount:{
        type:Number,
        required:[true,'Please add amount'],

    }
},  { timestamps: true })

module.exports=mongoose.model('Expense',expenseSchema)