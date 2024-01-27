const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:[true,'Please add a name .']
    },
    userName:{
        type:String,
        required:[true,'Please add your user name']

    },
    password:{
        type:String,
        required:[true,'Please add your password']

    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }

})

module.exports=mongoose.model('User',userSchema)