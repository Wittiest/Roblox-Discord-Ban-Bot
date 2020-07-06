const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
// https://console.cloud.google.com/security/secret-manager?authuser=2&project=ucr-unity
const COOKIE_SECRET_NAME = 'projects/ucr-unity/secrets/roblox-account-cookie';

const noblox = require('noblox.js')
const client = new SecretManagerServiceClient();

const fetchCookie = async () => {
	const [accessResponse] = await client.accessSecretVersion({
    name: `${COOKIE_SECRET_NAME}/versions/latest`,
  });

	cookie = accessResponse.payload.data.toString('utf8');
  console.info('Successfully fetched latest cookie');
  return cookie;
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
  let newCookie;

  try {
    newCookie = await noblox.refreshCookie();
  } catch (err) {
    console.log(`Received error with in-memory cookie, trying refresh with stored cookie`, err);

    const oldCookie = await fetchCookie();
    newCookie = await noblox.refreshCookie(oldCookie);
  }

  persistCookie(newCookie);
}

module.exports = {
	fetchCookie,
	refreshCookie
};
