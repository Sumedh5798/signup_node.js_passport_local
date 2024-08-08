const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('./model/connection.js')
const bcrypt=require('bcrypt');

passport.use(new LocalStrategy(
    async (username,password,done)=>{
        try{
            const user=await User.findOne({email:username});
            if(!user) return done(null,false,{msg:'incorrecct userid or password'});
            console.log(user);
            const isMatch=await bcrypt.compare(password,user.password);
            console.log(isMatch);
            if(!isMatch) return done(null,false,{msg:'incorrecct userid or password'});
            return done(null,user);
        }
        catch(err){
            return done(err,false);
        }

    }
))

passport.serializeUser(function(User,done){
    done(null,User.id)
})

passport.deserializeUser(async (id,done)=>{
    await User.findById(id)
    done(null,User);
    
})



module.exports=passport;