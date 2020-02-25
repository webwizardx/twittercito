const { User, Tweet} = require('../models')
const passport = require('passport');
const ctrl = {};

ctrl.signin = (req, res) => {
    res.render('signin')
}

ctrl.signup = (req, res) => {
    res.render('signup')
}

ctrl.index = async (req, res) => {
    const tweets = await Tweet.find().sort({ timestamp: -1});
    res.render('index', { tweets })
}

ctrl.postSignin = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
});

ctrl.postSignup = async (req , res) => {
    
    const { name, email, password } = req.body;
    const errors = [];

    if(!name || !email || !password) {
        errors.push({ text: 'You must fill in all fields' })
    }

    if(password.length < 5) {
        errors.push({ text: 'The password must have at least five characters' })
    }

    if (errors.length > 0) {
        res.render('signup', { errors } )
    } 

    else {
        const emailUser = await User.findOne({ email: email });
        
        if (emailUser) {
            errors.push({ text: 'Email is already in use' })
            res.render('signup' , { errors })
        }
        else {

            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_message', 'User registered succesfully');
            res.redirect('/signin')
        
        }
    }
}

ctrl.logout = (req, res) => {
    req.logout();
    res.redirect('/signin')
}

module.exports = ctrl;

