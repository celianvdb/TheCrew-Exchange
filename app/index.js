const log = require('./logger');
var router = require('./router');
var bodyParser = require('body-parser');

log.info('Welcome ! TheCrewExchange is loading ...');

/* Init every services */
var services = require('./services/');
services.start_all().then(() => {
	require('./discord/');
});

/* Setup Express */

//services.http.client.use(require('body-parser').json());
services.http.client.use(bodyParser.urlencoded({ extended: false }));
services.http.client.use('/', router);

/* Init summit following system */

/*const TCHUB = require('./tchub_client/');
TCHUB.summits_update().then(() => {
	console.log(TCHUB.summits);
});
*/
//setInterval(checkTier, 5 * 60 * 1000 ); // Check tiers every 5 minutes