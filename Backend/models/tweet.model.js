const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
    title : {type:String,required:true},
    category : {type:String,required:true},
    author : {type:String,required:true},
    body : {type:String,required:true}
});

const TweetModel = mongoose.model('tweet' ,TweetSchema);

module.exports = {TweetModel};