const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
// https://console.cloud.google.com/security/secret-manager?authuser=2&project=ucr-unity

const APPLICATION_SECRETS_PREFIX = "projects/ucr-unity/secrets";

class ApplicationKeys {
  static async fetch(keyName) {
    const secretKeyName = `${APPLICATION_SECRETS_PREFIX}/${keyName}`;

  	const client = new SecretManagerServiceClient();

  	const [accessResponse] = await client.accessSecretVersion({
      name: `${secretKeyName}/versions/latest`,
    });

  	const key = accessResponse.payload.data.toString('utf8');
    console.info(`Successfully fetched ${keyName}`);

    return key;
  }
}

module.exports = ApplicationKeys
