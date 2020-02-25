const router = require('express').Router();
const home = require('../controllers/home');
const tweet = require('../controllers/tweets');
const { isAuthenticated } = require('../helpers/lib');


module.exports = app => {
    
    router.get('/', isAuthenticated, home.index);

    router.get('/signin', home.signin);

    router.get('/signup', home.signup);

    router.post('/signin', home.postSignin);

    router.post('/signup', home.postSignup);

    router.post('/tweet', isAuthenticated , tweet.tweet);

    router.get('/tweet/:id', isAuthenticated ,tweet.viewTweet);

    router.post('/tweet/:id/like', isAuthenticated ,tweet.likes);

    router.post('/tweet/:id/comment', isAuthenticated ,tweet.comment);

    router.get('/logout', home.logout);

    app.use(router)
}