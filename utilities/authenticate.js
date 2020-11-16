const ApplicationKeys = require('./ApplicationKeys');

const APP_KEY = 'app-key';

let key;

const Authenticate = async (req, res, nextFunction) => {
	if (!key) { key = await ApplicationKeys.fetch(APP_KEY); }
	if (req.body.key === key) {
		nextFunction();
	} else {
    res.status(401).send({ error: 'Incorrect authentication key.' });
	}
}

module.exports = Authenticate;
