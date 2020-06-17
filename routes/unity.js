const express = require('express');
const UnityDao = require('../dao/UnityDao');

const routes = express.Router();

// TODO consider batch calls

routes.get('/', (req, res) => {
  res.status(200).json({});
});

routes.post('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const totalUnity = req.body.totalUnity

  if (!totalUnity || totalUnity < 0) {
    res.status(400).send({error: "Invalid totalUnity. Must be >= 0"})
  }

  console.log(`Persisting ${totalUnity} unity for userId ${userId}`);

  const unity = await UnityDao.setUnity(userId, totalUnity);

  console.log(`Persisted unity of ${totalUnity} for userId ${userId}`);
  res.status(200).json({userId, totalUnity});
});

routes.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  console.log(`Fetching unity for userId ${userId}`);

  const totalUnity = await UnityDao.fetchUnity(userId);

  console.log(`Fetched unity of ${JSON.stringify(totalUnity)} for userId ${userId}`);

  res.status(200).json({userId, totalUnity});
});

const visit = {
  timestamp: new Date()
};

module.exports = routes;
