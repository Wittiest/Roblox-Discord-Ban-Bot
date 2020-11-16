const Discord = require('discord.js');
const BanDao = require('../dao/BanDao');
const RobloxUserApi = require('../utilities/RobloxUserApi');

const NONADMIN_REJECT = 'You cannot use this command because you are not an admin.';
const USER_IS_ALREADY_BANNED = 'This user is already banned';
const USER_IS_NOT_BANNED = 'This user is not on the ban list';

class Commands {
  constructor() {
    this.admins = ["Wittiest#9568", "Tune#1305", "Min#2020"];
    // TODO Gather list of admins who can run commands via google datastore
  }

  _authorFullName(author) {
    return `${author.username}#${author.discriminator}`
  }

  _authorIsAdmin(author) {
    return this.admins.includes(this._authorFullName(author));
  }

  _createBanListEmbeds(bans) {
    const embeds = [];

    let embed = new Discord.MessageEmbed().setColor('#FF0000').setTitle('Ban List');

    for (let i = 0; i < bans.length; i++) {
      const ban = bans[i];

      if (i % 20 == 0) {
        embeds.push(new Discord.MessageEmbed().setColor('#FF0000').setTitle('Ban List'));
      }

      embeds[embeds.length - 1].addField(ban.username, `
        ${ban.userId ? `userId: ${ban.userId}` : ''}
        admin: ${ban.admin}
        ${ban.reason ? `reason: ${ban.reason}` : ''}`);
    }

    return embeds;
  }

  async _isUserBanned(userId) {
    return await BanDao.fetchBan(userId);
  }

  async ban(author, args) {
    if (!this._authorIsAdmin(author)) return NONADMIN_REJECT;

    const userIdentifier = args.shift();

    const identifiedUser = await RobloxUserApi.getUserFromIdentifier(userIdentifier);

    if (!identifiedUser) { return `Cannot find ${userIdentifier}`; }

    const reason = args.join(" ");

    const isBanned = await this._isUserBanned(identifiedUser.Id);

    if (isBanned) { return USER_IS_ALREADY_BANNED }

    await BanDao.addBan(identifiedUser.Id, this._authorFullName(author), identifiedUser.Username, reason);

    return `Banned ${identifiedUser.Username}`;
  }

  async unban(author, args) {
    if (!this._authorIsAdmin(author)) return NONADMIN_REJECT;

    const userIdentifier = args.shift();
    const identifiedUser = await RobloxUserApi.getUserFromIdentifier(userIdentifier);
    if (!identifiedUser) { return `Cannot find ${userIdentifier}`; }

    const isBanned = await this._isUserBanned(identifiedUser.Id);

    if (!isBanned) { return USER_IS_NOT_BANNED }

    await BanDao.deleteBan(identifiedUser.Id);

    return `Unbanned ${identifiedUser.Username}`;
  }

  async list_bans(author, args, sendEmbedMsg) {
    if (!this._authorIsAdmin(author)) return NONADMIN_REJECT;

    const bans = await BanDao.fetchAllBans();
    const embeds = this._createBanListEmbeds(bans);

    embeds.forEach(embed => sendEmbedMsg(embed));
  }

  async cmds(author, args) {
    const props = Object.getOwnPropertyNames(Commands.prototype).filter(p => p != "constructor" && p[0] !== '_');
    return `\n${props.join('\n')}`;
  }
}

module.exports = Commands;
