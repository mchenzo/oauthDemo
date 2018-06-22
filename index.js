const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);
const app = express();


// ====================================================================
// MIDDLE WARES: modify reqs before route handling
// ====================================================================

//tell express to use cookies in app
app.use(
	/* cookie session takes a request and stores data in req.session
	 * passport extracts data from req.session.passport
	 * cookie is the session; has all the data
	 */
	cookieSession({
		//cookie lifetime in milliseconds
		maxAge: 30 * 24 * 60 * 60 * 1000,
		//encryption key
		keys: [keys.cookieKey]
	})
);


//tell passport to use cookies to handle auth
app.use(passport.initialize());
app.use(passport.session());

//====================================================================

//return the function in authRoutes, immediately call with express app
require('./routes/authRoutes')(app);


//https://accounts.google.com/o/oauth2/v2/auth?
//response_type=code&																	
//redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&				redirect address for user after permission granted
//scope=profile%20email&																what access we want
//client_id=756567726441-dd6jr9jmsl3nt7rb29ig83cr31sucgj5.apps.googleusercontent.com	identify our application

//*******A REDIRECT URI MISMATCH error occurs when you have not informed google that the callback url is safe

/* ==============================================================
 * route handler:
 * app: express server that handlers are registered to
 * get: handler that retrieves information
 * '/': the specific route being visited
 * req: object representing the incoming request 
 * res: outgoing response
 * res.send(): response data inside send()
 * () =>: second argument, called automatically when route called
 */
// app.get('/', (req, res) => {
// 	res.send({ hi: 'there' });
// });
// ==============================================================





/* DYNAMIC PORT BINDING
 * heroku can inject environment variables 
 * if no assigned port; local dev use 5000
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT);

//redeployment steps: save, recommit

