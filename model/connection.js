const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
})

userSchema.pre('save',async function(next){
    const user=this;
    if(!user.isModified('password')) return next();
    try{
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(user.password,salt);
        user.password=hashPassword;
        next();
    }
    catch(err){
        next(err);
    }
})

const User=mongoose.model('user',userSchema);

module.exports=User;