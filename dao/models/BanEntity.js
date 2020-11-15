const { Datastore } = require('@google-cloud/datastore');
const dataStore = new Datastore();

const BAN_KEY = 'ban';
const BAN_ENTITY_PARAMS = {
  userId: 'userId',
  username: 'username',
  reason: 'reason',
  admin: 'admin',
}

class BanEntity {
  static getEntityForPersist(userId, username, admin, reason) {
    return {
      key: BanEntity.getKey(userId),
      data: BanEntity.createObject(userId, username, admin, reason)
    }
  }

  static getKey(userId) {
    return dataStore.key([BAN_KEY, userId]);
  }

  static createObject(userId, username, admin, reason) {
    return {
      [BAN_ENTITY_PARAMS.userId]: userId,
      [BAN_ENTITY_PARAMS.username]: username,
      [BAN_ENTITY_PARAMS.admin]: admin,
      [BAN_ENTITY_PARAMS.reason]: reason
    }
  }
}

module.exports = {BanEntity, BAN_ENTITY_PARAMS, BAN_KEY};
