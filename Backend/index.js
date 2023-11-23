const express = require('express') ;
const {connect } = require('./configs/db');

const {UserModel} = require('./models/user.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const {tweets_router} = require('./routes/tweets.router');
const {authetication} = require('./middlewares/middleware')
require('dotenv').config();
const  app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('basic endpoint');
})

app.post('/signup',async(req,res)=>{
    const {name,email,password,gender,country} = req.body;
    const isuser = await UserModel.findOne({ email });
    console.log(isuser)
    if(isuser){
        res.send('user already exist')
    }else{
    bcrypt.hash(password,2,async function(err,hash){
            const new_user = new UserModel({
                name,
                email,
                password: hash,
                gender,
                country
            });
            await new_user.save();
            res.send('signup successful....')
    });
}
})

//login ...

app.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const isuser = await UserModel.findOne({email});
    if(!isuser){
        res.send('please signup first...');

    }
    else{
        bcrypt.compare(password,isuser.password,function(err,ans){
            if(ans){
                const token = jwt.sign({user_id:isuser._id},process.env.SECRET_KEY);
                res.send({massage:"login succesful",token:token});
            }else{
                res.send('invalid credentials')
            }
        })
    }
})

app.use("/tweets",authetication,tweets_router)
app.listen(8080,async()=>{
    try{
        await connect;
        console.log('connected successfully.....')
    }catch(err){
        console.log(err);
        console.log("error while connectind")
    }
    console.log('connected at 8080');
})

