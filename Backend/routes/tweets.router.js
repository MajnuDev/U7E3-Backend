const { Router } = require("express");
const { TweetModel } = require("../models/tweet.model");
const { UserModel } = require("../models/user.model");
const tweets_router = Router();

// get tweets .....

tweets_router.get("/", async (req, res) => {
    const result = await TweetModel.find();
    res.status(201).json(result);
});

//create tweet ...

tweets_router.post("/create", async (req, res) => {
    const { title, category, body } = req.body;

    const creator_id = req.user_id;
    
    const user = await UserModel.findOne({ _id: creator_id });
    const new_tweet = new TweetModel({
        title,
        category,
        body,
        author: user.name,
    });
    await new_tweet.save();
    res.send("tweet created successfully.......");
});

// update tweet...
tweets_router.put("/edit/:tweetId", async (req, res) => {
    const tweet_id = req.params.tweetId;
    const payload = req.body;
    console.log(payload)
    const user_id = req.user_id;
    const isuser = await UserModel.findOne({ _id: user_id });
    const email = isuser.email;
    const tweet = await TweetModel.findOne({ _id: tweet_id });

    const tweet_creator = isuser.email;
    if (tweet_creator !== email) {
        res.send("you are not authorsised to update this tweet");
    } else {
        await TweetModel.findOneAndUpdate({ _id: tweet_id }, payload);
        res.send("tweet updated sucsessfully........");
    }
});

tweets_router.delete("/delete/:tweetId", async (req, res) => {
    const tweet_id = req.params.tweetId;

    const user_id = req.user_id;
    const isuser = await UserModel.findOne({ _id: user_id });
    const email = isuser.email;
    const tweet = await TweetModel.findOne({ _id: tweet_id });

    const tweet_creator = isuser.email;
    if (tweet_creator !== email) {
        res.send("you are not authorsised to delete this tweet");
    } else {
        await TweetModel.findOneAndDelete(tweet_id);
        res.send("tweet deleted sucsessfully........");
    }
});

module.exports = { tweets_router };
