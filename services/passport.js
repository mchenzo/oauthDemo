const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');


//user param is either the existing user or the new user passed to passport
//user.id is the ID given to each user entry by mongo
//This function extracts the id from mongo and incorporates into user cookie
passport.serializeUser((user, done) => {
	done(null, user.id);
});


//id here is the user.id passed in serialize
//this func takes the user id and retrieves the user from the db
//after passport extracts user ID from cookie data
//passport then adds the user model instance to the req as req.user
passport.deserializeUser((id, done) => {
	User.findById(id)
		.then((user) => {
			done(null, user);
		})
});



//new instance of google strategy
//passport will use specific strategy passport.use
passport.use(
	new GoogleStrategy({

		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback',
		//trust proxy (https ok)
		proxy: true

	}, (accessToken, refreshToken, profile, done) => {
		//this is a promise
		User.findOne({ googleID: profile.id }).then((existingUser) => {
			if (existingUser) {
				done(null, existingUser);
			} else {
				//generate new user, save to database
				new User({ googleID: profile.id })
					.save()
					.then((user) => done(null, user));
			}
		})

	})
);