const { Datastore } = require('@google-cloud/datastore');
const { BanEntity, BAN_ENTITY_PARAMS, BAN_KEY } = require('./models/BanEntity');

const dataStore = new Datastore();

class BanDao {
  static async addBan(userId, admin, username, reason) {
    const banEntity = BanEntity.getEntityForPersist(userId, admin, username, reason)

    console.log(JSON.stringify(banEntity));

    await dataStore.upsert(banEntity);
  }

  static async deleteBan(userId) {
    const banEntity = BanEntity.getKey(userId)

    console.log(JSON.stringify(banEntity));

    await dataStore.delete(banEntity);
  }

  static async fetchBan(userId) {
    const key = BanEntity.getKey(userId);

    const query = dataStore
                  .createQuery()
                  .filter('__key__', key)
                  .limit(1)

    const result = await dataStore.runQuery(query);

    const allObjectsMatchingQuery = result[0];
    const userBanObject = allObjectsMatchingQuery[0];

    return userBanObject
  }

  static async fetchAllBans() {
    const query = dataStore.createQuery(BAN_KEY)

    const result = await dataStore.runQuery(query);
    const allObjectsMatchingQuery = result[0];

    return allObjectsMatchingQuery
  }
}

module.exports = BanDao;
