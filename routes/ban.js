const express = require('express');
const noblox = require('noblox.js')
const Authenticate = require('../utilities/authenticate');
const BanDao = require('../dao/BanDao');
const routes = express.Router();

// routes.post('/bans', Authenticate, async (req, res) => {
//   const { userId, admin, username, reason } = req.body;
//
//   const ban = await BanDao.addBan(userId, admin, username, reason);
//
//   const successMessage = `Successfully added userId ${userId} to the ban list`;
//
//   res.status(201).send({
//     data: { userId, username, admin, reason },
//     message: successMessage
//   });
// });
//
// routes.delete('/bans', Authenticate, async (req, res) => {
//   const { userId } = req.body;
//
//   const ban = await BanDao.deleteBan(userId);
//
//   const successMessage = `Successfully removed userId ${userId} from the ban list`;
//
//   res.status(200).send({
//     data: { userId },
//     message: successMessage
//   });
// });

// TODO remember this shouldn't be publicly accessible. Will be via discord
routes.get('/bans', async (req, res) => {
  const bans = await BanDao.fetchAllBans();

  res.status(200).send({
    data: { bans }
  });
});

module.exports = routes;
