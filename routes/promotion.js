const express = require('express');
const noblox = require('noblox.js')
const Authenticate = require('../utilities/authenticate');
const routes = express.Router();

// TODO change to accept finite roleset
routes.post('/setRank', Authenticate, async (req, res) => {
  console.log(req.body);
  const { group, userId, rank } = req.body;

  const roleset = await noblox.setRank({group, target: userId, rank});
  console.log(roleset);
  const successMessage =
    `Successfully changed rank of userId ${userId} to rank ${roleset.name} in group ${group}`

  console.log(successMessage)
  res.status(200).send({
    data: { newRank: rank, newRankName: roleset.name, userId, group },
    message: successMessage
  });
});

module.exports = routes;
