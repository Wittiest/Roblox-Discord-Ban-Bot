const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
// https://console.cloud.google.com/security/secret-manager?authuser=2&project=ucr-unity
const APPLICATION_KEY_SECRET_NAME = 'projects/ucr-unity/secrets/app-key';

let key;

const Authenticate = (req, res, nextFunction) => {
	if (req.body.key === key) {
		nextFunction();
	} else {
    res.status(401).send({ error: 'Incorrect authentication key.' });
	}
}

const fetchApplicationKey = async () => {
	const client = new SecretManagerServiceClient();

	const [accessResponse] = await client.accessSecretVersion({
    name: `${APPLICATION_KEY_SECRET_NAME}/versions/latest`,
  });

	key = accessResponse.payload.data.toString('utf8');
  console.info('Successfully fetched application key');
}

fetchApplicationKey();

module.exports = Authenticate;
