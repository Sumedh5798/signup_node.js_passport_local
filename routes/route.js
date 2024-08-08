const express=require('express');
const router=express.Router();
const User=require('../model/connection.js');
const passport=require('../auth.js');


function checkauthenticate(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/api/login');
}

router.get('/signup',(req,res)=>{
    res.render('signup');
})

router.post('/signup',async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        const user=new User({name,email,password});
        await user.save();
        res.redirect('/api/login');
    }
    catch(err){
        res.json({err});
    }
})

// router.get('/',async(req,res)=>{
//     const user=await User.find({});
//     res.json({user});
// })

router.get('/login',(req,res)=>{
    res.render('login');
})


router.post('/login',passport.authenticate('local',({successRedirect:'/api/',failureRedirect:'/api/login'})),(req,res)=>{
})

router.get('/',checkauthenticate,async(req,res)=>{
    const user=await User.find({});
    res.json({user});
})



module.exports=router;