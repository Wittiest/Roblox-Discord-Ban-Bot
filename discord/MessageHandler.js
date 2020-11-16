const Commands = require('./commands');

const LOUNGE_CHANNEL_ID = '360826739472990218';

class MessageHandler {
  constructor(client) {
    this.client = client;
    this.commands = new Commands(client)
    this._sendEmbedMsg = this._sendEmbedMsg.bind(this);
  }

  _sendEmbedMsg(embed) {
    this.client.channels.cache.get(LOUNGE_CHANNEL_ID).send(embed);
  }

  _sendMsg(author, response) {
    this.client.channels.cache
                        .get(LOUNGE_CHANNEL_ID)
                        .send(response, {reply: author});
  }

  _msgIsCommand(content) {
    return content[0] === '!';
  }

  _shouldProcessMessage(channel) {
    return channel.id === LOUNGE_CHANNEL_ID;
  }

  _parseCommand(content) {
    const contentWithoutBang = content.substring(1);
    const splitString = contentWithoutBang.split(' ');
    return {
      command: splitString.shift(),
      args: splitString
    }
  }

  async handle({content, author, channel}) {
    if (this._shouldProcessMessage(channel) && this._msgIsCommand(content)) {
      console.log(content);
      const {command, args} = this._parseCommand(content);
      console.log("COMMAND:", command);
      console.log("ARGS:", args);
      if (this.commands[command] && typeof this.commands[command] == 'function') {
        const cmdResultMsg = await this.commands[command](author, args, this._sendEmbedMsg);

        if (cmdResultMsg) {
          this._sendMsg(author, cmdResultMsg);
        }
      } else {
        this._sendMsg(author, 'Invalid Command. Say !cmds to see commands');
      }
    }
  }
}

//
// const embed = new Discord.MessageEmbed().setColor('#00bfff').setTitle('Test');
// embed.addField('Username:', 'test_username');
// client.channels.cache.get(LOUNGE_CHANNEL_ID).send(embed)


module.exports = MessageHandler;
