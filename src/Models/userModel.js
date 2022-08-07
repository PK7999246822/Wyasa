const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   
  nickName:{
        type: String,
        required: "name is required",
        trim: true
    },

    struggleTime:{
        type:String,
        enum : ['Less than 2 weeks', '2 to 8 weeks','More than 8 weeks'], 

    },
    bedTime:{
        type:String
    },

    wakeupTime:{
        type:String
    },

    sleepHours:{
        type:Number
    },
    password:{
        type:String
    }

    
    },{ timestamps: true })

module.exports = mongoose.model('User', UserSchema)