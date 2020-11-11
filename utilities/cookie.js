const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
// https://console.cloud.google.com/security/secret-manager?authuser=2&project=ucr-unity
const COOKIE_SECRET_NAME = 'projects/ucr-unity/secrets/roblox-account-cookie';

const noblox = require('noblox.js')
const client = new SecretManagerServiceClient();

const destroySecretVersion = async (cookieNameWithVersionToDestroy) => {
	console.info(`Destroying cookie with name ${cookieNameWithVersionToDestroy}`);

	const [version] = await client.destroySecretVersion({
		name: cookieNameWithVersionToDestroy
	});

	console.info(`Destroyed secret version ${version.name}`);
}

const fetchCookie = async () => {
	const [accessResponse] = await client.accessSecretVersion({
    name: `${COOKIE_SECRET_NAME}/versions/latest`,
  });

	cookie = accessResponse.payload.data.toString('utf8');
	fullSecretNameWithVersion = accessResponse.name
  console.info(`Successfully fetched latest cookie ${fullSecretNameWithVersion}`);
  return {cookie, fullSecretNameWithVersion};
}

const persistCookie = async (newCookie) => {
  // Add a version with a payload onto the secret.
  const [version] = await client.addSecretVersion({
    parent: COOKIE_SECRET_NAME,
    payload: {
      data: Buffer.from(newCookie, 'utf8'),
    },
  });

  console.info(`Added roblox-account-cookie secret version ${version.name}`);
}

const refreshCookie = async () => {
	const {fullSecretNameWithVersion, cookie} = await fetchCookie();
	console.info(`fullSecretNameWithVersion: ${fullSecretNameWithVersion}`);

	const newCookie = await noblox.refreshCookie(cookie);

	console.info('Retrieved new cookie. Persisting...')

	await persistCookie(newCookie);

	console.info(`Destroying old version, ${fullSecretNameWithVersion}`);

	// Must destroy old secret version or you get charged insane amount
	await destroySecretVersion(fullSecretNameWithVersion);

	console.info('Finished cookie refresh sequence');
}

module.exports = {
	fetchCookie,
	refreshCookie
};
