/*
	This file is to declare new service, like mongodb connection, express listen etc...
	To declare a new service juste create new object of class in services/ and parse name and config in args ( see examples ).
*/

/* Trigger exit to stop every services */

var config = require('../config.json');
const log = require('../logger');
const mongodb = require('./services/mongodb.js');
const express = require('./services/express.js');
const discord = require('./services/discord.js');

class ServiceManager {

	constructor() {
		this.shutdown_try = 0;
		/* Services need to be declared here */
		this.db = new mongodb('MongoDB', config.mongodb);
		//this.testdb = new postgresql('PgSQL', config.pgsql);
		this.http = new express('Express', config.http);
		this.discord = new discord('Discord', config.discord);

		this.realtimeServices = [this.http, this.db, this.discord];
	}

	start_all() {

		log.info('Starting all services...')

		var services_loader = [];

		for(const realtimeService of this.realtimeServices)
			if(!realtimeService.status)
				services_loader.push(realtimeService.start());

		return Promise.all(services_loader)
			.then(() => {log.info('All services started. 😲');})
			.catch(function() {
				log.error('One or many services failed to start...');
		});
	}

	stop_all() {

		log.info('Asking every service to stop...');

		if(this.shutdown_try > 0) {
				log.info('Forcing stop...');
				process.exit(1);
		}
		this.shutdown_try++;

		var services_unloader = [];

		for(const realtimeService of this.realtimeServices)
			realtimeService.stop();
			
	}

}

var services = new ServiceManager();

process.on("SIGINT",() => { // Triggering signal to stop all services (on pressing CTRL+C for example)
	services.stop_all();	
});

module.exports = services;