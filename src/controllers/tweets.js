const { User, Tweet } = require('../models')
const ctrl = {};

ctrl.tweet = async (req, res) => {
    
    let user;

    if (req.body.tweet.length <= 255){
        user = await User.findOne({ email: req.user.email }); 
    }

    if (user) {

        const newTweet = new Tweet({
            email: user.email,
            name: user.name,
            text: req.body.tweet
        });

        await newTweet.save();
        req.flash('success_message', 'You has done a tweet')
        
    } else {
        
        req.flash('error', 'The tweet must have less than 255 characters')
        
    }
    
    res.redirect('/')
    
}

ctrl.viewTweet = async (req, res) => {

    const tweet = await Tweet.findOne({ _id: req.params.id });
    
    if (tweet) {
        
        res.render('tweets/tweet', tweet)

    } else {
        req.flash('error', 'No existe el tweet')
        res.redirect('/')
    }

}

ctrl.likes = async (req, res) => {

    let tweet = await Tweet.findOne({ _id: req.params.id });
    console.log(tweet);

    let authUser = req.user || '' ;
    let user;

    if (authUser) {
        user = await User.findOne({ email: authUser.email, commentLikes: { $ne: tweet._id } });
    }
    
    if (user){

        if (tweet){
            
            tweet.likes += 1;
            await tweet.save();
            await user.updateOne({ $addToSet: { commentLikes: tweet._id } });
            await user.save()
            res.json({ likes: tweet.likes}) 
        }
        else {
            res.status(500).json({ error: 'Internal Error' })
        }
    } else {
        user = await User.findOne({ email: authUser.email, commentLikes: tweet._id });
        await user.updateOne({ $pull: {commentLikes: tweet._id }});
        tweet.likes -= 1;
        await tweet.save()
        res.json({ likes: tweet.likes}) 
    }

}

ctrl.comment = async (req, res) => {
    
    let user, id = req.params.id;

    if (req.body.tweet.length <= 255){
        user = await User.findOne({ email: req.user.email });
    }

    if (user) {

        const tweet = await Tweet.findOne({ _id: id });

        const newTweet = new Tweet({
            email: user.email,
            name: user.name,
            text: req.body.tweet
        });

        await tweet.updateOne({ $addToSet: { comments: newTweet } });
        await tweet.save();
        req.flash('success_message', 'You has done a comment')

    } else {
        
        req.flash('error', 'The comment must have less than 255 characters')
        
    }

    res.redirect(`/tweet/${req.params.id}`)

}

module.exports = ctrl;