const fetch = require('node-fetch');

class RobloxUserApi {
  static async getUserFromIdentifier(identifier) {
    let user;

    if (identifier.indexOf('<@!') == -1) {
      user = await RobloxUserApi.getUserFromRobloxApi(identifier);
    } else {
      user = await RobloxUserApi.getUserFromRoverApi(identifier);
    }

    return user;
  }

  static async getUserFromRoverApi(identifier) {
    const discordUserId = identifier.substring(3, identifier.length - 1);
    const response = await fetch(`https://verify.eryn.io/api/user/${discordUserId}`);
    const json = await response.json();

    if (json.error) {
      return null;
    }

    return {
      Username: json.robloxUsername,
      Id: json.robloxId
    }
  }

  static async getUserFromRobloxApi(identifier) {
    return await RobloxUserApi.getUserFromUsername(identifier) ||
           await RobloxUserApi.getUserFromUserId(identifier);
  }

  static async getUserFromUsername(username) {
    const response = await fetch(`https://api.roblox.com/users/get-by-username?username=${username}`);
    const json = await response.json();

    if (json.Username) { return json; }

    return null;
  }

  static async getUserFromUserId(userId) {
    const response = await fetch(`https://api.roblox.com/users/${userId}`);
    const json = await response.json();

    if (json.Username) { return json; }

    return null;
  }
}

module.exports = RobloxUserApi;
