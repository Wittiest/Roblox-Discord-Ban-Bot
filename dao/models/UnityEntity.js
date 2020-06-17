const { Datastore } = require('@google-cloud/datastore');
const dataStore = new Datastore();

const UNITY_KEY = 'unity';
const UNITY_ENTITY_PARAMS = {
  totalUnity: 'totalUnity'
}

class UnityEntity {
  static getEntityForPersist(userId, totalUnity) {
    return {
      key: UnityEntity.getKey(userId),
      data: UnityEntity.createObject(totalUnity)
    }
  }

  static getKey(userId) {
    return dataStore.key([UNITY_KEY, userId]);
  }

  static createObject(totalUnity) {
    return {
      [UNITY_ENTITY_PARAMS.totalUnity]: totalUnity
    }
  }
}

module.exports = {UnityEntity, UNITY_ENTITY_PARAMS};
