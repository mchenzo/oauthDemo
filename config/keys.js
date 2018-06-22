//figure out which set of credentials to return

if (process.env.NODE_ENV === 'production') {
	//production credentials
	module.exports = require('./prod');
} else {
	//dev credentials
	module.exports = require('./dev');
}