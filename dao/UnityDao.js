const { Datastore } = require('@google-cloud/datastore');
const { UnityEntity, UNITY_ENTITY_PARAMS } = require('./models/UnityEntity')

const dataStore = new Datastore();

class UnityDao {
  /**
   * Upsert a unity record into the database.
   *
   * @param {integer} userId for a roblox account
   * @param {integer} totalUnity amount of unity to update record with
   */
  static async setUnity(userId, totalUnity) {
    const unityEntity = UnityEntity.getEntityForPersist(userId, totalUnity)

    console.log(JSON.stringify(unityEntity));

    await dataStore.upsert(unityEntity);
  }

  static async fetchUnity(userId) {
    const key = UnityEntity.getKey(userId);

    const query = dataStore
                  .createQuery()
                  .filter('__key__', key)
                  .limit(1)

    const result = await dataStore.runQuery(query);

    const allObjectsMatchingQuery = result[0];
    const userUnityObject = allObjectsMatchingQuery[0];

    return userUnityObject ? userUnityObject.totalUnity : 0
  }
}

module.exports = UnityDao;
