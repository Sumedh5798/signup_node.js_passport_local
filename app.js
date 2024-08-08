require('dotenv').config();
const express=require('express');
const app=express();
const PORT=process.env.PORT ||8080;
const path=require('path');
const mongoose=require('mongoose');
const router=require('./routes/route.js');
const passport=require('passport');
const session=require('express-session');

mongoose.connect(process.env.MONGO_PATH)
.then(()=>console.log('mongoose is connected'))
.catch((err)=>console.log(err));

app.use(session({secret:process.env.secret,
                resave:false,
                saveUninitialized:false,
                // cookie:{maxAge:1000}
}));

app.use(passport.initialize());
app.use(passport.session());



//middlware
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//static files
app.use(express.static(path.join(__dirname,'public')));

//ejs
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//routers
app.use('/api',router);

app.listen(PORT,()=>console.log(`listening to the port http://localhost:${PORT}/api`));