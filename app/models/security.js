const config = require('../config.json');

class Security {

	static isUUID(UUID) {
		return UUID.match('/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/');
	}
}

module.exports = Security;