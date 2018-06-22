//prod.js, DO COMMIT THIS FILE
//assigns object to module.exports property, props can be reqed in other files
//references heroku env vars 
module.exports = {
	googleClientID: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	mongoURI: process.env.MONGO_URI,
	cookieKey: process.env.COOKIE_KEY
};