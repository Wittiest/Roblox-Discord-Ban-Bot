const ApplicationKeys = require('../utilities/ApplicationKeys');
const MessageHandler = require('./MessageHandler');
const Discord = require('discord.js');
const DISCORD_BOT_KEY_SECRET_NAME = 'discord-bot-key';

const client = new Discord.Client();
const messageHandler = new MessageHandler(client);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => messageHandler.handle(msg));

const setup = async () => {
  const discordBotKey = await ApplicationKeys.fetch(DISCORD_BOT_KEY_SECRET_NAME);

  client.login(discordBotKey);
};

setup();

module.exports = client;
