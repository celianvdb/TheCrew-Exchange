const log = require('./logger');
var router = require('./router');

log.info('Welcome ! TheCrewExchange is loading ...');

/* Init every services */
var services = require('./services/');
services.start_all().then(() => {
	require('./discord/');
});

/* Setup Express */

//services.http.client.use(require('body-parser').json());
services.http.client.use('/', router);

