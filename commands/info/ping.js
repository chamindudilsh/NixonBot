const { Message, Client } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.channel.send(`**Pong**\n\`${client.ws.ping} ms\``);
    },
};
