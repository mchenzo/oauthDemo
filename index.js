

const express = require('express');
const app = express();


/* route handler:
 * app: express server that handlers are registered to
 * get: handler that retrieves information
 * '/': the specific route being visited
 * req: object representing the incoming request 
 * res: outgoing response
 * res.send(): response data inside send()
 * () =>: second argument, called automatically when route called
 */
app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});


/* DYNAMIC PORT BINDING
 * heroku can inject environment variables 
 * if no assigned port; local dev use 5000
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT);

//redeployment steps: save, recommit