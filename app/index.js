const log = require('./logger');
const passport = require('./passport.js');
var router = require('./router');

log.info('Welcome ! TheCrewExchange is loading ...');

/* Init every services */
var services = require('./services/');
services.start_all().then(()=>{
	require('./discord/');
})

/* Setup Express */

//services.http.client.use(require('body-parser').json());
services.http.client.use('/', router);

