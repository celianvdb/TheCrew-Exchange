const log = require('../../logger');
const nodemailer = require('nodemailer');
const Service = require('../service.js');

class mail extends Service {
	constructor(name, config) {
		super(name, config);
		this.client = nodemailer.createTransport(config);
	}
}
module.exports = mail;