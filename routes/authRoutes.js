const passport = require('passport');


module.exports = (app) => {
	//string 'google' specifies to use GoogleStrategy with authenticate
	//scope specifies access that we want
	app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email']
	}));

	//upon redirection from oauth consent screen 
	app.get('/auth/google/callback', passport.authenticate('google') );

	//test route to return the user
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});

	//req.logout is a func automatically attached to req by passport
	//cookie data is destroyed, session over
	app.get('/api/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});
}