const mongoose = require('mongoose');

const AuthenticationSchema = mongoose.Schema({
    UserName: {
        type:String,
        required:true,
    },
    Email: {
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    Password:{
        type:String,
        required:true
    },
},{ timestamps:true, versionKey:false  })


module.exports = mongoose.model("Authentication", AuthenticationSchema);